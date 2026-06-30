import type { CtaLocation } from "@/lib/analytics";
import type {
  LandingPageCta,
  LandingPageData,
  LandingPageExampleQuestion,
  LandingPageFaqItem,
  LandingPageGamePreset,
} from "@/lib/landing-pages/landing-page-types";
import {
  GAMES_FOR_LARGE_GROUPS_INTENT,
  GAMES_FOR_LARGE_GROUPS_AUDIENCE,
  GAMES_FOR_LARGE_GROUPS_PRIMARY_CTA,
  GAMES_FOR_LARGE_GROUPS_FAQ,
  GAMES_FOR_LARGE_GROUPS_QUESTIONS,
  GAMES_FOR_SMALL_GROUPS_INTENT,
  GAMES_FOR_SMALL_GROUPS_AUDIENCE,
  GAMES_FOR_SMALL_GROUPS_PRIMARY_CTA,
  GAMES_FOR_SMALL_GROUPS_FAQ,
  GAMES_FOR_SMALL_GROUPS_QUESTIONS,
  GAMES_FOR_ROOMMATES_INTENT,
  GAMES_FOR_ROOMMATES_AUDIENCE,
  GAMES_FOR_ROOMMATES_PRIMARY_CTA,
  GAMES_FOR_ROOMMATES_FAQ,
  GAMES_FOR_ROOMMATES_QUESTIONS,
  GAMES_FOR_COLLEGE_STUDENTS_INTENT,
  GAMES_FOR_COLLEGE_STUDENTS_AUDIENCE,
  GAMES_FOR_COLLEGE_STUDENTS_PRIMARY_CTA,
  GAMES_FOR_COLLEGE_STUDENTS_FAQ,
  GAMES_FOR_COLLEGE_STUDENTS_QUESTIONS,
  GAMES_FOR_WORK_MEETINGS_INTENT,
  GAMES_FOR_WORK_MEETINGS_AUDIENCE,
  GAMES_FOR_WORK_MEETINGS_PRIMARY_CTA,
  GAMES_FOR_WORK_MEETINGS_FAQ,
  GAMES_FOR_WORK_MEETINGS_QUESTIONS,
  GAMES_FOR_REMOTE_TEAMS_INTENT,
  GAMES_FOR_REMOTE_TEAMS_AUDIENCE,
  GAMES_FOR_REMOTE_TEAMS_PRIMARY_CTA,
  GAMES_FOR_REMOTE_TEAMS_FAQ,
  GAMES_FOR_REMOTE_TEAMS_QUESTIONS,
  FRIDAY_TEAM_GAMES_INTENT,
  FRIDAY_TEAM_GAMES_AUDIENCE,
  FRIDAY_TEAM_GAMES_PRIMARY_CTA,
  FRIDAY_TEAM_GAMES_FAQ,
  FRIDAY_TEAM_GAMES_QUESTIONS,
  TEAM_LUNCH_GAMES_INTENT,
  TEAM_LUNCH_GAMES_AUDIENCE,
  TEAM_LUNCH_GAMES_PRIMARY_CTA,
  TEAM_LUNCH_GAMES_FAQ,
  TEAM_LUNCH_GAMES_QUESTIONS,
  LONG_DISTANCE_COUPLE_GAMES_INTENT,
  LONG_DISTANCE_COUPLE_GAMES_AUDIENCE,
  LONG_DISTANCE_COUPLE_GAMES_PRIMARY_CTA,
  LONG_DISTANCE_COUPLE_GAMES_FAQ,
  LONG_DISTANCE_COUPLE_GAMES_QUESTIONS,
  NEWLY_DATING_GAMES_INTENT,
  NEWLY_DATING_GAMES_AUDIENCE,
  NEWLY_DATING_GAMES_PRIMARY_CTA,
  NEWLY_DATING_GAMES_FAQ,
  NEWLY_DATING_GAMES_QUESTIONS,
  MARRIED_COUPLE_GAMES_INTENT,
  MARRIED_COUPLE_GAMES_AUDIENCE,
  MARRIED_COUPLE_GAMES_PRIMARY_CTA,
  MARRIED_COUPLE_GAMES_FAQ,
  MARRIED_COUPLE_GAMES_QUESTIONS,
  DOUBLE_DATE_GAMES_INTENT,
  DOUBLE_DATE_GAMES_AUDIENCE,
  DOUBLE_DATE_GAMES_PRIMARY_CTA,
  DOUBLE_DATE_GAMES_FAQ,
  DOUBLE_DATE_GAMES_QUESTIONS,
  SLEEPOVER_GAMES_INTENT,
  SLEEPOVER_GAMES_AUDIENCE,
  SLEEPOVER_GAMES_PRIMARY_CTA,
  SLEEPOVER_GAMES_FAQ,
  SLEEPOVER_GAMES_QUESTIONS,
  HOUSE_PARTY_GAMES_INTENT,
  HOUSE_PARTY_GAMES_AUDIENCE,
  HOUSE_PARTY_GAMES_PRIMARY_CTA,
  HOUSE_PARTY_GAMES_FAQ,
  HOUSE_PARTY_GAMES_QUESTIONS,
  BIRTHDAY_PARTY_GAMES_INTENT,
  BIRTHDAY_PARTY_GAMES_AUDIENCE,
  BIRTHDAY_PARTY_GAMES_PRIMARY_CTA,
  BIRTHDAY_PARTY_GAMES_FAQ,
  BIRTHDAY_PARTY_GAMES_QUESTIONS,
  BACHELORETTE_PARTY_GAMES_INTENT,
  BACHELORETTE_PARTY_GAMES_AUDIENCE,
  BACHELORETTE_PARTY_GAMES_PRIMARY_CTA,
  BACHELORETTE_PARTY_GAMES_FAQ,
  BACHELORETTE_PARTY_GAMES_QUESTIONS,
  GAMES_FOR_ADULTS_INTENT,
  GAMES_FOR_ADULTS_AUDIENCE,
  GAMES_FOR_ADULTS_PRIMARY_CTA,
  GAMES_FOR_ADULTS_FAQ,
  GAMES_FOR_ADULTS_QUESTIONS,
  GAMES_FOR_TEENS_INTENT,
  GAMES_FOR_TEENS_AUDIENCE,
  GAMES_FOR_TEENS_PRIMARY_CTA,
  GAMES_FOR_TEENS_FAQ,
  GAMES_FOR_TEENS_QUESTIONS,
  GAMES_FOR_FAMILIES_INTENT,
  GAMES_FOR_FAMILIES_AUDIENCE,
  GAMES_FOR_FAMILIES_PRIMARY_CTA,
  GAMES_FOR_FAMILIES_FAQ,
  GAMES_FOR_FAMILIES_QUESTIONS,
  GAMES_FOR_GROUPS_INTENT,
  GAMES_FOR_GROUPS_AUDIENCE,
  GAMES_FOR_GROUPS_PRIMARY_CTA,
  GAMES_FOR_GROUPS_FAQ,
  GAMES_FOR_GROUPS_QUESTIONS,
} from "@/lib/landing-pages/content/audience-authority-content";

type AudienceAuthorityAssemblyInput = {
  assembleLandingPage: (input: {
    intent: {
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
      gamePreset: LandingPageGamePreset;
    };
    audience: {
      heroSubtitle: string;
      playImmediatelyBody: string;
      exampleQuestionsIntro: string;
      finalCtaTitle: string;
      finalCtaSubtitle: string;
    };
    primaryCta: LandingPageCta;
    faq: LandingPageFaqItem[];
    exampleQuestions: LandingPageExampleQuestion[];
  }) => LandingPageData;
};

export function registerAudienceAuthorityPages({
  assembleLandingPage,
}: AudienceAuthorityAssemblyInput) {
  const gamesForLargeGroupsPage = assembleLandingPage({
    intent: GAMES_FOR_LARGE_GROUPS_INTENT,
    audience: GAMES_FOR_LARGE_GROUPS_AUDIENCE,
    primaryCta: GAMES_FOR_LARGE_GROUPS_PRIMARY_CTA,
    faq: GAMES_FOR_LARGE_GROUPS_FAQ,
    exampleQuestions: GAMES_FOR_LARGE_GROUPS_QUESTIONS,
  });
  const gamesForSmallGroupsPage = assembleLandingPage({
    intent: GAMES_FOR_SMALL_GROUPS_INTENT,
    audience: GAMES_FOR_SMALL_GROUPS_AUDIENCE,
    primaryCta: GAMES_FOR_SMALL_GROUPS_PRIMARY_CTA,
    faq: GAMES_FOR_SMALL_GROUPS_FAQ,
    exampleQuestions: GAMES_FOR_SMALL_GROUPS_QUESTIONS,
  });
  const gamesForRoommatesPage = assembleLandingPage({
    intent: GAMES_FOR_ROOMMATES_INTENT,
    audience: GAMES_FOR_ROOMMATES_AUDIENCE,
    primaryCta: GAMES_FOR_ROOMMATES_PRIMARY_CTA,
    faq: GAMES_FOR_ROOMMATES_FAQ,
    exampleQuestions: GAMES_FOR_ROOMMATES_QUESTIONS,
  });
  const gamesForCollegeStudentsPage = assembleLandingPage({
    intent: GAMES_FOR_COLLEGE_STUDENTS_INTENT,
    audience: GAMES_FOR_COLLEGE_STUDENTS_AUDIENCE,
    primaryCta: GAMES_FOR_COLLEGE_STUDENTS_PRIMARY_CTA,
    faq: GAMES_FOR_COLLEGE_STUDENTS_FAQ,
    exampleQuestions: GAMES_FOR_COLLEGE_STUDENTS_QUESTIONS,
  });
  const gamesForWorkMeetingsPage = assembleLandingPage({
    intent: GAMES_FOR_WORK_MEETINGS_INTENT,
    audience: GAMES_FOR_WORK_MEETINGS_AUDIENCE,
    primaryCta: GAMES_FOR_WORK_MEETINGS_PRIMARY_CTA,
    faq: GAMES_FOR_WORK_MEETINGS_FAQ,
    exampleQuestions: GAMES_FOR_WORK_MEETINGS_QUESTIONS,
  });
  const gamesForRemoteTeamsPage = assembleLandingPage({
    intent: GAMES_FOR_REMOTE_TEAMS_INTENT,
    audience: GAMES_FOR_REMOTE_TEAMS_AUDIENCE,
    primaryCta: GAMES_FOR_REMOTE_TEAMS_PRIMARY_CTA,
    faq: GAMES_FOR_REMOTE_TEAMS_FAQ,
    exampleQuestions: GAMES_FOR_REMOTE_TEAMS_QUESTIONS,
  });
  const fridayTeamGamesPage = assembleLandingPage({
    intent: FRIDAY_TEAM_GAMES_INTENT,
    audience: FRIDAY_TEAM_GAMES_AUDIENCE,
    primaryCta: FRIDAY_TEAM_GAMES_PRIMARY_CTA,
    faq: FRIDAY_TEAM_GAMES_FAQ,
    exampleQuestions: FRIDAY_TEAM_GAMES_QUESTIONS,
  });
  const teamLunchGamesPage = assembleLandingPage({
    intent: TEAM_LUNCH_GAMES_INTENT,
    audience: TEAM_LUNCH_GAMES_AUDIENCE,
    primaryCta: TEAM_LUNCH_GAMES_PRIMARY_CTA,
    faq: TEAM_LUNCH_GAMES_FAQ,
    exampleQuestions: TEAM_LUNCH_GAMES_QUESTIONS,
  });
  const longDistanceCoupleGamesPage = assembleLandingPage({
    intent: LONG_DISTANCE_COUPLE_GAMES_INTENT,
    audience: LONG_DISTANCE_COUPLE_GAMES_AUDIENCE,
    primaryCta: LONG_DISTANCE_COUPLE_GAMES_PRIMARY_CTA,
    faq: LONG_DISTANCE_COUPLE_GAMES_FAQ,
    exampleQuestions: LONG_DISTANCE_COUPLE_GAMES_QUESTIONS,
  });
  const newlyDatingGamesPage = assembleLandingPage({
    intent: NEWLY_DATING_GAMES_INTENT,
    audience: NEWLY_DATING_GAMES_AUDIENCE,
    primaryCta: NEWLY_DATING_GAMES_PRIMARY_CTA,
    faq: NEWLY_DATING_GAMES_FAQ,
    exampleQuestions: NEWLY_DATING_GAMES_QUESTIONS,
  });
  const marriedCoupleGamesPage = assembleLandingPage({
    intent: MARRIED_COUPLE_GAMES_INTENT,
    audience: MARRIED_COUPLE_GAMES_AUDIENCE,
    primaryCta: MARRIED_COUPLE_GAMES_PRIMARY_CTA,
    faq: MARRIED_COUPLE_GAMES_FAQ,
    exampleQuestions: MARRIED_COUPLE_GAMES_QUESTIONS,
  });
  const doubleDateGamesPage = assembleLandingPage({
    intent: DOUBLE_DATE_GAMES_INTENT,
    audience: DOUBLE_DATE_GAMES_AUDIENCE,
    primaryCta: DOUBLE_DATE_GAMES_PRIMARY_CTA,
    faq: DOUBLE_DATE_GAMES_FAQ,
    exampleQuestions: DOUBLE_DATE_GAMES_QUESTIONS,
  });
  const sleepoverGamesPage = assembleLandingPage({
    intent: SLEEPOVER_GAMES_INTENT,
    audience: SLEEPOVER_GAMES_AUDIENCE,
    primaryCta: SLEEPOVER_GAMES_PRIMARY_CTA,
    faq: SLEEPOVER_GAMES_FAQ,
    exampleQuestions: SLEEPOVER_GAMES_QUESTIONS,
  });
  const housePartyGamesPage = assembleLandingPage({
    intent: HOUSE_PARTY_GAMES_INTENT,
    audience: HOUSE_PARTY_GAMES_AUDIENCE,
    primaryCta: HOUSE_PARTY_GAMES_PRIMARY_CTA,
    faq: HOUSE_PARTY_GAMES_FAQ,
    exampleQuestions: HOUSE_PARTY_GAMES_QUESTIONS,
  });
  const birthdayPartyGamesPage = assembleLandingPage({
    intent: BIRTHDAY_PARTY_GAMES_INTENT,
    audience: BIRTHDAY_PARTY_GAMES_AUDIENCE,
    primaryCta: BIRTHDAY_PARTY_GAMES_PRIMARY_CTA,
    faq: BIRTHDAY_PARTY_GAMES_FAQ,
    exampleQuestions: BIRTHDAY_PARTY_GAMES_QUESTIONS,
  });
  const bachelorettePartyGamesPage = assembleLandingPage({
    intent: BACHELORETTE_PARTY_GAMES_INTENT,
    audience: BACHELORETTE_PARTY_GAMES_AUDIENCE,
    primaryCta: BACHELORETTE_PARTY_GAMES_PRIMARY_CTA,
    faq: BACHELORETTE_PARTY_GAMES_FAQ,
    exampleQuestions: BACHELORETTE_PARTY_GAMES_QUESTIONS,
  });
  const gamesForAdultsPage = assembleLandingPage({
    intent: GAMES_FOR_ADULTS_INTENT,
    audience: GAMES_FOR_ADULTS_AUDIENCE,
    primaryCta: GAMES_FOR_ADULTS_PRIMARY_CTA,
    faq: GAMES_FOR_ADULTS_FAQ,
    exampleQuestions: GAMES_FOR_ADULTS_QUESTIONS,
  });
  const gamesForTeensPage = assembleLandingPage({
    intent: GAMES_FOR_TEENS_INTENT,
    audience: GAMES_FOR_TEENS_AUDIENCE,
    primaryCta: GAMES_FOR_TEENS_PRIMARY_CTA,
    faq: GAMES_FOR_TEENS_FAQ,
    exampleQuestions: GAMES_FOR_TEENS_QUESTIONS,
  });
  const gamesForFamiliesPage = assembleLandingPage({
    intent: GAMES_FOR_FAMILIES_INTENT,
    audience: GAMES_FOR_FAMILIES_AUDIENCE,
    primaryCta: GAMES_FOR_FAMILIES_PRIMARY_CTA,
    faq: GAMES_FOR_FAMILIES_FAQ,
    exampleQuestions: GAMES_FOR_FAMILIES_QUESTIONS,
  });
  const gamesForGroupsPage = assembleLandingPage({
    intent: GAMES_FOR_GROUPS_INTENT,
    audience: GAMES_FOR_GROUPS_AUDIENCE,
    primaryCta: GAMES_FOR_GROUPS_PRIMARY_CTA,
    faq: GAMES_FOR_GROUPS_FAQ,
    exampleQuestions: GAMES_FOR_GROUPS_QUESTIONS,
  });

  return {
    gamesForLargeGroupsPage,
    gamesForSmallGroupsPage,
    gamesForRoommatesPage,
    gamesForCollegeStudentsPage,
    gamesForWorkMeetingsPage,
    gamesForRemoteTeamsPage,
    fridayTeamGamesPage,
    teamLunchGamesPage,
    longDistanceCoupleGamesPage,
    newlyDatingGamesPage,
    marriedCoupleGamesPage,
    doubleDateGamesPage,
    sleepoverGamesPage,
    housePartyGamesPage,
    birthdayPartyGamesPage,
    bachelorettePartyGamesPage,
    gamesForAdultsPage,
    gamesForTeensPage,
    gamesForFamiliesPage,
    gamesForGroupsPage,
    pages: [
      gamesForLargeGroupsPage,
      gamesForSmallGroupsPage,
      gamesForRoommatesPage,
      gamesForCollegeStudentsPage,
      gamesForWorkMeetingsPage,
      gamesForRemoteTeamsPage,
      fridayTeamGamesPage,
      teamLunchGamesPage,
      longDistanceCoupleGamesPage,
      newlyDatingGamesPage,
      marriedCoupleGamesPage,
      doubleDateGamesPage,
      sleepoverGamesPage,
      housePartyGamesPage,
      birthdayPartyGamesPage,
      bachelorettePartyGamesPage,
      gamesForAdultsPage,
      gamesForTeensPage,
      gamesForFamiliesPage,
      gamesForGroupsPage,
    ],
  };
}
