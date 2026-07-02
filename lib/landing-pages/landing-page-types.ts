import type { LandingPageContentExperience } from "@/lib/landing-pages/content-experience";
import type { LandingPageContentQuality } from "@/lib/landing-pages/content-quality";
import type { LandingPageContentVariation } from "@/lib/landing-pages/content-variation";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";
import type { CtaLocation } from "@/lib/analytics";
import type { HowToPlayContent } from "@/lib/landing-pages/content/how-to-play-library";
import type { BestForTag } from "@/lib/landing-pages/best-for-tags";
import type { FormatComparison } from "@/lib/landing-pages/format-comparison";
import type {
  EntityAuthorityPanel,
  RelatedSectionExplanations,
} from "@/lib/entities/entity-authority";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import type { LandingPageEntityRef } from "@/lib/entities/entity-utils";
import type { Tone, VibeTag } from "@/lib/game-build";

export type LandingPageCta = {
  label: string;
  href: string;
};

export type LandingPageFaqItem = {
  question: string;
  answer: string;
};

export type LandingPageExampleQuestion = {
  text: string;
};

export type LandingPageExampleResult = {
  title: string;
  emoji?: string;
  description: string;
};

export type LandingPageWhyItem = {
  title: string;
  description: string;
};

export type LandingPageRelatedPage = {
  slug: string;
  title: string;
  /** When false, render as upcoming — no href. */
  available: boolean;
  /** Descriptive anchor text for internal links. */
  linkLabel?: string;
};

export type PopularSearchLink = {
  slug: string;
  title: string;
  linkLabel: string;
  kind: "landing" | "hub";
};

export type LandingPageGamePreset = {
  suggestedCustomCategories?: string[];
  suggestedVibeTags?: VibeTag[];
  suggestedTone?: Tone;
};

export type LandingPageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  h1: string;
  heroSubtitle: string;
  /** Optional registry-driven lead shown before the intent summary. */
  intentLead?: string;
  primaryCta: LandingPageCta;
  secondaryCta?: LandingPageCta;
  intentSummaryTitle: string;
  intentSummary: string;
  whyFriendRankTitle: string;
  whyFriendRank: LandingPageWhyItem[];
  playImmediatelyTitle: string;
  playImmediatelyBody: string;
  exampleQuestionsTitle: string;
  exampleQuestionsIntro: string;
  exampleQuestions: LandingPageExampleQuestion[];
  exampleResultsTitle: string;
  exampleResults: LandingPageExampleResult[];
  faqTitle: string;
  faq: LandingPageFaqItem[];
  relatedPagesTitle: string;
  relatedPages: LandingPageRelatedPage[];
  youMayAlsoLikeTitle: string;
  youMayAlsoLike: LandingPageRelatedPage[];
  popularSearchesTitle: string;
  popularSearches: PopularSearchLink[];
  bestForTitle: string;
  bestForTags: BestForTag[];
  howToPlay: HowToPlayContent;
  playersAlsoEnjoyTitle: string;
  playersAlsoEnjoy: LandingPageRelatedPage[];
  formatComparison?: FormatComparison | null;
  /** Registry-driven primary knowledge graph entities. */
  primaryEntities: LandingPageEntityRef[];
  /** Registry-driven secondary entities for the page topic. */
  secondaryEntities: LandingPageEntityRef[];
  /** Adjacent entities linked from primary and secondary nodes. */
  relatedEntities: LandingPageEntityRef[];
  /** Hero entity chips derived from primary and secondary entities. */
  entityChips: LandingPageEntityRef[];
  /** Registry-driven entity explorer groups. */
  entityNavigation: EntityNavigation;
  /** Registry-driven authority bullets for this page. */
  entityAuthorityPanel: EntityAuthorityPanel;
  /** Natural-language summary from primary entities. */
  entitySummary?: string;
  /** Short entity-based explanations for recommendation sections. */
  relatedSectionExplanations: RelatedSectionExplanations;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  ctaLocation: CtaLocation;
  gamePreset?: LandingPageGamePreset;
  /** Short description for WebPage / WebApplication JSON-LD. */
  schemaDescription: string;
  /** Registry-driven content quality sections for depth and usefulness. */
  contentQuality: LandingPageContentQuality;
  /** Registry-driven presentation variation for personality and layout. */
  contentVariation: LandingPageContentVariation;
  /** Registry-driven reading experience pacing, density, and navigation copy. */
  contentExperience: LandingPageContentExperience;
  /** Internal build-time GEO metadata for AI readability (not rendered). */
  geoFoundation: GeoFoundation;
};
