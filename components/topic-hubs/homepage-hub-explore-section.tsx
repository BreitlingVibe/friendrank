"use client";

import Link from "next/link";
import { trackCtaClicked } from "@/lib/analytics";
import {
  HOMEPAGE_PILLAR_CARDS,
  HOMEPAGE_POPULAR_WAYS_TO_PLAY,
} from "@/lib/evergreen-hubs/homepage-pillar-discovery";
import { getHomepageHubCtaLocation } from "@/lib/topic-hubs/hub-analytics";

export function HomepageHubExploreSection() {
  return (
    <section
      id="explore-games"
      aria-labelledby="explore-games-heading"
      className="border-t border-white/5 bg-white/[0.02] py-24 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center sm:mb-16">
          <p className="text-sm font-medium text-violet-300/90">
            Choose your chaos
          </p>
          <h2
            id="explore-games-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Find the perfect game for your group
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Choose by occasion, who&apos;s playing, or how you want to play.
            Every game runs instantly in your browser.
          </p>
        </div>

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {HOMEPAGE_PILLAR_CARDS.map((pillar) => (
            <li key={pillar.id}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm transition duration-200 hover:border-violet-400/40 hover:bg-slate-900/55 hover:shadow-lg hover:shadow-violet-500/10 sm:p-7">
                <Link
                  href={pillar.href}
                  className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400"
                >
                  <h3 className="text-xl font-semibold text-white transition group-hover:text-violet-100 sm:text-2xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {pillar.description}
                  </p>
                </Link>

                <ul className="mt-6 space-y-1.5 border-t border-white/5 pt-5">
                  {pillar.childLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 rounded-md py-1 text-xs text-slate-500 transition hover:text-violet-200"
                      >
                        <span aria-hidden="true" className="text-slate-600">
                          →
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Link
                    href={pillar.href}
                    onClick={() =>
                      trackCtaClicked({
                        location: getHomepageHubCtaLocation(pillar.id),
                      })
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-violet-400/45 hover:bg-violet-500/15 hover:text-white sm:w-auto"
                  >
                    Browse games
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-white/5 pt-12 sm:mt-20">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white sm:text-xl">
              Popular ways to play
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Quick entry points when you already know the vibe.
            </p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {HOMEPAGE_POPULAR_WAYS_TO_PLAY.map((chip) => (
              <li key={chip.label}>
                {chip.href ? (
                  <Link
                    href={chip.href}
                    className="group flex h-full items-center justify-between rounded-xl border border-white/10 bg-slate-900/35 px-4 py-3.5 text-sm font-medium text-slate-300 transition duration-200 hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-white"
                  >
                    <span>{chip.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-slate-600 transition group-hover:text-violet-300"
                    >
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="flex h-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3.5 text-sm font-medium text-slate-600">
                    {chip.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
