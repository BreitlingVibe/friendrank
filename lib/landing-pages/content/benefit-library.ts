import type { LandingPageWhyItem } from "@/lib/landing-pages/landing-page-types";
import {
  INTENT_CATEGORIES,
  type IntentCategory,
} from "@/lib/landing-pages/planning/intent-categories";
import { BENEFIT_VERSION } from "@/lib/landing-pages/content/version";

/**
 * Fallback product-feature benefits when intent category is missing/unknown.
 * Prefer category packs via {@link resolveBenefitsForCategory}.
 * @see BENEFIT_VERSION
 */
export const GROUP_GAME_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Anonymous voting",
    description:
      "Friends vote without signing in. The group sees results, not individual ballots.",
  },
  {
    title: "No sign-up required",
    description:
      "Create a game on the homepage and share the link. That is the whole setup.",
  },
  {
    title: "One link for everyone",
    description:
      "Same URL for voting and results. Drop it in WhatsApp, iMessage, or Discord.",
  },
  {
    title: "Works on any phone",
    description:
      "Built for the mobile browser. Friends vote in seconds from the group chat.",
  },
  {
    title: "Results unlock after everyone votes",
    description:
      "The game stays locked until enough friends vote. Then you reveal together.",
  },
];

/** @see BENEFIT_VERSION */
export const PARTY_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Instant party energy",
    description:
      "Start in under a minute so the room gets involved before the night moves on.",
  },
  {
    title: "Funny group reveals",
    description:
      "Unlock chaotic roles and ranked winners the whole party can react to together.",
  },
  {
    title: "Built for celebrations",
    description:
      "Fits birthdays, game nights, sleepovers, and casual hangouts without a long host script.",
  },
  {
    title: "Everyone joins from the room",
    description:
      "Share one link at the table or in the group chat. Guests play from their phones.",
  },
  {
    title: "No setup drama",
    description:
      "No app download, no accounts, and no scavenger hunt for materials mid-party.",
  },
];

/** @see BENEFIT_VERSION */
export const FRIENDSHIP_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Inside jokes become roles",
    description:
      "Turn your group's shared references into funny picks everyone recognizes.",
  },
  {
    title: "Shared group lore",
    description:
      "Results feel like a story about your circle — not a solo quiz score.",
  },
  {
    title: "Friendly competition",
    description:
      "Friends vote on who fits each prompt so rivalry stays playful and social.",
  },
  {
    title: "Worth dropping back in the chat",
    description:
      "Unlock a shareable reveal that keeps the conversation going after you hang up.",
  },
  {
    title: "Made for close circles",
    description:
      "Works best when people already know each other and want a quick group moment.",
  },
];

/** @see BENEFIT_VERSION */
export const RELATIONSHIP_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Discover how you see each other",
    description:
      "Compare picks on playful prompts instead of filling out a form alone.",
  },
  {
    title: "Conversation after the reveal",
    description:
      "Results spark natural follow-up talk — why you voted, what surprised you.",
  },
  {
    title: "Light enough for date night",
    description:
      "Quick rounds that fit dinner, a couch night, or a video call without killing the mood.",
  },
  {
    title: "A shared moment, not a score",
    description:
      "Focuses on reacting together rather than grading compatibility percentages.",
  },
  {
    title: "Closer in a few minutes",
    description:
      "One link, private votes, and a reveal that feels intimate without being heavy.",
  },
];

/** @see BENEFIT_VERSION */
export const TEAM_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Equal participation",
    description:
      "Everyone votes from their own device so quieter teammates still get a say.",
  },
  {
    title: "Low-friction engagement",
    description:
      "Fits the first five minutes of a meeting without a facilitation deck.",
  },
  {
    title: "Works where teams already chat",
    description:
      "Share the link in Slack, Teams, email, or a video call — no new tool to learn.",
  },
  {
    title: "Inclusive, not awkward",
    description:
      "Keep prompts light so the activity warms people up instead of putting them on the spot.",
  },
  {
    title: "Shared result without hierarchy",
    description:
      "The group sees winners together. No manager has to call on people one by one.",
  },
];

/** @see BENEFIT_VERSION */
export const ICEBREAKER_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Cuts through awkward silence",
    description:
      "Give new groups something to do together before small talk runs out.",
  },
  {
    title: "Includes everyone quickly",
    description:
      "People join with one link and vote in minutes — no icebreaker worksheets.",
  },
  {
    title: "Warmup before the real agenda",
    description:
      "Use it at the start of meetings, classes, or events without eating the whole block.",
  },
  {
    title: "Low pressure to speak first",
    description:
      "Voting is private until the reveal, so quieter people can participate safely.",
  },
  {
    title: "A shared opener in one round",
    description:
      "Finish with a group reveal that gives the room an easy next conversation.",
  },
];

/** @see BENEFIT_VERSION */
export const SOCIAL_VOTING_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Private ballots",
    description:
      "Each person votes without exposing who picked whom until results unlock.",
  },
  {
    title: "Shared reveal together",
    description:
      "The same link unlocks ranked winners so the group reacts in one moment.",
  },
  {
    title: "The group decides",
    description:
      "Roles and rankings come from friends voting — not self-ratings or host fiat.",
  },
  {
    title: "One link for voting and results",
    description:
      "Create once, share once, vote and reveal without juggling apps or spreadsheets.",
  },
  {
    title: "Honest without calling people out",
    description:
      "Anonymous picks keep the fun sharp while still feeling safe for the circle.",
  },
];

/** @see BENEFIT_VERSION */
export const ENTERTAINMENT_BENEFITS: LandingPageWhyItem[] = [
  {
    title: "Prompts become a live game",
    description:
      "Question lists turn into a playable round with votes, winners, and a group reveal.",
  },
  {
    title: "Not a static question dump",
    description:
      "Friends do more than scroll prompts — they pick, unlock results, and react together.",
  },
  {
    title: "Winners you can screenshot",
    description:
      "Ranked outcomes and story-style results are built for sharing back to the chat.",
  },
  {
    title: "Browser play, no install",
    description:
      "Open the link on a phone or desktop and start without downloading another app.",
  },
  {
    title: "Replay with fresh prompts",
    description:
      "Create another round anytime with new names or questions for the same group.",
  },
];

/** @deprecated Prefer {@link FRIENDSHIP_BENEFITS} via {@link resolveBenefitsForCategory}. */
export const FRIEND_GAME_BENEFITS = FRIENDSHIP_BENEFITS;

/** @deprecated Prefer {@link SOCIAL_VOTING_BENEFITS} via {@link resolveBenefitsForCategory}. */
export const ANONYMOUS_VOTING_BENEFITS = SOCIAL_VOTING_BENEFITS;

const BENEFITS_BY_CATEGORY: Record<IntentCategory, LandingPageWhyItem[]> = {
  [INTENT_CATEGORIES.PARTY]: PARTY_BENEFITS,
  [INTENT_CATEGORIES.FRIENDSHIP]: FRIENDSHIP_BENEFITS,
  [INTENT_CATEGORIES.RELATIONSHIPS]: RELATIONSHIP_BENEFITS,
  [INTENT_CATEGORIES.TEAMS]: TEAM_BENEFITS,
  [INTENT_CATEGORIES.ICEBREAKERS]: ICEBREAKER_BENEFITS,
  [INTENT_CATEGORIES.SOCIAL_VOTING]: SOCIAL_VOTING_BENEFITS,
  [INTENT_CATEGORIES.ENTERTAINMENT]: ENTERTAINMENT_BENEFITS,
};

/** Resolves the category benefit pack, falling back to {@link GROUP_GAME_BENEFITS}. */
export function resolveBenefitsForCategory(
  category: IntentCategory | null | undefined,
): LandingPageWhyItem[] {
  if (!category) {
    return GROUP_GAME_BENEFITS;
  }

  return BENEFITS_BY_CATEGORY[category] ?? GROUP_GAME_BENEFITS;
}
