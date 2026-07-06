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

export type EvergreenHubPageData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  schemaDescription: string;
  heroLead: string;
  sections: EvergreenHubSection[];
  comparisonTitle: string;
  comparisonIntro: string;
  comparisonRows: EvergreenHubComparisonRow[];
  friendRankFitTitle: string;
  friendRankFitParagraphs: string[];
  useCasesTitle: string;
  useCases: string[];
  internalLinksTitle: string;
  internalLinksIntro: string;
  internalLinks: EvergreenHubInternalLink[];
  faqTitle: string;
  faq: EvergreenHubFaqItem[];
  geoFoundation: GeoFoundation;
  aiCitation: AiCitationLayer;
};

export type EvergreenHubDefinition = {
  slug: string;
  title: string;
  description: string;
  primaryKeyword: string;
};
