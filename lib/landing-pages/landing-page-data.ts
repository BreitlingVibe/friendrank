import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { CUSTOM_CATEGORY_PLACEHOLDERS } from "@/lib/game-build";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

const CREATE_GAME_HREF = `${PRODUCTION_APP_URL}/#create-game`;

export const mostLikelyToGeneratorPage: LandingPageData = {
  slug: "most-likely-to-generator",
  title: "Most Likely To Generator",
  metaTitle: "Most Likely To Generator – Create a Friend Voting Game | FriendRank",
  metaDescription:
    "Create a Most Likely To game for your friends. Invite your group, vote anonymously, reveal funny roles, and share the results.",
  canonicalUrl: `${PRODUCTION_APP_URL}/most-likely-to-generator`,
  h1: "Most Likely To Generator",
  heroSubtitle:
    "Create a Most Likely To game for your friend group. Vote anonymously, unlock funny roles, and share the results — no signup required.",
  primaryCta: {
    label: "Create your Most Likely To game",
    href: CREATE_GAME_HREF,
  },
  secondaryCta: {
    label: "See example questions",
    href: "#example-questions",
  },
  intentSummaryTitle: "What is a Most Likely To generator?",
  intentSummary:
    "A Most Likely To generator helps your group run classic “most likely to…” prompts as a live voting game. FriendRank turns those prompts into a shareable game: you add friend names, invite the group, everyone votes on their phone, and results unlock with ranked roles and a group story. It works for parties, college groups, Discord servers, and casual hangouts — in the mobile browser, with no account needed.",
  whyFriendRankTitle: "Why use FriendRank for Most Likely To?",
  whyFriendRank: [
    {
      title: "Anonymous voting",
      description:
        "Friends vote without accounts. Individual ballots stay private; the group only sees aggregated winners and narrative results.",
    },
    {
      title: "Friends decide the roles",
      description:
        "Each category becomes a vote — who is most likely to go viral, start drama, or disappear from the group chat. Your group picks, not a random quiz.",
    },
    {
      title: "Results unlock after votes",
      description:
        "The game stays locked until enough friends vote. Then everyone opens the same link to reveal category winners together.",
    },
    {
      title: "Shareable cinematic report",
      description:
        "Unlocked results include ranked roles, group verdict copy, and a highlight card you can share back to WhatsApp, iMessage, or Discord.",
    },
  ],
  playImmediatelyTitle: "Play immediately",
  playImmediatelyBody:
    "FriendRank runs the full create → invite → vote → reveal flow on the homepage. Add your group, optionally enter custom Most Likely To prompts, and share the game link in under a minute.",
  exampleQuestionsTitle: "Example Most Likely To questions",
  exampleQuestions: [
    { text: "Who is most likely to disappear from the group chat?" },
    { text: "Who is most likely to start drama and deny it?" },
    { text: "Who is most likely to be late but somehow forgiven?" },
    { text: "Who is most likely to go viral?" },
    { text: "Who is the Main Character?" },
  ],
  exampleResultsTitle: "Example results your group can unlock",
  exampleResults: [
    {
      title: "Main Character",
      emoji: "👑",
      description:
        "The friend the whole story revolves around — ranked from group votes, not a preset quiz answer.",
    },
    {
      title: "Chaos Agent",
      emoji: "🔥",
      description:
        "Certified chaos energy. A classic Most Likely To outcome when the group picks who escalates everything.",
    },
    {
      title: "Secret Villain",
      emoji: "💀",
      description:
        "The quiet mastermind role — perfect for “most likely to stir drama from the shadows” style prompts.",
    },
    {
      title: "Final group story",
      emoji: "🎭",
      description:
        "After votes unlock, FriendRank generates a narrative summary — verdict, vibe, combos, and a shareable ending card.",
    },
  ],
  faqTitle: "Most Likely To game FAQ",
  faq: [
    {
      question: "Is this a free Most Likely To generator?",
      answer:
        "Yes. FriendRank is free in the browser at friendrank.app. Create a game, share the link, and play with your group at no cost.",
    },
    {
      question: "Do I need to sign up?",
      answer:
        "No signup is required. The host creates a game on the homepage and shares a link. Voters open it on their phone and tap through five questions.",
    },
    {
      question: "Can I use my own Most Likely To prompts?",
      answer:
        "Yes. When creating a game you can enter up to three custom category prompts. FriendRank fills the remaining slots with curated defaults.",
    },
    {
      question: "Is voting anonymous?",
      answer:
        "Votes are aggregated. The group sees winners and story-style results, not a public list of who voted for whom. No accounts are required.",
    },
    {
      question: "How many people can play?",
      answer:
        "List two to eight friend names when creating the game. Results unlock after enough distinct votes are collected — typically at least as many votes as friends in the game.",
    },
    {
      question: "Does it work on mobile?",
      answer:
        "Yes. FriendRank is built for the mobile browser. Share the game link in WhatsApp or any chat app and friends vote on their phones.",
    },
    {
      question: "When do results appear?",
      answer:
        "Results stay locked until the vote threshold is met. Then anyone with the game link can open it to view ranked roles and the group story.",
    },
    {
      question: "Who is this for?",
      answer:
        "Friend groups, parties, college groups, Discord communities, couples with friends, icebreakers, and casual team hangouts — anywhere you want a quick Most Likely To style vote.",
    },
  ],
  relatedPagesTitle: "Related FriendRank pages",
  relatedPages: [
    {
      slug: "anonymous-voting-game",
      title: "Anonymous Voting Game",
      available: false,
    },
    {
      slug: "friend-ranking-game",
      title: "Friend Ranking Game",
      available: false,
    },
    {
      slug: "party-voting-game",
      title: "Party Voting Game",
      available: false,
    },
    {
      slug: "group-voting-game",
      title: "Group Voting Game",
      available: false,
    },
  ],
  finalCtaTitle: "Start your Most Likely To game",
  finalCtaSubtitle:
    "Free, mobile-friendly, and ready to share in under a minute. No app download.",
  ctaLocation: "landing_most_likely_to_generator",
  gamePreset: {
    suggestedCustomCategories: [...CUSTOM_CATEGORY_PLACEHOLDERS],
    suggestedVibeTags: ["Party", "College", "Discord"],
    suggestedTone: "Funny",
  },
  schemaDescription:
    "Create a Most Likely To voting game for your friends with FriendRank. Groups vote anonymously on phone, unlock funny roles after enough votes, and share results — no signup required.",
};

export const LANDING_PAGES: LandingPageData[] = [mostLikelyToGeneratorPage];

export function getLandingPageBySlug(slug: string): LandingPageData | undefined {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
