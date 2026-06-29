"use client";

import Link from "next/link";
import { useMemo } from "react";
import { trackCtaClicked } from "@/lib/analytics";
import {
  getAllHubs,
  getHubFeaturedLivePages,
  getHomepageHubCtaLocation,
} from "@/lib/topic-hubs";

export function HomepageHubExploreSection() {
  const hubCards = useMemo(
    () =>
      getAllHubs().map((hub) => ({
        hub,
        featuredPages: getHubFeaturedLivePages(hub.id, 3),
      })),
    [],
  );

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
          {hubCards.map(({ hub, featuredPages }) => (
            <li key={hub.id}>
              <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-900/40 p-6 backdrop-blur-sm transition duration-200 hover:border-violet-400/35 hover:shadow-lg hover:shadow-violet-500/10">
                <h3 className="text-xl font-semibold text-white">{hub.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {hub.description}
                </p>

                {featuredPages.length > 0 ? (
                  <ul className="mt-5 space-y-2 border-t border-white/5 pt-5">
                    {featuredPages.map((page) => (
                      <li key={page.slug} className="flex gap-2 text-sm text-slate-300">
                        <span className="text-violet-400" aria-hidden="true">
                          •
                        </span>
                        <span>{page.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-6 pt-2">
                  <Link
                    href={`/${hub.slug}`}
                    onClick={() =>
                      trackCtaClicked({
                        location: getHomepageHubCtaLocation(hub.id),
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
      </div>
    </section>
  );
}
