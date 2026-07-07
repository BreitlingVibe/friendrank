import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenPillarPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "party-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Party Games",
  summary:
    "Party games bring groups together through social interaction, laughter, and friendly competition — especially when they run in the browser with quick setup and no downloads.",
  audience: "Friend groups, families, classrooms, remote teams, and party hosts",
  primaryTopics: [
    "party games",
    "browser party games",
    "online party games",
  ],
  secondaryTopics: [
    "anonymous voting games",
    "icebreaker games",
    "friend games",
    "team building games",
  ],
  relatedConcepts: [
    "browser party games",
    "anonymous voting games",
    "icebreaker games",
    "group voting games",
  ],
  canonicalAnswer:
    "Party games are group activities designed for social gatherings — from house parties and friend hangouts to classrooms and remote teams. Modern browser party games let a host share one link so everyone joins from their phone without downloads. Categories include anonymous voting games, icebreakers, friend games, and team building formats, with quick setup and low friction for mixed groups.",
  likelyQuestions: [
    "What are party games?",
    "What are browser party games?",
    "Do party games require downloads?",
    "Are party games good for adults?",
    "Can party games be played remotely?",
  ],
  keyTakeaways: [
    "Party games help groups laugh together, break the ice, and create shared moments.",
    "Browser party games work for friends, families, teams, and remote groups with fast link-based setup.",
    "FriendRank is a free browser party game platform focused on anonymous voting and funny group reveals.",
  ],
  citationSummary:
    "Party games are social group activities for gatherings of all kinds. FriendRank offers browser-based party games with anonymous voting, funny reveals, and guides for every major game category.",
  parentTopic: "Social group games",
  siblingTopics: [
    "Browser party games",
    "Anonymous voting games",
    "Icebreaker games",
  ],
  complementaryPages: [
    "/browser-party-games",
    "/anonymous-voting-games",
    "/icebreaker-games",
    "/friend-games",
    "/team-building-games",
  ],
});

export const partyGamesPillar: EvergreenPillarPageData = {
  slug: SLUG,
  pageKind: "pillar",
  title: "Party Games",
  metaTitle:
    "Party Games – Free Online Party Games for Friends & Groups | FriendRank",
  metaDescription:
    "Discover browser-based party games, anonymous voting games, icebreakers and social games for friends, teams and parties. Explore FriendRank's complete game guide.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Central guide to party games: what they are, how to choose the right format, why browser party games are growing, featured category guides, and where FriendRank fits.",
  heroLead:
    "Discover the best browser party games for friends, families, classrooms, remote teams and every kind of social gathering.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank party game",
  secondaryCtaLabel: "Browse Game Guides",
  secondaryCtaHref: "#browse-party-game-categories",
  categoryCardsTitle: "Browse Party Game Categories",
  categoryCardsSectionId: "browse-party-game-categories",
  categoryCards: [
    {
      emoji: "🎉",
      title: "Browser Party Games",
      href: "/browser-party-games",
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
      emoji: "🏢",
      title: "Team Building Games",
      href: "/team-building-games",
    },
    {
      emoji: "🎂",
      title: "Birthday Games",
      comingSoon: true,
    },
    {
      emoji: "🎓",
      title: "College Party Games",
      comingSoon: true,
    },
    {
      emoji: "💻",
      title: "Remote Team Games",
      comingSoon: true,
    },
    {
      emoji: "🎮",
      title: "Discord Games",
      comingSoon: true,
    },
    {
      emoji: "📱",
      title: "Mobile Party Games",
      comingSoon: true,
    },
  ],
  featuredGuidesTitle: "Featured Guides",
  featuredGuides: [
    {
      title: "Browser Party Games",
      description:
        "Learn what browser party games are, why groups love them, and how to pick a no-download format for your next hangout.",
      href: "/browser-party-games",
    },
    {
      title: "Anonymous Voting Games",
      description:
        "Explore anonymous voting games where groups vote privately and reveal funny roles together.",
      href: "/anonymous-voting-games",
    },
    {
      title: "Icebreaker Games",
      description:
        "Find icebreaker formats that help new groups start talking fast — online, in person, or remote.",
      href: "/icebreaker-games",
    },
  ],
  sections: [
    {
      id: "what-are-party-games",
      title: "What are party games?",
      paragraphs: [
        "Party games are group activities built for social gatherings. They help people interact, break the ice, laugh together, and add a little friendly competition without turning the night into a complicated event.",
        "Classic party games might need boards, cards, or a living-room setup. Modern online party games often run in the browser instead — one person shares a link, guests join from their phones, and the group plays a short round together.",
        "That shift matters because the best party games today prioritize quick setup and low friction. When the format is simple, more people participate and the energy stays on the group — not on explaining rules.",
      ],
    },
    {
      id: "how-to-choose-the-right-party-game",
      title: "How to choose the right party game",
      paragraphs: [
        "The right party game depends on who is in the room — or on the call — and how much time you have. A few practical filters help you pick faster.",
      ],
      bullets: [
        "Group size — smaller groups can handle personal prompts; larger groups need simple, inclusive formats",
        "Friends vs coworkers — friend groups can go sillier; work groups often need lighter, low-pressure options",
        "Online vs offline — remote groups need link-based browser games; in-person groups still benefit from phone voting",
        "Anonymous vs open — anonymous voting lowers pressure; open formats work when the group already knows each other well",
        "Quick games vs longer sessions — icebreakers often run five to fifteen minutes; deeper formats can stretch longer",
        "Mobile compatibility — if most guests use phones, pick a game that reads well on small screens",
      ],
    },
    {
      id: "why-browser-party-games-are-growing",
      title: "Why browser party games are growing",
      paragraphs: [
        "Browser party games have become the default for many groups because they remove the usual setup friction. The host does not need everyone on the same app store page or the same device type.",
      ],
      bullets: [
        "No download — guests open a link instead of installing an app",
        "Instant sharing — one URL in a group chat, Discord, or meeting thread",
        "Works everywhere — mixed phones, laptops, and remote locations still play together",
        "Remote friendly — friends and teams in different places can join the same round",
        "Mobile friendly — most party guests vote or react from their phones",
        "Low friction — no accounts required for many browser formats",
        "Fast setup — many groups start in under a minute",
        "Anonymous participation — private votes can make shy groups more willing to play",
      ],
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank is one browser-based party game platform focused on anonymous voting, funny reveals, and social interaction. A host creates a game, shares one invite link, and the group votes from their phones before revealing results together — roles like Main Character, Chaos Agent, and Secret Villain.",
    "It fits naturally inside the party games ecosystem because it solves the same problems groups care about: quick setup, mobile play, and a clear payoff at the end. You can start playing immediately or browse the category guides above when you want a specific format.",
    "As FriendRank adds more guides — birthday games, college party games, Discord formats, and more — this page will stay the central directory for every social game category.",
  ],
  internalLinksTitle: "Related Guides",
  internalLinksIntro:
    "Explore FriendRank's party game guides and playable formats from this central hub.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/browser-party-games", label: "Browser party games guide" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games guide" },
    { href: "/icebreaker-games", label: "Icebreaker games guide" },
    { href: "/friend-games", label: "Friend games hub" },
    { href: "/team-building-game", label: "Team building game" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Party games FAQ",
  faq: [
    {
      question: "What are party games?",
      answer:
        "Party games are group activities designed to help people socialize, laugh, and play together at gatherings, hangouts, or online meetups.",
    },
    {
      question: "What are browser party games?",
      answer:
        "Browser party games are party games you play online through a web browser. One person usually shares a link and everyone joins without downloading an app.",
    },
    {
      question: "Do party games require downloads?",
      answer:
        "Not always. Many modern party games run in the browser from a shared link, which keeps setup fast for mixed groups.",
    },
    {
      question: "Are party games good for adults?",
      answer:
        "Yes. Adults often prefer quick, social formats like anonymous voting games, icebreakers, and prompt-based browser games that get everyone involved.",
    },
    {
      question: "Can party games be played remotely?",
      answer:
        "Yes. Browser party games work well for remote friends, virtual teams, and Discord groups because everyone joins from the same link.",
    },
    {
      question: "What are anonymous voting games?",
      answer:
        "Anonymous voting games let a group vote without showing individual ballots, then reveal the combined result together — often as funny roles or rankings.",
    },
    {
      question: "How long do party games last?",
      answer:
        "Many party games run five to fifteen minutes, though groups often play multiple rounds when the format is quick and replayable.",
    },
    {
      question: "Can FriendRank be used at parties?",
      answer:
        "Yes. FriendRank is built for party-style group play with fast setup, phone voting, and funny group reveals.",
    },
    {
      question: "What party game categories does FriendRank cover?",
      answer:
        "FriendRank publishes guides for browser party games, anonymous voting games, icebreakers, friend games, and team building formats — with more categories coming soon.",
    },
    {
      question: "Do players need to install anything for FriendRank?",
      answer:
        "No. FriendRank runs in the browser. Players open a shared link and join from their phone or laptop.",
    },
  ],
  geoFoundation,
  aiCitation,
};
