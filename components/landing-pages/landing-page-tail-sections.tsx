import { Fragment, type ReactNode } from "react";
import type { TailSectionKey } from "@/lib/landing-pages/content-experience";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { getLandingPageRecommendationCopy } from "@/components/landing-pages/landing-page-main-sections";
import { LandingPageExamples } from "@/components/landing-pages/landing-page-examples";
import { LandingPageFaq } from "@/components/landing-pages/landing-page-faq";
import { LandingPageFormatComparison } from "@/components/landing-pages/landing-page-format-comparison";
import { LandingPageRelated } from "@/components/landing-pages/landing-page-related";
import { LandingPagePopularSearches } from "@/components/landing-pages/landing-page-popular-searches";
import { LandingPagePlayersAlsoEnjoy } from "@/components/landing-pages/landing-page-players-also-enjoy";
import { LandingPageCta } from "@/components/landing-pages/landing-page-cta";

type LandingPageTailSectionsProps = {
  page: LandingPageData;
  recommendationCopy: ReturnType<typeof getLandingPageRecommendationCopy>;
};

export function LandingPageTailSections({
  page,
  recommendationCopy,
}: LandingPageTailSectionsProps) {
  const compactClass = recommendationCopy.youMayAlsoLikeCompact
    ? "border-t border-white/5 py-10 sm:py-12"
    : undefined;

  const sections: Record<TailSectionKey, ReactNode> = {
    whyFriendRank: (
      <section
        key="whyFriendRank"
        aria-labelledby="landing-why-heading"
        className="border-t border-white/5 bg-white/[0.02] py-12 sm:py-16"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id="landing-why-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {page.whyFriendRankTitle}
          </h2>
          <ul className="mt-6 space-y-3">
            {page.whyFriendRank.map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="mt-0.5 shrink-0 text-sm text-slate-500"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    ),
    playImmediately: (
      <section
        key="playImmediately"
        aria-labelledby="landing-play-heading"
        className="border-t border-white/5 py-12 sm:py-16"
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            id="landing-play-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {page.playImmediatelyTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-400">
            {page.playImmediatelyBody}
          </p>
          <div className="mt-8">
            <LandingPageCta
              label={page.contentVariation.cta.midPageLabel}
              href={page.primaryCta.href}
              location={page.ctaLocation}
              variant="secondary"
              ariaLabel={`${page.contentVariation.cta.midPageLabel} — continue to create your game`}
            />
          </div>
        </div>
      </section>
    ),
    examples: (
      <LandingPageExamples
        key="examples"
        questionsTitle={page.exampleQuestionsTitle}
        questionsIntro={page.exampleQuestionsIntro}
        questions={page.exampleQuestions}
        resultsTitle={page.exampleResultsTitle}
        results={page.exampleResults}
      />
    ),
    formatComparison:
      page.formatComparison != null ? (
        <LandingPageFormatComparison
          key="formatComparison"
          comparison={page.formatComparison}
        />
      ) : null,
    faq: <LandingPageFaq key="faq" title={page.faqTitle} items={page.faq} />,
    playersAlsoEnjoy:
      recommendationCopy.showPlayersAlsoEnjoy &&
      page.playersAlsoEnjoy.length > 0 ? (
        <LandingPagePlayersAlsoEnjoy
          key="playersAlsoEnjoy"
          title={recommendationCopy.playersAlsoEnjoyTitle}
          pages={page.playersAlsoEnjoy}
          explanation={recommendationCopy.playersAlsoEnjoyExplanation}
        />
      ) : null,
    youMayAlsoLike:
      recommendationCopy.showYouMayAlsoLike && page.youMayAlsoLike.length > 0 ? (
        <LandingPageRelated
          key="youMayAlsoLike"
          title={page.youMayAlsoLikeTitle}
          pages={page.youMayAlsoLike}
          headingId="landing-you-may-also-like-heading"
          explanation={recommendationCopy.youMayAlsoLikeExplanation}
          sectionClassName={compactClass}
        />
      ) : null,
    relatedPages: (
      <LandingPageRelated
        key="relatedPages"
        title={page.relatedPagesTitle}
        pages={page.relatedPages}
        explanation={recommendationCopy.relatedPagesExplanation}
      />
    ),
    popularSearches: (
      <LandingPagePopularSearches
        key="popularSearches"
        title={page.popularSearchesTitle}
        links={page.popularSearches}
        explanation={recommendationCopy.popularSearchesExplanation}
      />
    ),
  };

  return (
    <>
      {page.contentExperience.tailSectionOrder.map((sectionKey) => {
        const section = sections[sectionKey];
        if (!section) {
          return null;
        }

        return <Fragment key={sectionKey}>{section}</Fragment>;
      })}
    </>
  );
}
