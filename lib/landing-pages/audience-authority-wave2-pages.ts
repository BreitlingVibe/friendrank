import type { CtaLocation } from "@/lib/analytics";
import type {
  LandingPageCta,
  LandingPageData,
  LandingPageExampleQuestion,
  LandingPageFaqItem,
  LandingPageGamePreset,
} from "@/lib/landing-pages/landing-page-types";
import {
  PREGAME_GAMES_INTENT,
  PREGAME_GAMES_AUDIENCE,
  PREGAME_GAMES_PRIMARY_CTA,
  PREGAME_GAMES_FAQ,
  PREGAME_GAMES_QUESTIONS,
  BOYS_NIGHT_GAMES_INTENT,
  BOYS_NIGHT_GAMES_AUDIENCE,
  BOYS_NIGHT_GAMES_PRIMARY_CTA,
  BOYS_NIGHT_GAMES_FAQ,
  BOYS_NIGHT_GAMES_QUESTIONS,
  VACATION_GAMES_INTENT,
  VACATION_GAMES_AUDIENCE,
  VACATION_GAMES_PRIMARY_CTA,
  VACATION_GAMES_FAQ,
  VACATION_GAMES_QUESTIONS,
  ROAD_TRIP_GAMES_INTENT,
  ROAD_TRIP_GAMES_AUDIENCE,
  ROAD_TRIP_GAMES_PRIMARY_CTA,
  ROAD_TRIP_GAMES_FAQ,
  ROAD_TRIP_GAMES_QUESTIONS,
  CLASSROOM_GAMES_INTENT,
  CLASSROOM_GAMES_AUDIENCE,
  CLASSROOM_GAMES_PRIMARY_CTA,
  CLASSROOM_GAMES_FAQ,
  CLASSROOM_GAMES_QUESTIONS,
  HIGH_SCHOOL_GAMES_INTENT,
  HIGH_SCHOOL_GAMES_AUDIENCE,
  HIGH_SCHOOL_GAMES_PRIMARY_CTA,
  HIGH_SCHOOL_GAMES_FAQ,
  HIGH_SCHOOL_GAMES_QUESTIONS,
  MIDDLE_SCHOOL_GAMES_INTENT,
  MIDDLE_SCHOOL_GAMES_AUDIENCE,
  MIDDLE_SCHOOL_GAMES_PRIMARY_CTA,
  MIDDLE_SCHOOL_GAMES_FAQ,
  MIDDLE_SCHOOL_GAMES_QUESTIONS,
  STUDENT_ORIENTATION_GAMES_INTENT,
  STUDENT_ORIENTATION_GAMES_AUDIENCE,
  STUDENT_ORIENTATION_GAMES_PRIMARY_CTA,
  STUDENT_ORIENTATION_GAMES_FAQ,
  STUDENT_ORIENTATION_GAMES_QUESTIONS,
  NEW_EMPLOYEE_GAMES_INTENT,
  NEW_EMPLOYEE_GAMES_AUDIENCE,
  NEW_EMPLOYEE_GAMES_PRIMARY_CTA,
  NEW_EMPLOYEE_GAMES_FAQ,
  NEW_EMPLOYEE_GAMES_QUESTIONS,
  ONBOARDING_GAMES_INTENT,
  ONBOARDING_GAMES_AUDIENCE,
  ONBOARDING_GAMES_PRIMARY_CTA,
  ONBOARDING_GAMES_FAQ,
  ONBOARDING_GAMES_QUESTIONS,
  WORKSHOP_GAMES_INTENT,
  WORKSHOP_GAMES_AUDIENCE,
  WORKSHOP_GAMES_PRIMARY_CTA,
  WORKSHOP_GAMES_FAQ,
  WORKSHOP_GAMES_QUESTIONS,
  CONFERENCE_ICEBREAKER_GAMES_INTENT,
  CONFERENCE_ICEBREAKER_GAMES_AUDIENCE,
  CONFERENCE_ICEBREAKER_GAMES_PRIMARY_CTA,
  CONFERENCE_ICEBREAKER_GAMES_FAQ,
  CONFERENCE_ICEBREAKER_GAMES_QUESTIONS,
  FAMILY_REUNION_GAMES_INTENT,
  FAMILY_REUNION_GAMES_AUDIENCE,
  FAMILY_REUNION_GAMES_PRIMARY_CTA,
  FAMILY_REUNION_GAMES_FAQ,
  FAMILY_REUNION_GAMES_QUESTIONS,
  HOLIDAY_FAMILY_GAMES_INTENT,
  HOLIDAY_FAMILY_GAMES_AUDIENCE,
  HOLIDAY_FAMILY_GAMES_PRIMARY_CTA,
  HOLIDAY_FAMILY_GAMES_FAQ,
  HOLIDAY_FAMILY_GAMES_QUESTIONS,
  CHRISTMAS_FAMILY_GAMES_INTENT,
  CHRISTMAS_FAMILY_GAMES_AUDIENCE,
  CHRISTMAS_FAMILY_GAMES_PRIMARY_CTA,
  CHRISTMAS_FAMILY_GAMES_FAQ,
  CHRISTMAS_FAMILY_GAMES_QUESTIONS,
  THANKSGIVING_GAMES_INTENT,
  THANKSGIVING_GAMES_AUDIENCE,
  THANKSGIVING_GAMES_PRIMARY_CTA,
  THANKSGIVING_GAMES_FAQ,
  THANKSGIVING_GAMES_QUESTIONS,
  GRADUATION_PARTY_GAMES_INTENT,
  GRADUATION_PARTY_GAMES_AUDIENCE,
  GRADUATION_PARTY_GAMES_PRIMARY_CTA,
  GRADUATION_PARTY_GAMES_FAQ,
  GRADUATION_PARTY_GAMES_QUESTIONS,
  BABY_SHOWER_GAMES_INTENT,
  BABY_SHOWER_GAMES_AUDIENCE,
  BABY_SHOWER_GAMES_PRIMARY_CTA,
  BABY_SHOWER_GAMES_FAQ,
  BABY_SHOWER_GAMES_QUESTIONS,
  BRIDAL_SHOWER_GAMES_INTENT,
  BRIDAL_SHOWER_GAMES_AUDIENCE,
  BRIDAL_SHOWER_GAMES_PRIMARY_CTA,
  BRIDAL_SHOWER_GAMES_FAQ,
  BRIDAL_SHOWER_GAMES_QUESTIONS,
  REUNION_GAMES_INTENT,
  REUNION_GAMES_AUDIENCE,
  REUNION_GAMES_PRIMARY_CTA,
  REUNION_GAMES_FAQ,
  REUNION_GAMES_QUESTIONS,
} from "@/lib/landing-pages/content/audience-authority-wave2-content";

type AudienceAuthorityWave2AssemblyInput = {
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

export function registerAudienceAuthorityWave2Pages({
  assembleLandingPage,
}: AudienceAuthorityWave2AssemblyInput) {
  const pregameGamesPage = assembleLandingPage({
    intent: PREGAME_GAMES_INTENT,
    audience: PREGAME_GAMES_AUDIENCE,
    primaryCta: PREGAME_GAMES_PRIMARY_CTA,
    faq: PREGAME_GAMES_FAQ,
    exampleQuestions: PREGAME_GAMES_QUESTIONS,
  });
  const boysNightGamesPage = assembleLandingPage({
    intent: BOYS_NIGHT_GAMES_INTENT,
    audience: BOYS_NIGHT_GAMES_AUDIENCE,
    primaryCta: BOYS_NIGHT_GAMES_PRIMARY_CTA,
    faq: BOYS_NIGHT_GAMES_FAQ,
    exampleQuestions: BOYS_NIGHT_GAMES_QUESTIONS,
  });
  const vacationGamesPage = assembleLandingPage({
    intent: VACATION_GAMES_INTENT,
    audience: VACATION_GAMES_AUDIENCE,
    primaryCta: VACATION_GAMES_PRIMARY_CTA,
    faq: VACATION_GAMES_FAQ,
    exampleQuestions: VACATION_GAMES_QUESTIONS,
  });
  const roadTripGamesPage = assembleLandingPage({
    intent: ROAD_TRIP_GAMES_INTENT,
    audience: ROAD_TRIP_GAMES_AUDIENCE,
    primaryCta: ROAD_TRIP_GAMES_PRIMARY_CTA,
    faq: ROAD_TRIP_GAMES_FAQ,
    exampleQuestions: ROAD_TRIP_GAMES_QUESTIONS,
  });
  const classroomGamesPage = assembleLandingPage({
    intent: CLASSROOM_GAMES_INTENT,
    audience: CLASSROOM_GAMES_AUDIENCE,
    primaryCta: CLASSROOM_GAMES_PRIMARY_CTA,
    faq: CLASSROOM_GAMES_FAQ,
    exampleQuestions: CLASSROOM_GAMES_QUESTIONS,
  });
  const highSchoolGamesPage = assembleLandingPage({
    intent: HIGH_SCHOOL_GAMES_INTENT,
    audience: HIGH_SCHOOL_GAMES_AUDIENCE,
    primaryCta: HIGH_SCHOOL_GAMES_PRIMARY_CTA,
    faq: HIGH_SCHOOL_GAMES_FAQ,
    exampleQuestions: HIGH_SCHOOL_GAMES_QUESTIONS,
  });
  const middleSchoolGamesPage = assembleLandingPage({
    intent: MIDDLE_SCHOOL_GAMES_INTENT,
    audience: MIDDLE_SCHOOL_GAMES_AUDIENCE,
    primaryCta: MIDDLE_SCHOOL_GAMES_PRIMARY_CTA,
    faq: MIDDLE_SCHOOL_GAMES_FAQ,
    exampleQuestions: MIDDLE_SCHOOL_GAMES_QUESTIONS,
  });
  const studentOrientationGamesPage = assembleLandingPage({
    intent: STUDENT_ORIENTATION_GAMES_INTENT,
    audience: STUDENT_ORIENTATION_GAMES_AUDIENCE,
    primaryCta: STUDENT_ORIENTATION_GAMES_PRIMARY_CTA,
    faq: STUDENT_ORIENTATION_GAMES_FAQ,
    exampleQuestions: STUDENT_ORIENTATION_GAMES_QUESTIONS,
  });
  const newEmployeeGamesPage = assembleLandingPage({
    intent: NEW_EMPLOYEE_GAMES_INTENT,
    audience: NEW_EMPLOYEE_GAMES_AUDIENCE,
    primaryCta: NEW_EMPLOYEE_GAMES_PRIMARY_CTA,
    faq: NEW_EMPLOYEE_GAMES_FAQ,
    exampleQuestions: NEW_EMPLOYEE_GAMES_QUESTIONS,
  });
  const onboardingGamesPage = assembleLandingPage({
    intent: ONBOARDING_GAMES_INTENT,
    audience: ONBOARDING_GAMES_AUDIENCE,
    primaryCta: ONBOARDING_GAMES_PRIMARY_CTA,
    faq: ONBOARDING_GAMES_FAQ,
    exampleQuestions: ONBOARDING_GAMES_QUESTIONS,
  });
  const workshopGamesPage = assembleLandingPage({
    intent: WORKSHOP_GAMES_INTENT,
    audience: WORKSHOP_GAMES_AUDIENCE,
    primaryCta: WORKSHOP_GAMES_PRIMARY_CTA,
    faq: WORKSHOP_GAMES_FAQ,
    exampleQuestions: WORKSHOP_GAMES_QUESTIONS,
  });
  const conferenceIcebreakerGamesPage = assembleLandingPage({
    intent: CONFERENCE_ICEBREAKER_GAMES_INTENT,
    audience: CONFERENCE_ICEBREAKER_GAMES_AUDIENCE,
    primaryCta: CONFERENCE_ICEBREAKER_GAMES_PRIMARY_CTA,
    faq: CONFERENCE_ICEBREAKER_GAMES_FAQ,
    exampleQuestions: CONFERENCE_ICEBREAKER_GAMES_QUESTIONS,
  });
  const familyReunionGamesPage = assembleLandingPage({
    intent: FAMILY_REUNION_GAMES_INTENT,
    audience: FAMILY_REUNION_GAMES_AUDIENCE,
    primaryCta: FAMILY_REUNION_GAMES_PRIMARY_CTA,
    faq: FAMILY_REUNION_GAMES_FAQ,
    exampleQuestions: FAMILY_REUNION_GAMES_QUESTIONS,
  });
  const holidayFamilyGamesPage = assembleLandingPage({
    intent: HOLIDAY_FAMILY_GAMES_INTENT,
    audience: HOLIDAY_FAMILY_GAMES_AUDIENCE,
    primaryCta: HOLIDAY_FAMILY_GAMES_PRIMARY_CTA,
    faq: HOLIDAY_FAMILY_GAMES_FAQ,
    exampleQuestions: HOLIDAY_FAMILY_GAMES_QUESTIONS,
  });
  const christmasFamilyGamesPage = assembleLandingPage({
    intent: CHRISTMAS_FAMILY_GAMES_INTENT,
    audience: CHRISTMAS_FAMILY_GAMES_AUDIENCE,
    primaryCta: CHRISTMAS_FAMILY_GAMES_PRIMARY_CTA,
    faq: CHRISTMAS_FAMILY_GAMES_FAQ,
    exampleQuestions: CHRISTMAS_FAMILY_GAMES_QUESTIONS,
  });
  const thanksgivingGamesPage = assembleLandingPage({
    intent: THANKSGIVING_GAMES_INTENT,
    audience: THANKSGIVING_GAMES_AUDIENCE,
    primaryCta: THANKSGIVING_GAMES_PRIMARY_CTA,
    faq: THANKSGIVING_GAMES_FAQ,
    exampleQuestions: THANKSGIVING_GAMES_QUESTIONS,
  });
  const graduationPartyGamesPage = assembleLandingPage({
    intent: GRADUATION_PARTY_GAMES_INTENT,
    audience: GRADUATION_PARTY_GAMES_AUDIENCE,
    primaryCta: GRADUATION_PARTY_GAMES_PRIMARY_CTA,
    faq: GRADUATION_PARTY_GAMES_FAQ,
    exampleQuestions: GRADUATION_PARTY_GAMES_QUESTIONS,
  });
  const babyShowerGamesPage = assembleLandingPage({
    intent: BABY_SHOWER_GAMES_INTENT,
    audience: BABY_SHOWER_GAMES_AUDIENCE,
    primaryCta: BABY_SHOWER_GAMES_PRIMARY_CTA,
    faq: BABY_SHOWER_GAMES_FAQ,
    exampleQuestions: BABY_SHOWER_GAMES_QUESTIONS,
  });
  const bridalShowerGamesPage = assembleLandingPage({
    intent: BRIDAL_SHOWER_GAMES_INTENT,
    audience: BRIDAL_SHOWER_GAMES_AUDIENCE,
    primaryCta: BRIDAL_SHOWER_GAMES_PRIMARY_CTA,
    faq: BRIDAL_SHOWER_GAMES_FAQ,
    exampleQuestions: BRIDAL_SHOWER_GAMES_QUESTIONS,
  });
  const reunionGamesPage = assembleLandingPage({
    intent: REUNION_GAMES_INTENT,
    audience: REUNION_GAMES_AUDIENCE,
    primaryCta: REUNION_GAMES_PRIMARY_CTA,
    faq: REUNION_GAMES_FAQ,
    exampleQuestions: REUNION_GAMES_QUESTIONS,
  });

  return {
    pregameGamesPage,
    boysNightGamesPage,
    vacationGamesPage,
    roadTripGamesPage,
    classroomGamesPage,
    highSchoolGamesPage,
    middleSchoolGamesPage,
    studentOrientationGamesPage,
    newEmployeeGamesPage,
    onboardingGamesPage,
    workshopGamesPage,
    conferenceIcebreakerGamesPage,
    familyReunionGamesPage,
    holidayFamilyGamesPage,
    christmasFamilyGamesPage,
    thanksgivingGamesPage,
    graduationPartyGamesPage,
    babyShowerGamesPage,
    bridalShowerGamesPage,
    reunionGamesPage,
    pages: [
      pregameGamesPage,
      boysNightGamesPage,
      vacationGamesPage,
      roadTripGamesPage,
      classroomGamesPage,
      highSchoolGamesPage,
      middleSchoolGamesPage,
      studentOrientationGamesPage,
      newEmployeeGamesPage,
      onboardingGamesPage,
      workshopGamesPage,
      conferenceIcebreakerGamesPage,
      familyReunionGamesPage,
      holidayFamilyGamesPage,
      christmasFamilyGamesPage,
      thanksgivingGamesPage,
      graduationPartyGamesPage,
      babyShowerGamesPage,
      bridalShowerGamesPage,
      reunionGamesPage,
    ],
  };
}
