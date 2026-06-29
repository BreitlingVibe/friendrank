import type { LandingPageWhyItem } from "@/lib/landing-pages/landing-page-types";
import { BENEFIT_VERSION } from "@/lib/landing-pages/content/version";

/** @see BENEFIT_VERSION */
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

/** Alias for anonymous and friend-group voting intents. */
export const FRIEND_GAME_BENEFITS = GROUP_GAME_BENEFITS;

/** Alias for anonymous voting intents. */
export const ANONYMOUS_VOTING_BENEFITS = GROUP_GAME_BENEFITS;
