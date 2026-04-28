import { useEffect, useRef, useState } from "react";
import {
  createUploadedDocument,
  loadQuizForgeState,
  quizBank,
  saveQuizForgeState,
  type QuizPage,
  type QuizQuestion,
  type QuizReport,
  type QuizSession,
} from "../components/quizforge/quizForgeData";
import { initBackgroundCanvas, initHeroScene, initResultScene } from "../components/quizforge/quizForgeAnimations";
import { quizForgeStyles } from "../components/quizforge/quizForgeStyles";
import {
  DocumentsSection,
  HomeSection,
  ProfileSection,
  QuizForgeNav,
  QuizForgeToast,
  QuizSection,
  ReportsSection,
  ResultSection,
} from "../components/quizforge/QuizForgeSections";

const scoreCircumference = 2 * Math.PI * 80;

export default function QuizForge() {
  const [{ docs, reports }, setStoredState] = useState(loadQuizForgeState);
  const [page, setPage] = useState<QuizPage>("home");
  const [quiz, setQuiz] = useState<QuizSession | null>(null);
  const [activeReport, setActiveReport] = useState<QuizReport | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [ringOffset, setRingOffset] = useState(scoreCircumference);

  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLButtonElement | null>(null);
  const uploadIntervalRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "QuizForge - Turn any PDF into a quiz";
    document.body.classList.add("quizforge-body");

    return () => {
      document.title = previousTitle;
      document.body.classList.remove("quizforge-body");
    };
  }, []);

  useEffect(() => {
    saveQuizForgeState({ docs, reports });
  }, [docs, reports]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) {
      return;
    }

    return initBackgroundCanvas(canvas);
  }, []);

  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) {
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    initHeroScene(canvas).then((dispose) => {
      if (cancelled) {
        dispose();
        return;
      }
      cleanup = dispose;
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (page !== "result" || !activeReport || !resultCanvasRef.current) {
      return;
    }

    setRingOffset(scoreCircumference);
    const timeout = window.setTimeout(() => {
      setRingOffset(scoreCircumference * (1 - activeReport.score / 100));
    }, 120);

    let cleanup = () => {};
    let cancelled = false;

    initResultScene(resultCanvasRef.current, activeReport.score).then((dispose) => {
      if (cancelled) {
        dispose();
        return;
      }
      cleanup = dispose;
    });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      cleanup();
    };
  }, [activeReport, page]);

  useEffect(() => {
    return clearTimers;
  }, []);

  function registerTimeout(timeout: number) {
    timeoutRefs.current.push(timeout);
  }

  function clearTimers() {
    if (uploadIntervalRef.current !== null) {
      window.clearInterval(uploadIntervalRef.current);
    }
    timeoutRefs.current.forEach((timeout) => window.clearTimeout(timeout));
  }

  function showToast(message: string) {
    setToastMessage(message);
    setToastVisible(true);

    const timeout = window.setTimeout(() => {
      setToastVisible(false);
    }, 2600);

    registerTimeout(timeout);
  }

  function navigate(nextPage: QuizPage) {
    setPage(nextPage);
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) {
      return;
    }

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      showToast("Only PDF files are supported");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      showToast("File too large (max 25 MB)");
      return;
    }

    setUploadProgress(0);
    if (uploadIntervalRef.current !== null) {
      window.clearInterval(uploadIntervalRef.current);
    }

    uploadIntervalRef.current = window.setInterval(() => {
      setUploadProgress((previous) => {
        const next = previous + 8 + Math.random() * 10;
        if (next >= 100) {
          if (uploadIntervalRef.current !== null) {
            window.clearInterval(uploadIntervalRef.current);
            uploadIntervalRef.current = null;
          }

          finishUpload(file);
          return 100;
        }

        return next;
      });
    }, 140);
  }

  function finishUpload(file: File) {
    const uploadedDocument = createUploadedDocument(file);
    setStoredState((previous) => ({
      ...previous,
      docs: [uploadedDocument, ...previous.docs],
    }));

    showToast("PDF uploaded! Generating quiz...");

    const timeout = window.setTimeout(() => {
      setUploadProgress(0);
      // navigate("history");
      const startTimeout = window.setTimeout(() => {
        // startQuiz(uploadedDocument.id, uploadedDocument.name);
      }, 400);
      registerTimeout(startTimeout);
    }, 700);

    registerTimeout(timeout);
  }

  function startQuiz(docId: string, fallbackName?: string) {
    const doc = docs.find((item) => item.id === docId);
    if (!doc && !fallbackName) {
      showToast("Document not found");
      return;
    }

    const topic = doc?.topic ?? "General";
    const questions = (quizBank[topic] || quizBank.General).map((question) => ({ ...question }));

    setQuiz({
      docId,
      doc: doc?.name ?? fallbackName ?? "Untitled.pdf",
      questions,
      idx: 0,
      answers: new Array(questions.length).fill(null),
      started: Date.now(),
    });
    setPage("quiz");
  }

  function selectAnswer(answerIndex: number) {
    setQuiz((current) => {
      if (!current) {
        return current;
      }

      const answers = [...current.answers];
      answers[current.idx] = answerIndex;

      return {
        ...current,
        answers,
      };
    });
  }

  function goToNextQuestion() {
    setQuiz((current) => {
      if (!current) {
        return current;
      }

      if (current.idx < current.questions.length - 1) {
        return {
          ...current,
          idx: current.idx + 1,
        };
      }

      finishQuiz(current);
      return current;
    });
  }

  function skipQuestion() {
    setQuiz((current) => {
      if (!current) {
        return current;
      }

      const answers = [...current.answers];
      answers[current.idx] = null;

      if (current.idx < current.questions.length - 1) {
        return {
          ...current,
          answers,
          idx: current.idx + 1,
        };
      }

      const nextQuiz = {
        ...current,
        answers,
      };
      finishQuiz(nextQuiz);
      return nextQuiz;
    });
  }

  function finishQuiz(currentQuiz: QuizSession) {
    const elapsed = Math.round((Date.now() - currentQuiz.started) / 1000);
    let correct = 0;
    let wrong = 0;
    let skipped = 0;

    currentQuiz.questions.forEach((question, index) => {
      const picked = currentQuiz.answers[index];
      if (picked === null) {
        skipped += 1;
      } else if (picked === question.c) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const report: QuizReport = {
      id: `r${Date.now()}`,
      docId: currentQuiz.docId,
      doc: currentQuiz.doc,
      score: Math.round((correct / currentQuiz.questions.length) * 100),
      total: currentQuiz.questions.length,
      correct,
      wrong,
      skipped,
      time: elapsed,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      questions: currentQuiz.questions.map((question, index) => ({
        q: question.q,
        a: question.a,
        c: question.c,
        picked: currentQuiz.answers[index],
      })),
    };

    setStoredState((previous) => ({
      docs: previous.docs.map((doc) =>
        doc.id === currentQuiz.docId
          ? {
              ...doc,
              quizzes: (doc.quizzes || 0) + 1,
            }
          : doc,
      ),
      reports: [...previous.reports, report],
    }));

    setActiveReport(report);
    setPage("result");
  }

  function viewReport(reportId: string) {
    const report = reports.find((item) => item.id === reportId);
    if (!report) {
      return;
    }

    setActiveReport(report);
    setPage("result");
  }

  function handleFileInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  function handleDragEnter(event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }

  function handleDragLeave(event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (event.target !== dropZoneRef.current) {
      return;
    }

    setIsDragOver(false);
  }

  function handleDragOver(event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(true);
  }

  function handleDrop(event: React.DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
    handleFiles(event.dataTransfer.files);
  }

  function handleDropZoneMouseMove(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  function retryQuiz() {
    if (!activeReport) {
      return;
    }
    startQuiz(activeReport.docId, activeReport.doc);
  }

  const currentQuestion: QuizQuestion | null = quiz ? quiz.questions[quiz.idx] : null;
  const selectedAnswer = quiz ? quiz.answers[quiz.idx] : null;

  return (
    <>
      <style>{quizForgeStyles}</style>
      <div className="quizforge-page">
        <canvas ref={bgCanvasRef} id="bg-canvas" aria-hidden="true" />

        <QuizForgeNav activePage={page} onNavigate={navigate} />

        <div className="container">
          {page === "home" ? (
            <HomeSection
              uploadProgress={uploadProgress}
              isDragOver={isDragOver}
              fileInputRef={fileInputRef}
              heroCanvasRef={heroCanvasRef}
              dropZoneRef={dropZoneRef}
              onFileChange={handleFileInputChange}
              onOpenFilePicker={openFilePicker}
              onNavigate={navigate}
              onDrop={handleDrop}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onMouseMove={handleDropZoneMouseMove}
            />
          ) : null}

          {page === "history" ? (
            <DocumentsSection docs={docs} onNavigate={navigate} onOpenFilePicker={openFilePicker} onStartQuiz={startQuiz} />
          ) : null}

          {page === "reports" ? <ReportsSection reports={reports} onViewReport={viewReport} /> : null}

          {page === "profile" ? <ProfileSection docs={docs} reports={reports} /> : null}

          {page === "quiz" && quiz && currentQuestion ? (
            <QuizSection
              question={currentQuestion}
              questionIndex={quiz.idx}
              totalQuestions={quiz.questions.length}
              selectedAnswer={selectedAnswer}
              onBack={() => navigate("history")}
              onSelectAnswer={selectAnswer}
              onSkip={skipQuestion}
              onNext={goToNextQuestion}
            />
          ) : null}

          {page === "result" && activeReport ? (
            <ResultSection
              report={activeReport}
              ringOffset={ringOffset}
              resultCanvasRef={resultCanvasRef}
              onDocuments={() => navigate("history")}
              onRetry={retryQuiz}
            />
          ) : null}
        </div>

        {/* <QuizForgeToast message={toastMessage} visible={toastVisible} /> */}
      </div>
    </>
  );
}
