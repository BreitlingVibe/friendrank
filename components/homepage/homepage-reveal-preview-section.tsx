"use client";

import { trackCtaClicked } from "@/lib/analytics";

const REVEALED_RESULTS = [
  {
    emoji: "👑",
    role: "Main Character",
    name: "Emma",
    featured: true,
  },
  {
    emoji: "🔥",
    role: "Chaos Agent",
    name: "Mike",
    featured: false,
  },
] as const;

function scrollToCreateGame() {
  document.getElementById("create-game")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function HomepageRevealPreviewSection() {
  return (
    <section
      id="reveal-preview"
      aria-labelledby="reveal-preview-heading"
      className="border-t border-white/5 bg-white/[0.02] pt-20 pb-16 sm:pt-24 sm:pb-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-center sm:mb-12">
          <h2
            id="reveal-preview-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            See what your group reveals
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Vote anonymously, then reveal the roles everyone will talk about.
          </p>
        </div>

        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-xl shadow-violet-500/5 backdrop-blur-sm">
            <div className="border-b border-white/5 bg-slate-900/80 px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-slate-400">
                  Everyone voted
                </p>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-200">
                  Results ready
                </span>
              </div>
            </div>

            <ul className="space-y-3 p-4 sm:p-5">
              {REVEALED_RESULTS.map((result) => (
                <li key={result.role}>
                  <article
                    className={
                      result.featured
                        ? "rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/25 via-fuchsia-600/10 to-cyan-600/10 p-4"
                        : "rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    }
                  >
                    <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                      <span aria-hidden="true">{result.emoji}</span>
                      <span>{result.role}</span>
                    </p>
                    <p className="mt-1 truncate text-lg font-semibold text-white">
                      {result.name}
                    </p>
                  </article>
                </li>
              ))}

              <li>
                <article
                  aria-hidden="true"
                  className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-4"
                >
                  <p className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>🔒</span>
                    <span>More results waiting...</span>
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="h-2.5 rounded bg-white/[0.06]" />
                    <div className="h-2.5 w-4/5 rounded bg-white/[0.04]" />
                    <div className="h-2.5 w-3/5 rounded bg-white/[0.03]" />
                  </div>
                  <p className="mt-3 text-center text-xs text-slate-500">
                    Reveal with your group
                  </p>
                </article>
              </li>
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Every reveal is unique to your group.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                trackCtaClicked({ location: "bottom_start" });
                scrollToCreateGame();
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
            >
              Reveal your group
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
