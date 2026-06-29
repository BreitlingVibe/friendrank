import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

const CREATE_GAME_HREF = `${PRODUCTION_APP_URL}/#create-game`;

const PRIMARY_CTA_LABEL = "Create Your Most Likely To Game";

const POPULAR_MOST_LIKELY_TO_QUESTIONS = [
  { text: "Who is most likely to become famous?" },
  { text: "Who is most likely to survive a zombie apocalypse?" },
  { text: "Who is most likely to reply last?" },
  { text: "Who is most likely to forget a birthday?" },
  { text: "Who is most likely to become CEO?" },
  { text: "Who is most likely to go viral?" },
  { text: "Who is most likely to disappear for a week?" },
  { text: "Who is most likely to make everyone laugh?" },
  { text: "Who is most likely to win the lottery?" },
  { text: "Who is most likely to get lost while using Google Maps?" },
  { text: "Who is most likely to start a business?" },
  { text: "Who is most likely to accidentally become famous?" },
  { text: "Who is most likely to text the wrong person?" },
  { text: "Who is most likely to sleep through an alarm?" },
  { text: "Who is most likely to plan the next trip?" },
] as const;

export const mostLikelyToGeneratorPage: LandingPageData = {
  slug: "most-likely-to-generator",
  title: "Most Likely To Generator",
  metaTitle: "Most Likely To Generator – Create a Friend Voting Game | FriendRank",
  metaDescription:
    "Create a Most Likely To game for your friends. Invite your group, vote anonymously, reveal funny roles, and share the results.",
  canonicalUrl: `${PRODUCTION_APP_URL}/most-likely-to-generator`,
  h1: "Most Likely To Generator for Friends",
  heroSubtitle:
    'Create a hilarious "Most Likely To" game in under a minute. Add your friends, share one link, let everyone vote anonymously, then reveal the funniest results together.',
  primaryCta: {
    label: PRIMARY_CTA_LABEL,
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See Example Questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a Most Likely To generator?",
  intentSummary:
    'A Most Likely To generator turns classic "most likely to" prompts into a live voting game for your friend group. With FriendRank, you add names, share one link, and everyone votes on their phone. When enough friends have voted, results unlock with ranked winners and a group story you can share back to the chat. No app download. No account needed.',
  whyFriendRankTitle: "Why FriendRank works for Most Likely To",
  whyFriendRank: [
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
  ],
  playImmediatelyTitle: "Ready to play?",
  playImmediatelyBody:
    "Head to the FriendRank homepage, add your group, and paste in any Most Likely To prompts you like. You will get a share link in under a minute.",
  exampleQuestionsTitle: "Popular Most Likely To Questions",
  exampleQuestions: [...POPULAR_MOST_LIKELY_TO_QUESTIONS],
  exampleResultsTitle: "What your group unlocks after voting",
  exampleResults: [
    {
      title: "Main Character",
      emoji: "👑",
      description:
        "The friend your group picks as the center of the story. Voted by the group, not assigned by a quiz.",
    },
    {
      title: "Chaos Agent",
      emoji: "🔥",
      description:
        "The friend most likely to stir things up. A classic Most Likely To outcome.",
    },
    {
      title: "Secret Villain",
      emoji: "💀",
      description:
        "The quiet mastermind. Great for drama-from-the-shadows style prompts.",
    },
    {
      title: "Final group story",
      emoji: "🎭",
      description:
        "A narrative wrap-up with verdict, vibe, and a shareable ending card for the group chat.",
    },
  ],
  faqTitle: "Most Likely To game FAQ",
  faq: [
    {
      question: "Is this a free Most Likely To generator?",
      answer:
        "Yes. FriendRank is free at friendrank.app. Create a game, share the link, and play with your group.",
    },
    {
      question: "Can we play without creating an account?",
      answer:
        "Yes. No sign-up, email, or password. The host creates a game and shares the link.",
    },
    {
      question: "Can I create my own Most Likely To questions?",
      answer:
        "Yes. Enter up to three custom prompts when you create a game. FriendRank fills the rest with defaults.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Votes are private to each person. The group only sees aggregated winners and story-style results.",
    },
    {
      question: "How many friends can join a Most Likely To game?",
      answer:
        "Add two to eight names when you create the game. Results unlock after enough friends vote.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. Share the link in any chat app and friends vote on their phones. No install needed.",
    },
    {
      question: "When do results show up?",
      answer:
        "After enough friends vote, results unlock on the same link for everyone to view together.",
    },
    {
      question: "Who is this for?",
      answer:
        "Friend groups, parties, college groups, Discord servers, couples, icebreakers, and casual hangouts.",
    },
  ],
  relatedPagesTitle: "Related games",
  relatedPages: [
    {
      slug: "best-friend-quiz",
      title: "Best Friend Quiz",
      available: false,
    },
    {
      slug: "friendship-test",
      title: "Friendship Test",
      available: false,
    },
    {
      slug: "who-knows-me-best",
      title: "Who Knows Me Best",
      available: false,
    },
  ],
  finalCtaTitle: "Make your Most Likely To game",
  finalCtaSubtitle:
    "Free, works on any phone, and ready to share in under a minute.",
  ctaLocation: "landing_most_likely_to_generator",
  gamePreset: {
    suggestedCustomCategories: [...CUSTOM_CATEGORY_PLACEHOLDERS],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  },
  schemaDescription:
    "Create a Most Likely To voting game for your friends with FriendRank. Groups vote anonymously on phone, unlock funny roles after enough votes, and share results. No signup required.",
};

export const LANDING_PAGES: LandingPageData[] = [mostLikelyToGeneratorPage];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
