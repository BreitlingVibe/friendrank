import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type { LandingPageGamePreset } from "@/lib/landing-pages/landing-page-types";
import { INTENT_VERSION } from "@/lib/landing-pages/content/version";

/** @see INTENT_VERSION */
export const MOST_LIKELY_TO_INTENT = {
  slug: "most-likely-to-generator",
  title: "Most Likely To Generator",
  metaTitle:
    "Most Likely To Generator | Create a Friend Voting Game | FriendRank",
  metaDescription:
    "Create a Most Likely To game for your friends. Invite your group, vote anonymously, reveal funny roles, and share the results.",
  h1: "Most Likely To Generator for Friends",
  intentSummaryTitle: "What is a Most Likely To generator?",
  intentSummary:
    'A Most Likely To generator turns classic "most likely to" prompts into a live voting game for your friend group. With FriendRank, you add names, share one link, and everyone votes on their phone. When enough friends have voted, results unlock with ranked winners and a group story you can share back to the chat. No app download. No account needed.',
  whyFriendRankTitle: "Why FriendRank works for Most Likely To",
  exampleQuestionsTitle: "Popular Most Likely To Questions",
  faqTitle: "Most Likely To game FAQ",
  schemaDescription:
    "Create a Most Likely To voting game for your friends with FriendRank. Groups vote anonymously on phone, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_most_likely_to_generator" as const,
  gamePreset: {
    suggestedCustomCategories: [...CUSTOM_CATEGORY_PLACEHOLDERS],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const BEST_FRIEND_QUIZ_INTENT = {
  slug: "best-friend-quiz",
  title: "Best Friend Quiz",
  metaTitle: "Best Friend Quiz | Create a Fun Friend Voting Game | FriendRank",
  metaDescription:
    "Create a best friend quiz for your group. Add friends, vote anonymously, reveal funny roles, and share the results in minutes.",
  h1: "Best Friend Quiz for Groups",
  intentSummaryTitle: "What is a best friend quiz?",
  intentSummary:
    "A best friend quiz is a playful way to see how well your group knows each other. FriendRank is not a boring compatibility test. It is a group voting game where friends pick who fits each role, vote anonymously on their phones, and unlock funny results together. Perfect for best friend groups, roommates, and close friend circles.",
  whyFriendRankTitle: "Why FriendRank beats a typical best friend quiz",
  exampleQuestionsTitle: "Popular best friend quiz questions",
  faqTitle: "Best friend quiz FAQ",
  schemaDescription:
    "Create a best friend quiz for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_best_friend_quiz" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows the group best",
      "Who gives the best advice",
      "Who is the most loyal friend",
    ],
    suggestedVibeTags: ["College", "Discord", "Party"],
    suggestedTone: "Wholesome",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const WHO_KNOWS_ME_BEST_INTENT = {
  slug: "who-knows-me-best",
  title: "Who Knows Me Best",
  metaTitle: "Who Knows Me Best Game | Play With Friends Online | FriendRank",
  metaDescription:
    "Create a Who Knows Me Best game for friends. Share one link, vote anonymously, unlock funny roles, and reveal your group story.",
  h1: "Who Knows Me Best Game",
  intentSummaryTitle: "What is a Who Knows Me Best game?",
  intentSummary:
    "A Who Knows Me Best game tests which friend knows you the most. With FriendRank, the whole group votes on funny social roles instead of filling out a solo quiz. Everyone picks from the friend list, votes on their phone, and results unlock with ranked winners and a shareable group story. Great for birthdays, group chats, and friend hangouts.",
  whyFriendRankTitle: "Why FriendRank works for Who Knows Me Best",
  exampleQuestionsTitle: "Popular Who Knows Me Best questions",
  faqTitle: "Who Knows Me Best FAQ",
  schemaDescription:
    "Create a Who Knows Me Best game for friends with FriendRank. Groups vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_who_knows_me_best" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who knows me best",
      "Who would guess my favorite food",
      "Who knows my worst habit",
    ],
    suggestedVibeTags: ["College", "Family", "Discord"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const FRIENDSHIP_TEST_INTENT = {
  slug: "friendship-test",
  title: "Friendship Test",
  metaTitle: "Friendship Test | Create a Fun Group Voting Game | FriendRank",
  metaDescription:
    "Create a friendship test for your group. Invite friends, vote anonymously, reveal funny roles, and share the results.",
  h1: "Friendship Test for Groups",
  intentSummaryTitle: "What is a friendship test?",
  intentSummary:
    "A friendship test is a fun way to explore how your group sees each other. Most online friendship quizzes are solo and static. FriendRank makes it social: the whole group votes on who fits each role, results unlock together, and you get shareable story-style output for the chat. No app download. No account needed.",
  whyFriendRankTitle: "Why FriendRank is a better friendship test",
  exampleQuestionsTitle: "Popular friendship test questions",
  faqTitle: "Friendship test FAQ",
  schemaDescription:
    "Create a friendship test for your group with FriendRank. Friends vote anonymously, unlock funny roles after enough votes, and share results. No signup required.",
  ctaLocation: "landing_friendship_test" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the most loyal friend",
      "Who gives the best advice",
      "Who is most likely to keep everyone together",
    ],
    suggestedVibeTags: ["Party", "College", "Soft drama"],
    suggestedTone: "Savage but friendly",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const ANONYMOUS_VOTING_INTENT = {
  slug: "anonymous-voting-game",
  title: "Anonymous Voting Game",
  metaTitle: "Anonymous Voting Game | Vote With Friends Online | FriendRank",
  metaDescription:
    "Create an anonymous voting game for friends. Share one link, vote privately, unlock group results, and reveal funny roles together.",
  h1: "Anonymous Voting Game for Friends",
  intentSummaryTitle: "What is an anonymous voting game?",
  intentSummary:
    "An anonymous voting game lets a group pick winners for fun categories without exposing individual ballots. FriendRank handles the whole flow: add friend names, share one link, everyone votes on their phone, and results unlock when enough votes are in. No accounts, no app download, and no public record of who voted for whom.",
  whyFriendRankTitle: "Why FriendRank for anonymous group voting",
  exampleQuestionsTitle: "Popular anonymous voting questions",
  faqTitle: "Anonymous voting FAQ",
  schemaDescription:
    "Create an anonymous voting game for friends with FriendRank. Share one link, vote privately, unlock group results and funny roles. No signup required.",
  ctaLocation: "landing_anonymous_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who gives the best advice",
      "Who is secretly the funniest",
      "Who would survive a zombie apocalypse",
    ],
    suggestedVibeTags: ["Discord", "College", "Brutal honesty"],
    suggestedTone: "Funny",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const GROUP_VOTING_INTENT = {
  slug: "group-voting-game",
  title: "Group Voting Game",
  metaTitle: "Group Voting Game | Create a Friend Vote Online | FriendRank",
  metaDescription:
    "Create a group voting game for friends. Invite your group, vote on funny roles, unlock results together, and share the story.",
  h1: "Group Voting Game for Friends",
  intentSummaryTitle: "What is a group voting game?",
  intentSummary:
    "A group voting game turns your friend list into a live poll with personality. FriendRank follows a simple flow: create a game with names, invite the group with one link, let everyone vote on their phone, then reveal ranked roles and a group story when enough votes are in. It works for friend groups, roommates, Discord servers, and casual hangouts.",
  whyFriendRankTitle: "Why FriendRank for group voting",
  exampleQuestionsTitle: "Popular group voting questions",
  faqTitle: "Group voting game FAQ",
  schemaDescription:
    "Create a group voting game for friends with FriendRank. Invite the group, vote on funny roles, unlock results together, and share the story. No signup required.",
  ctaLocation: "landing_group_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Who is the Main Character",
      "Who is the Chaos Agent",
      "Who is the biggest foodie",
    ],
    suggestedVibeTags: ["Gaming", "Discord", "Meme-heavy"],
    suggestedTone: "Chaotic",
  } satisfies LandingPageGamePreset,
};

/** @see INTENT_VERSION */
export const PARTY_VOTING_INTENT = {
  slug: "party-voting-game",
  title: "Party Voting Game",
  metaTitle: "Party Voting Game | Fun Group Vote for Parties | FriendRank",
  metaDescription:
    "Create a party voting game for your group. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and college parties.",
  h1: "Party Voting Game for Groups",
  intentSummaryTitle: "What is a party voting game?",
  intentSummary:
    "A party voting game gives your group something quick and funny to do together. FriendRank lets everyone vote on their phone while the party is going. Pick categories like who starts dancing first or who has the loudest laugh, collect anonymous votes, and unlock shareable results for the room or the group chat. Works with or without drinks, and fine for mixed-age friend groups.",
  whyFriendRankTitle: "Why FriendRank works at parties",
  exampleQuestionsTitle: "Popular party voting questions",
  faqTitle: "Party voting game FAQ",
  schemaDescription:
    "Create a party voting game for your group with FriendRank. Anonymous votes, funny roles, and shareable results for birthdays, game nights, and friend parties. No signup required.",
  ctaLocation: "landing_party_voting_game" as const,
  gamePreset: {
    suggestedCustomCategories: [
      "Most likely to start dancing first",
      "Who has the loudest laugh",
      "Who is most likely to lose their phone",
    ],
    suggestedVibeTags: ["Party", "College", "Chaotic"],
    suggestedTone: "Chaotic",
  } satisfies LandingPageGamePreset,
};

export function getCanonicalUrl(slug: string): string {
  return `${PRODUCTION_APP_URL}/${slug}`;
}
