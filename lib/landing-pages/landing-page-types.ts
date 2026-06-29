import type { CtaLocation } from "@/lib/analytics";
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
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  ctaLocation: CtaLocation;
  gamePreset?: LandingPageGamePreset;
  /** Short description for WebPage / WebApplication JSON-LD. */
  schemaDescription: string;
};
