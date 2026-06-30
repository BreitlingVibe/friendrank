import {
  getAllHubs,
  getHubFeaturedLivePages,
  getHubLandingPages,
  getHubPlannedPages,
  getTopicHubCtaLocation,
  resolveHubHeroCopy,
  resolveHubSectionCopy,
} from "@/lib/topic-hubs";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import { getEntityNavigationForHub } from "@/lib/entities/entity-navigation";
import { buildTopicHubBreadcrumbItems } from "@/lib/seo/breadcrumbs";
import type { HubLandingPageRef, TopicHub } from "@/lib/topic-hubs/hub-types";
import { CREATE_GAME_HREF } from "@/lib/landing-pages/content/cta-library";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";
import { FriendRankBrand } from "@/components/friend-rank-brand";
import { SemanticBreadcrumbs } from "@/components/shared/semantic-breadcrumbs";
import { SiteAuthorityFooter } from "@/components/shared/site-authority-footer";
import { TopicHubBenefits } from "@/components/topic-hubs/topic-hub-benefits";
import {
  TopicHubComingSoonCard,
  TopicHubLiveCard,
} from "@/components/topic-hubs/topic-hub-cards";
import { TopicHubFaq } from "@/components/topic-hubs/topic-hub-faq";
import { TopicHubOtherHubs } from "@/components/topic-hubs/topic-hub-other-hubs";
import { TopicHubEntityNavigation } from "@/components/topic-hubs/topic-hub-entity-navigation";
import { TopicHubStructuredData } from "@/components/topic-hubs/topic-hub-structured-data";

type TopicHubPageProps = {
  hub: TopicHub;
};

function sortByPriorityDesc(pages: HubLandingPageRef[]): HubLandingPageRef[] {
  return [...pages].sort(
    (pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority,
  );
}

export function TopicHubPage({ hub }: TopicHubPageProps) {
  const content = getHubPageContent(hub.id);
  const heroCopy = resolveHubHeroCopy(hub, content);
  const sectionCopy = resolveHubSectionCopy(hub, content);
  const ctaLocation = getTopicHubCtaLocation(hub.id);
  const featuredPages = getHubFeaturedLivePages(hub.id);
  const allLivePages = sortByPriorityDesc(getHubLandingPages(hub.id));
  const plannedPages = sortByPriorityDesc(getHubPlannedPages(hub.id));
  const otherHubs = getAllHubs();
  const entityNavigation = getEntityNavigationForHub(hub.id);
  const breadcrumbs = buildTopicHubBreadcrumbItems(hub.slug, hub.title);

  const featuredTitle = sectionCopy.featuredSectionTitle;
  const featuredIntro = sectionCopy.featuredSectionIntro;
  const liveTitle = sectionCopy.liveSectionTitle;
  const liveIntro = sectionCopy.liveSectionIntro;
  const comingSoonIntro = sectionCopy.comingSoonIntro;

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white">
      {content ? (
        <TopicHubStructuredData
          title={hub.title}
          slug={hub.slug}
          schemaDescription={content.schemaDescription}
          faq={content.faq}
          entityNavigation={entityNavigation}
        />
      ) : null}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-cyan-600/10 blur-[100px]" />
      </div>

      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center px-6 py-5">
          <FriendRankBrand href="/" />
        </div>
      </header>

      <SemanticBreadcrumbs items={breadcrumbs} />

      <main id="main-content" className="relative z-10">
        <section
          aria-labelledby="topic-hub-hero-heading"
          className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center sm:pb-12 sm:pt-24"
        >
          <h1
            id="topic-hub-hero-heading"
            className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          >
            {hub.title}
          </h1>
          <p
            id="topic-hub-hero-lead"
            className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-slate-300 sm:text-xl"
          >
            {heroCopy.lead}
          </p>
          <div className="mx-auto mt-6 max-w-2xl space-y-4 text-left sm:text-center">
            {heroCopy.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-slate-400 sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <LandingPageCta
              label="Create your game on FriendRank"
              href={CREATE_GAME_HREF}
              location={ctaLocation}
              variant="primary"
              ariaLabel="Create your game on FriendRank — start a free browser voting game"
            />
          </div>
        </section>

        <TopicHubEntityNavigation navigation={entityNavigation} />

        {featuredPages.length > 0 ? (
          <section
            aria-labelledby="topic-hub-featured-heading"
            className="border-t border-white/5 py-16 sm:py-20"
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="topic-hub-featured-heading"
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {featuredTitle}
                </h2>
                {featuredIntro ? (
                  <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                    {featuredIntro}
                  </p>
                ) : null}
              </div>
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredPages.map((page) => (
                  <li key={page.slug}>
                    <TopicHubLiveCard page={page} linkStyle="play" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        {allLivePages.length > 0 ? (
          <section
            aria-labelledby="topic-hub-live-heading"
            className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-24"
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="topic-hub-live-heading"
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {liveTitle}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {liveIntro}
                </p>
              </div>
              <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {allLivePages.map((page) => (
                  <li key={page.slug}>
                    <TopicHubLiveCard page={page} linkStyle="view" />
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
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  id="topic-hub-planned-heading"
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  More games on the way
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                  {comingSoonIntro}
                </p>
              </div>
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

        {content ? (
          <TopicHubBenefits
            title={content.benefitsTitle}
            benefits={content.benefits}
          />
        ) : null}

        {content ? (
          <TopicHubFaq title={content.faqTitle} items={content.faq} />
        ) : null}

        <TopicHubOtherHubs hubs={otherHubs} currentHubId={hub.id} />
      </main>

      <SiteAuthorityFooter />
    </div>
  );
}
