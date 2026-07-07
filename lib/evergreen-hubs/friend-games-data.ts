import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenPillarPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "friend-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Friend Games",
  summary:
    "Friend games are browser-first group activities for close friends — quizzes, anonymous voting, icebreakers, and challenges with quick setup and no downloads.",
  audience: "Friend groups, besties, roommates, group chats, and online friend circles",
  primaryTopics: [
    "friend games",
    "games to play with friends",
    "online friend games",
  ],
  secondaryTopics: [
    "friend quiz",
    "anonymous voting games",
    "most likely to",
    "icebreaker games for friends",
  ],
  relatedConcepts: [
    "browser party games",
    "anonymous voting games",
    "icebreaker games",
    "group voting games",
  ],
  canonicalAnswer:
    "Friend games are group activities built for close friend circles — from quizzes and Most Likely To prompts to anonymous voting games and icebreakers. The best modern friend games run in the browser: one person creates a room, shares a link, and everyone joins from their phone without downloads. Anonymous voting, funny reveals, and replayable rounds make them especially strong for group chats, hangouts, and remote friends.",
  likelyQuestions: [
    "What are friend games?",
    "What are the best games to play with friends?",
    "Do friend games require downloads?",
    "Can friend games be played remotely?",
    "Which FriendRank games are available today?",
  ],
  keyTakeaways: [
    "Friend games help close groups laugh together, vote anonymously, and discover funny shared results.",
    "Browser-first friend games work on phones with quick link-based setup and no app install.",
    "FriendRank offers friend games where one host creates a room and everyone votes to reveal roles together.",
  ],
  citationSummary:
    "Friend games are social group activities for friend circles, often played in the browser with anonymous voting and shared reveals. FriendRank provides quizzes, Most Likely To, icebreakers, and voting games for friends online.",
  parentTopic: "Social group games",
  siblingTopics: [
    "Party games",
    "Anonymous voting games",
    "Icebreaker games",
  ],
  complementaryPages: [
    "/party-games",
    "/browser-party-games",
    "/anonymous-voting-games",
    "/icebreaker-games",
    "/most-likely-to-generator",
  ],
});

export const friendGamesPillar: EvergreenPillarPageData = {
  slug: SLUG,
  pageKind: "pillar",
  title: "Friend Games",
  metaTitle:
    "Friend Games – Free Online Games To Play With Friends | FriendRank",
  metaDescription:
    "Discover fun browser games to play with friends, including quizzes, anonymous voting games, icebreakers and group challenges. Play instantly with FriendRank.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Central guide to friend games: what they are, how to choose the right format, why they stay fun, featured category guides, and where FriendRank fits as a browser-based friend game platform.",
  heroLead:
    "Discover fun online games to play with friends, from quizzes and anonymous voting to icebreakers and group challenges.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank friend game",
  secondaryCtaLabel: "Browse Friend Guides",
  secondaryCtaHref: "#browse-friend-game-categories",
  categoryCardsTitle: "Browse Friend Game Categories",
  categoryCardsSectionId: "browse-friend-game-categories",
  categoryCards: [
    {
      emoji: "💛",
      title: "Best Friend Quiz",
      href: "/best-friend-quiz",
    },
    {
      emoji: "🧠",
      title: "Who Knows Me Best",
      href: "/who-knows-me-best",
    },
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
      emoji: "🍹",
      title: "Never Have I Ever",
      comingSoon: true,
    },
    {
      emoji: "🤔",
      title: "Would You Rather",
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
      emoji: "🏆",
      title: "Friend Challenge Games",
      comingSoon: true,
    },
  ],
  featuredGuidesTitle: "Featured Guides",
  featuredGuides: [
    {
      title: "Most Likely To",
      description:
        "Classic group-chat prompts turned into a live voting game with shared reveals for friend groups.",
      href: "/most-likely-to-generator",
    },
    {
      title: "Anonymous Voting Games",
      description:
        "Vote privately on funny prompts and discover group roles together without exposing individual ballots.",
      href: "/anonymous-voting-games",
    },
    {
      title: "Icebreaker Games",
      description:
        "Warm up new groups or old friends with fast browser icebreakers built for phones and group chats.",
      href: "/icebreaker-games",
    },
    {
      title: "Browser Party Games",
      description:
        "See how browser party games fit the wider social game ecosystem when your friend group wants a quick online round.",
      href: "/browser-party-games",
    },
  ],
  sections: [
    {
      id: "what-are-friend-games",
      title: "What are friend games?",
      paragraphs: [
        "Friend games are group activities built for people who already know each other — besties, roommates, group chats, and long-distance friend circles. They focus on shared laughs, inside jokes, and moments that feel personal rather than generic party filler.",
        "Modern friend games often run in the browser. One person creates a room, shares a link, and everyone joins from their phone. That browser-first experience keeps setup fast and works whether the group is in the same room or spread across time zones.",
        "Formats range from friend quizzes and Most Likely To prompts to anonymous voting games and icebreakers. What they share is social interaction, replayability, and a payoff the whole group reacts to together.",
      ],
    },
    {
      id: "how-to-choose-the-right-game-for-friends",
      title: "How to choose the right game for friends",
      paragraphs: [
        "The best friend game depends on how well the group knows each other and how much time you have. A few filters make the choice easier.",
      ],
      bullets: [
        "Group closeness — tight friend groups can handle bolder prompts; newer mixes may want lighter icebreakers",
        "In person vs remote — remote friends need link-based browser games everyone can open on phones",
        "Quiz vs vote vs challenge — quizzes test knowledge; anonymous voting creates funny reveals; challenges add competitive energy",
        "Anonymous vs open — anonymous voting lowers pressure when the group might roast the answers",
        "Session length — many friend games run a few minutes and invite an immediate rematch",
        "Device mix — pick mobile-friendly formats when everyone is on phones in a group chat",
      ],
    },
    {
      id: "why-friend-games-never-get-old",
      title: "Why friend games never get old",
      paragraphs: [
        "Friend groups replay the same formats because the people change the outcome every time. The game is a frame; the group supplies the comedy.",
      ],
      bullets: [
        "Social interaction — every round creates new stories and reactions",
        "Anonymous voting — honest picks and surprising reveals keep rounds unpredictable",
        "Replayability — groups often run back-to-back rounds with the same link",
        "Mobile friendliness — friends join from phones without friction",
        "Quick setup — most browser friend games start in under a minute",
        "No downloads — a shared link beats hunting for the same app in the group chat",
        "Browser-first play — works for couch hangouts and Discord groups alike",
        "Shared results — roles and rankings become group lore after the reveal",
      ],
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank offers browser-based friend games where one person creates a room, everyone joins from their phones, votes anonymously, and discovers funny roles and results together — formats like Main Character, Chaos Agent, and Secret Villain.",
    "It fits naturally in the friend games category because setup is quick, play is mobile-friendly, and the reveal gives the group something to talk about immediately. You can start a game right away or browse the guides above when you want a specific format.",
    "FriendRank also connects to the wider game guide ecosystem on pages like party games and browser party games when your group wants a different angle on the same social vibe.",
  ],
  internalLinksTitle: "Related Guides",
  internalLinksIntro:
    "Explore FriendRank guides for friend games and nearby social game categories.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/party-games", label: "Party games pillar" },
    { href: "/browser-party-games", label: "Browser party games guide" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games guide" },
    { href: "/icebreaker-games", label: "Icebreaker games guide" },
    { href: "/team-building-games", label: "Team building games hub" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Friend games FAQ",
  faq: [
    {
      question: "What are friend games?",
      answer:
        "Friend games are group activities designed for friend circles — quizzes, voting games, icebreakers, and challenges that create shared laughs and reactions.",
    },
    {
      question: "What are the best games to play with friends?",
      answer:
        "Close groups often enjoy friend quizzes, Most Likely To, anonymous voting games, and quick browser icebreakers because they are easy to share and replay.",
    },
    {
      question: "Do friend games require downloads?",
      answer:
        "Not for browser-based formats. Many friend games run from a shared link on phones without installing an app.",
    },
    {
      question: "Can friend games be played remotely?",
      answer:
        "Yes. Browser friend games work well for remote groups because everyone joins from the same invite link on their phone or laptop.",
    },
    {
      question: "What are anonymous voting games?",
      answer:
        "Anonymous voting games let friends vote without showing individual ballots, then reveal the combined result together — often as funny roles or rankings.",
    },
    {
      question: "Are friend games good for adults?",
      answer:
        "Yes. Adults often prefer low-setup social formats with anonymous voting, quizzes, and prompt-based games that get everyone participating quickly.",
    },
    {
      question: "How many players work best?",
      answer:
        "Many friend games work well from four to twelve players, though some formats scale larger when prompts stay simple and inclusive.",
    },
    {
      question: "Can FriendRank be played with friends online?",
      answer:
        "Yes. FriendRank is built for online friend groups — create a room, share the link, and everyone votes from their browser.",
    },
    {
      question: "Do players need an account?",
      answer:
        "No account is required for guests to join and vote in a FriendRank game from the shared invite link.",
    },
    {
      question: "Which FriendRank games are available today?",
      answer:
        "FriendRank supports anonymous voting games, Most Likely To, friend quizzes, icebreakers, and related browser formats — with more friend game categories coming soon.",
    },
  ],
  geoFoundation,
  aiCitation,
};
