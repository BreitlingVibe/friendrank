import { Fragment, type ReactNode } from "react";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import type { ReorderableSectionKey } from "@/lib/landing-pages/content-variation";
import { LandingPageBestFor } from "@/components/landing-pages/landing-page-best-for";
import {
  ContentQualityBlockSection,
  QuickSetupCallout,
  SectionTransition,
} from "@/components/landing-pages/landing-page-content-quality";
import { LandingPageHowToPlay } from "@/components/landing-pages/landing-page-how-to-play";
import { EntityExplorer } from "@/components/shared/entity-explorer";
import { EntityAuthorityPanelSection } from "@/components/shared/entity-authority-panel";

type LandingPageMainSectionsProps = {
  page: LandingPageData;
};

function combineIntro(intro: string, explanation?: string): string | undefined {
  if (intro && explanation) {
    return `${intro} ${explanation}`;
  }

  return intro || explanation;
}

export function LandingPageMainSections({ page }: LandingPageMainSectionsProps) {
  const { contentQuality, contentVariation } = page;
  const transitions = contentVariation.transitions;

  const sections: Record<ReorderableSectionKey, ReactNode> = {
    bestFor: (
      <LandingPageBestFor
        key="bestFor"
        title={page.bestForTitle}
        tags={page.bestForTags}
      />
    ),
    goodFor: (
      <ContentQualityBlockSection
        key="goodFor"
        block={contentQuality.goodFor}
        headingId="landing-good-for-heading"
        transition={transitions.beforeGoodFor}
      />
    ),
    entityExplorer: (
      <>
        <SectionTransition text={transitions.beforeEntityExplorer} />
        <EntityExplorer
          key="entityExplorer"
          navigation={{
            ...page.entityNavigation,
            title: contentVariation.navigation.entityExplorerTitle,
          }}
          headingId="landing-entity-explorer-heading"
          intro={contentVariation.navigation.entityExplorerIntro}
        />
      </>
    ),
    entityAuthority: (
      <EntityAuthorityPanelSection
        key="entityAuthority"
        panel={page.entityAuthorityPanel}
        headingId="landing-entity-authority-heading"
        summary={page.entitySummary}
        summaryId="landing-entity-summary"
      />
    ),
    intentSummary: (
      <section
        key="intentSummary"
        aria-labelledby="landing-intent-heading"
        className="py-16 sm:py-20"
      >
        <div className="mx-auto max-w-3xl px-6">
          <h2
            id="landing-intent-heading"
            className="text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {page.intentSummaryTitle}
          </h2>
          {page.intentLead ? (
            <p className="mt-4 text-base font-medium leading-relaxed text-slate-300">
              {page.intentLead}
            </p>
          ) : null}
          <p
            className={`${page.intentLead ? "mt-3" : "mt-4"} text-base leading-relaxed text-slate-400`}
          >
            {page.intentSummary}
          </p>
        </div>
      </section>
    ),
    whenToUse: (
      <ContentQualityBlockSection
        key="whenToUse"
        block={contentQuality.whenToUse}
        headingId="landing-when-to-use-heading"
        transition={transitions.beforeWhenToUse}
      />
    ),
    whatMakesDifferent: (
      <ContentQualityBlockSection
        key="whatMakesDifferent"
        block={contentQuality.whatMakesDifferent}
        headingId="landing-different-heading"
        transition={transitions.beforeWhatMakesDifferent}
      />
    ),
    quickSetup: (
      <>
        <SectionTransition text={transitions.beforeQuickSetup} />
        <QuickSetupCallout key="quickSetup" content={contentQuality.quickSetup} />
      </>
    ),
    howToPlay: (
      <>
        <SectionTransition text={transitions.beforeHowToPlay} />
        <LandingPageHowToPlay key="howToPlay" content={page.howToPlay} />
      </>
    ),
  };

  return (
    <>
      {contentVariation.sectionOrder.map((sectionKey) => (
        <Fragment key={sectionKey}>{sections[sectionKey]}</Fragment>
      ))}
    </>
  );
}

export function getLandingPageRecommendationCopy(page: LandingPageData) {
  const navigation = page.contentVariation.navigation;

  return {
    playersAlsoEnjoyTitle: navigation.playersAlsoEnjoyTitle,
    playersAlsoEnjoyExplanation: combineIntro(
      navigation.playersAlsoEnjoyIntro,
      page.relatedSectionExplanations.playersAlsoEnjoy,
    ),
    youMayAlsoLikeExplanation: combineIntro(
      navigation.youMayAlsoLikeIntro,
      page.relatedSectionExplanations.youMayAlsoLike,
    ),
    relatedPagesExplanation: combineIntro(
      navigation.relatedPagesIntro,
      page.relatedSectionExplanations.relatedPages,
    ),
    popularSearchesExplanation: combineIntro(
      navigation.popularSearchesIntro,
      page.relatedSectionExplanations.popularSearches,
    ),
  };
}
