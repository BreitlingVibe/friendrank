import { PRODUCTION_APP_URL } from "@/lib/app-url";
import type { LandingPageCta } from "@/lib/landing-pages/landing-page-types";
import { CTA_VERSION } from "@/lib/landing-pages/content/version";

/** @see CTA_VERSION */
export const CREATE_GAME_HREF = `${PRODUCTION_APP_URL}/#create-game`;

/** @see CTA_VERSION */
export const PLAY_IMMEDIATELY_TITLE = "Create your game in under a minute";

/** @see CTA_VERSION */
export const EXAMPLE_QUESTIONS_SECONDARY_CTA: LandingPageCta = {
  label: "See Example Questions",
  href: "#example-questions",
};

/** @see CTA_VERSION */
export const EXAMPLE_RESULTS_TITLE = "What your group unlocks after voting";

/** @see CTA_VERSION */
export const RELATED_GAMES_TITLE = "Related games";

/** @see CTA_VERSION */
export const FINAL_CTA_SUBTITLE_MOBILE =
  "Free, works on any phone, and ready to share in under a minute.";

/** @see CTA_VERSION */
export const MOST_LIKELY_TO_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Most Likely To Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const BEST_FRIEND_QUIZ_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Best Friend Quiz",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const WHO_KNOWS_ME_BEST_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Who Knows Me Best Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const FRIENDSHIP_TEST_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Friendship Test",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const ANONYMOUS_VOTING_PRIMARY_CTA: LandingPageCta = {
  label: "Create Anonymous Voting Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const GROUP_VOTING_PRIMARY_CTA: LandingPageCta = {
  label: "Create Group Voting Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const PARTY_VOTING_PRIMARY_CTA: LandingPageCta = {
  label: "Create Party Voting Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const ICEBREAKER_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Icebreaker Game",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const OFFICE_ICEBREAKER_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Office Icebreaker",
  href: CREATE_GAME_HREF,
};

/** @see CTA_VERSION */
export const CLASSROOM_ICEBREAKER_PRIMARY_CTA: LandingPageCta = {
  label: "Create Your Classroom Icebreaker",
  href: CREATE_GAME_HREF,
};
