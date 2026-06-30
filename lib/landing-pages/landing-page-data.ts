import type { CtaLocation } from "@/lib/analytics";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { getRelatedLandingPageItems } from "@/lib/landing-pages/internal-links";
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
  ICEBREAKER_AUDIENCE,
  ICEBREAKER_FAQ,
  ICEBREAKER_INTENT,
  ICEBREAKER_PRIMARY_CTA,
  ICEBREAKER_QUESTIONS,
  OFFICE_ICEBREAKER_AUDIENCE,
  OFFICE_ICEBREAKER_FAQ,
  OFFICE_ICEBREAKER_INTENT,
  OFFICE_ICEBREAKER_PRIMARY_CTA,
  OFFICE_ICEBREAKER_QUESTIONS,
  CLASSROOM_ICEBREAKER_AUDIENCE,
  CLASSROOM_ICEBREAKER_FAQ,
  CLASSROOM_ICEBREAKER_INTENT,
  CLASSROOM_ICEBREAKER_PRIMARY_CTA,
  CLASSROOM_ICEBREAKER_QUESTIONS,
  TEAM_BUILDING_AUDIENCE,
  TEAM_BUILDING_FAQ,
  TEAM_BUILDING_INTENT,
  TEAM_BUILDING_PRIMARY_CTA,
  TEAM_BUILDING_QUESTIONS,
  TEAM_BONDING_AUDIENCE,
  TEAM_BONDING_FAQ,
  TEAM_BONDING_INTENT,
  TEAM_BONDING_PRIMARY_CTA,
  TEAM_BONDING_QUESTIONS,
  WORK_TEAM_AUDIENCE,
  WORK_TEAM_FAQ,
  WORK_TEAM_INTENT,
  WORK_TEAM_PRIMARY_CTA,
  WORK_TEAM_QUESTIONS,
  RELATIONSHIP_QUIZ_AUDIENCE,
  RELATIONSHIP_QUIZ_FAQ,
  RELATIONSHIP_QUIZ_INTENT,
  RELATIONSHIP_QUIZ_PRIMARY_CTA,
  RELATIONSHIP_QUIZ_QUESTIONS,
  COUPLE_QUIZ_AUDIENCE,
  COUPLE_QUIZ_FAQ,
  COUPLE_QUIZ_INTENT,
  COUPLE_QUIZ_PRIMARY_CTA,
  COUPLE_QUIZ_QUESTIONS,
  BOYFRIEND_GIRLFRIEND_QUIZ_AUDIENCE,
  BOYFRIEND_GIRLFRIEND_QUIZ_FAQ,
  BOYFRIEND_GIRLFRIEND_QUIZ_INTENT,
  BOYFRIEND_GIRLFRIEND_QUIZ_PRIMARY_CTA,
  BOYFRIEND_GIRLFRIEND_QUIZ_QUESTIONS,
  BIRTHDAY_PARTY_GAME_AUDIENCE,
  BIRTHDAY_PARTY_GAME_FAQ,
  BIRTHDAY_PARTY_GAME_INTENT,
  BIRTHDAY_PARTY_GAME_PRIMARY_CTA,
  BIRTHDAY_PARTY_GAME_QUESTIONS,
  SLEEPOVER_GAME_AUDIENCE,
  SLEEPOVER_GAME_FAQ,
  SLEEPOVER_GAME_INTENT,
  SLEEPOVER_GAME_PRIMARY_CTA,
  SLEEPOVER_GAME_QUESTIONS,
  GIRLS_NIGHT_GAME_AUDIENCE,
  GIRLS_NIGHT_GAME_FAQ,
  GIRLS_NIGHT_GAME_INTENT,
  GIRLS_NIGHT_GAME_PRIMARY_CTA,
  GIRLS_NIGHT_GAME_QUESTIONS,
  FRIEND_TEST_AUDIENCE,
  FRIEND_TEST_FAQ,
  FRIEND_TEST_INTENT,
  FRIEND_TEST_PRIMARY_CTA,
  FRIEND_TEST_QUESTIONS,
  BESTIE_QUIZ_AUDIENCE,
  BESTIE_QUIZ_FAQ,
  BESTIE_QUIZ_INTENT,
  BESTIE_QUIZ_PRIMARY_CTA,
  BESTIE_QUIZ_QUESTIONS,
  FUNNY_FRIEND_QUIZ_AUDIENCE,
  FUNNY_FRIEND_QUIZ_FAQ,
  FUNNY_FRIEND_QUIZ_INTENT,
  FUNNY_FRIEND_QUIZ_PRIMARY_CTA,
  FUNNY_FRIEND_QUIZ_QUESTIONS,
  NEW_FRIENDS_GAME_AUDIENCE,
  NEW_FRIENDS_GAME_FAQ,
  NEW_FRIENDS_GAME_INTENT,
  NEW_FRIENDS_GAME_PRIMARY_CTA,
  NEW_FRIENDS_GAME_QUESTIONS,
  CHILDHOOD_FRIENDS_QUIZ_AUDIENCE,
  CHILDHOOD_FRIENDS_QUIZ_FAQ,
  CHILDHOOD_FRIENDS_QUIZ_INTENT,
  CHILDHOOD_FRIENDS_QUIZ_PRIMARY_CTA,
  CHILDHOOD_FRIENDS_QUIZ_QUESTIONS,
  FRIENDSHIP_CHALLENGE_AUDIENCE,
  FRIENDSHIP_CHALLENGE_FAQ,
  FRIENDSHIP_CHALLENGE_INTENT,
  FRIENDSHIP_CHALLENGE_PRIMARY_CTA,
  FRIENDSHIP_CHALLENGE_QUESTIONS,
  DATE_NIGHT_GAME_AUDIENCE,
  DATE_NIGHT_GAME_FAQ,
  DATE_NIGHT_GAME_INTENT,
  DATE_NIGHT_GAME_PRIMARY_CTA,
  DATE_NIGHT_GAME_QUESTIONS,
  NEWLYWED_GAME_AUDIENCE,
  NEWLYWED_GAME_FAQ,
  NEWLYWED_GAME_INTENT,
  NEWLYWED_GAME_PRIMARY_CTA,
  NEWLYWED_GAME_QUESTIONS,
  ANNIVERSARY_GAME_AUDIENCE,
  ANNIVERSARY_GAME_FAQ,
  ANNIVERSARY_GAME_INTENT,
  ANNIVERSARY_GAME_PRIMARY_CTA,
  ANNIVERSARY_GAME_QUESTIONS,
  ADULT_PARTY_GAME_AUDIENCE,
  ADULT_PARTY_GAME_FAQ,
  ADULT_PARTY_GAME_INTENT,
  ADULT_PARTY_GAME_PRIMARY_CTA,
  ADULT_PARTY_GAME_QUESTIONS,
  DRINKING_GAME_AUDIENCE,
  DRINKING_GAME_FAQ,
  DRINKING_GAME_INTENT,
  DRINKING_GAME_PRIMARY_CTA,
  DRINKING_GAME_QUESTIONS,
  COLLEGE_PARTY_GAME_AUDIENCE,
  COLLEGE_PARTY_GAME_FAQ,
  COLLEGE_PARTY_GAME_INTENT,
  COLLEGE_PARTY_GAME_PRIMARY_CTA,
  COLLEGE_PARTY_GAME_QUESTIONS,
  REMOTE_TEAM_GAME_AUDIENCE,
  REMOTE_TEAM_GAME_FAQ,
  REMOTE_TEAM_GAME_INTENT,
  REMOTE_TEAM_GAME_PRIMARY_CTA,
  REMOTE_TEAM_GAME_QUESTIONS,
  EMPLOYEE_ENGAGEMENT_GAME_AUDIENCE,
  EMPLOYEE_ENGAGEMENT_GAME_FAQ,
  EMPLOYEE_ENGAGEMENT_GAME_INTENT,
  EMPLOYEE_ENGAGEMENT_GAME_PRIMARY_CTA,
  EMPLOYEE_ENGAGEMENT_GAME_QUESTIONS,
  VIRTUAL_TEAM_BUILDING_AUDIENCE,
  VIRTUAL_TEAM_BUILDING_FAQ,
  VIRTUAL_TEAM_BUILDING_INTENT,
  VIRTUAL_TEAM_BUILDING_PRIMARY_CTA,
  VIRTUAL_TEAM_BUILDING_QUESTIONS,
  TEAM_INTRODUCTION_GAME_AUDIENCE,
  TEAM_INTRODUCTION_GAME_FAQ,
  TEAM_INTRODUCTION_GAME_INTENT,
  TEAM_INTRODUCTION_GAME_PRIMARY_CTA,
  TEAM_INTRODUCTION_GAME_QUESTIONS,
  GET_TO_KNOW_YOU_GAME_AUDIENCE,
  GET_TO_KNOW_YOU_GAME_FAQ,
  GET_TO_KNOW_YOU_GAME_INTENT,
  GET_TO_KNOW_YOU_GAME_PRIMARY_CTA,
  GET_TO_KNOW_YOU_GAME_QUESTIONS,
  MEETING_ICEBREAKER_AUDIENCE,
  MEETING_ICEBREAKER_FAQ,
  MEETING_ICEBREAKER_INTENT,
  MEETING_ICEBREAKER_PRIMARY_CTA,
  MEETING_ICEBREAKER_QUESTIONS,
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
  relatedPagesOverride?: LandingPageData["relatedPages"];
};

function assembleLandingPage(input: LandingPageAssemblyInput): LandingPageData {
  const {
    intent,
    audience,
    primaryCta,
    faq,
    exampleQuestions,
    relatedPagesOverride,
  } = input;

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
    relatedPages: getRelatedLandingPageItems(intent.slug, {
      override: relatedPagesOverride,
    }),
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

export const icebreakerGamePage = assembleLandingPage({
  intent: ICEBREAKER_INTENT,
  audience: ICEBREAKER_AUDIENCE,
  primaryCta: ICEBREAKER_PRIMARY_CTA,
  faq: ICEBREAKER_FAQ,
  exampleQuestions: ICEBREAKER_QUESTIONS,
});

export const officeIcebreakerPage = assembleLandingPage({
  intent: OFFICE_ICEBREAKER_INTENT,
  audience: OFFICE_ICEBREAKER_AUDIENCE,
  primaryCta: OFFICE_ICEBREAKER_PRIMARY_CTA,
  faq: OFFICE_ICEBREAKER_FAQ,
  exampleQuestions: OFFICE_ICEBREAKER_QUESTIONS,
});

export const classroomIcebreakerPage = assembleLandingPage({
  intent: CLASSROOM_ICEBREAKER_INTENT,
  audience: CLASSROOM_ICEBREAKER_AUDIENCE,
  primaryCta: CLASSROOM_ICEBREAKER_PRIMARY_CTA,
  faq: CLASSROOM_ICEBREAKER_FAQ,
  exampleQuestions: CLASSROOM_ICEBREAKER_QUESTIONS,
});

export const teamBuildingGamePage = assembleLandingPage({
  intent: TEAM_BUILDING_INTENT,
  audience: TEAM_BUILDING_AUDIENCE,
  primaryCta: TEAM_BUILDING_PRIMARY_CTA,
  faq: TEAM_BUILDING_FAQ,
  exampleQuestions: TEAM_BUILDING_QUESTIONS,
});

export const teamBondingGamePage = assembleLandingPage({
  intent: TEAM_BONDING_INTENT,
  audience: TEAM_BONDING_AUDIENCE,
  primaryCta: TEAM_BONDING_PRIMARY_CTA,
  faq: TEAM_BONDING_FAQ,
  exampleQuestions: TEAM_BONDING_QUESTIONS,
});

export const workTeamGamePage = assembleLandingPage({
  intent: WORK_TEAM_INTENT,
  audience: WORK_TEAM_AUDIENCE,
  primaryCta: WORK_TEAM_PRIMARY_CTA,
  faq: WORK_TEAM_FAQ,
  exampleQuestions: WORK_TEAM_QUESTIONS,
});

export const relationshipQuizPage = assembleLandingPage({
  intent: RELATIONSHIP_QUIZ_INTENT,
  audience: RELATIONSHIP_QUIZ_AUDIENCE,
  primaryCta: RELATIONSHIP_QUIZ_PRIMARY_CTA,
  faq: RELATIONSHIP_QUIZ_FAQ,
  exampleQuestions: RELATIONSHIP_QUIZ_QUESTIONS,
});

export const coupleQuizPage = assembleLandingPage({
  intent: COUPLE_QUIZ_INTENT,
  audience: COUPLE_QUIZ_AUDIENCE,
  primaryCta: COUPLE_QUIZ_PRIMARY_CTA,
  faq: COUPLE_QUIZ_FAQ,
  exampleQuestions: COUPLE_QUIZ_QUESTIONS,
});

export const boyfriendGirlfriendQuizPage = assembleLandingPage({
  intent: BOYFRIEND_GIRLFRIEND_QUIZ_INTENT,
  audience: BOYFRIEND_GIRLFRIEND_QUIZ_AUDIENCE,
  primaryCta: BOYFRIEND_GIRLFRIEND_QUIZ_PRIMARY_CTA,
  faq: BOYFRIEND_GIRLFRIEND_QUIZ_FAQ,
  exampleQuestions: BOYFRIEND_GIRLFRIEND_QUIZ_QUESTIONS,
});

export const birthdayPartyGamePage = assembleLandingPage({
  intent: BIRTHDAY_PARTY_GAME_INTENT,
  audience: BIRTHDAY_PARTY_GAME_AUDIENCE,
  primaryCta: BIRTHDAY_PARTY_GAME_PRIMARY_CTA,
  faq: BIRTHDAY_PARTY_GAME_FAQ,
  exampleQuestions: BIRTHDAY_PARTY_GAME_QUESTIONS,
});

export const sleepoverGamePage = assembleLandingPage({
  intent: SLEEPOVER_GAME_INTENT,
  audience: SLEEPOVER_GAME_AUDIENCE,
  primaryCta: SLEEPOVER_GAME_PRIMARY_CTA,
  faq: SLEEPOVER_GAME_FAQ,
  exampleQuestions: SLEEPOVER_GAME_QUESTIONS,
});

export const girlsNightGamePage = assembleLandingPage({
  intent: GIRLS_NIGHT_GAME_INTENT,
  audience: GIRLS_NIGHT_GAME_AUDIENCE,
  primaryCta: GIRLS_NIGHT_GAME_PRIMARY_CTA,
  faq: GIRLS_NIGHT_GAME_FAQ,
  exampleQuestions: GIRLS_NIGHT_GAME_QUESTIONS,
});

export const friendTestPage = assembleLandingPage({
  intent: FRIEND_TEST_INTENT,
  audience: FRIEND_TEST_AUDIENCE,
  primaryCta: FRIEND_TEST_PRIMARY_CTA,
  faq: FRIEND_TEST_FAQ,
  exampleQuestions: FRIEND_TEST_QUESTIONS,
});

export const bestieQuizPage = assembleLandingPage({
  intent: BESTIE_QUIZ_INTENT,
  audience: BESTIE_QUIZ_AUDIENCE,
  primaryCta: BESTIE_QUIZ_PRIMARY_CTA,
  faq: BESTIE_QUIZ_FAQ,
  exampleQuestions: BESTIE_QUIZ_QUESTIONS,
});

export const funnyFriendQuizPage = assembleLandingPage({
  intent: FUNNY_FRIEND_QUIZ_INTENT,
  audience: FUNNY_FRIEND_QUIZ_AUDIENCE,
  primaryCta: FUNNY_FRIEND_QUIZ_PRIMARY_CTA,
  faq: FUNNY_FRIEND_QUIZ_FAQ,
  exampleQuestions: FUNNY_FRIEND_QUIZ_QUESTIONS,
});


export const newFriendsGamePage = assembleLandingPage({
  intent: NEW_FRIENDS_GAME_INTENT,
  audience: NEW_FRIENDS_GAME_AUDIENCE,
  primaryCta: NEW_FRIENDS_GAME_PRIMARY_CTA,
  faq: NEW_FRIENDS_GAME_FAQ,
  exampleQuestions: NEW_FRIENDS_GAME_QUESTIONS,
});

export const childhoodFriendsQuizPage = assembleLandingPage({
  intent: CHILDHOOD_FRIENDS_QUIZ_INTENT,
  audience: CHILDHOOD_FRIENDS_QUIZ_AUDIENCE,
  primaryCta: CHILDHOOD_FRIENDS_QUIZ_PRIMARY_CTA,
  faq: CHILDHOOD_FRIENDS_QUIZ_FAQ,
  exampleQuestions: CHILDHOOD_FRIENDS_QUIZ_QUESTIONS,
});

export const friendshipChallengePage = assembleLandingPage({
  intent: FRIENDSHIP_CHALLENGE_INTENT,
  audience: FRIENDSHIP_CHALLENGE_AUDIENCE,
  primaryCta: FRIENDSHIP_CHALLENGE_PRIMARY_CTA,
  faq: FRIENDSHIP_CHALLENGE_FAQ,
  exampleQuestions: FRIENDSHIP_CHALLENGE_QUESTIONS,
});

export const dateNightGamePage = assembleLandingPage({
  intent: DATE_NIGHT_GAME_INTENT,
  audience: DATE_NIGHT_GAME_AUDIENCE,
  primaryCta: DATE_NIGHT_GAME_PRIMARY_CTA,
  faq: DATE_NIGHT_GAME_FAQ,
  exampleQuestions: DATE_NIGHT_GAME_QUESTIONS,
});

export const newlywedGamePage = assembleLandingPage({
  intent: NEWLYWED_GAME_INTENT,
  audience: NEWLYWED_GAME_AUDIENCE,
  primaryCta: NEWLYWED_GAME_PRIMARY_CTA,
  faq: NEWLYWED_GAME_FAQ,
  exampleQuestions: NEWLYWED_GAME_QUESTIONS,
});

export const anniversaryGamePage = assembleLandingPage({
  intent: ANNIVERSARY_GAME_INTENT,
  audience: ANNIVERSARY_GAME_AUDIENCE,
  primaryCta: ANNIVERSARY_GAME_PRIMARY_CTA,
  faq: ANNIVERSARY_GAME_FAQ,
  exampleQuestions: ANNIVERSARY_GAME_QUESTIONS,
});

export const adultPartyGamePage = assembleLandingPage({
  intent: ADULT_PARTY_GAME_INTENT,
  audience: ADULT_PARTY_GAME_AUDIENCE,
  primaryCta: ADULT_PARTY_GAME_PRIMARY_CTA,
  faq: ADULT_PARTY_GAME_FAQ,
  exampleQuestions: ADULT_PARTY_GAME_QUESTIONS,
});

export const drinkingGamePage = assembleLandingPage({
  intent: DRINKING_GAME_INTENT,
  audience: DRINKING_GAME_AUDIENCE,
  primaryCta: DRINKING_GAME_PRIMARY_CTA,
  faq: DRINKING_GAME_FAQ,
  exampleQuestions: DRINKING_GAME_QUESTIONS,
});

export const collegePartyGamePage = assembleLandingPage({
  intent: COLLEGE_PARTY_GAME_INTENT,
  audience: COLLEGE_PARTY_GAME_AUDIENCE,
  primaryCta: COLLEGE_PARTY_GAME_PRIMARY_CTA,
  faq: COLLEGE_PARTY_GAME_FAQ,
  exampleQuestions: COLLEGE_PARTY_GAME_QUESTIONS,
});

export const remoteTeamGamePage = assembleLandingPage({
  intent: REMOTE_TEAM_GAME_INTENT,
  audience: REMOTE_TEAM_GAME_AUDIENCE,
  primaryCta: REMOTE_TEAM_GAME_PRIMARY_CTA,
  faq: REMOTE_TEAM_GAME_FAQ,
  exampleQuestions: REMOTE_TEAM_GAME_QUESTIONS,
});

export const employeeEngagementGamePage = assembleLandingPage({
  intent: EMPLOYEE_ENGAGEMENT_GAME_INTENT,
  audience: EMPLOYEE_ENGAGEMENT_GAME_AUDIENCE,
  primaryCta: EMPLOYEE_ENGAGEMENT_GAME_PRIMARY_CTA,
  faq: EMPLOYEE_ENGAGEMENT_GAME_FAQ,
  exampleQuestions: EMPLOYEE_ENGAGEMENT_GAME_QUESTIONS,
});

export const virtualTeamBuildingPage = assembleLandingPage({
  intent: VIRTUAL_TEAM_BUILDING_INTENT,
  audience: VIRTUAL_TEAM_BUILDING_AUDIENCE,
  primaryCta: VIRTUAL_TEAM_BUILDING_PRIMARY_CTA,
  faq: VIRTUAL_TEAM_BUILDING_FAQ,
  exampleQuestions: VIRTUAL_TEAM_BUILDING_QUESTIONS,
});

export const teamIntroductionGamePage = assembleLandingPage({
  intent: TEAM_INTRODUCTION_GAME_INTENT,
  audience: TEAM_INTRODUCTION_GAME_AUDIENCE,
  primaryCta: TEAM_INTRODUCTION_GAME_PRIMARY_CTA,
  faq: TEAM_INTRODUCTION_GAME_FAQ,
  exampleQuestions: TEAM_INTRODUCTION_GAME_QUESTIONS,
});

export const getToKnowYouGamePage = assembleLandingPage({
  intent: GET_TO_KNOW_YOU_GAME_INTENT,
  audience: GET_TO_KNOW_YOU_GAME_AUDIENCE,
  primaryCta: GET_TO_KNOW_YOU_GAME_PRIMARY_CTA,
  faq: GET_TO_KNOW_YOU_GAME_FAQ,
  exampleQuestions: GET_TO_KNOW_YOU_GAME_QUESTIONS,
});

export const meetingIcebreakerPage = assembleLandingPage({
  intent: MEETING_ICEBREAKER_INTENT,
  audience: MEETING_ICEBREAKER_AUDIENCE,
  primaryCta: MEETING_ICEBREAKER_PRIMARY_CTA,
  faq: MEETING_ICEBREAKER_FAQ,
  exampleQuestions: MEETING_ICEBREAKER_QUESTIONS,
});

export const LANDING_PAGES: LandingPageData[] = [
  mostLikelyToGeneratorPage,
  bestFriendQuizPage,
  whoKnowsMeBestPage,
  friendshipTestPage,
  anonymousVotingGamePage,
  groupVotingGamePage,
  partyVotingGamePage,
  icebreakerGamePage,
  officeIcebreakerPage,
  classroomIcebreakerPage,
  teamBuildingGamePage,
  teamBondingGamePage,
  workTeamGamePage,
  relationshipQuizPage,
  coupleQuizPage,
  boyfriendGirlfriendQuizPage,
  birthdayPartyGamePage,
  sleepoverGamePage,
  girlsNightGamePage,
  friendTestPage,
  bestieQuizPage,
  funnyFriendQuizPage,
  newFriendsGamePage,
  childhoodFriendsQuizPage,
  friendshipChallengePage,
  dateNightGamePage,
  newlywedGamePage,
  anniversaryGamePage,
  adultPartyGamePage,
  drinkingGamePage,
  collegePartyGamePage,
  remoteTeamGamePage,
  employeeEngagementGamePage,
  virtualTeamBuildingPage,
  teamIntroductionGamePage,
  getToKnowYouGamePage,
  meetingIcebreakerPage,
];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
