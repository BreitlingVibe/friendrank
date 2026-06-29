import type { CtaLocation } from "@/lib/analytics";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import {
  ANONYMOUS_VOTING_AUDIENCE,
  ANONYMOUS_VOTING_FAQ,
  ANONYMOUS_VOTING_INTENT,
  ANONYMOUS_VOTING_PRIMARY_CTA,
  ANONYMOUS_VOTING_QUESTIONS,
  BEST_FRIEND_QUIZ_AUDIENCE,
  BEST_FRIEND_QUIZ_FAQ,
  BEST_FRIEND_QUIZ_INTENT,
  BEST_FRIEND_QUIZ_PRIMARY_CTA,
  BEST_FRIEND_QUIZ_QUESTIONS,
  EXAMPLE_QUESTIONS_SECONDARY_CTA,
  EXAMPLE_RESULTS_TITLE,
  FRIENDSHIP_TEST_AUDIENCE,
  FRIENDSHIP_TEST_FAQ,
  FRIENDSHIP_TEST_INTENT,
  FRIENDSHIP_TEST_PRIMARY_CTA,
  FRIENDSHIP_TEST_QUESTIONS,
  GROUP_GAME_BENEFITS,
  GROUP_VOTE_RESULTS,
  GROUP_VOTING_AUDIENCE,
  GROUP_VOTING_FAQ,
  GROUP_VOTING_INTENT,
  GROUP_VOTING_PRIMARY_CTA,
  GROUP_VOTING_QUESTIONS,
  MOST_LIKELY_TO_AUDIENCE,
  MOST_LIKELY_TO_FAQ,
  MOST_LIKELY_TO_INTENT,
  MOST_LIKELY_TO_PRIMARY_CTA,
  MOST_LIKELY_QUESTIONS,
  PARTY_VOTING_AUDIENCE,
  PARTY_VOTING_FAQ,
  PARTY_VOTING_INTENT,
  PARTY_VOTING_PRIMARY_CTA,
  PARTY_VOTING_QUESTIONS,
  PLAY_IMMEDIATELY_TITLE,
  RELATED_GAMES_TITLE,
  WHO_KNOWS_ME_BEST_AUDIENCE,
  WHO_KNOWS_ME_BEST_FAQ,
  WHO_KNOWS_ME_BEST_INTENT,
  WHO_KNOWS_ME_BEST_PRIMARY_CTA,
  WHO_KNOWS_ME_BEST_QUESTIONS,
  buildRelatedPages,
  getCanonicalUrl,
} from "@/lib/landing-pages/content";

export { PLAY_IMMEDIATELY_TITLE, CONTENT_VERSION } from "@/lib/landing-pages/content";

type LandingPageIntent = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intentSummaryTitle: string;
  intentSummary: string;
  whyFriendRankTitle: string;
  exampleQuestionsTitle: string;
  faqTitle: string;
  schemaDescription: string;
  ctaLocation: CtaLocation;
  gamePreset: LandingPageData["gamePreset"];
};

type LandingPageAudience = {
  heroSubtitle: string;
  playImmediatelyBody: string;
  exampleQuestionsIntro: string;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
};

type LandingPageAssemblyInput = {
  intent: LandingPageIntent;
  audience: LandingPageAudience;
  primaryCta: LandingPageData["primaryCta"];
  faq: LandingPageData["faq"];
  exampleQuestions: LandingPageData["exampleQuestions"];
};

function assembleLandingPage(input: LandingPageAssemblyInput): LandingPageData {
  const { intent, audience, primaryCta, faq, exampleQuestions } = input;

  return {
    slug: intent.slug,
    title: intent.title,
    metaTitle: intent.metaTitle,
    metaDescription: intent.metaDescription,
    canonicalUrl: getCanonicalUrl(intent.slug),
    h1: intent.h1,
    heroSubtitle: audience.heroSubtitle,
    primaryCta,
    secondaryCta: EXAMPLE_QUESTIONS_SECONDARY_CTA,
    intentSummaryTitle: intent.intentSummaryTitle,
    intentSummary: intent.intentSummary,
    whyFriendRankTitle: intent.whyFriendRankTitle,
    whyFriendRank: GROUP_GAME_BENEFITS,
    playImmediatelyTitle: PLAY_IMMEDIATELY_TITLE,
    playImmediatelyBody: audience.playImmediatelyBody,
    exampleQuestionsTitle: intent.exampleQuestionsTitle,
    exampleQuestionsIntro: audience.exampleQuestionsIntro,
    exampleQuestions,
    exampleResultsTitle: EXAMPLE_RESULTS_TITLE,
    exampleResults: GROUP_VOTE_RESULTS,
    faqTitle: intent.faqTitle,
    faq,
    relatedPagesTitle: RELATED_GAMES_TITLE,
    relatedPages: buildRelatedPages(intent.slug),
    finalCtaTitle: audience.finalCtaTitle,
    finalCtaSubtitle: audience.finalCtaSubtitle,
    ctaLocation: intent.ctaLocation,
    gamePreset: intent.gamePreset,
    schemaDescription: intent.schemaDescription,
  };
}

export const mostLikelyToGeneratorPage = assembleLandingPage({
  intent: MOST_LIKELY_TO_INTENT,
  audience: MOST_LIKELY_TO_AUDIENCE,
  primaryCta: MOST_LIKELY_TO_PRIMARY_CTA,
  faq: MOST_LIKELY_TO_FAQ,
  exampleQuestions: MOST_LIKELY_QUESTIONS,
});

export const bestFriendQuizPage = assembleLandingPage({
  intent: BEST_FRIEND_QUIZ_INTENT,
  audience: BEST_FRIEND_QUIZ_AUDIENCE,
  primaryCta: BEST_FRIEND_QUIZ_PRIMARY_CTA,
  faq: BEST_FRIEND_QUIZ_FAQ,
  exampleQuestions: BEST_FRIEND_QUIZ_QUESTIONS,
});

export const whoKnowsMeBestPage = assembleLandingPage({
  intent: WHO_KNOWS_ME_BEST_INTENT,
  audience: WHO_KNOWS_ME_BEST_AUDIENCE,
  primaryCta: WHO_KNOWS_ME_BEST_PRIMARY_CTA,
  faq: WHO_KNOWS_ME_BEST_FAQ,
  exampleQuestions: WHO_KNOWS_ME_BEST_QUESTIONS,
});

export const friendshipTestPage = assembleLandingPage({
  intent: FRIENDSHIP_TEST_INTENT,
  audience: FRIENDSHIP_TEST_AUDIENCE,
  primaryCta: FRIENDSHIP_TEST_PRIMARY_CTA,
  faq: FRIENDSHIP_TEST_FAQ,
  exampleQuestions: FRIENDSHIP_TEST_QUESTIONS,
});

export const anonymousVotingGamePage = assembleLandingPage({
  intent: ANONYMOUS_VOTING_INTENT,
  audience: ANONYMOUS_VOTING_AUDIENCE,
  primaryCta: ANONYMOUS_VOTING_PRIMARY_CTA,
  faq: ANONYMOUS_VOTING_FAQ,
  exampleQuestions: ANONYMOUS_VOTING_QUESTIONS,
});

export const groupVotingGamePage = assembleLandingPage({
  intent: GROUP_VOTING_INTENT,
  audience: GROUP_VOTING_AUDIENCE,
  primaryCta: GROUP_VOTING_PRIMARY_CTA,
  faq: GROUP_VOTING_FAQ,
  exampleQuestions: GROUP_VOTING_QUESTIONS,
});

export const partyVotingGamePage = assembleLandingPage({
  intent: PARTY_VOTING_INTENT,
  audience: PARTY_VOTING_AUDIENCE,
  primaryCta: PARTY_VOTING_PRIMARY_CTA,
  faq: PARTY_VOTING_FAQ,
  exampleQuestions: PARTY_VOTING_QUESTIONS,
});

export const LANDING_PAGES: LandingPageData[] = [
  mostLikelyToGeneratorPage,
  bestFriendQuizPage,
  whoKnowsMeBestPage,
  friendshipTestPage,
  anonymousVotingGamePage,
  groupVotingGamePage,
  partyVotingGamePage,
];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
