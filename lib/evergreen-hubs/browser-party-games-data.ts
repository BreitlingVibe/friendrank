import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "browser-party-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Browser Party Games",
  summary:
    "Browser party games are quick online group games that run in a web browser without downloads, making them easy to share for parties, remote hangouts, and icebreakers.",
  audience: "Friend groups, party hosts, remote teams, and casual group chats",
  primaryTopics: [
    "browser party games",
    "free browser party games",
    "online browser games for friends",
  ],
  secondaryTopics: [
    "party games without download",
    "quick games for groups",
    "mobile browser party games",
  ],
  relatedConcepts: [
    "anonymous voting games",
    "icebreaker games",
    "group voting games",
    "remote party games",
  ],
  canonicalAnswer:
    "Browser party games are group games you can open instantly in a web browser without installing an app. Players usually join from a shared link on phones or laptops, play a short round together, and get a fun payoff such as votes, scores, or revealed group results. They work well for parties, remote groups, and quick hangouts because setup is fast and guests do not need accounts or downloads.",
  likelyQuestions: [
    "What is a browser party game?",
    "Do browser party games require downloads?",
    "Can browser party games work on phones?",
    "Are browser party games good for remote groups?",
    "How quickly can a group start playing?",
  ],
  keyTakeaways: [
    "Browser party games run instantly in a browser with no app install.",
    "They work well when one person shares a link and everyone joins from their phone.",
    "FriendRank is a free browser voting party game with anonymous votes and funny group reveals.",
  ],
  citationSummary:
    "Browser party games are no-download group games played in the browser via a shared link. FriendRank fits this category as a free anonymous voting party game for friends, parties, and teams.",
  parentTopic: "Party games",
  siblingTopics: ["Icebreaker games", "Friend games", "Anonymous voting games"],
  complementaryPages: [
    "/party-games",
    "/friend-games",
    "/anonymous-voting-game",
    "/icebreaker-game",
  ],
});

export const browserPartyGamesHub: EvergreenHubPageData = {
  slug: SLUG,
  title: "Browser Party Games",
  metaTitle:
    "Browser Party Games – Free Online Group Games With No Download | FriendRank",
  metaDescription:
    "Learn what browser party games are, why groups love them, and how FriendRank works as a free browser voting party game for friends, parties, and teams.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Guide to browser party games: what they are, why they are popular, how to choose a good one, and where FriendRank fits as a free browser voting party game.",
  heroLead:
    "Browser party games let a group play together instantly online — no app store, no install, just a link and a few minutes of chaos.",
  sections: [
    {
      id: "what-are-browser-party-games",
      title: "What are browser party games?",
      paragraphs: [
        "Browser party games are group games people play directly in a web browser. One person usually starts the game, shares a link, and everyone else joins from a phone or laptop without installing anything.",
        "That low-friction setup is what makes them different from traditional party games that need a boxed game, a console, or a dedicated app. The host does not need to teach a long rulebook — the game itself guides the group through a short, social round.",
        "Some browser party games focus on trivia, drawing, words, or icebreakers. Others, like anonymous voting games, focus on group opinions and a shared reveal at the end.",
      ],
    },
    {
      id: "why-browser-party-games-are-popular",
      title: "Why browser party games are popular",
      paragraphs: [
        "Groups reach for browser party games when they want something fun right now, not after a setup ritual. The best ones feel lightweight for the host and easy for guests who may not know each other well.",
      ],
      bullets: [
        "No downloads — guests join from a link instead of the app store",
        "Easy sharing — one URL in a group chat, Discord, or text thread",
        "Mobile and desktop friendly — mixed devices still work",
        "Remote groups — friends in different places can play together",
        "Quick sessions — many rounds finish in a few minutes",
        "Low friction for guests — no account required to join many formats",
      ],
    },
    {
      id: "what-makes-a-good-browser-party-game",
      title: "What makes a good browser party game?",
      paragraphs: [
        "Not every browser game works as a party game. The best ones optimize for groups that want to laugh together, not grind through complicated menus.",
      ],
      bullets: [
        "Fast setup — the group should be playing in under a minute",
        "Simple rules — guests should understand what to do on the first screen",
        "Social interaction — the game creates conversation, not silent tapping",
        "Replayability — groups can run another round without starting over",
        "Good mobile experience — most party guests join from phones",
        "A fun reveal or payoff — votes, scores, or roles people want to talk about after",
      ],
    },
  ],
  comparisonTitle: "Types of browser party games",
  comparisonIntro:
    "Different browser party formats solve different group moods. Here is a simple way to compare them without getting lost in feature lists.",
  comparisonRows: [
    {
      type: "Quiz games",
      bestFor: "Trivia lovers and competitive friend groups",
      setup: "Moderate — often needs question packs or categories",
      socialPayoff: "Scores and bragging rights",
      browserFriendly: "Strong on phones; depends on reading speed",
    },
    {
      type: "Drawing games",
      bestFor: "Creative groups who like visual guessing",
      setup: "Quick, but works best when everyone can see a shared screen",
      socialPayoff: "Funny sketches and guessing moments",
      browserFriendly: "Good on desktop; can be fiddly on small phones",
    },
    {
      type: "Word games",
      bestFor: "Groups who like language, clues, and quick thinking",
      setup: "Usually fast with short rounds",
      socialPayoff: "Clever answers and surprise wordplay",
      browserFriendly: "Strong for chatty groups on any device",
    },
    {
      type: "Icebreaker games",
      bestFor: "New groups, meetings, and mixed crowds",
      setup: "Very fast — designed for people who just met",
      socialPayoff: "Conversation starters and shared laughs",
      browserFriendly: "Excellent for mobile groups",
    },
    {
      type: "Anonymous voting games",
      bestFor: "Friend groups who want funny group opinions and reveals",
      setup: "Very fast — add names, share a link, vote",
      socialPayoff: "Surprising group roles and lore-style results",
      browserFriendly: "Excellent on phones; built for private voting",
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank is a free browser-based voting party game. A host creates a game on friendrank.app, adds the group, and shares one invite link. Everyone votes anonymously from their phone, then the group reveals funny results together — roles like Main Character, Chaos Agent, and Secret Villain.",
    "It fits the anonymous voting category in the table above: fast setup, simple rules, strong mobile play, and a clear payoff at the end. If your group wants a quick social game without downloads or accounts, FriendRank is built for that exact moment.",
    "You can also browse related formats on FriendRank such as party games, friend games, icebreakers, and Most Likely To-style prompts when you want a different angle on the same group vibe.",
  ],
  useCasesTitle: "Best use cases",
  useCases: [
    "Friend groups and group chats",
    "House parties and pregame hangouts",
    "College groups and dorm nights",
    "Remote teams and virtual happy hours",
    "Discord groups and online communities",
    "Family gatherings with mixed ages",
    "Icebreakers for new groups or events",
  ],
  internalLinksTitle: "Related FriendRank pages",
  internalLinksIntro:
    "If you already know the kind of group game you want, these pages go deeper on specific formats while staying inside the same browser-first FriendRank experience.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/friend-games", label: "Friend games hub" },
    { href: "/party-games", label: "Party games hub" },
    { href: "/anonymous-voting-game", label: "Anonymous voting game" },
    { href: "/icebreaker-game", label: "Icebreaker game" },
    { href: "/team-building-game", label: "Team building game" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Browser party games FAQ",
  faq: [
    {
      question: "What is a browser party game?",
      answer:
        "A browser party game is a group game you play online in a web browser. One person shares a link and everyone joins without installing an app.",
    },
    {
      question: "Do browser party games require downloads?",
      answer:
        "No. The point of a browser party game is instant access through a link on mobile or desktop.",
    },
    {
      question: "Can browser party games work on phones?",
      answer:
        "Yes. Most browser party games are designed for guests joining from phones, though some formats work better on larger screens.",
    },
    {
      question: "Are browser party games good for remote groups?",
      answer:
        "Yes. Because everyone joins from a shared link, remote friends, teams, and Discord groups can play together in the browser.",
    },
    {
      question: "What makes FriendRank different from a quiz game?",
      answer:
        "FriendRank focuses on anonymous group voting and funny revealed roles rather than right-or-wrong trivia scores.",
    },
    {
      question: "Can FriendRank be used as an icebreaker?",
      answer:
        "Yes. FriendRank works well when a group needs a fast, low-pressure game that gets people talking.",
    },
    {
      question: "Is FriendRank free?",
      answer: "Yes. FriendRank is free to play in the browser.",
    },
    {
      question: "How quickly can a group start playing?",
      answer:
        "Most groups can create a FriendRank game and share an invite link in under 60 seconds.",
    },
  ],
  geoFoundation,
  aiCitation,
};
