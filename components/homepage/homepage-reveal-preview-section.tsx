"use client";

import { trackCtaClicked } from "@/lib/analytics";

const EXAMPLE_RESULTS = [
  {
    emoji: "👑",
    role: "Main Character",
    name: "Emma",
    votes: 7,
    featured: true,
  },
  {
    emoji: "🔥",
    role: "Chaos Agent",
    name: "Mike",
    votes: 5,
    featured: false,
  },
  {
    emoji: "💀",
    role: "Secret Villain",
    name: "Alex",
    votes: 4,
    featured: false,
  },
  {
    emoji: "🎭",
    role: "Most Likely To Start Drama",
    name: "Sarah",
    votes: 6,
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
      className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
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
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Group results
                </p>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                  Unlocked
                </span>
              </div>
            </div>

            <ul className="space-y-3 p-4 sm:p-5">
              {EXAMPLE_RESULTS.map((result) => (
                <li key={result.role}>
                  <article
                    className={
                      result.featured
                        ? "rounded-xl border border-violet-400/40 bg-gradient-to-br from-violet-600/25 via-fuchsia-600/10 to-cyan-600/10 p-4"
                        : "rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                          <span aria-hidden="true">{result.emoji}</span>
                          <span>{result.role}</span>
                        </p>
                        <p className="mt-1 truncate text-lg font-semibold text-white">
                          {result.name}
                        </p>
                      </div>
                      <span
                        className={
                          result.featured
                            ? "shrink-0 rounded-full border border-violet-400/30 bg-violet-500/15 px-2.5 py-1 text-xs font-semibold text-violet-100"
                            : "shrink-0 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-400"
                        }
                      >
                        {result.votes} votes
                      </span>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Names are examples. Your group creates the chaos.
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => {
                trackCtaClicked({ location: "bottom_start" });
                scrollToCreateGame();
              }}
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 transition duration-200 hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white"
            >
              Start your own game
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
