/** Reusable intent categories for programmatic SEO planning. */
export const INTENT_CATEGORIES = {
  SOCIAL_VOTING: "Social Voting",
  FRIENDSHIP: "Friendship",
  PARTY: "Party",
  ICEBREAKERS: "Icebreakers",
  TEAMS: "Teams",
  RELATIONSHIPS: "Relationships",
  ENTERTAINMENT: "Entertainment",
} as const;

export type IntentCategory =
  (typeof INTENT_CATEGORIES)[keyof typeof INTENT_CATEGORIES];

export const INTENT_CATEGORY_LIST: IntentCategory[] = [
  INTENT_CATEGORIES.SOCIAL_VOTING,
  INTENT_CATEGORIES.FRIENDSHIP,
  INTENT_CATEGORIES.PARTY,
  INTENT_CATEGORIES.ICEBREAKERS,
  INTENT_CATEGORIES.TEAMS,
  INTENT_CATEGORIES.RELATIONSHIPS,
  INTENT_CATEGORIES.ENTERTAINMENT,
];
