
import { ArrowRight, Bot, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    title: "QuizForge Studio",
    description: "Quiz workspace, upload a PDF, and generate a polished practice flow.",
    href: "/quizforge.html",
    label: "Open QuizForge",
    icon: FileText,
  },
  {
    title: "AI Chat",
    description: "Live Guidance from our AI",
    href: "/chat",
    label: "Open Chat",
    icon: Bot,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4efe6] text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#f7f1e8_0%,_#f0e6d8_52%,_#efe7dc_100%)]" />
      <div className="absolute inset-x-0 top-0 h-72 bg-[linear-gradient(135deg,rgba(15,23,42,0.08),transparent)]" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between rounded-full border border-black/10 bg-white/65 px-5 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-slate-500">Educational AI</p>
            <h1 className="font-['Georgia'] text-xl font-semibold tracking-tight text-slate-900">Ed AI Interface</h1>
          </div>
          <a
            href="/quizforge.html"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Launch QuizForge
          </a>
        </header>

        <section className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-amber-700/15 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <Sparkles className="h-4 w-4 text-rose-500" />
              Welcome to QuizForge
            </div>

            <h2 className="max-w-3xl font-['Georgia'] text-5xl leading-[0.95] font-semibold tracking-tight text-slate-950 sm:text-6xl">
              Turn dense study material into a polished, clickable learning flow.
            </h2>

            {/* <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
              The landing page lives at <span className="font-semibold text-slate-900">`/`</span>. Your main
              website interface lives at <span className="font-semibold text-slate-900">`/quizforge.html`</span>.
              The React app also exposes <span className="font-semibold text-slate-900">`/chat`</span>, and all of
              it now works cleanly with Vercel routing.
            </p> */}

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/quizforge.html"
                className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(244,63,94,0.28)] transition hover:-translate-y-0.5 hover:bg-rose-400"
              >
                Let's get started
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-900 hover:bg-white"
              >
                Start Chatting
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 h-24 w-24 rounded-full bg-sky-300/40 blur-2xl" />
            <div className="absolute -right-4 bottom-12 h-32 w-32 rounded-full bg-rose-300/40 blur-3xl" />
            <div className="relative space-y-5 rounded-[2rem] border border-black/10 bg-slate-950 p-5 text-white shadow-[0_20px_70px_rgba(15,23,42,0.28)]">
              <div className="rounded-[1.5rem] bg-gradient-to-br from-rose-400 via-amber-200 to-sky-300 p-[1px]">
                <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/95 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Primary flow</p>
                  <h3 className="mt-3 font-['Georgia'] text-3xl font-semibold">QuizForge</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {/* Static HTML entry page with its own UI, served directly by Vercel from `public/quizforge.html`. */}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <a
                      key={feature.title}
                      href={feature.href}
                      className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-white/25 hover:bg-white/8"
                    >
                      <Icon className="h-6 w-6 text-amber-300" />
                      <h4 className="mt-4 text-lg font-semibold">{feature.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-300">
                        {feature.label}
                        <ArrowRight className="h-4 w-4" />
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
