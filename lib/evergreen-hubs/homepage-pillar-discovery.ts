export type HomepagePillarChildLink = {
  label: string;
  href: string;
};

export type HomepagePillarCard = {
  id: string;
  title: string;
  description: string;
  href: string;
  childLinks: HomepagePillarChildLink[];
};

export type HomepagePopularPlayChip = {
  label: string;
  href?: string;
};

export const HOMEPAGE_PILLAR_CARDS: HomepagePillarCard[] = [
  {
    id: "party-games",
    title: "Party Games",
    description:
      "Browser party games, anonymous voting games, icebreakers and social games for any gathering.",
    href: "/party-games",
    childLinks: [
      { label: "Browser party games", href: "/browser-party-games" },
      { label: "Anonymous voting games", href: "/anonymous-voting-games" },
      { label: "Party voting game", href: "/party-voting-game" },
    ],
  },
  {
    id: "friend-games",
    title: "Friend Games",
    description:
      "Quizzes, Most Likely To games, anonymous voting and funny challenges for close groups.",
    href: "/friend-games",
    childLinks: [
      { label: "Best Friend Quiz", href: "/best-friend-quiz" },
      { label: "Who Knows Me Best", href: "/who-knows-me-best" },
      { label: "Most Likely To", href: "/most-likely-to-generator" },
    ],
  },
  {
    id: "team-building-games",
    title: "Team Building Games",
    description:
      "Workplace icebreakers, remote team games and coworker-friendly group activities.",
    href: "/team-building-games",
    childLinks: [
      { label: "Team building game", href: "/team-building-game" },
      { label: "Office icebreaker", href: "/office-icebreaker" },
      { label: "Icebreaker games", href: "/icebreaker-games" },
    ],
  },
  {
    id: "relationship-games",
    title: "Relationship Games",
    description:
      "Couple quizzes, date-night prompts and playful games for partners and close friends.",
    href: "/relationship-games",
    childLinks: [
      { label: "Relationship quiz", href: "/relationship-quiz" },
      { label: "Couple quiz", href: "/couple-quiz" },
      { label: "Boyfriend & Girlfriend quiz", href: "/boyfriend-girlfriend-quiz" },
    ],
  },
  {
    id: "question-games",
    title: "Question Games",
    description:
      "Would You Rather, Never Have I Ever, Most Likely To and prompt-based group games.",
    href: "/question-games",
    childLinks: [
      { label: "Most Likely To", href: "/most-likely-to-generator" },
      { label: "Anonymous voting games", href: "/anonymous-voting-games" },
      { label: "Would You Rather", href: "/would-you-rather-friends" },
    ],
  },
];

export const HOMEPAGE_POPULAR_WAYS_TO_PLAY: HomepagePopularPlayChip[] = [
  { label: "Parties", href: "/party-games" },
  { label: "Friends", href: "/friend-games" },
  { label: "Teams", href: "/team-building-games" },
  { label: "Couples", href: "/relationship-games" },
  { label: "Icebreakers", href: "/icebreaker-games" },
  { label: "Anonymous voting", href: "/anonymous-voting-games" },
  { label: "Most Likely To", href: "/most-likely-to-generator" },
  { label: "Online voting game", href: "/group-voting-game" },
  { label: "No-download games", href: "/browser-party-games" },
];
