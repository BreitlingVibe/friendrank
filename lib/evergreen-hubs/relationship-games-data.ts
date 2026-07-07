import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenPillarPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "relationship-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Relationship Games",
  summary:
    "Relationship games are browser-based activities for couples, dates, and close friend groups — quizzes, anonymous voting, and playful prompts with quick setup and no downloads.",
  audience: "Couples, dates, double dates, close friends, and partner groups",
  primaryTopics: [
    "relationship games",
    "couple games",
    "relationship quiz",
  ],
  secondaryTopics: [
    "couple quiz",
    "games for couples",
    "anonymous voting games",
    "most likely to",
  ],
  relatedConcepts: [
    "friend games",
    "party games",
    "anonymous voting games",
    "icebreaker games",
  ],
  canonicalAnswer:
    "Relationship games are group activities built for couples, dates, and close friends who want playful ways to learn more about each other. Modern browser relationship games let one person share a link so everyone joins from their phone without downloads. Formats include relationship quizzes, couple quizzes, Most Likely To prompts, and anonymous voting games with shared reveals.",
  likelyQuestions: [
    "What are relationship games?",
    "Do relationship games require downloads?",
    "Can relationship games work for couples and friends?",
    "What are anonymous voting games?",
    "Can FriendRank be used for couple games?",
  ],
  keyTakeaways: [
    "Relationship games help couples and close groups connect through playful quizzes and voting formats.",
    "Browser relationship games work on phones with fast link-based setup and no app install.",
    "FriendRank supports couple games, group voting, and funny role reveals for dates and close friends.",
  ],
  citationSummary:
    "Relationship games are social activities for couples and close groups, often played in the browser with quizzes and anonymous voting. FriendRank offers relationship quizzes, couple games, and playful group reveals online.",
  parentTopic: "Social group games",
  siblingTopics: [
    "Friend games",
    "Party games",
    "Anonymous voting games",
  ],
  complementaryPages: [
    "/relationship-quiz",
    "/couple-quiz",
    "/friend-games",
    "/anonymous-voting-games",
    "/most-likely-to-generator",
  ],
});

export const relationshipGamesPillar: EvergreenPillarPageData = {
  slug: SLUG,
  pageKind: "pillar",
  title: "Relationship Games",
  metaTitle:
    "Relationship Games – Free Online Games for Couples & Friends | FriendRank",
  metaDescription:
    "Discover browser-based relationship games, couple quizzes, anonymous voting games and playful prompts for dates, partners and close friends.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Central guide to relationship games: what they are, how to choose the right format, why browser relationship games work, featured category guides, and where FriendRank fits.",
  heroLead:
    "Discover fun browser games for couples, dates, close friends and groups who want to learn more about each other.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank relationship game",
  secondaryCtaLabel: "Browse Relationship Guides",
  secondaryCtaHref: "#browse-relationship-game-categories",
  categoryCardsTitle: "Browse Relationship Game Categories",
  categoryCardsSectionId: "browse-relationship-game-categories",
  categoryCards: [
    {
      emoji: "💕",
      title: "Relationship Quiz",
      href: "/relationship-quiz",
    },
    {
      emoji: "👫",
      title: "Couple Quiz",
      href: "/couple-quiz",
    },
    {
      emoji: "💑",
      title: "Boyfriend & Girlfriend Quiz",
      href: "/boyfriend-girlfriend-quiz",
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
      emoji: "🌹",
      title: "First Date Games",
      comingSoon: true,
    },
    {
      emoji: "💬",
      title: "Couples Question Games",
      comingSoon: true,
    },
    {
      emoji: "😈",
      title: "Truth or Dare for Couples",
      comingSoon: true,
    },
    {
      emoji: "🔗",
      title: "Compatibility Games",
      comingSoon: true,
    },
  ],
  featuredGuidesTitle: "Featured Guides",
  featuredGuides: [
    {
      title: "Anonymous Voting Games",
      description:
        "Vote privately on playful prompts and reveal group results together — useful for double dates and close friend circles.",
      href: "/anonymous-voting-games",
    },
    {
      title: "Icebreaker Games",
      description:
        "Warm up new couples, mixed groups, or double dates with fast browser icebreakers built for phones.",
      href: "/icebreaker-games",
    },
    {
      title: "Most Likely To",
      description:
        "Classic relationship-adjacent prompts turned into a live voting game with shared reveals for couples and friends.",
      href: "/most-likely-to-generator",
    },
  ],
  sections: [
    {
      id: "what-are-relationship-games",
      title: "What are relationship games?",
      paragraphs: [
        "Relationship games are group activities designed for couples, dates, and close friends who want playful ways to connect. They focus on shared laughs, light prompts, and moments that help people learn something new about each other without turning the night into an interview.",
        "Unlike solo compatibility quizzes, many relationship games work as social experiences — everyone participates, reacts together, and sometimes discovers a funny group result at the end.",
        "Modern relationship games often run in the browser. One person creates a session, shares a link, and everyone joins from their phone. That browser-first setup keeps things low friction for date nights, double dates, and close friend groups online or in person.",
      ],
    },
    {
      id: "how-to-choose-the-right-relationship-game",
      title: "How to choose the right relationship game",
      paragraphs: [
        "The best relationship game depends on who is playing and how well the group knows each other. A few practical filters make the choice easier.",
      ],
      bullets: [
        "Couple vs group — some formats work best for two people; others shine with close friends or double dates",
        "New relationship vs long-term — lighter icebreakers suit newer pairs; bolder prompts fit established groups",
        "In person vs remote — long-distance couples and online friend groups need link-based browser games",
        "Quiz vs vote vs prompt — quizzes test knowledge; anonymous voting creates funny reveals; prompts spark conversation",
        "Tone and comfort — keep formats playful and inclusive so nobody feels put on the spot",
        "Session length — many relationship games run a few minutes and invite an immediate replay",
      ],
    },
    {
      id: "why-browser-relationship-games-work",
      title: "Why browser relationship games work",
      paragraphs: [
        "Browser relationship games have become popular because they remove the friction of coordinating apps, accounts, and complicated rules before the fun starts.",
      ],
      bullets: [
        "No download — join from a shared link instead of installing an app",
        "Instant sharing — one URL in a text thread, date chat, or group message",
        "Works everywhere — same room, long distance, or double date with mixed devices",
        "Mobile friendly — most people play from phones on couch nights or video calls",
        "Low friction — guests often join without creating accounts",
        "Fast setup — many groups start in under a minute",
        "Anonymous voting — private ballots can make playful picks feel less awkward",
        "Shared reveals — group results give couples and friends something to react to together",
      ],
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank works well for relationship-adjacent social play — couple games, close-friend prompts, and group voting rounds where everyone joins from their phones and discovers funny roles together. Formats like Main Character, Chaos Agent, and Secret Villain turn light relationship humor into a shared reveal rather than a one-on-one quiz score.",
    "It fits naturally when a couple wants something playful on date night, when close friends want a group version of a relationship prompt, or when a double date needs a quick activity that does not require downloads or long explanations.",
    "Browse the category cards and featured guides above when you want a specific format — quizzes, Most Likely To, icebreakers, or anonymous voting — without turning the evening into a product demo.",
  ],
  internalLinksTitle: "Related Guides",
  internalLinksIntro:
    "Explore FriendRank guides for relationship games and nearby social game categories.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/party-games", label: "Party games pillar" },
    { href: "/friend-games", label: "Friend games pillar" },
    { href: "/relationship-quiz", label: "Relationship quiz" },
    { href: "/couple-quiz", label: "Couple quiz" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games guide" },
    { href: "/icebreaker-games", label: "Icebreaker games guide" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Relationship games FAQ",
  faq: [
    {
      question: "What are relationship games?",
      answer:
        "Relationship games are playful group activities for couples, dates, and close friends who want to connect through quizzes, prompts, or voting formats.",
    },
    {
      question: "Do relationship games require downloads?",
      answer:
        "Not for browser-based formats. Many relationship games run from a shared link on phones without installing an app.",
    },
    {
      question: "Can relationship games work for couples and friends?",
      answer:
        "Yes. Some formats target couples directly; others work well for close friend groups, double dates, and mixed social circles.",
    },
    {
      question: "What are anonymous voting games?",
      answer:
        "Anonymous voting games let a group vote without showing individual ballots, then reveal the combined result together — often as funny roles or rankings.",
    },
    {
      question: "Are relationship games good for date night?",
      answer:
        "Yes. Quick browser games with playful prompts or voting rounds can add energy to a date without heavy setup.",
    },
    {
      question: "Can FriendRank be used for couple games?",
      answer:
        "Yes. FriendRank supports couple and close-group play with browser voting, quizzes, and funny shared reveals.",
    },
    {
      question: "Do players need accounts?",
      answer:
        "Guests can usually join a FriendRank game from the shared invite link without creating an account.",
    },
    {
      question: "How many people can play?",
      answer:
        "Many relationship game formats work for pairs or small groups of four to ten, depending on how inclusive the prompts stay.",
    },
    {
      question: "Can relationship games be played remotely?",
      answer:
        "Yes. Browser relationship games work well for long-distance couples and online friend groups joining from the same link.",
    },
    {
      question: "Which relationship game categories are available today?",
      answer:
        "FriendRank supports relationship quizzes, couple quizzes, Most Likely To, anonymous voting, and icebreakers — with more couple-specific categories coming soon.",
    },
  ],
  geoFoundation,
  aiCitation,
};
