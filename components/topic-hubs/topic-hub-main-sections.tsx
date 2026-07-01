import type { ReactNode } from "react";
import type { TopicHubPageData } from "@/lib/landing-pages/topic-hub-experience";
import type { TopicHubMainSectionKey } from "@/lib/landing-pages/topic-hub-experience";
import { TopicHubBenefits } from "@/components/topic-hubs/topic-hub-benefits";
import {
  TopicHubComingSoonCard,
  TopicHubLiveCard,
} from "@/components/topic-hubs/topic-hub-cards";
import { TopicHubFaq } from "@/components/topic-hubs/topic-hub-faq";
import { TopicHubOtherHubs } from "@/components/topic-hubs/topic-hub-other-hubs";
import { TopicHubEntityNavigation } from "@/components/topic-hubs/topic-hub-entity-navigation";
import { TopicHubAuthorityPanel } from "@/components/topic-hubs/topic-hub-authority-panel";

type TopicHubMainSectionsProps = {
  page: TopicHubPageData;
};

export function TopicHubMainSections({ page }: TopicHubMainSectionsProps) {
  const { topicHubExperience, sectionCopy } = page;
  const recommendations = topicHubExperience.recommendations;

  const sections: Record<TopicHubMainSectionKey, ReactNode> = {
    exploreAllGames: (
      <section
        key="exploreAllGames"
        aria-labelledby="topic-hub-live-heading"
        className="border-t border-white/5 bg-white/[0.02] py-16 sm:py-24"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="topic-hub-live-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {sectionCopy.liveSectionTitle}
            </h2>
            {sectionCopy.liveSectionIntro ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                {sectionCopy.liveSectionIntro}
              </p>
            ) : null}
          </div>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.allLivePages.map((livePage) => (
              <li key={livePage.slug}>
                <TopicHubLiveCard page={livePage} linkStyle="view" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    featuredGames: (
      <section
        key="featuredGames"
        aria-labelledby="topic-hub-featured-heading"
        className="border-t border-white/5 py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="topic-hub-featured-heading"
              className="text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {sectionCopy.featuredSectionTitle}
            </h2>
            {sectionCopy.featuredSectionIntro ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                {sectionCopy.featuredSectionIntro}
              </p>
            ) : null}
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.featuredPages.map((featuredPage) => (
              <li key={featuredPage.slug}>
                <TopicHubLiveCard page={featuredPage} linkStyle="play" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    entityExplore: (
      <TopicHubEntityNavigation
        key="entityExplore"
        navigation={page.entityNavigation}
        intro={recommendations.entityExploreIntro}
      />
    ),
    benefits: (
      <TopicHubBenefits
        key="benefits"
        title={page.benefitsTitle ?? "Why people enjoy these games"}
        benefits={page.benefits}
      />
    ),
    faq: (
      <TopicHubFaq
        key="faq"
        title={page.faqTitle ?? "FAQ"}
        items={page.faq}
      />
    ),
    authority: (
      <TopicHubAuthorityPanel key="authority" panel={page.authorityPanel} />
    ),
    otherHubs: (
      <TopicHubOtherHubs
        key="otherHubs"
        hubs={page.otherHubs}
        currentHubId={page.hub.id}
        title={recommendations.otherHubsTitle}
        intro={recommendations.otherHubsIntro}
      />
    ),
    plannedGames: (
      <section
        key="plannedGames"
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
            {sectionCopy.comingSoonIntro ? (
              <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-base">
                {sectionCopy.comingSoonIntro}
              </p>
            ) : null}
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {page.plannedPages.map((plannedPage) => (
              <li key={plannedPage.slug}>
                <TopicHubComingSoonCard page={plannedPage} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
  };

  return (
    <>
      {topicHubExperience.sectionOrder.map((sectionKey) => sections[sectionKey])}
    </>
  );
}
