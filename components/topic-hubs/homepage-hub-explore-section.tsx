"use client";

import Link from "next/link";
import { trackCtaClicked } from "@/lib/analytics";
import {
  HOMEPAGE_PILLAR_CARDS,
  HOMEPAGE_POPULAR_WAYS_TO_PLAY,
} from "@/lib/evergreen-hubs/homepage-pillar-discovery";
import { getHomepageHubCtaLocation } from "@/lib/topic-hubs/hub-analytics";

const popularChipBase =
  "rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ease-out";

function popularChipClassName(isClickable: boolean) {
  if (isClickable) {
    return `${popularChipBase} border-white/10 bg-white/5 text-slate-300 hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white`;
  }

  return `${popularChipBase} border-white/5 bg-white/[0.02] text-slate-600`;
}

export function HomepageHubExploreSection() {
  return (
    <section
      id="explore-games"
      aria-labelledby="explore-games-heading"
      className="border-t border-white/5 bg-white/[0.02] py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <h2
            id="explore-games-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Explore FriendRank games
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-400">
            Find the right game for your group, party, team, classroom, or
            relationship.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_PILLAR_CARDS.map((pillar) => (
            <li key={pillar.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm transition duration-200 hover:border-violet-400/35 hover:shadow-lg hover:shadow-violet-500/10">
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {pillar.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                  {pillar.childLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="flex gap-2 text-sm text-slate-300 transition hover:text-violet-200"
                      >
                        <span className="text-violet-400" aria-hidden="true">
                          •
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-2">
                  <Link
                    href={pillar.href}
                    onClick={() =>
                      trackCtaClicked({
                        location: getHomepageHubCtaLocation(pillar.id),
                      })
                    }
                    className="inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white sm:w-auto"
                  >
                    Explore games
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-14 border-t border-white/5 pt-10">
          <h3 className="text-center text-lg font-semibold text-white">
            Popular ways to play
          </h3>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {HOMEPAGE_POPULAR_WAYS_TO_PLAY.map((chip) => (
              <li key={chip.label}>
                {chip.href ? (
                  <Link href={chip.href} className={popularChipClassName(true)}>
                    {chip.label}
                  </Link>
                ) : (
                  <span className={popularChipClassName(false)}>{chip.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
