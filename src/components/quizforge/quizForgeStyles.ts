export const quizForgeStyles = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

body.quizforge-body {
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  background: #0a0d1a;
  color: #eef1ff;
  overflow-x: hidden;
  line-height: 1.5;
  min-height: 100vh;
  position: relative;
}

body.quizforge-body::before {
  content: "";
  position: fixed;
  inset: 0;
  background:
    radial-gradient(900px 600px at 85% -10%, rgba(138, 124, 255, 0.28), transparent 60%),
    radial-gradient(700px 500px at -10% 110%, rgba(69, 227, 198, 0.22), transparent 60%),
    radial-gradient(600px 400px at 50% 50%, rgba(255, 123, 193, 0.08), transparent 70%),
    linear-gradient(180deg, #0a0d1a, #0a0d1a 40%, #0c1128);
  z-index: -2;
}

.quizforge-page {
  --bg: #0a0d1a;
  --bg-2: #121634;
  --card: rgba(255, 255, 255, 0.05);
  --card-border: rgba(255, 255, 255, 0.12);
  --ink: #eef1ff;
  --ink-dim: #a7adcf;
  --ink-ghost: #6b7299;
  --accent: #8a7cff;
  --accent-2: #45e3c6;
  --accent-3: #ff7bc1;
  --accent-4: #ffcf5c;
  --danger: #ff6b8a;
  --success: #3ee2a5;
  --r-lg: 20px;
  --r-xl: 28px;
  --shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.5);
  min-height: 100vh;
}

.quizforge-page * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

.quizforge-page button,
.quizforge-page input,
.quizforge-page a {
  font: inherit;
}

.quizforge-page a {
  color: inherit;
}

.quizforge-page ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.quizforge-page ::-webkit-scrollbar-track {
  background: transparent;
}

.quizforge-page ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
}

.quizforge-page ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.18);
}

.quizforge-page #bg-canvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  opacity: 0.85;
}

.quizforge-page .nav {
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  background: rgba(10, 13, 26, 0.55);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.quizforge-page .nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 14px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
}

.quizforge-page .brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
  background: transparent;
  border: 0;
  color: inherit;
}

.quizforge-page .brand-mark {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, #8a7cff, #45e3c6);
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  color: #0a0d1a;
  box-shadow: 0 8px 24px -8px rgba(138, 124, 255, 0.6);
  position: relative;
  overflow: hidden;
}

.quizforge-page .brand-mark::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.45), transparent 50%);
}

.quizforge-page .brand-name {
  font-weight: 700;
  letter-spacing: -0.01em;
  font-size: 18px;
}

.quizforge-page .brand-name span {
  color: var(--accent-2);
}

.quizforge-page .nav-tabs {
  display: flex;
  gap: 4px;
  margin-left: auto;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 5px;
  border-radius: 999px;
}

.quizforge-page .nav-tab {
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-dim);
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;
  border: none;
  background: transparent;
}

.quizforge-page .nav-tab:hover {
  color: var(--ink);
}

.quizforge-page .nav-tab.active {
  background: linear-gradient(135deg, rgba(138, 124, 255, 0.9), rgba(69, 227, 198, 0.9));
  color: #0a0d1a;
}

.quizforge-page .avatar-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff7bc1, #ffcf5c);
  border: 2px solid rgba(255, 255, 255, 0.25);
  cursor: pointer;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #0a0d1a;
  font-size: 14px;
  transition: transform 0.2s;
}

.quizforge-page .avatar-btn:hover {
  transform: scale(1.08) rotate(-4deg);
}

.quizforge-page .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 28px 22px 80px;
}

.quizforge-page .page {
  display: block;
  animation: quizforge-fade-up 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}

@keyframes quizforge-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.quizforge-page .hero {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 40px;
  align-items: center;
  min-height: 520px;
  padding: 20px 0 10px;
}

.quizforge-page .hero h1 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: clamp(38px, 6vw, 64px);
  line-height: 1.02;
  letter-spacing: -0.03em;
  font-weight: 700;
  margin-bottom: 18px;
}

.quizforge-page .hero h1 .grad {
  background: linear-gradient(90deg, #8a7cff, #45e3c6, #ff7bc1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 200% 100%;
  animation: quizforge-shimmer 6s ease infinite;
}

@keyframes quizforge-shimmer {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.quizforge-page .hero p {
  font-size: 17px;
  color: var(--ink-dim);
  max-width: 520px;
  margin-bottom: 26px;
}

.quizforge-page .hero-cta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.quizforge-page .btn {
  border: none;
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
  padding: 14px 22px;
  border-radius: 14px;
  font-size: 15px;
  transition: transform 0.15s, box-shadow 0.25s, background 0.25s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.quizforge-page .btn-primary {
  background: linear-gradient(135deg, #8a7cff, #45e3c6);
  color: #0a0d1a;
  box-shadow: 0 10px 30px -10px rgba(138, 124, 255, 0.55);
}

.quizforge-page .btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px -12px rgba(138, 124, 255, 0.75);
}

.quizforge-page .btn-primary:active {
  transform: translateY(0);
}

.quizforge-page .btn-ghost {
  background: rgba(255, 255, 255, 0.06);
  color: var(--ink);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.quizforge-page .btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
}

.quizforge-page .hero-3d {
  position: relative;
  height: 480px;
  border-radius: var(--r-xl);
  background: radial-gradient(ellipse at center, rgba(138, 124, 255, 0.18), transparent 70%);
  overflow: hidden;
}

.quizforge-page #hero-canvas {
  width: 100%;
  height: 100%;
  display: block;
}

.quizforge-page .hero-badges {
  position: absolute;
  bottom: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  pointer-events: none;
}

.quizforge-page .badge {
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(10, 13, 26, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-dim);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.quizforge-page .chat-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  width: 50%;
  height: 50%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 100px;
  background: rgba(10, 13, 26, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 22px;
  font-weight: 600;
  color: var(--ink-dim);
  transition: all 0.3s ease;
  text-decoration: none;
}

.quizforge-page .chat-badge:hover {
  background-color: #0056b3;
  color: #ffffff;
  transform: translate(-50%, -50%) scale(1.05);
}

.quizforge-page .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent-2);
  box-shadow: 0 0 8px var(--accent-2);
}

.quizforge-page .upload-wrap {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 24px;
  margin-top: 40px;
}

.quizforge-page .upload-zone {
  position: relative;
  border: 2px dashed rgba(255, 255, 255, 0.18);
  border-radius: var(--r-xl);
  padding: 44px 28px;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  transition: all 0.3s;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: inherit;
}

.quizforge-page .upload-zone::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(600px 200px at var(--mx, 50%) var(--my, 50%), rgba(138, 124, 255, 0.15), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}

.quizforge-page .upload-zone:hover::before,
.quizforge-page .upload-zone.dragover::before {
  opacity: 1;
}

.quizforge-page .upload-zone.dragover {
  border-color: var(--accent-2);
  background: rgba(69, 227, 198, 0.05);
  transform: scale(1.01);
}

.quizforge-page .upload-icon {
  width: 90px;
  height: 90px;
  margin: 0 auto 18px;
  position: relative;
  animation: quizforge-float 4s ease-in-out infinite;
}

@keyframes quizforge-float {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(-10px) rotate(4deg); }
}

.quizforge-page .upload-icon svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 10px 20px rgba(138, 124, 255, 0.35));
}

.quizforge-page .upload-zone h3 {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: -0.01em;
}

.quizforge-page .upload-zone p {
  color: var(--ink-dim);
  font-size: 14px;
  margin-bottom: 18px;
}

.quizforge-page .file-input {
  display: none;
}

.quizforge-page .upload-side,
.quizforge-page .card,
.quizforge-page .quiz-card,
.quizforge-page .result-hero,
.quizforge-page .stat,
.quizforge-page .answer-list,
.quizforge-page .profile-card,
.quizforge-page .profile-side {
  background: var(--card);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(10px);
}

.quizforge-page .upload-side {
  border-radius: var(--r-xl);
  padding: 24px;
}

.quizforge-page .upload-side h4 {
  font-size: 16px;
  margin-bottom: 14px;
  font-weight: 700;
}

.quizforge-page .step {
  display: flex;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.quizforge-page .step:last-child {
  border: none;
}

.quizforge-page .step-num {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: rgba(138, 124, 255, 0.18);
  color: var(--accent);
  font-family: 'Space Grotesk', sans-serif;
}

.quizforge-page .step-txt {
  font-size: 14px;
  color: var(--ink-dim);
}

.quizforge-page .step-txt b {
  color: var(--ink);
  font-weight: 600;
}

.quizforge-page .upload-progress {
  display: none;
  margin-top: 18px;
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  height: 8px;
  overflow: hidden;
}

.quizforge-page .upload-progress.show {
  display: block;
}

.quizforge-page .upload-progress-bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, #8a7cff, #45e3c6);
  transition: width 0.3s;
  box-shadow: 0 0 20px rgba(138, 124, 255, 0.4);
}

.quizforge-page .toast {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-50%) translateY(-120%);
  background: rgba(20, 24, 45, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 14px 22px;
  border-radius: 14px;
  color: var(--ink);
  font-weight: 600;
  font-size: 14px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: transform 0.4s cubic-bezier(0.2, 1.2, 0.4, 1);
  pointer-events: none;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.7);
}

.quizforge-page .toast.show {
  transform: translateX(-50%) translateY(0);
}

.quizforge-page .toast .dot {
  background: var(--success);
  box-shadow: 0 0 10px var(--success);
}

.quizforge-page .section-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 44px 0 20px;
  gap: 12px;
  flex-wrap: wrap;
}

.quizforge-page .section-head h2,
.quizforge-page .result-title,
.quizforge-page .profile-name {
  font-family: 'Space Grotesk', sans-serif;
}

.quizforge-page .section-head h2 {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.quizforge-page .section-head p {
  color: var(--ink-dim);
  font-size: 14px;
}

.quizforge-page .grid {
  display: grid;
  gap: 18px;
}

.quizforge-page .grid-3 {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.quizforge-page .grid-2 {
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
}

.quizforge-page .card {
  border-radius: var(--r-lg);
  padding: 18px;
  transition: transform 0.25s, border-color 0.25s, background 0.25s;
  position: relative;
  overflow: hidden;
}

.quizforge-page .card:hover {
  transform: translateY(-4px);
  border-color: rgba(138, 124, 255, 0.4);
  background: rgba(255, 255, 255, 0.07);
}

.quizforge-page .card-doc {
  cursor: pointer;
}

.quizforge-page .doc-head {
  display: flex;
  gap: 14px;
  align-items: flex-start;
  margin-bottom: 14px;
}

.quizforge-page .doc-icon {
  width: 52px;
  height: 62px;
  border-radius: 8px;
  flex-shrink: 0;
  background: linear-gradient(160deg, #ff7bc1, #ff5a8c);
  position: relative;
  box-shadow: 0 10px 22px -8px rgba(255, 123, 193, 0.6);
}

.quizforge-page .doc-icon::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background: rgba(255, 255, 255, 0.9);
  clip-path: polygon(0 0, 100% 100%, 100% 0);
}

.quizforge-page .doc-icon::after {
  content: "PDF";
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.quizforge-page .doc-icon.v2 {
  background: linear-gradient(160deg, #8a7cff, #5a4dff);
  box-shadow: 0 10px 22px -8px rgba(138, 124, 255, 0.6);
}

.quizforge-page .doc-icon.v3 {
  background: linear-gradient(160deg, #45e3c6, #2ab39a);
  box-shadow: 0 10px 22px -8px rgba(69, 227, 198, 0.5);
}

.quizforge-page .doc-icon.v4 {
  background: linear-gradient(160deg, #ffcf5c, #ff9c2e);
  box-shadow: 0 10px 22px -8px rgba(255, 207, 92, 0.5);
}

.quizforge-page .doc-info {
  flex: 1;
  min-width: 0;
}

.quizforge-page .doc-title {
  font-weight: 700;
  font-size: 15px;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quizforge-page .doc-meta {
  font-size: 12px;
  color: var(--ink-ghost);
}

.quizforge-page .doc-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.quizforge-page .tag {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(138, 124, 255, 0.15);
  color: #c9c0ff;
  font-weight: 600;
}

.quizforge-page .tag.green {
  background: rgba(69, 227, 198, 0.15);
  color: #9af4de;
}

.quizforge-page .tag.pink {
  background: rgba(255, 123, 193, 0.15);
  color: #ffb6d8;
}

.quizforge-page .tag.amber {
  background: rgba(255, 207, 92, 0.18);
  color: #ffdb8c;
}

.quizforge-page .doc-stats {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--ink-dim);
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.quizforge-page .doc-stats strong {
  color: var(--ink);
  font-weight: 700;
}

.quizforge-page .quiz-wrap {
  max-width: 780px;
  margin: 0 auto;
}

.quizforge-page .quiz-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  gap: 14px;
}

.quizforge-page .quiz-progress {
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
}

.quizforge-page .quiz-progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #8a7cff, #45e3c6);
  width: 0%;
  transition: width 0.5s;
  box-shadow: 0 0 12px rgba(138, 124, 255, 0.5);
}

.quizforge-page .quiz-count {
  font-weight: 700;
  font-size: 14px;
  color: var(--ink-dim);
  min-width: 60px;
  text-align: right;
}

.quizforge-page .quiz-card {
  border-radius: var(--r-xl);
  padding: 34px;
  box-shadow: var(--shadow);
  position: relative;
  overflow: hidden;
}

.quizforge-page .q-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-2);
  margin-bottom: 12px;
}

.quizforge-page .q-text {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 26px;
  letter-spacing: -0.01em;
}

.quizforge-page .q-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quizforge-page .opt {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 14px 18px;
  cursor: pointer;
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: all 0.2s;
  color: var(--ink);
  text-align: left;
  width: 100%;
}

.quizforge-page .opt:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(138, 124, 255, 0.4);
  transform: translateX(4px);
}

.quizforge-page .opt-key {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  flex-shrink: 0;
  background: rgba(138, 124, 255, 0.18);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 13px;
  font-family: 'Space Grotesk', sans-serif;
}

.quizforge-page .opt.selected {
  background: rgba(138, 124, 255, 0.18);
  border-color: var(--accent);
}

.quizforge-page .opt.selected .opt-key {
  background: var(--accent);
  color: #0a0d1a;
}

.quizforge-page .quiz-foot {
  display: flex;
  justify-content: space-between;
  margin-top: 22px;
}

.quizforge-page .result-hero {
  border-radius: var(--r-xl);
  padding: 30px;
  text-align: center;
  position: relative;
  overflow: hidden;
  margin-bottom: 24px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.quizforge-page #result-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.quizforge-page .score-ring {
  width: 180px;
  height: 180px;
  position: relative;
  margin: 0 auto 14px;
  z-index: 2;
}

.quizforge-page .score-ring svg {
  transform: rotate(-90deg);
}

.quizforge-page .score-ring-bg {
  stroke: rgba(255, 255, 255, 0.08);
}

.quizforge-page .score-ring-fg {
  stroke-linecap: round;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.quizforge-page .score-num {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 48px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.quizforge-page .score-num small {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: var(--ink-dim);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: 2px;
}

.quizforge-page .result-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 6px;
  z-index: 2;
}

.quizforge-page .result-sub {
  color: var(--ink-dim);
  max-width: 440px;
  z-index: 2;
}

.quizforge-page .stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.quizforge-page .stat {
  border-radius: var(--r-lg);
  padding: 18px;
}

.quizforge-page .stat-lbl {
  font-size: 12px;
  color: var(--ink-dim);
  font-weight: 600;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.quizforge-page .stat-val {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.quizforge-page .stat-val.good {
  color: var(--success);
}

.quizforge-page .stat-val.bad {
  color: var(--danger);
}

.quizforge-page .stat-val.warn {
  color: var(--accent-4);
}

.quizforge-page .answer-list {
  border-radius: var(--r-lg);
  padding: 8px;
}

.quizforge-page .ans {
  display: flex;
  gap: 14px;
  padding: 14px 16px;
  border-radius: 10px;
  align-items: flex-start;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.quizforge-page .ans:last-child {
  border: none;
}

.quizforge-page .ans-mark {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  font-weight: 800;
  font-size: 14px;
}

.quizforge-page .ans-mark.ok {
  background: rgba(62, 226, 165, 0.18);
  color: var(--success);
}

.quizforge-page .ans-mark.no {
  background: rgba(255, 107, 138, 0.18);
  color: var(--danger);
}

.quizforge-page .ans-body {
  flex: 1;
}

.quizforge-page .ans-q {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
}

.quizforge-page .ans-pick {
  font-size: 13px;
  color: var(--ink-dim);
}

.quizforge-page .profile-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}

.quizforge-page .profile-card {
  border-radius: var(--r-xl);
  padding: 28px;
  text-align: center;
}

.quizforge-page .profile-avatar {
  width: 110px;
  height: 110px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff7bc1, #ffcf5c);
  display: grid;
  place-items: center;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 42px;
  font-weight: 700;
  color: #0a0d1a;
  box-shadow: 0 20px 50px -15px rgba(255, 123, 193, 0.5);
  position: relative;
  animation: quizforge-avatar-bob 5s ease-in-out infinite;
}

@keyframes quizforge-avatar-bob {
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-6px) rotate(2deg); }
}

.quizforge-page .profile-name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.quizforge-page .profile-email {
  color: var(--ink-dim);
  font-size: 13px;
  margin-bottom: 18px;
}

.quizforge-page .profile-rank {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  padding: 6px 14px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(138, 124, 255, 0.22), rgba(69, 227, 198, 0.22));
  border: 1px solid rgba(138, 124, 255, 0.35);
  font-size: 12px;
  font-weight: 700;
  color: #d5cfff;
  margin-bottom: 22px;
}

.quizforge-page .profile-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.quizforge-page .ps-val {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 22px;
  font-weight: 700;
}

.quizforge-page .ps-lbl {
  font-size: 11px;
  color: var(--ink-dim);
  margin-top: 2px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.quizforge-page .profile-side {
  border-radius: var(--r-xl);
  padding: 26px;
}

.quizforge-page .ph-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  gap: 12px;
}

.quizforge-page .ph-item:last-child {
  border: none;
}

.quizforge-page .ph-left {
  display: flex;
  gap: 12px;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.quizforge-page .ph-left small {
  display: block;
  color: var(--ink-ghost);
  font-size: 12px;
  margin-top: 2px;
}

.quizforge-page .ph-left .ph-t {
  font-weight: 600;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quizforge-page .ph-score {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 700;
  font-size: 16px;
  padding: 4px 12px;
  border-radius: 8px;
}

.quizforge-page .ph-score.hi {
  background: rgba(62, 226, 165, 0.16);
  color: var(--success);
}

.quizforge-page .ph-score.mid {
  background: rgba(255, 207, 92, 0.18);
  color: var(--accent-4);
}

.quizforge-page .ph-score.lo {
  background: rgba(255, 107, 138, 0.16);
  color: var(--danger);
}

.quizforge-page .empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--ink-dim);
  border: 2px dashed rgba(255, 255, 255, 0.08);
  border-radius: var(--r-xl);
}

.quizforge-page .empty h3 {
  color: var(--ink);
  margin-bottom: 6px;
  font-size: 18px;
}

@media (max-width: 860px) {
  .quizforge-page .hero {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .quizforge-page .hero-3d {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    height: auto !important;
    min-height: 100px;
    padding: 40px 0;
    order: -1;
  }

  .quizforge-page .chat-badge {
    position: relative !important;
    top: auto !important;
    left: auto !important;
    transform: none !important;
    width: 220px !important;
    height: 100px !important;
    margin: 10px 0 !important;
    display: flex !important;
    align-items: center;
    justify-content: center;
    order: 1;
  }

  .quizforge-page .chat-badge:hover {
    transform: scale(1.05) !important;
  }

  .quizforge-page #hero-canvas {
    order: 1;
    position: relative !important;
    max-height: 50px;
  }

  .quizforge-page .hero-badges {
    order: 3;
    position: relative !important;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .quizforge-page .upload-wrap,
  .quizforge-page .profile-grid {
    grid-template-columns: 1fr;
  }

  .quizforge-page .nav-tabs {
    order: 10;
    width: 100%;
    justify-content: center;
    overflow-x: auto;
  }

  .quizforge-page .nav-inner {
    flex-wrap: wrap;
  }

  .quizforge-page .q-text {
    font-size: 18px;
  }

  .quizforge-page .quiz-card {
    padding: 22px;
  }

  .quizforge-page .container {
    padding: 20px 16px 60px;
  }
}

@media (max-width: 480px) {
  .quizforge-page .nav-tab {
    padding: 8px 12px;
    font-size: 12px;
  }

  .quizforge-page .brand-name {
    font-size: 16px;
  }
}
`;
