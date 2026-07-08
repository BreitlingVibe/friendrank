"use client";

import { HomepageFaqSection } from "@/components/homepage-faq-section";
import { HomepageRevealPreviewSection } from "@/components/homepage/homepage-reveal-preview-section";
import { HomepageWhyFriendRankSection } from "@/components/homepage/homepage-why-friendrank-section";
import { HomepageHubExploreSection } from "@/components/topic-hubs/homepage-hub-explore-section";
import { trackCtaClicked } from "@/lib/analytics";
import { FRIEND_RANK_CATEGORIES } from "@/lib/game-build";
import type { RefObject } from "react";

const steps = [
  {
    number: "01",
    title: "Add your friends",
    description:
      "Enter your group's names, pick up to 3 vibe tags, and add optional inside jokes.",
  },
  {
    number: "02",
    title: "The game is created",
    description:
      "Get playful FriendRank categories, questions, and results tailored to your group vibe.",
  },
  {
    number: "03",
    title: "Share with friends",
    description:
      "Send a link. Everyone votes on their phone — no app download needed.",
  },
  {
    number: "04",
    title: "Share the results",
    description:
      "Reveal who got Main Character, Chaos Agent, Secret Villain — and copy results to flex in the group chat.",
  },
] as const;

type HomepageBelowFoldSectionsProps = {
  categoriesRef: RefObject<HTMLElement | null>;
  onScrollToCreateGame: () => void;
};

export function HomepageBelowFoldSections({
  categoriesRef,
  onScrollToCreateGame,
}: HomepageBelowFoldSectionsProps) {
  return (
    <>
      <section
        ref={categoriesRef}
        id="friendrank-categories"
        aria-labelledby="friendrank-categories-heading"
        className="mx-auto max-w-6xl scroll-mt-8 border-t border-white/5 px-6 py-20"
      >
        <div className="mb-12 text-center">
          <h2
            id="friendrank-categories-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            FriendRank Categories
          </h2>
          <p className="mt-3 text-slate-400">
            Friend group categories built for chaos
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FRIEND_RANK_CATEGORIES.map((category) => (
            <div
              key={category.label}
              className="rounded-2xl border border-pink-500/20 bg-gradient-to-br from-pink-500/10 to-violet-600/10 p-5 backdrop-blur-sm transition duration-200 hover:border-pink-500/35 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <p className="text-3xl">{category.emoji}</p>
              <h3 className="mt-3 text-lg font-semibold">{category.label}</h3>
              <p className="mt-1 text-sm text-violet-300">{category.nickname}</p>
            </div>
          ))}
        </div>
      </section>

      <HomepageHubExploreSection />

      <HomepageWhyFriendRankSection />

      <HomepageRevealPreviewSection />

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="border-t border-white/5 bg-white/[0.02] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2
              id="how-it-works-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              How It Works
            </h2>
            <p className="mt-3 text-slate-400">
              From friend group to viral results in four steps
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-px w-full bg-gradient-to-r from-violet-500/40 to-transparent lg:block" />
                )}
                <div className="relative flex flex-col items-center text-center transition duration-200 hover:translate-y-[-2px] motion-reduce:hover:translate-y-0 lg:items-start lg:text-left">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-lg font-bold text-violet-400">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HomepageFaqSection />

      <section
        aria-labelledby="ready-to-rank-heading"
        className="mx-auto max-w-6xl px-6 py-24 text-center"
      >
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/10 via-slate-900 to-cyan-500/10 px-8 py-16">
          <h2
            id="ready-to-rank-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Ready to rank your friends?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Create your group game in under a minute. The group chat will never
            be the same.
          </p>
          <button
            type="button"
            onClick={() => {
              trackCtaClicked({ location: "bottom_start" });
              onScrollToCreateGame();
            }}
            className="mt-8 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 px-8 py-4 text-base font-semibold shadow-xl shadow-violet-600/30 ring-1 ring-violet-400/35 transition duration-200 hover:from-violet-500 hover:to-cyan-500 hover:shadow-violet-500/45 hover:ring-violet-400/55 active:scale-[0.99] motion-reduce:active:scale-100"
          >
            Start the Chaos
          </button>
        </div>
      </section>
    </>
  );
}
