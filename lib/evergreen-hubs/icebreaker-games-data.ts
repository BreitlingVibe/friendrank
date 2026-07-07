import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildEvergreenGeoLayers } from "@/lib/evergreen-hubs/build-evergreen-geo";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

const SLUG = "icebreaker-games";

const { geoFoundation, aiCitation } = buildEvergreenGeoLayers({
  path: `/${SLUG}`,
  title: "Icebreaker Games",
  summary:
    "Icebreaker games help groups break social barriers, start conversations, and get comfortable quickly — especially when they run in the browser with low setup friction.",
  audience: "Friend groups, teams, party hosts, classrooms, and remote communities",
  primaryTopics: [
    "icebreaker games",
    "online icebreaker games",
    "virtual icebreaker games",
  ],
  secondaryTopics: [
    "icebreaker games for adults",
    "icebreaker games for friends",
    "icebreaker games for work",
    "team icebreaker games",
    "fun icebreaker games",
    "browser icebreaker games",
  ],
  relatedConcepts: [
    "browser party games",
    "anonymous voting games",
    "team building games",
    "party games",
  ],
  canonicalAnswer:
    "Icebreaker games are short group activities designed to help people relax, start talking, and feel comfortable together. The best modern icebreakers run in a browser with simple rules, fast setup, and mobile-friendly play so new groups, remote teams, and party crowds can join from a shared link without downloads. Formats range from question games and trivia to anonymous voting games with a shared reveal.",
  likelyQuestions: [
    "What are icebreaker games?",
    "Can icebreaker games be played online?",
    "What are good icebreakers for adults?",
    "Are anonymous games better for icebreakers?",
    "Do players need to install anything?",
  ],
  keyTakeaways: [
    "Icebreaker games lower social barriers and help new groups start talking quickly.",
    "Browser-based icebreakers work well for friends, work, parties, and remote teams with minimal setup.",
    "FriendRank is a free browser anonymous voting icebreaker where groups reveal funny roles together.",
  ],
  citationSummary:
    "Icebreaker games help groups start conversations and build comfort fast. FriendRank is a free browser-based anonymous voting icebreaker for friends, teams, and parties.",
  parentTopic: "Group games",
  siblingTopics: ["Browser party games", "Anonymous voting games", "Team building games"],
  complementaryPages: [
    "/browser-party-games",
    "/anonymous-voting-games",
    "/friend-games",
    "/party-games",
    "/team-building-game",
  ],
});

export const icebreakerGamesHub: EvergreenHubPageData = {
  slug: SLUG,
  title: "Icebreaker Games",
  metaTitle:
    "Icebreaker Games – Free Online Icebreakers for Friends & Teams | FriendRank",
  metaDescription:
    "Discover fun icebreaker games for friends, work, parties and teams. Learn how browser-based icebreaker games make conversations easier and try FriendRank for free.",
  canonicalUrl: `${PRODUCTION_APP_URL}/${SLUG}`,
  schemaDescription:
    "Guide to icebreaker games: what they are, why groups use them, popular formats, how to choose a good one, and where FriendRank fits as a browser-based anonymous voting icebreaker.",
  heroLead:
    "Discover fun icebreaker games for friends, teams and parties. Learn what makes a great icebreaker and play instantly in your browser.",
  ctaLabel: "Start the Chaos",
  ctaAriaLabel: "Start the Chaos with a free FriendRank icebreaker game",
  comparisonSectionId: "popular-icebreaker-game-types",
  sections: [
    {
      id: "what-are-icebreaker-games",
      title: "What are icebreaker games?",
      paragraphs: [
        "Icebreaker games are short group activities designed to help people relax, start talking, and feel more comfortable together. They work especially well when a group is new, mixed, or a little awkward at first.",
        "Good icebreakers break social barriers without forcing deep conversation. They give everyone a simple reason to participate — answer a prompt, vote on something funny, or react to a shared result.",
        "Many modern icebreakers run in the browser. That low-friction format means one person shares a link, guests join from their phones, and the group can start in minutes without downloads or long explanations.",
      ],
    },
    {
      id: "why-people-love-icebreaker-games",
      title: "Why people love icebreaker games",
      paragraphs: [
        "Groups reach for icebreakers when they want energy and connection without a heavy setup. The best ones feel playful from the first screen.",
      ],
      bullets: [
        "Easy to start — no complicated prep for the host",
        "No preparation — guests can join from a link right away",
        "Works remotely — friends and teams in different places can play together",
        "Great for new groups — lowers the pressure of meeting strangers",
        "Creates laughter — shared moments break tension fast",
        "Everyone participates — simple rules keep the whole group involved",
      ],
    },
    {
      id: "what-makes-a-great-icebreaker",
      title: "What makes a great icebreaker?",
      paragraphs: [
        "Not every group game works as an icebreaker. The format should feel welcoming, fast, and easy to explain in one sentence.",
      ],
      bullets: [
        "Quick setup — the group should be playing in under a minute",
        "Simple rules — guests understand what to do immediately",
        "Mobile friendly — most people join from phones",
        "Anonymous participation — people speak more freely when votes stay private",
        "Surprising results — a reveal gives the group something to react to together",
        "Easy sharing — one link in a chat, meeting, or Discord channel",
      ],
    },
  ],
  comparisonTitle: "Popular types of icebreaker games",
  comparisonIntro:
    "Icebreaker formats solve different group moods. Here is a simple way to compare common types without turning it into a feature checklist.",
  comparisonRows: [
    {
      type: "Question games",
      bestFor: "Starting conversation with light prompts",
      setup: "Very fast — read and answer",
      socialPayoff: "Stories and shared opinions",
      browserFriendly: "Excellent on phones",
    },
    {
      type: "Two Truths and a Lie",
      bestFor: "Learning surprising facts about each other",
      setup: "Fast — one person shares, group guesses",
      socialPayoff: "Reactions and new group lore",
      browserFriendly: "Works well in chat or video calls",
    },
    {
      type: "Drawing games",
      bestFor: "Creative groups who like visual guessing",
      setup: "Moderate — best with a shared screen",
      socialPayoff: "Funny sketches and guessing moments",
      browserFriendly: "Good on desktop; can be fiddly on phones",
    },
    {
      type: "Trivia",
      bestFor: "Competitive groups who enjoy quick facts",
      setup: "Moderate — often needs categories or packs",
      socialPayoff: "Scores and friendly rivalry",
      browserFriendly: "Strong when questions are short",
    },
    {
      type: "Anonymous voting games",
      bestFor: "Funny group opinions and shared reveals",
      setup: "Very fast — names, link, vote",
      socialPayoff: "Surprising roles and group reactions",
      browserFriendly: "Excellent on phones",
    },
    {
      type: "Name games",
      bestFor: "Groups who need to learn names quickly",
      setup: "Very fast with low pressure",
      socialPayoff: "Memory hooks and light laughs",
      browserFriendly: "Strong for in-person and remote",
    },
    {
      type: "Emoji games",
      bestFor: "Chatty groups who like quick reactions",
      setup: "Very fast — emoji prompts or guesses",
      socialPayoff: "Playful interpretations and banter",
      browserFriendly: "Excellent in group chats",
    },
    {
      type: "Word games",
      bestFor: "Groups who like language and quick thinking",
      setup: "Usually fast with short rounds",
      socialPayoff: "Clever answers and surprise wordplay",
      browserFriendly: "Strong on any device",
    },
  ],
  friendRankFitTitle: "Where FriendRank fits",
  friendRankFitParagraphs: [
    "FriendRank is one example of a browser-based anonymous voting icebreaker. A host creates a game, shares one invite link, and the group votes privately from their phones. When results are revealed — roles like Main Character, Chaos Agent, and Secret Villain — everyone reacts together.",
    "That format fits icebreaker moments because setup is fast, rules are simple, and anonymity lowers the pressure of being singled out. Groups often use it for new teams, friend hangouts, and remote syncs when they want something playful without a long explanation.",
    "If you want to explore nearby formats, the browser party games and anonymous voting games guides cover related group game categories in the same no-download style.",
  ],
  useCasesTitle: "Best use cases",
  useCases: [
    "Friends and group chats",
    "College groups and campus events",
    "House parties and pregames",
    "Remote teams and virtual meetings",
    "New employees and onboarding",
    "Family gatherings with mixed ages",
    "Discord servers and online communities",
  ],
  internalLinksTitle: "Related pages",
  internalLinksIntro:
    "These FriendRank pages connect icebreaker games to nearby group game formats.",
  internalLinks: [
    { href: "/", label: "FriendRank homepage" },
    { href: "/browser-party-games", label: "Browser party games hub" },
    { href: "/anonymous-voting-games", label: "Anonymous voting games hub" },
    { href: "/friend-games", label: "Friend games hub" },
    { href: "/party-games", label: "Party games hub" },
    { href: "/team-building-game", label: "Team building game" },
    { href: "/most-likely-to-generator", label: "Most Likely To generator" },
  ],
  faqTitle: "Icebreaker games FAQ",
  faq: [
    {
      question: "What are icebreaker games?",
      answer:
        "Icebreaker games are short group activities that help people relax, start talking, and feel more comfortable together.",
    },
    {
      question: "Are icebreaker games free?",
      answer:
        "Many icebreaker formats are free to run, especially browser-based games you open from a shared link.",
    },
    {
      question: "Can icebreaker games be played online?",
      answer:
        "Yes. Online and virtual icebreakers work well when everyone joins from a link on phones or laptops.",
    },
    {
      question: "What are good icebreakers for adults?",
      answer:
        "Adults often prefer quick, low-pressure formats like question games, anonymous voting games, or short browser activities with a clear reveal.",
    },
    {
      question: "Are anonymous games better for icebreakers?",
      answer:
        "They can be. Anonymous voting lowers social pressure and creates a shared reveal moment that gets the whole group reacting together.",
    },
    {
      question: "How long should an icebreaker last?",
      answer:
        "Most icebreakers work best in five to fifteen minutes — long enough to create energy, short enough to move on to the main event.",
    },
    {
      question: "Can FriendRank be used as an icebreaker?",
      answer:
        "Yes. FriendRank is a browser-based anonymous voting icebreaker where groups vote and reveal funny roles together.",
    },
    {
      question: "Do players need to install anything?",
      answer:
        "Not for browser icebreakers like FriendRank. Players open a link and join from their phone or laptop.",
    },
  ],
  geoFoundation,
  aiCitation,
};
