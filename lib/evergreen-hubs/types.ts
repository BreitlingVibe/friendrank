import type { AiCitationLayer } from "@/lib/geo/ai-citation";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";

export type EvergreenHubFaqItem = {
  question: string;
  answer: string;
};

export type EvergreenHubComparisonRow = {
  type: string;
  bestFor: string;
  setup: string;
  socialPayoff: string;
  browserFriendly: string;
};

export type EvergreenHubInternalLink = {
  href: string;
  label: string;
};

export type EvergreenHubSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type EvergreenHubCategoryCard = {
  emoji: string;
  title: string;
  href?: string;
  comingSoon?: boolean;
};

export type EvergreenHubFeaturedGuide = {
  title: string;
  description: string;
  href: string;
};

type EvergreenHubPageBase = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaDescription: string;
  heroLead: string;
  sections: EvergreenHubSection[];
  friendRankFitTitle: string;
  friendRankFitParagraphs: string[];
  internalLinksTitle: string;
  internalLinksIntro: string;
  internalLinks: EvergreenHubInternalLink[];
  faqTitle: string;
  faq: EvergreenHubFaqItem[];
  geoFoundation: GeoFoundation;
  aiCitation: AiCitationLayer;
  /** When to render the comparison table relative to FriendRank fit and use cases. */
  comparisonPlacement?: "before-friendrank" | "after-use-cases";
  ctaLabel?: string;
  ctaAriaLabel?: string;
  comparisonSectionId?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  categoryCardsTitle?: string;
  categoryCards?: EvergreenHubCategoryCard[];
  featuredGuidesTitle?: string;
  featuredGuides?: EvergreenHubFeaturedGuide[];
};

export type EvergreenStandardHubPageData = EvergreenHubPageBase & {
  pageKind?: "standard";
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonRows: EvergreenHubComparisonRow[];
  useCasesTitle: string;
  useCases: string[];
};

export type EvergreenPillarPageData = EvergreenHubPageBase & {
  pageKind: "pillar";
  categoryCards: EvergreenHubCategoryCard[];
  featuredGuides: EvergreenHubFeaturedGuide[];
};

export type EvergreenHubPageData =
  | EvergreenStandardHubPageData
  | EvergreenPillarPageData;

export type EvergreenHubDefinition = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
};
