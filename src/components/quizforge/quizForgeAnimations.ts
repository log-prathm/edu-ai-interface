/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    THREE?: any;
  }
}

let threeScriptPromise: Promise<any> | null = null;

function loadThree() {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (window.THREE) {
    return Promise.resolve(window.THREE);
  }

  if (threeScriptPromise) {
    return threeScriptPromise;
  }

  threeScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-quizforge-three="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(window.THREE));
      existing.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.dataset.quizforgeThree = "true";
    script.onload = () => resolve(window.THREE);
    script.onerror = reject;
    document.body.appendChild(script);
  });

  return threeScriptPromise;
}

export function initBackgroundCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return () => {};
  }

  let frame = 0;
  let width = 0;
  let height = 0;
  let particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    c: string;
  }> = [];

  const resize = () => {
    width = canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    height = canvas.height = window.innerHeight * (window.devicePixelRatio || 1);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    particles = Array.from({ length: Math.min(80, Math.round((width * height) / 28000)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 0.5,
      c: ["138,124,255", "69,227,198", "255,123,193", "255,207,92"][Math.floor(Math.random() * 4)],
    }));
  };

  const loop = () => {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > height) {
        particle.vy *= -1;
      }

      ctx.beginPath();
      ctx.fillStyle = `rgba(${particle.c},0.55)`;
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    });

    frame = window.requestAnimationFrame(loop);
  };

  resize();
  window.addEventListener("resize", resize);
  loop();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
  };
}

export async function initHeroScene(canvas: HTMLCanvasElement) {
  const THREE = await loadThree();
  if (!THREE || !canvas.isConnected) {
    return () => {};
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const getSize = () => ({
    width: canvas.clientWidth || 500,
    height: canvas.clientHeight || 400,
  });

  const firstSize = getSize();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(firstSize.width, firstSize.height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, firstSize.width / firstSize.height, 0.1, 100);
  camera.position.set(0, 1.4, 7);

  scene.add(new THREE.AmbientLight(0xaab0ff, 0.55));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(3, 5, 4);
  scene.add(directionalLight);

  const pointLightA = new THREE.PointLight(0x8a7cff, 1.2, 12);
  pointLightA.position.set(-3, 2, 2);
  scene.add(pointLightA);

  const pointLightB = new THREE.PointLight(0x45e3c6, 1, 12);
  pointLightB.position.set(3, 1, 3);
  scene.add(pointLightB);

  const orbs: any[] = [];
  let mouseX = 0;
  let mouseY = 0;
  let frame = 0;
  const clock = new THREE.Clock();

  const character = buildCharacter(THREE);
  scene.add(character);

  const orbColors = [0xff7bc1, 0x8a7cff, 0x45e3c6, 0xffcf5c, 0xff9c2e];
  for (let index = 0; index < 9; index += 1) {
    const geometry = new THREE.IcosahedronGeometry(0.18 + Math.random() * 0.12, 1);
    const material = new THREE.MeshStandardMaterial({
      color: orbColors[index % orbColors.length],
      roughness: 0.25,
      metalness: 0.2,
      emissive: orbColors[index % orbColors.length],
      emissiveIntensity: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 5, 1 + Math.random() * 3, (Math.random() - 0.5) * 3);
    mesh.userData.v = new THREE.Vector3((Math.random() - 0.5) * 0.02, 0, (Math.random() - 0.5) * 0.01);
    mesh.userData.spin = new THREE.Vector3(Math.random() * 0.04, Math.random() * 0.04, Math.random() * 0.04);
    scene.add(mesh);
    orbs.push(mesh);
  }

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.2, 2.35, 64),
    new THREE.MeshBasicMaterial({
      color: 0x8a7cff,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -1.2;
  scene.add(ring);

  const onResize = () => {
    const { width, height } = getSize();
    if (!width || !height) {
      return;
    }
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const onMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
  };

  const animate = () => {
    frame = window.requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();

    if (character) {
      character.position.y = -0.6 + Math.sin(elapsed * 1.5) * 0.07;
      character.rotation.y = Math.sin(elapsed * 0.6) * 0.25 + mouseX * 0.3;
      character.rotation.x = mouseY * 0.12;
      const parts = character.userData.parts;
      parts.head.rotation.y = Math.sin(elapsed * 0.7) * 0.15;
      parts.head.rotation.z = Math.sin(elapsed * 0.5) * 0.06;
      parts.armL.rotation.z = 0.4 + Math.sin(elapsed * 2) * 0.15;
      parts.armR.rotation.z = -0.4 - Math.sin(elapsed * 2) * 0.15;
      parts.book.rotation.y = Math.sin(elapsed * 1.2) * 0.2;
      parts.page.rotation.y = Math.sin(elapsed * 1.2) * 0.2;
      const blink = Math.sin(elapsed * 1.2) > 0.98 ? 0.1 : 1;
      character.userData.eyeL.scale.y = 1.1 * blink;
      character.userData.eyeR.scale.y = 1.1 * blink;
    }

    orbs.forEach((orb) => {
      orb.userData.v.y -= 0.008;
      const pull = new THREE.Vector3(0, 1, 0).sub(orb.position).multiplyScalar(0.0008);
      orb.userData.v.add(pull);
      orb.position.add(orb.userData.v);

      if (orb.position.y < -1.0) {
        orb.position.y = -1.0;
        orb.userData.v.y *= -0.82;
        orb.userData.v.x *= 0.92;
        orb.userData.v.z *= 0.92;
      }

      if (Math.abs(orb.position.x) > 3) {
        orb.userData.v.x *= -0.8;
        orb.position.x = Math.sign(orb.position.x) * 3;
      }
      if (Math.abs(orb.position.z) > 2) {
        orb.userData.v.z *= -0.8;
        orb.position.z = Math.sign(orb.position.z) * 2;
      }

      orb.rotation.x += orb.userData.spin.x;
      orb.rotation.y += orb.userData.spin.y;
    });

    renderer.render(scene, camera);
  };

  window.addEventListener("resize", onResize);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  animate();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    renderer.dispose();
  };
}

export async function initResultScene(canvas: HTMLCanvasElement, score: number) {
  const THREE = await loadThree();
  if (!THREE || !canvas.isConnected) {
    return () => {};
  }

  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) {
    return () => {};
  }

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height, false);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 8);
  scene.add(new THREE.AmbientLight(0xffffff, 1));

  const stars: any[] = [];
  const colors = [0x8a7cff, 0x45e3c6, 0xff7bc1, 0xffcf5c, 0x3ee2a5];
  const count = score >= 75 ? 50 : score >= 50 ? 30 : 18;

  for (let index = 0; index < count; index += 1) {
    const geometry =
      Math.random() > 0.5
        ? new THREE.BoxGeometry(0.2, 0.08, 0.02)
        : new THREE.TetrahedronGeometry(0.2);

    const material = new THREE.MeshStandardMaterial({
      color: colors[index % colors.length],
      emissive: colors[index % colors.length],
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.5,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set((Math.random() - 0.5) * 8, 5 + Math.random() * 3, (Math.random() - 0.5) * 2);
    mesh.userData.v = new THREE.Vector3((Math.random() - 0.5) * 0.05, -(0.02 + Math.random() * 0.03), (Math.random() - 0.5) * 0.02);
    mesh.userData.spin = new THREE.Vector3(Math.random() * 0.12, Math.random() * 0.12, Math.random() * 0.12);
    scene.add(mesh);
    stars.push(mesh);
  }

  let frame = 0;
  const animate = () => {
    frame = window.requestAnimationFrame(animate);
    stars.forEach((star) => {
      star.userData.v.y -= 0.002;
      star.position.add(star.userData.v);
      star.rotation.x += star.userData.spin.x;
      star.rotation.y += star.userData.spin.y;
      star.rotation.z += star.userData.spin.z;

      if (star.position.y < -4) {
        star.position.y = 5 + Math.random() * 2;
        star.position.x = (Math.random() - 0.5) * 8;
        star.userData.v.set((Math.random() - 0.5) * 0.05, -(0.02 + Math.random() * 0.03), (Math.random() - 0.5) * 0.02);
      }
    });

    renderer.render(scene, camera);
  };

  animate();

  return () => {
    window.cancelAnimationFrame(frame);
    renderer.dispose();
  };
}

function buildCharacter(THREE: any) {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xffd5b3, roughness: 0.55, metalness: 0 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x2a1f3c, roughness: 0.6 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0x8a7cff, roughness: 0.4, metalness: 0.05, emissive: 0x8a7cff, emissiveIntensity: 0.08 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x2a2f5a, roughness: 0.6 });
  const eyeWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
  const eyeBlack = new THREE.MeshStandardMaterial({ color: 0x0a0d1a, roughness: 0.1 });
  const cheek = new THREE.MeshStandardMaterial({ color: 0xff7bc1, roughness: 0.6, transparent: true, opacity: 0.55 });

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.75, 32, 24), skin);
  head.position.y = 0.8;
  head.scale.set(1, 1.05, 1);
  group.add(head);

  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.78, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55), hairMat);
  hair.position.y = 0.88;
  group.add(hair);

  const tuft = new THREE.Mesh(new THREE.ConeGeometry(0.15, 0.3, 16), hairMat);
  tuft.position.set(0.15, 1.55, 0.35);
  tuft.rotation.z = -0.3;
  group.add(tuft);

  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 16), eyeWhite);
  eyeL.position.set(-0.22, 0.85, 0.62);
  eyeL.scale.set(1, 1.1, 0.6);
  group.add(eyeL);

  const eyeR = eyeL.clone();
  eyeR.position.x = 0.22;
  group.add(eyeR);

  const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 12), eyeBlack);
  pupilL.position.set(-0.22, 0.85, 0.72);
  group.add(pupilL);

  const pupilR = pupilL.clone();
  pupilR.position.x = 0.22;
  group.add(pupilR);

  const shineMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const shineL = new THREE.Mesh(new THREE.SphereGeometry(0.018, 8, 8), shineMaterial);
  shineL.position.set(-0.2, 0.88, 0.77);
  group.add(shineL);

  const shineR = shineL.clone();
  shineR.position.x = 0.24;
  group.add(shineR);

  const cheekL = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), cheek);
  cheekL.position.set(-0.36, 0.68, 0.58);
  cheekL.scale.set(1, 0.6, 0.3);
  group.add(cheekL);

  const cheekR = cheekL.clone();
  cheekR.position.x = 0.36;
  group.add(cheekR);

  const smile = new THREE.Mesh(
    new THREE.TorusGeometry(0.14, 0.025, 8, 20, Math.PI),
    new THREE.MeshStandardMaterial({ color: 0x5a2a3c }),
  );
  smile.position.set(0, 0.6, 0.63);
  smile.rotation.z = Math.PI;
  group.add(smile);

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.45, 0.7, 8, 16), shirtMat);
  body.position.y = -0.2;
  group.add(body);

  const armGeometry = new THREE.CapsuleGeometry(0.14, 0.55, 6, 12);
  const armL = new THREE.Mesh(armGeometry, shirtMat);
  armL.position.set(-0.55, -0.05, 0);
  armL.rotation.z = 0.4;
  group.add(armL);

  const armR = armL.clone();
  armR.position.x = 0.55;
  armR.rotation.z = -0.4;
  group.add(armR);

  const handL = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 12), skin);
  handL.position.set(-0.78, -0.42, 0);
  group.add(handL);

  const handR = handL.clone();
  handR.position.x = 0.78;
  group.add(handR);

  const book = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.6, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x45e3c6, roughness: 0.4, emissive: 0x45e3c6, emissiveIntensity: 0.15 }),
  );
  book.position.set(0.82, -0.35, 0.25);
  book.rotation.z = -0.2;
  group.add(book);

  const page = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.54, 0.02),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
  );
  page.position.set(0.82, -0.35, 0.31);
  page.rotation.z = -0.2;
  group.add(page);

  const legGeometry = new THREE.CapsuleGeometry(0.17, 0.55, 6, 12);
  const legL = new THREE.Mesh(legGeometry, pantsMat);
  legL.position.set(-0.22, -0.95, 0);
  group.add(legL);

  const legR = legL.clone();
  legR.position.x = 0.22;
  group.add(legR);

  const glassesMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, roughness: 0.3, metalness: 0.7 });
  const frameL = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.02, 8, 20), glassesMaterial);
  frameL.position.set(-0.22, 0.85, 0.68);
  group.add(frameL);

  const frameR = frameL.clone();
  frameR.position.x = 0.22;
  group.add(frameR);

  const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.12, 6), glassesMaterial);
  bridge.position.set(0, 0.85, 0.68);
  bridge.rotation.z = Math.PI / 2;
  group.add(bridge);

  group.userData.parts = { head, armL, armR, book, page, body, legL, legR };
  group.userData.eyeL = eyeL;
  group.userData.eyeR = eyeR;
  group.position.y = -0.6;

  return group;
}
