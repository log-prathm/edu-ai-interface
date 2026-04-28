import { Link } from "react-router-dom";
import type { ChangeEvent, DragEvent, MouseEvent, RefObject } from "react";
import type { QuizDocument, QuizPage, QuizQuestion, QuizReport } from "./quizForgeData";
import { getAverageScore, getReportTier, getResultCopy } from "./quizForgeData";

interface NavProps {
  activePage: QuizPage;
  onNavigate: (page: QuizPage) => void;
}

interface HomeSectionProps {
  uploadProgress: number;
  isDragOver: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  heroCanvasRef: RefObject<HTMLCanvasElement | null>;
  dropZoneRef: RefObject<HTMLButtonElement | null>;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onOpenFilePicker: () => void;
  onNavigate: (page: QuizPage) => void;
  onDrop: (event: DragEvent<HTMLButtonElement>) => void;
  onDragEnter: (event: DragEvent<HTMLButtonElement>) => void;
  onDragLeave: (event: DragEvent<HTMLButtonElement>) => void;
  onDragOver: (event: DragEvent<HTMLButtonElement>) => void;
  onMouseMove: (event: MouseEvent<HTMLButtonElement>) => void;
}

interface DocumentsSectionProps {
  docs: QuizDocument[];
  onNavigate: (page: QuizPage) => void;
  onOpenFilePicker: () => void;
  onStartQuiz: (docId: string) => void;
}

interface ReportsSectionProps {
  reports: QuizReport[];
  onViewReport: (reportId: string) => void;
}

interface ProfileSectionProps {
  docs: QuizDocument[];
  reports: QuizReport[];
}

interface QuizSectionProps {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | null;
  onBack: () => void;
  onSelectAnswer: (answerIndex: number) => void;
  onSkip: () => void;
  onNext: () => void;
}

interface ResultSectionProps {
  report: QuizReport;
  ringOffset: number;
  resultCanvasRef: RefObject<HTMLCanvasElement | null>;
  onDocuments: () => void;
  onRetry: () => void;
}

interface ToastProps {
  message: string;
  visible: boolean;
}

const answerKeys = ["A", "B", "C", "D"];

export function QuizForgeNav({ activePage, onNavigate }: NavProps) {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="brand" type="button" onClick={() => onNavigate("home")}>
          <div className="brand-mark">Q</div>
          <div className="brand-name">
            Quiz<span>Forge</span>
          </div>
        </button>

        <div className="nav-tabs" role="tablist">
          {[
            ["home", "Home"],
            ["history", "Documents"],
            ["reports", "Reports"],
            ["profile", "Profile"],
          ].map(([page, label]) => (
            <button
              key={page}
              className={`nav-tab ${activePage === page ? "active" : ""}`}
              type="button"
              onClick={() => onNavigate(page as QuizPage)}
            >
              {label}
            </button>
          ))}
        </div>

        <button className="avatar-btn" type="button" title="Profile" onClick={() => onNavigate("profile")}>
          AS
        </button>
      </div>
    </nav>
  );
}

export function HomeSection({
  uploadProgress,
  isDragOver,
  fileInputRef,
  heroCanvasRef,
  dropZoneRef,
  onFileChange,
  onOpenFilePicker,
  onNavigate,
  onDrop,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onMouseMove,
}: HomeSectionProps) {
  return (
    <section className="page">
      <div className="hero">
        <div>
          <h1>
            Turn any PDF into a <span className="grad">smart quiz</span> in seconds.
          </h1>
          <p>
            Drop a document. Our engine reads it, crafts questions, and gives you a playful, physics-powered quiz
            you'll actually enjoy taking.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary" type="button" onClick={onOpenFilePicker}>
              Upload a PDF
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => onNavigate("history")}>
              See my documents
            </button>
          </div>
        </div>

        <div className="hero-3d">
          <Link to="/chat" className="chat-badge">
            Start Chatting
          </Link>
          <canvas ref={heroCanvasRef} id="hero-canvas" />
          <div className="hero-badges" />
        </div>
      </div>

      <div className="upload-wrap">
        <button
          ref={dropZoneRef}
          className={`upload-zone ${isDragOver ? "dragover" : ""}`}
          type="button"
          onClick={onOpenFilePicker}
          onDrop={onDrop}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onMouseMove={onMouseMove}
        >
          <input ref={fileInputRef} className="file-input" type="file" accept=".pdf,application/pdf" onChange={onFileChange} />
          <div className="upload-icon">
            <svg viewBox="0 0 100 100">
              <defs>
                <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                  <stop offset="0%" stopColor="#8a7cff" />
                  <stop offset="100%" stopColor="#45e3c6" />
                </linearGradient>
              </defs>
              <rect x="22" y="14" width="48" height="62" rx="6" fill="url(#g1)" />
              <rect x="30" y="28" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.8)" />
              <rect x="30" y="36" width="22" height="3" rx="1.5" fill="rgba(255,255,255,0.55)" />
              <rect x="30" y="44" width="26" height="3" rx="1.5" fill="rgba(255,255,255,0.55)" />
              <circle cx="74" cy="72" r="18" fill="#ff7bc1" />
              <path d="M74 63 L74 81 M66 72 L74 63 L82 72" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>
          <h3>Drop your PDF here</h3>
          <p>or click to browse &middot; up to 25 MB</p>
          <div className={`upload-progress ${uploadProgress > 0 ? "show" : ""}`}>
            <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }} />
          </div>
        </button>

        <div className="upload-side">
          <h4>How it works</h4>
          {[
            ["1", "Upload a PDF", "textbooks, notes, reports, papers, anything with text."],
            ["2", "We read & analyze", "key concepts and facts get extracted automatically."],
            ["3", "Take your quiz", "multiple choice, timed, with instant answers."],
            ["4", "Get a report", "detailed scoring, weak spots and retry options."],
          ].map(([step, title, body]) => (
            <div className="step" key={step}>
              <div className="step-num">{step}</div>
              <div className="step-txt">
                <b>{title}</b> &mdash; {body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DocumentsSection({ docs, onNavigate, onOpenFilePicker, onStartQuiz }: DocumentsSectionProps) {
  return (
    <section className="page">
      <div className="section-head">
        <div>
          <h2>Your documents</h2>
          <p>Every PDF you've turned into a quiz, in one place.</p>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => {
            onNavigate("home");
            window.setTimeout(onOpenFilePicker, 300);
          }}
        >
          + New upload
        </button>
      </div>

      {docs.length ? (
        <div className="grid grid-3">
          {docs.map((doc) => (
            <button key={doc.id} className="card card-doc" type="button" onClick={() => onStartQuiz(doc.id)}>
              <div className="doc-head">
                <div className={`doc-icon v${doc.color + 1}`} />
                <div className="doc-info">
                  <div className="doc-title">{doc.name}</div>
                  <div className="doc-meta">
                    {doc.size} &middot; {doc.pages} pages
                  </div>
                </div>
              </div>

              <div className="doc-tags">
                <span className="tag">{doc.topic}</span>
                <span className={`tag ${["green", "pink", "amber"][doc.color % 3]}`}>
                  {doc.quizzes || 0} quiz{(doc.quizzes || 0) === 1 ? "" : "zes"}
                </span>
              </div>

              <div className="doc-stats">
                <span>
                  Uploaded <strong>{doc.date}</strong>
                </span>
                <span style={{ color: "var(--accent-2)" }}>Take quiz &rarr;</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No documents yet</h3>
          <p>Upload a PDF to get started.</p>
        </div>
      )}
    </section>
  );
}

export function ReportsSection({ reports, onViewReport }: ReportsSectionProps) {
  return (
    <section className="page">
      <div className="section-head">
        <div>
          <h2>Quiz reports</h2>
          <p>Scores and performance from every quiz you've taken.</p>
        </div>
      </div>

      {reports.length ? (
        <div className="grid grid-2">
          {[...reports].reverse().map((report) => (
            <button key={report.id} className="card" type="button" onClick={() => onViewReport(report.id)} style={{ cursor: "pointer" }}>
              <div className="doc-head">
                <div className={`doc-icon v${(report.score % 4) + 1}`} />
                <div className="doc-info">
                  <div className="doc-title">{report.doc}</div>
                  <div className="doc-meta">{report.date}</div>
                </div>
                <div className={`ph-score ${getReportTier(report.score)}`}>{report.score}%</div>
              </div>

              <div className="doc-stats">
                <span>
                  <span style={{ color: "var(--success)" }}>&#10003;</span> {report.correct} correct
                </span>
                <span>
                  <span style={{ color: "var(--danger)" }}>&times;</span> {report.wrong} wrong
                </span>
                <span style={{ color: "var(--accent-4)" }}>&darr; {report.skipped || 0} skipped</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No quizzes taken yet</h3>
          <p>Take a quiz to see your report here.</p>
        </div>
      )}
    </section>
  );
}

export function ProfileSection({ docs, reports }: ProfileSectionProps) {
  const recentReports = [...reports].reverse().slice(0, 6);

  return (
    <section className="page">
      <div className="section-head">
        <div>
          <h2>Your profile</h2>
          <p>Track your learning journey.</p>
        </div>
      </div>

      <div className="profile-grid">
        <div className="profile-card">
          <div className="profile-avatar">AS</div>
          <div className="profile-name">Aditya Sharma</div>
          <div className="profile-email">aditya@quizforge.app</div>
          <div className="profile-rank">&#11088; Gold Learner &middot; Level 7</div>
          <div className="profile-stats">
            <div>
              <div className="ps-val">{docs.length}</div>
              <div className="ps-lbl">Documents</div>
            </div>
            <div>
              <div className="ps-val">{reports.length}</div>
              <div className="ps-lbl">Quizzes</div>
            </div>
            <div>
              <div className="ps-val">{getAverageScore(reports)}%</div>
              <div className="ps-lbl">Avg Score</div>
            </div>
          </div>
        </div>

        <div className="profile-side">
          <h4 style={{ marginBottom: 12, fontSize: 16 }}>Recent activity</h4>
          {recentReports.length ? (
            recentReports.map((report) => (
              <div className="ph-item" key={report.id}>
                <div className="ph-left">
                  <div className={`doc-icon v${(report.score % 4) + 1}`} style={{ width: 34, height: 40 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="ph-t">{report.doc}</div>
                    <small>
                      {report.date} &middot; {report.correct}/{report.total} correct
                    </small>
                  </div>
                </div>
                <div className={`ph-score ${getReportTier(report.score)}`}>{report.score}%</div>
              </div>
            ))
          ) : (
            <div className="empty" style={{ padding: 24 }}>
              <p>No activity yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function QuizSection({ question, questionIndex, totalQuestions, selectedAnswer, onBack, onSelectAnswer, onSkip, onNext }: QuizSectionProps) {
  return (
    <section className="page">
      <div className="quiz-wrap">
        <div className="quiz-header">
          <button className="btn btn-ghost" type="button" style={{ padding: "8px 14px", fontSize: 13 }} onClick={onBack}>
            &larr; Back
          </button>
          <div className="quiz-progress">
            <div className="quiz-progress-bar" style={{ width: `${(questionIndex / totalQuestions) * 100}%` }} />
          </div>
          <div className="quiz-count">
            {questionIndex + 1} / {totalQuestions}
          </div>
        </div>

        <div className="quiz-card">
          <div className="q-label">Question {questionIndex + 1}</div>
          <div className="q-text">{question.q}</div>
          <div className="q-options">
            {question.a.map((answer, answerIndex) => (
              <button
                key={answer}
                className={`opt ${selectedAnswer === answerIndex ? "selected" : ""}`}
                type="button"
                onClick={() => onSelectAnswer(answerIndex)}
              >
                <span className="opt-key">{answerKeys[answerIndex]}</span>
                <span>{answer}</span>
              </button>
            ))}
          </div>
          <div className="quiz-foot">
            <button className="btn btn-ghost" type="button" onClick={onSkip}>
              Skip
            </button>
            <button
              className="btn btn-primary"
              type="button"
              onClick={onNext}
              disabled={selectedAnswer === null}
              style={{ opacity: selectedAnswer === null ? 0.5 : 1 }}
            >
              {questionIndex === totalQuestions - 1 ? "Finish →" : "Next →"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ResultSection({ report, ringOffset, resultCanvasRef, onDocuments, onRetry }: ResultSectionProps) {
  const [title, subtitle] = getResultCopy(report.score);

  return (
    <section className="page">
      <div className="quiz-wrap">
        <div className="result-hero">
          <canvas ref={resultCanvasRef} id="result-canvas" />
          <div className="score-ring">
            <svg width="180" height="180" viewBox="0 0 180 180">
              <defs>
                <linearGradient id="ringg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#8a7cff" />
                  <stop offset="50%" stopColor="#45e3c6" />
                  <stop offset="100%" stopColor="#ff7bc1" />
                </linearGradient>
              </defs>
              <circle className="score-ring-bg" cx="90" cy="90" r="80" fill="none" strokeWidth="12" />
              <circle
                className="score-ring-fg"
                cx="90"
                cy="90"
                r="80"
                fill="none"
                stroke="url(#ringg)"
                strokeWidth="12"
                strokeDasharray="502.4"
                strokeDashoffset={ringOffset}
              />
            </svg>
            <div className="score-num">
              <div>
                {report.score}
                <small>Score</small>
              </div>
            </div>
          </div>
          <div className="result-title">{title}</div>
          <div className="result-sub">{subtitle}</div>
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-lbl">Correct</div>
            <div className="stat-val good">{report.correct}</div>
          </div>
          <div className="stat">
            <div className="stat-lbl">Incorrect</div>
            <div className="stat-val bad">{report.wrong}</div>
          </div>
          <div className="stat">
            <div className="stat-lbl">Skipped</div>
            <div className="stat-val warn">{report.skipped || 0}</div>
          </div>
          <div className="stat">
            <div className="stat-lbl">Time</div>
            <div className="stat-val">{report.time || 60}s</div>
          </div>
        </div>

        <div className="section-head" style={{ margin: "20px 0 14px" }}>
          <h2 style={{ fontSize: 18 }}>Review your answers</h2>
        </div>

        <div className="answer-list">
          {report.questions?.length ? (
            report.questions.map((question, index) => {
              const skipped = question.picked === null;
              const correct = question.picked === question.c;
              const pickedLabel = skipped ? "- skipped" : question.a[question.picked ?? 0];

              return (
                <div className="ans" key={`${report.id}-${index}`}>
                  <div className={`ans-mark ${correct && !skipped ? "ok" : "no"}`}>{skipped ? "?" : correct ? "✓" : "✗"}</div>
                  <div className="ans-body">
                    <div className="ans-q">
                      Q{index + 1}. {question.q}
                    </div>
                    <div className="ans-pick">
                      Your answer:{" "}
                      <b style={{ color: correct ? "var(--success)" : "var(--danger)" }}>{pickedLabel}</b>
                      {!correct ? (
                        <>
                          {" "}
                          &middot; Correct: <b style={{ color: "var(--success)" }}>{question.a[question.c]}</b>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty" style={{ padding: 30 }}>
              <p>No question data.</p>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap", justifyContent: "center" }}>
          <button className="btn btn-ghost" type="button" onClick={onDocuments}>
            My documents
          </button>
          <button className="btn btn-primary" type="button" onClick={onRetry}>
            Retake quiz
          </button>
        </div>
      </div>
    </section>
  );
}

export function QuizForgeToast({ message, visible }: ToastProps) {
  return (
    <div className={`toast ${visible ? "show" : ""}`}>
      <span className="dot" />
      <span>{message}</span>
    </div>
  );
}
