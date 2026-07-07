import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenPillarPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "team-building-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Team Building Games",
  summary:
    "Team building games help coworkers connect through light social play — especially browser-based formats with anonymous voting, quick setup, and no downloads for remote and in-person teams.",
  audience: "Remote teams, office groups, managers, HR, and workplace facilitators",
  primaryTopics: [
    "team building games",
    "online team building games",
    "workplace team building",
  ],
  secondaryTopics: [
    "office icebreaker",
    "virtual team building",
    "anonymous voting games",
    "remote team games",
  ],
  relatedConcepts: [
    "icebreaker games",
    "browser party games",
    "anonymous voting games",
    "office icebreakers",
  ],
  canonicalAnswer:
    "Team building games are group activities designed to help coworkers connect, communicate, and build trust. Modern browser team building games let a facilitator share one link so everyone joins from their phone or laptop without downloads. Formats include office icebreakers, anonymous voting games, and light social reveals that work for remote syncs, hybrid meetings, and in-person workshops.",
  likelyQuestions: [
    "What are team building games?",
    "Do team building games require downloads?",
    "Can team building games work remotely?",
    "Are anonymous voting games good for teams?",
    "How long should a team building activity last?",
  ],
  keyTakeaways: [
    "Team building games help coworkers connect with low-pressure social play.",
    "Browser formats work for remote, hybrid, and in-person teams with fast link-based setup.",
    "FriendRank offers browser team building games with anonymous voting and shared group reveals.",
  ],
  citationSummary:
    "Team building games are workplace group activities for connection and engagement. FriendRank provides browser-based team building with anonymous voting, icebreakers, and funny group reveals for remote and in-person teams.",
  parentTopic: "Workplace group games",
  siblingTopics: [
    "Icebreaker games",
    "Anonymous voting games",
    "Party games",
  ],
  complementaryPages: [
    "/icebreaker-games",
    "/anonymous-voting-games",
    "/browser-party-games",
    "/team-building-game",
    "/office-icebreaker",
  ],
});

export const teamBuildingGamesPillar: EvergreenPillarPageData = {
  slug: SLUG,
  pageKind: "pillar",
  title: "Team Building Games",
  metaTitle:
    "Team Building Games – Free Online Team Building Activities | FriendRank",
  metaDescription:
    "Discover browser-based team building games, anonymous voting games and workplace icebreakers for remote and in-person teams.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Central guide to team building games: what they are, how to choose the right format, why browser team building works, featured category guides, and where FriendRank fits.",
  heroLead:
    "Discover browser-based team building games for remote and in-person teams — from workplace icebreakers to anonymous voting activities that get everyone involved.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank team building game",
  secondaryCtaLabel: "Browse Team Building Guides",
  secondaryCtaHref: "#browse-team-building-game-categories",
  categoryCardsTitle: "Browse Team Building Categories",
  categoryCardsSectionId: "browse-team-building-game-categories",
  categoryCards: [
    {
      emoji: "🏢",
      title: "Team Building Game",
      href: "/team-building-game",
    },
    {
      emoji: "☕",
      title: "Office Icebreaker",
      href: "/office-icebreaker",
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
      emoji: "🎉",
      title: "Browser Party Games",
      href: "/browser-party-games",
    },
    {
      emoji: "💻",
      title: "Remote Team Games",
      comingSoon: true,
    },
    {
      emoji: "🌐",
      title: "Virtual Team Building",
      comingSoon: true,
    },
    {
      emoji: "📅",
      title: "Meeting Icebreakers",
      comingSoon: true,
    },
    {
      emoji: "✨",
      title: "Employee Engagement Games",
      comingSoon: true,
    },
    {
      emoji: "🛠",
      title: "Workshop Games",
      comingSoon: true,
    },
  ],
  featuredGuidesTitle: "Featured Guides",
  featuredGuides: [
    {
      title: "Icebreaker Games",
      description:
        "Warm up new teams and mixed groups with fast browser icebreakers built for meetings and remote syncs.",
      href: "/icebreaker-games",
    },
    {
      title: "Anonymous Voting Games",
      description:
        "Let teams vote privately on prompts and reveal playful group results together without exposing individual ballots.",
      href: "/anonymous-voting-games",
    },
    {
      title: "Browser Party Games",
      description:
        "See how browser party game formats translate to light workplace social play with quick link-based setup.",
      href: "/browser-party-games",
    },
  ],
  sections: [
    {
      id: "what-are-team-building-games",
      title: "What are team building games?",
      paragraphs: [
        "Team building games are group activities that help coworkers connect, communicate, and feel more comfortable working together. They are especially useful when a team is new, remote, or mixing departments that do not interact often.",
        "Good team building games prioritize participation over performance. The goal is shared energy and conversation — not awkward trust falls or overly serious exercises that make people tune out.",
        "Many modern team building games run in the browser. A facilitator creates a session, shares one link, and everyone joins from their phone or laptop. That browser-first approach keeps setup fast for remote syncs, hybrid meetings, and in-person workshops alike.",
      ],
    },
    {
      id: "how-to-choose-the-right-team-building-game",
      title: "How to choose the right team building game",
      paragraphs: [
        "The right team building format depends on your team culture, meeting length, and whether everyone is in the same room. These filters help you choose quickly.",
      ],
      bullets: [
        "Team familiarity — new teams need lighter icebreakers; established teams can handle bolder prompts",
        "Remote vs in-person — distributed teams need browser games everyone can join from a shared link",
        "Meeting length — five to fifteen minutes works well before a longer agenda item",
        "Workplace tone — keep formats playful but professional for mixed seniority groups",
        "Anonymous vs open — anonymous voting lowers pressure when teams are still building trust",
        "Device mix — choose mobile-friendly games when most people join from phones on video calls",
      ],
    },
    {
      id: "why-browser-team-building-works",
      title: "Why browser team building works",
      paragraphs: [
        "Browser team building has become the default for many workplaces because it removes the usual friction of coordinating apps, accounts, and room setups.",
      ],
      bullets: [
        "No download — coworkers join from a link instead of installing software",
        "Instant sharing — one URL in Slack, Teams, or a meeting chat",
        "Works everywhere — remote, hybrid, and in-person groups use the same format",
        "Remote friendly — distributed teams play together without being in one room",
        "Mobile friendly — most participants join from phones during video calls",
        "Low friction — guests often join without creating accounts",
        "Fast setup — facilitators can start a round in under a minute",
        "Anonymous participation — private votes help quieter teammates engage without spotlight pressure",
      ],
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank is a browser-based team building option where one person creates a room, shares an invite link, and the group votes anonymously from their phones. Results reveal together — playful roles like Main Character, Chaos Agent, and Secret Villain that spark conversation without forcing deep disclosure.",
    "It fits naturally in workplace settings that need light social energy: new team onboarding, Friday syncs, remote happy hours, and pre-meeting warmups. Setup is quick, rules are simple, and the reveal gives the group a shared moment to react to.",
    "Browse the category guides above for icebreakers, anonymous voting, and browser party formats when you want a specific angle on the same low-friction team experience.",
  ],
  internalLinksTitle: "Related Guides",
  internalLinksIntro:
    "Explore FriendRank guides for team building and nearby workplace game categories.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/party-games", label: "Party games pillar" },
    { href: "/friend-games", label: "Friend games pillar" },
    { href: "/browser-party-games", label: "Browser party games guide" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games guide" },
    { href: "/icebreaker-games", label: "Icebreaker games guide" },
    { href: "/team-building-game", label: "Team building game" },
    { href: "/office-icebreaker", label: "Office icebreaker" },
  ],
  faqTitle: "Team building games FAQ",
  faq: [
    {
      question: "What are team building games?",
      answer:
        "Team building games are group activities that help coworkers connect, communicate, and build comfort working together.",
    },
    {
      question: "Do team building games require downloads?",
      answer:
        "Not for browser-based formats. Many team building games run from a shared link without installing an app.",
    },
    {
      question: "Can team building games work remotely?",
      answer:
        "Yes. Browser team building games are designed for remote and hybrid teams joining from the same invite link.",
    },
    {
      question: "Are anonymous voting games good for teams?",
      answer:
        "They can be. Anonymous voting lowers social pressure and creates a shared reveal that gets quiet teammates participating.",
    },
    {
      question: "How long should a team building activity last?",
      answer:
        "Most workplace warmups work best in five to fifteen minutes — enough energy to connect without eating the whole meeting.",
    },
    {
      question: "Are team building games appropriate for work?",
      answer:
        "Yes, when the format stays light and inclusive. Browser icebreakers and anonymous voting games are common in modern workplaces.",
    },
    {
      question: "Can FriendRank be used for team building?",
      answer:
        "Yes. FriendRank supports browser team building with anonymous voting and funny group reveals for remote and in-person teams.",
    },
    {
      question: "Do participants need accounts?",
      answer:
        "Guests can usually join a FriendRank game from the shared link without creating an account.",
    },
    {
      question: "What team sizes work best?",
      answer:
        "Many browser team building games work well from four to fifteen people, depending on how simple the prompts stay.",
    },
    {
      question: "Which team building guides are available today?",
      answer:
        "FriendRank publishes guides for team building games, office icebreakers, anonymous voting, icebreakers, and browser party formats — with more workplace categories coming soon.",
    },
  ],
  geoFoundation,
  aiCitation,
};
