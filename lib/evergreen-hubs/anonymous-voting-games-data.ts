import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "anonymous-voting-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Anonymous Voting Games",
  summary:
    "Anonymous voting games let groups vote on prompts or funny roles without revealing individual ballots, which makes reveals more surprising and social.",
  audience: "Friend groups, party hosts, remote teams, and online communities",
  primaryTopics: [
    "anonymous voting games",
    "anonymous voting game for friends",
    "anonymous group voting game",
  ],
  secondaryTopics: [
    "anonymous party voting game",
    "online voting games for groups",
    "anonymous games to play with friends",
  ],
  relatedConcepts: [
    "browser party games",
    "group voting games",
    "icebreaker games",
    "party question games",
  ],
  canonicalAnswer:
    "Anonymous voting games are group games where people vote on prompts, roles, or choices without their individual votes being shown to the group. That anonymity often leads to more honest answers, funnier surprises, and stronger reactions when results are revealed together. They work well for friends, parties, remote groups, and icebreakers because setup is quick and players can join from a shared link on their phones.",
  likelyQuestions: [
    "What is an anonymous voting game?",
    "Are anonymous voting games good for friends?",
    "Can anonymous voting games work at parties?",
    "Do players need to download an app?",
    "How long does a FriendRank game take?",
  ],
  keyTakeaways: [
    "Anonymous voting games hide individual ballots so group reveals feel more surprising.",
    "They work well for friends, parties, remote groups, and icebreakers with fast phone-based play.",
    "FriendRank is a free browser anonymous voting game with funny role reveals like Main Character and Chaos Agent.",
  ],
  citationSummary:
    "Anonymous voting games let groups vote privately and reveal results together. FriendRank is a free browser-based anonymous voting game for friends, parties, and teams.",
  parentTopic: "Group voting games",
  siblingTopics: ["Browser party games", "Icebreaker games", "Party games"],
  complementaryPages: [
    "/browser-party-games",
    "/friend-games",
    "/party-games",
    "/anonymous-voting-game",
    "/icebreaker-game",
  ],
});

export const anonymousVotingGamesHub: EvergreenHubPageData = {
  slug: SLUG,
  title: "Anonymous Voting Games",
  metaTitle:
    "Anonymous Voting Games – Free Online Group Voting for Friends | FriendRank",
  metaDescription:
    "Learn what anonymous voting games are, why groups love them, and how FriendRank works as a free browser voting game with funny revealed roles.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Guide to anonymous voting games: how they work, why anonymity makes them fun, how to choose a good one, and where FriendRank fits as a free browser voting game.",
  heroLead:
    "Anonymous voting games let your group vote on funny prompts without showing who picked what — then everyone finds out together.",
  comparisonPlacement: "after-use-cases",
  ctaLabel: "Create a free voting game",
  ctaAriaLabel: "Create a free FriendRank anonymous voting game",
  comparisonSectionId: "anonymous-voting-game-types",
  sections: [
    {
      id: "what-are-anonymous-voting-games",
      title: "What are anonymous voting games?",
      paragraphs: [
        "Anonymous voting games are group games where people vote on prompts, roles, or choices without their individual votes being shown to everyone else. The group still sees the outcome — who got the most votes, which role won, or which answer rose to the top — but not who cast each vote.",
        "That format works especially well for social games built around opinions, humor, and group dynamics. Instead of debating who said what, the room reacts to the result itself.",
        "FriendRank is one example: the group votes anonymously on funny prompts, then reveals roles like Main Character, Chaos Agent, and Secret Villain together.",
      ],
    },
    {
      id: "why-anonymous-voting-is-fun",
      title: "Why anonymous voting makes games more fun",
      paragraphs: [
        "Anonymity changes the social energy of a group game. When votes are private, people worry less about being teased for a specific pick and lean into bolder, funnier choices.",
      ],
      bullets: [
        "More honest answers — people vote what they actually think",
        "Surprising reveals — the group discovers outcomes together",
        "Less pressure — no one is put on the spot for a single vote",
        "Better group reactions — the reveal becomes the shared moment",
        "Fun social tension — everyone waits to see what the room decided",
        "Replayability — groups often want another round immediately",
      ],
    },
    {
      id: "what-makes-a-good-anonymous-voting-game",
      title: "What makes a good anonymous voting game?",
      paragraphs: [
        "The best anonymous voting games feel effortless for the host and obvious for guests. The anonymity only works if the rest of the experience stays simple.",
      ],
      bullets: [
        "Simple prompts — easy to understand in one glance",
        "Fast setup — create a game and share a link quickly",
        "Easy sharing — one URL in a group chat or Discord",
        "Mobile-friendly play — most guests vote from phones",
        "Clear reveal moment — results should land with impact",
        "No downloads — browser access keeps friction low",
      ],
    },
  ],
  comparisonTitle: "How anonymous voting games compare to other group formats",
  comparisonIntro:
    "Anonymous voting games are one way groups play together online. Here is how they differ from nearby formats without turning it into a feature checklist.",
  comparisonRows: [
    {
      type: "Anonymous voting games",
      bestFor: "Funny group opinions and shared reveals",
      setup: "Very fast — names, link, vote",
      socialPayoff: "Surprising roles and group lore",
      browserFriendly: "Excellent on phones",
    },
    {
      type: "Quiz games",
      bestFor: "Trivia fans and scorekeeping",
      setup: "Moderate — question packs or categories",
      socialPayoff: "Correct answers and rankings",
      browserFriendly: "Good, but reading-heavy",
    },
    {
      type: "Polling tools",
      bestFor: "Simple surveys and quick group decisions",
      setup: "Fast, but often feels utilitarian",
      socialPayoff: "Useful counts, less game energy",
      browserFriendly: "Strong, but not always playful",
    },
    {
      type: "Icebreaker games",
      bestFor: "New groups and mixed crowds",
      setup: "Very fast with low pressure",
      socialPayoff: "Conversation starters and laughs",
      browserFriendly: "Excellent for mobile groups",
    },
    {
      type: "Party question games",
      bestFor: "Hangouts built around prompts and banter",
      setup: "Fast — often read-and-react formats",
      socialPayoff: "Stories and jokes, not always scored",
      browserFriendly: "Strong when prompts are short",
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank is a free browser-based anonymous voting game. A host creates a game, adds the group, and shares one invite link. Everyone votes privately from their phone, then the group reveals funny results together — roles like Main Character, Chaos Agent, Secret Villain, and more.",
    "It fits the anonymous voting category because the payoff is the shared reveal, not public ballots. There is no app download, and most groups can start in under a minute.",
    "If you want a broader look at browser-first group games, the browser party games guide covers the wider category. For a playable single-format page, the anonymous voting game page goes deeper on FriendRank's voting flow.",
  ],
  useCasesTitle: "Best use cases",
  useCases: [
    "Friend groups and group chats",
    "House parties and pregames",
    "College groups and dorm nights",
    "Discord groups and online communities",
    "Remote teams and virtual hangouts",
    "Icebreakers for new groups",
    "Family gatherings with mixed ages",
  ],
  internalLinksTitle: "Related FriendRank pages",
  internalLinksIntro:
    "These pages connect anonymous voting games to the rest of FriendRank's browser-first group game formats.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/browser-party-games", label: "Browser party games hub" },
    { href: "/friend-games", label: "Friend games hub" },
    { href: "/party-games", label: "Party games hub" },
    { href: "/anonymous-voting-game", label: "Anonymous voting game" },
    { href: "/icebreaker-game", label: "Icebreaker game" },
    { href: "/team-building-game", label: "Team building game" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Anonymous voting games FAQ",
  faq: [
    {
      question: "What is an anonymous voting game?",
      answer:
        "It is a group game where people vote without their individual choices being shown, then the group sees the combined result together.",
    },
    {
      question: "Are anonymous voting games good for friends?",
      answer:
        "Yes. They work well for friend groups because the reveal creates shared laughs without putting one person on the spot for a single vote.",
    },
    {
      question: "Can anonymous voting games work at parties?",
      answer:
        "Yes. Guests can join from their phones through a shared link, which makes them easy to run in a living room or group chat.",
    },
    {
      question: "Do players need to download an app?",
      answer:
        "Not for browser-based formats like FriendRank. Players open a link and vote in the browser.",
    },
    {
      question: "Can people play on phones?",
      answer:
        "Yes. Anonymous voting games are usually designed for guests joining from mobile browsers.",
    },
    {
      question: "Is FriendRank free?",
      answer: "Yes. FriendRank is free to play in the browser.",
    },
    {
      question: "How long does a FriendRank game take?",
      answer:
        "Most groups can start in under 60 seconds. The full round usually takes a few minutes depending on group size.",
    },
    {
      question: "What kind of results does FriendRank reveal?",
      answer:
        "FriendRank reveals playful group roles such as Main Character, Chaos Agent, Secret Villain, and other funny rankings based on votes.",
    },
  ],
  geoFoundation,
  aiCitation,
};
