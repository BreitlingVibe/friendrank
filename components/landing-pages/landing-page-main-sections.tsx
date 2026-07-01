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

export function LandingPageMainSections({ page }: LandingPageMainSectionsProps) {
  const { contentQuality, contentVariation, contentExperience } = page;
  const transitions = contentExperience.transitions;
  const presentation = contentExperience.blockPresentation;
  const intentSummaryClass = contentExperience.compactIntentSummary
    ? "py-12 sm:py-16"
    : "py-16 sm:py-20";

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
        presentation={presentation.goodFor}
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
        className={intentSummaryClass}
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
        presentation={presentation.whenToUse}
      />
    ),
    whatMakesDifferent: (
      <ContentQualityBlockSection
        key="whatMakesDifferent"
        block={contentQuality.whatMakesDifferent}
        headingId="landing-different-heading"
        transition={transitions.beforeWhatMakesDifferent}
        presentation={presentation.whatMakesDifferent}
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
      {contentExperience.sectionOrder.map((sectionKey) => (
        <Fragment key={sectionKey}>{sections[sectionKey]}</Fragment>
      ))}
    </>
  );
}

export function getLandingPageRecommendationCopy(page: LandingPageData) {
  const recommendations = page.contentExperience.recommendations;

  return {
    playersAlsoEnjoyTitle: recommendations.playersAlsoEnjoyTitle,
    playersAlsoEnjoyExplanation: recommendations.playersAlsoEnjoyIntro,
    youMayAlsoLikeExplanation: recommendations.youMayAlsoLikeIntro,
    relatedPagesExplanation: recommendations.relatedPagesIntro,
    popularSearchesExplanation: recommendations.popularSearchesIntro,
    showPlayersAlsoEnjoy: recommendations.showPlayersAlsoEnjoy,
    showYouMayAlsoLike: recommendations.showYouMayAlsoLike,
    youMayAlsoLikeCompact: recommendations.youMayAlsoLikeCompact,
  };
}
