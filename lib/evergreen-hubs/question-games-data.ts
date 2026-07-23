import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenPillarPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "question-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Question Games",
  summary:
    "Question games turn prompts into social group play — especially browser-based formats with anonymous voting, funny reveals, and no downloads for friends, parties, and teams.",
  audience: "Friend groups, parties, teams, couples, and hosts looking for question prompts",
  primaryTopics: [
    "question games",
    "questions for friends",
    "online question games",
  ],
  secondaryTopics: [
    "most likely to",
    "would you rather",
    "never have i ever",
    "anonymous voting games",
  ],
  relatedConcepts: [
    "friend games",
    "party games",
    "icebreaker games",
    "anonymous voting games",
  ],
  canonicalAnswer:
    "Question games are group activities built around prompts — Would You Rather, Never Have I Ever, Most Likely To, and conversation starters turned into live play. Modern browser question games let a host share one link so everyone joins from their phone without downloads. Anonymous voting adds a reveal moment where the group discovers results together.",
  likelyQuestions: [
    "What are question games?",
    "Do question games require downloads?",
    "Can question games be played remotely?",
    "What are anonymous voting games?",
    "Which question game formats does FriendRank support?",
  ],
  keyTakeaways: [
    "Question games turn prompts into shared group experiences with conversation and laughs.",
    "Browser question games work for friends, parties, and teams with fast link-based setup.",
    "FriendRank turns question prompts into anonymous group voting with funny reveals.",
  ],
  citationSummary:
    "Question games are prompt-based group activities for friends, parties, and teams. FriendRank provides browser question games with anonymous voting, Most Likely To, and icebreaker formats.",
  parentTopic: "Social group games",
  siblingTopics: [
    "Friend games",
    "Party games",
    "Icebreaker games",
  ],
  complementaryPages: [
    "/most-likely-to-generator",
    "/anonymous-voting-games",
    "/icebreaker-games",
    "/friend-games",
    "/party-games",
  ],
});

export const questionGamesPillar: EvergreenPillarPageData = {
  slug: SLUG,
  pageKind: "pillar",
  title: "Question Games",
  metaTitle:
    "Question Games – Free Online Question Games for Groups | FriendRank",
  metaDescription:
    "Discover browser-based question games, anonymous voting games, icebreakers and funny prompts for friends, teams and parties.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Central guide to question games: what they are, how to choose the right format, why browser question games work, featured category guides, and where FriendRank fits.",
  heroLead:
    "Discover fun browser question games for friends, parties, teams and groups who want better conversations.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank question game",
  secondaryCtaLabel: "Browse Question Game Guides",
  secondaryCtaHref: "#browse-question-game-categories",
  categoryCardsTitle: "Browse Question Game Categories",
  categoryCardsSectionId: "browse-question-game-categories",
  categoryCards: [
    {
      emoji: "🎯",
      title: "Most Likely To",
      href: "/most-likely-to-generator",
    },
    {
      emoji: "🗳",
      title: "Anonymous Voting Games",
      href: "/anonymous-voting-games",
    },
    {
      emoji: "🧊",
      title: "Icebreaker Games",
      href: "/icebreaker-games",
    },
    {
      emoji: "👥",
      title: "Friend Games",
      href: "/friend-games",
    },
    {
      emoji: "🎉",
      title: "Party Games",
      href: "/party-games",
    },
    {
      emoji: "🤔",
      title: "Would You Rather",
      comingSoon: true,
    },
    {
      emoji: "🍹",
      title: "Never Have I Ever",
      comingSoon: true,
    },
    {
      emoji: "😈",
      title: "Truth or Dare",
      comingSoon: true,
    },
    {
      emoji: "⚖️",
      title: "This or That",
      comingSoon: true,
    },
    {
      emoji: "💭",
      title: "Deep Question Games",
      comingSoon: true,
    },
  ],
  featuredGuidesTitle: "Featured Guides",
  featuredGuides: [
    {
      title: "Most Likely To",
      description:
        "Classic question prompts turned into a live voting game with shared reveals for friend groups and parties.",
      href: "/most-likely-to-generator",
    },
    {
      title: "Anonymous Voting Games",
      description:
        "Turn question-style prompts into private group votes and discover funny results together.",
      href: "/anonymous-voting-games",
    },
    {
      title: "Icebreaker Games",
      description:
        "Warm up groups with fast question-based icebreakers built for phones and remote hangouts.",
      href: "/icebreaker-games",
    },
    {
      title: "Browser Party Games",
      description:
        "See how browser party formats fit question-driven group play with quick link-based setup.",
      href: "/browser-party-games",
    },
  ],
  sections: [
    {
      id: "what-are-question-games",
      title: "What are question games?",
      paragraphs: [
        "Question games are group activities built around prompts — choices, scenarios, and conversation starters that get everyone talking. Instead of one person reading questions aloud, modern formats turn prompts into shared play with votes, reactions, and reveals.",
        "Classic examples include Would You Rather, Never Have I Ever, Most Likely To, and This or That. The best question games feel inclusive: simple rules, fast rounds, and a payoff the whole group reacts to together.",
        "Many question games now run in the browser. One person creates a session, shares a link, and everyone joins from their phone. That setup works for friend groups, parties, teams, and remote hangouts without downloads or long explanations.",
      ],
    },
    {
      id: "how-to-choose-the-right-question-game",
      title: "How to choose the right question game",
      paragraphs: [
        "The right question game depends on your group, setting, and how much time you have. These filters help you pick quickly.",
      ],
      bullets: [
        "Group familiarity — close friends can handle bolder prompts; mixed groups may want lighter icebreakers",
        "Party vs team vs friends — tone shifts from silly hangouts to workplace-safe warmups",
        "In person vs remote — distributed groups need browser games everyone opens from one link",
        "Quick vs deep — icebreaker questions run fast; deep question formats need more room to talk",
        "Anonymous vs open — anonymous voting lowers pressure when answers might be teased",
        "Mobile mix — choose phone-friendly formats when most people join from their devices",
      ],
    },
    {
      id: "why-browser-question-games-work",
      title: "Why browser question games work",
      paragraphs: [
        "Browser question games have become a default for many groups because they turn familiar prompt formats into something interactive without heavy setup.",
      ],
      bullets: [
        "No download — open a link instead of coordinating app installs",
        "Instant sharing — one URL in a group chat, Discord, or meeting thread",
        "Works everywhere — couch nights, parties, and remote calls use the same format",
        "Remote friendly — friends and teams in different places play together",
        "Mobile friendly — most guests answer or vote from phones",
        "Low friction — many formats need no guest accounts",
        "Fast setup — facilitators often start in under a minute",
        "Anonymous voting — private ballots make playful picks feel less awkward",
      ],
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank turns question prompts into anonymous group voting with a shared reveal at the end. Instead of one person hosting every question aloud, the group votes from their phones and discovers results together — funny roles like Main Character, Chaos Agent, and Secret Villain included.",
    "It fits naturally in the question games category because the prompts drive conversation, but the voting layer adds replayability and surprise. Most Likely To-style questions, icebreaker warmups, and party-friendly formats all map well to the same browser flow.",
    "Browse the category cards and featured guides when you want a specific angle — Most Likely To, icebreakers, or anonymous voting — without turning the session into a sales pitch.",
  ],
  internalLinksTitle: "Related Guides",
  internalLinksIntro:
    "Explore FriendRank guides for question games and nearby social game categories.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/party-games", label: "Party games pillar" },
    { href: "/friend-games", label: "Friend games pillar" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games guide" },
    { href: "/icebreaker-games", label: "Icebreaker games guide" },
    { href: "/browser-party-games", label: "Browser party games guide" },
    { href: "/would-you-rather-friends", label: "Would You Rather for friends" },
    { href: "/group-voting-game", label: "Online voting game for groups" },
  ],
  faqTitle: "Question games FAQ",
  faq: [
    {
      question: "What are question games?",
      answer:
        "Question games are group activities built around prompts — choices, scenarios, and conversation starters that get everyone participating together.",
    },
    {
      question: "Do question games require downloads?",
      answer:
        "Not for browser-based formats. Many question games run from a shared link on phones without installing an app.",
    },
    {
      question: "Can question games be played remotely?",
      answer:
        "Yes. Browser question games work well for remote friends, virtual teams, and online group chats.",
    },
    {
      question: "What are anonymous voting games?",
      answer:
        "Anonymous voting games let a group vote on prompts without showing individual ballots, then reveal the combined result together.",
    },
    {
      question: "Are question games good for parties?",
      answer:
        "Yes. Quick prompt-based games with voting or reveals work well when a group wants energy without complicated rules.",
    },
    {
      question: "Can FriendRank be used for question games?",
      answer:
        "Yes. FriendRank turns question-style prompts into anonymous group voting with funny shared reveals.",
    },
    {
      question: "Do players need accounts?",
      answer:
        "Guests can usually join a FriendRank game from the shared invite link without creating an account.",
    },
    {
      question: "How long do question games last?",
      answer:
        "Many question game rounds run five to fifteen minutes, though groups often replay when setup is fast.",
    },
    {
      question: "Which question formats are available today?",
      answer:
        "FriendRank supports Most Likely To, anonymous voting, icebreakers, and related browser formats — with more prompt categories coming soon.",
    },
    {
      question: "Are question games good for teams?",
      answer:
        "Yes, when prompts stay light and inclusive. Browser icebreakers and anonymous voting work well for workplace warmups.",
    },
  ],
  geoFoundation,
  aiCitation,
};
