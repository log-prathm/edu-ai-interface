export const QUIZFORGE_STORAGE_KEY = "quizforge_v1";

export type QuizPage = "home" | "history" | "reports" | "profile" | "quiz" | "result";
export type QuizTopic = "Biology" | "History" | "Tech" | "Finance" | "General";

export interface QuizDocument {
  id: string;
  name: string;
  size: string;
  date: string;
  pages: number;
  color: number;
  quizzes: number;
  topic: QuizTopic;
}

export interface QuizQuestion {
  q: string;
  a: string[];
  c: number;
}

export interface QuizReportQuestion extends QuizQuestion {
  picked: number | null;
}

export interface QuizReport {
  id: string;
  docId: string;
  doc: string;
  score: number;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  time?: number;
  date: string;
  questions?: QuizReportQuestion[];
}

export interface QuizSession {
  docId: string;
  doc: string;
  questions: QuizQuestion[];
  idx: number;
  answers: Array<number | null>;
  started: number;
}

export interface QuizForgeState {
  docs: QuizDocument[];
  reports: QuizReport[];
}

export const initialQuizForgeState: QuizForgeState = {
  docs: [
    {
      id: "d1",
      name: "Biology_Chapter_7_Photosynthesis.pdf",
      size: "2.4 MB",
      date: "Apr 18, 2026",
      pages: 14,
      color: 0,
      quizzes: 3,
      topic: "Biology",
    },
    {
      id: "d2",
      name: "World_History_WWII_Overview.pdf",
      size: "4.1 MB",
      date: "Apr 15, 2026",
      pages: 22,
      color: 1,
      quizzes: 2,
      topic: "History",
    },
    {
      id: "d3",
      name: "Intro_to_Machine_Learning.pdf",
      size: "6.8 MB",
      date: "Apr 10, 2026",
      pages: 38,
      color: 2,
      quizzes: 4,
      topic: "Tech",
    },
    {
      id: "d4",
      name: "Financial_Markets_Quarterly.pdf",
      size: "1.9 MB",
      date: "Apr 02, 2026",
      pages: 18,
      color: 3,
      quizzes: 1,
      topic: "Finance",
    },
  ],
  reports: [
    {
      id: "r1",
      docId: "d1",
      doc: "Biology_Chapter_7_Photosynthesis.pdf",
      score: 90,
      total: 10,
      correct: 9,
      wrong: 1,
      skipped: 0,
      date: "Apr 18, 2026",
    },
    {
      id: "r2",
      docId: "d3",
      doc: "Intro_to_Machine_Learning.pdf",
      score: 70,
      total: 10,
      correct: 7,
      wrong: 3,
      skipped: 0,
      date: "Apr 11, 2026",
    },
    {
      id: "r3",
      docId: "d2",
      doc: "World_History_WWII_Overview.pdf",
      score: 80,
      total: 10,
      correct: 8,
      wrong: 2,
      skipped: 0,
      date: "Apr 16, 2026",
    },
  ],
};

export const quizBank: Record<QuizTopic, QuizQuestion[]> = {
  Biology: [
    { q: "What is the primary pigment involved in photosynthesis?", a: ["Hemoglobin", "Chlorophyll", "Melanin", "Carotene"], c: 1 },
    { q: "In which organelle does photosynthesis occur?", a: ["Mitochondria", "Nucleus", "Chloroplast", "Ribosome"], c: 2 },
    { q: "Which gas is released as a byproduct of photosynthesis?", a: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], c: 2 },
    { q: "The Calvin cycle takes place in the...", a: ["Thylakoid membrane", "Stroma", "Cell wall", "Cytoplasm"], c: 1 },
    { q: "Which wavelengths are absorbed least by chlorophyll?", a: ["Red", "Blue", "Green", "Violet"], c: 2 },
  ],
  History: [
    { q: "In which year did World War II begin?", a: ["1935", "1939", "1941", "1945"], c: 1 },
    { q: "Which event triggered the US entry into WWII?", a: ["D-Day", "Pearl Harbor attack", "Battle of Britain", "Fall of Paris"], c: 1 },
    { q: "The Normandy invasion is also known as...", a: ["V-E Day", "Operation Barbarossa", "D-Day", "Operation Overlord"], c: 3 },
    { q: "Which country signed the Tripartite Pact in 1940?", a: ["Spain", "USSR", "Japan", "Sweden"], c: 2 },
    { q: "WWII in Europe ended in which month?", a: ["May 1945", "August 1945", "June 1944", "July 1945"], c: 0 },
  ],
  Tech: [
    { q: 'What does "ML" stand for?', a: ["Multi Language", "Machine Learning", "Memory Logic", "Meta Linking"], c: 1 },
    { q: "Supervised learning requires...", a: ["No data", "Labeled data", "Only images", "A GPU"], c: 1 },
    { q: "Which is a type of neural network?", a: ["CNN", "SQL", "HTTP", "SSH"], c: 0 },
    { q: "Overfitting means the model...", a: ["Works great everywhere", "Memorizes the training data", "Needs more CPU", "Compresses data"], c: 1 },
    { q: "Gradient descent is used to...", a: ["Encrypt data", "Optimize parameters", "Store data", "Route packets"], c: 1 },
  ],
  Finance: [
    { q: "A bull market refers to...", a: ["Falling prices", "Rising prices", "Flat prices", "Crashing bonds"], c: 1 },
    { q: "P/E ratio compares price to...", a: ["Earnings", "Equity", "Payroll", "Expenses"], c: 0 },
    { q: "Which is a derivative?", a: ["Stock", "Bond", "Option", "Currency"], c: 2 },
    { q: "Nifty 50 represents companies from which country?", a: ["USA", "UK", "India", "Japan"], c: 2 },
    { q: "Intraday trading means positions are...", a: ["Held for years", "Closed same day", "Never sold", "Held for weeks"], c: 1 },
  ],
  General: [
    { q: "What is the main purpose of this document?", a: ["Entertainment", "To inform and educate", "Fiction", "Marketing"], c: 1 },
    { q: "Which summary best describes the content?", a: ["A novel", "A technical overview", "A recipe", "A diary"], c: 1 },
    { q: "The document most likely targets...", a: ["Children", "Learners and readers", "Athletes", "Traders only"], c: 1 },
    { q: "What structure is commonly used?", a: ["Free verse", "Sections and chapters", "Recipes", "Maps"], c: 1 },
    { q: "The overall tone is...", a: ["Humorous", "Informative", "Angry", "Romantic"], c: 1 },
  ],
};

export function loadQuizForgeState(): QuizForgeState {
  if (typeof window === "undefined") {
    return initialQuizForgeState;
  }

  try {
    const raw = window.localStorage.getItem(QUIZFORGE_STORAGE_KEY);
    if (!raw) {
      return initialQuizForgeState;
    }

    const parsed = JSON.parse(raw) as Partial<QuizForgeState> | null;
    if (!parsed || !Array.isArray(parsed.docs) || !Array.isArray(parsed.reports)) {
      return initialQuizForgeState;
    }

    return {
      docs: parsed.docs as QuizDocument[],
      reports: parsed.reports as QuizReport[],
    };
  } catch {
    return initialQuizForgeState;
  }
}

export function saveQuizForgeState(state: QuizForgeState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(QUIZFORGE_STORAGE_KEY, JSON.stringify(state));
}

export function getReportTier(score: number) {
  if (score >= 80) return "hi";
  if (score >= 60) return "mid";
  return "lo";
}

export function getResultCopy(score: number) {
  if (score >= 90) {
    return ["Outstanding!", "You crushed it."] as const;
  }
  if (score >= 75) {
    return ["Great job!", "Solid performance."] as const;
  }
  if (score >= 50) {
    return ["Nice effort!", "A little more practice and you'll ace it."] as const;
  }
  return ["Keep going!", "Review and try again - you've got this."] as const;
}

export function getAverageScore(reports: QuizReport[]) {
  if (!reports.length) {
    return 0;
  }

  return Math.round(reports.reduce((sum, report) => sum + report.score, 0) / reports.length);
}

export function createUploadedDocument(file: File): QuizDocument {
  const topics: QuizTopic[] = ["Biology", "History", "Tech", "Finance", "General"];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  return {
    id: `d${Date.now()}`,
    name: file.name,
    size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    date: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    pages: 5 + Math.floor(Math.random() * 30),
    color: Math.floor(Math.random() * 4),
    quizzes: 0,
    topic,
  };
}
