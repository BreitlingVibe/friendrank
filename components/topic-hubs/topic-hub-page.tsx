import {
  getAllHubs,
  getHubFeaturedLivePages,
  getHubLandingPages,
  getHubPlannedPages,
  getTopicHubCtaLocation,
} from "@/lib/topic-hubs";
import type { HubLandingPageRef, TopicHub } from "@/lib/topic-hubs/hub-types";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import {
  TopicHubComingSoonCard,
  TopicHubLiveCard,
} from "@/components/topic-hubs/topic-hub-cards";
import { TopicHubOtherHubs } from "@/components/topic-hubs/topic-hub-other-hubs";

type TopicHubPageProps = {
  hub: TopicHub;
};

function sortByPriorityDesc(pages: HubLandingPageRef[]): HubLandingPageRef[] {
  return [...pages].sort(
    (pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority,
  );
}

export function TopicHubPage({ hub }: TopicHubPageProps) {
  const ctaLocation = getTopicHubCtaLocation(hub.id);
  const featuredPages = getHubFeaturedLivePages(hub.id);
  const allLivePages = sortByPriorityDesc(getHubLandingPages(hub.id));
  const plannedPages = sortByPriorityDesc(getHubPlannedPages(hub.id));
  const otherHubs = getAllHubs();

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <main className="relative z-10">
        <section
          aria-labelledby="topic-hub-hero-heading"
          className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
        >
          <h1
            id="topic-hub-hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {hub.title}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400 sm:text-xl">
            {hub.intro}
          </p>
          <div className="mt-10 flex justify-center">
            <LandingPageCta
              label="Create Your Game on FriendRank"
              href={CREATE_GAME_HREF}
              location={ctaLocation}
              variant="primary"
            />
          </div>
        </section>

        {featuredPages.length > 0 ? (
          <section
            aria-labelledby="topic-hub-featured-heading"
            className="border-t border-white/5 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-6xl px-6">
              <h2
                id="topic-hub-featured-heading"
                className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Featured games
              </h2>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPages.map((page) => (
                  <li key={page.slug}>
                    <TopicHubLiveCard page={page} ctaLabel="Play now" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {allLivePages.length > 0 ? (
          <section
            aria-labelledby="topic-hub-live-heading"
            className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-20"
          >
            <div className="mx-auto max-w-6xl px-6">
              <h2
                id="topic-hub-live-heading"
                className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
              >
                All live games
              </h2>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allLivePages.map((page) => (
                  <li key={page.slug}>
                    <TopicHubLiveCard page={page} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {plannedPages.length > 0 ? (
          <section
            aria-labelledby="topic-hub-planned-heading"
            className="border-t border-white/5 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-6xl px-6">
              <h2
                id="topic-hub-planned-heading"
                className="text-center text-2xl font-bold tracking-tight sm:text-3xl"
              >
                More games on the way
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-500">
                New group games are added regularly. Check back soon.
              </p>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {plannedPages.map((page) => (
                  <li key={page.slug}>
                    <TopicHubComingSoonCard page={page} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <TopicHubOtherHubs hubs={otherHubs} currentHubId={hub.id} />
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-slate-600">
          <p>
            <a href="/" className="text-slate-500 transition hover:text-slate-300">
              FriendRank
            </a>
            {" · "}
            Free friend voting games in the browser
          </p>
        </div>
      </footer>
    </div>
  );
}
