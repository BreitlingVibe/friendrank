import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";

export type IntentStatus = "planned" | "live";

export type IntentDefinition = {
  slug: string;
  title: string;
  intentCategory: (typeof INTENT_CATEGORIES)[keyof typeof INTENT_CATEGORIES];
  searchIntent: string;
  audience: string;
  /** Static planning score (0–100). Use getPriorityTier() to derive High/Medium/Low. */
  estimatedPriority: number;
  status: IntentStatus;
};

export const INTENT_REGISTRY: IntentDefinition[] = [
  // Live landing pages
  {
    slug: "most-likely-to-generator",
    title: "Most Likely To Generator",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Create a Most Likely To game for friends with anonymous voting and shareable results.",
    audience: "Friend groups, parties, college groups, Discord communities",
    estimatedPriority: 90,
    status: "live",
  },
  {
    slug: "best-friend-quiz",
    title: "Best Friend Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Run a fun best friend quiz where the group votes anonymously on roles.",
    audience: "Close friend groups, roommates, best friend circles",
    estimatedPriority: 85,
    status: "live",
  },
  {
    slug: "who-knows-me-best",
    title: "Who Knows Me Best",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Find out which friend knows you best through a group voting game.",
    audience: "Friend groups, birthdays, group chats",
    estimatedPriority: 82,
    status: "live",
  },
  {
    slug: "friendship-test",
    title: "Friendship Test",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Turn a friendship test into a social group game with shared results.",
    audience: "Friend groups, casual hangouts, online communities",
    estimatedPriority: 80,
    status: "live",
  },
  {
    slug: "anonymous-voting-game",
    title: "Anonymous Voting Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Run anonymous polls among friends without accounts or exposed ballots.",
    audience: "Friend groups, group chats, private social voting",
    estimatedPriority: 78,
    status: "live",
  },
  {
    slug: "group-voting-game",
    title: "Group Voting Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Create a general friend-group voting game with create-invite-vote-reveal flow.",
    audience: "Friend groups, roommates, Discord servers",
    estimatedPriority: 76,
    status: "live",
  },
  {
    slug: "party-voting-game",
    title: "Party Voting Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Add anonymous party voting entertainment for birthdays and hangouts.",
    audience: "Parties, birthday groups, college hangouts, game nights",
    estimatedPriority: 75,
    status: "live",
  },

  // Planned landing pages
  {
    slug: "who-is-most-likely-to",
    title: "Who Is Most Likely To",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Play Who Is Most Likely To with friends using a shareable voting game.",
    audience: "Friend groups, parties, icebreakers",
    estimatedPriority: 74,
    status: "planned",
  },
  {
    slug: "icebreaker-game",
    title: "Icebreaker Game",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Quick icebreaker game for new groups with anonymous friend voting.",
    audience: "New groups, classes, teams, events",
    estimatedPriority: 72,
    status: "live",
  },
  {
    slug: "couple-quiz",
    title: "Couple Quiz",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Playful couple quiz extended to friend groups with group voting.",
    audience: "Couples, double dates, friend groups with partners",
    estimatedPriority: 70,
    status: "planned",
  },
  {
    slug: "bestie-quiz",
    title: "Bestie Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Fun bestie quiz where close friends vote on roles and inside jokes.",
    audience: "Best friend pairs, tight friend circles",
    estimatedPriority: 68,
    status: "planned",
  },
  {
    slug: "friend-ranking-game",
    title: "Friend Ranking Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Rank friends on funny categories through a group voting game.",
    audience: "Friend groups, meme-heavy group chats",
    estimatedPriority: 66,
    status: "planned",
  },
  {
    slug: "team-building-game",
    title: "Team Building Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Light team building activity with anonymous group voting and shared results.",
    audience: "Work teams, remote teams, office socials",
    estimatedPriority: 70,
    status: "live",
  },
  {
    slug: "team-bonding-game",
    title: "Team Bonding Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Team bonding activity with anonymous voting to spark conversation and laughs.",
    audience: "Work teams, team socials, remote happy hours",
    estimatedPriority: 66,
    status: "live",
  },
  {
    slug: "work-team-game",
    title: "Work Team Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Workplace team game with anonymous coworker voting and shared results.",
    audience: "Office teams, hybrid teams, managers",
    estimatedPriority: 62,
    status: "live",
  },
  {
    slug: "friend-test",
    title: "Friend Test",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Friend test game where the group votes on traits and roles.",
    audience: "Friend groups, casual social games",
    estimatedPriority: 64,
    status: "planned",
  },
  {
    slug: "funny-friend-quiz",
    title: "Funny Friend Quiz",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Humorous friend quiz with anonymous voting and funny group results.",
    audience: "Friend groups, party pre-games, group chats",
    estimatedPriority: 62,
    status: "planned",
  },
  {
    slug: "party-game-for-adults",
    title: "Party Game for Adults",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Adult party game with phone-based anonymous voting, no app install.",
    audience: "Adult friend groups, house parties, social gatherings",
    estimatedPriority: 60,
    status: "planned",
  },
  {
    slug: "college-party-game",
    title: "College Party Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "College party game for dorms and friend groups with quick mobile voting.",
    audience: "College students, dorm groups, campus parties",
    estimatedPriority: 58,
    status: "planned",
  },
  {
    slug: "office-icebreaker",
    title: "Office Icebreaker",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Office icebreaker using anonymous group voting for team socials.",
    audience: "Office teams, new hires, team offsites",
    estimatedPriority: 58,
    status: "live",
  },
  {
    slug: "birthday-party-game",
    title: "Birthday Party Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Birthday party game where friends vote on roles and share results.",
    audience: "Birthday groups, celebrations, friend gatherings",
    estimatedPriority: 56,
    status: "planned",
  },
  {
    slug: "relationship-quiz",
    title: "Relationship Quiz",
    intentCategory: INTENT_CATEGORIES.RELATIONSHIPS,
    searchIntent:
      "Relationship quiz turned into a group voting game for couples and friends.",
    audience: "Couples, friend groups, double dates",
    estimatedPriority: 55,
    status: "planned",
  },
  {
    slug: "sleepover-game",
    title: "Sleepover Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Sleepover game with friend voting on phones and shareable results.",
    audience: "Teen and young adult friend groups, sleepovers",
    estimatedPriority: 54,
    status: "planned",
  },
  {
    slug: "girls-night-game",
    title: "Girls Night Game",
    intentCategory: INTENT_CATEGORIES.PARTY,
    searchIntent:
      "Girls night game with anonymous voting and funny group roles.",
    audience: "Friend groups, girls nights, casual hangouts",
    estimatedPriority: 53,
    status: "planned",
  },
  {
    slug: "classroom-icebreaker",
    title: "Classroom Icebreaker",
    intentCategory: INTENT_CATEGORIES.ICEBREAKERS,
    searchIntent:
      "Classroom icebreaker with student-friendly group voting on phones.",
    audience: "Teachers, students, new classes, youth groups",
    estimatedPriority: 52,
    status: "live",
  },
  {
    slug: "friend-group-game",
    title: "Friend Group Game",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "General friend group game with voting, roles, and shared results.",
    audience: "Friend groups of any size, group chats",
    estimatedPriority: 52,
    status: "planned",
  },
  {
    slug: "roommate-quiz",
    title: "Roommate Quiz",
    intentCategory: INTENT_CATEGORIES.FRIENDSHIP,
    searchIntent:
      "Roommate quiz where housemates vote on funny roles anonymously.",
    audience: "Roommates, shared houses, college dorms",
    estimatedPriority: 50,
    status: "planned",
  },
  {
    slug: "social-game",
    title: "Social Game",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Browser social game for friend groups with anonymous voting.",
    audience: "Social groups, online communities, casual players",
    estimatedPriority: 50,
    status: "planned",
  },
  {
    slug: "personality-quiz-friends",
    title: "Personality Quiz for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Personality-style quiz where friends vote on who fits each trait.",
    audience: "Friend groups, personality quiz fans, group chats",
    estimatedPriority: 48,
    status: "planned",
  },
  {
    slug: "family-game-night",
    title: "Family Game Night",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Family game night activity with group voting on phones.",
    audience: "Families, mixed-age friend groups, home gatherings",
    estimatedPriority: 45,
    status: "planned",
  },
  {
    slug: "this-or-that-friends",
    title: "This or That for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "This or That style prompts adapted to a friend group voting game.",
    audience: "Friend groups, casual icebreakers, group chats",
    estimatedPriority: 42,
    status: "planned",
  },
  {
    slug: "never-have-i-ever-friends",
    title: "Never Have I Ever for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Never Have I Ever style social game with group voting mechanics.",
    audience: "Friend groups, parties, casual hangouts",
    estimatedPriority: 40,
    status: "planned",
  },
  {
    slug: "would-you-rather-friends",
    title: "Would You Rather for Friends",
    intentCategory: INTENT_CATEGORIES.ENTERTAINMENT,
    searchIntent:
      "Would You Rather prompts as a group voting game for friends.",
    audience: "Friend groups, party games, online chats",
    estimatedPriority: 38,
    status: "planned",
  },
  {
    slug: "group-questions",
    title: "Group Questions",
    intentCategory: INTENT_CATEGORIES.SOCIAL_VOTING,
    searchIntent:
      "Collection of group questions turned into a live friend voting game.",
    audience: "Friend groups looking for question prompts",
    estimatedPriority: 35,
    status: "planned",
  },
  {
    slug: "remote-team-game",
    title: "Remote Team Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Remote team activity with anonymous voting for distributed coworkers.",
    audience: "Remote teams, distributed teams, async teams",
    estimatedPriority: 48,
    status: "planned",
  },
  {
    slug: "virtual-team-building",
    title: "Virtual Team Building",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Virtual team building with phone-based anonymous group voting.",
    audience: "Remote teams, virtual offsites, online team socials",
    estimatedPriority: 46,
    status: "planned",
  },
  {
    slug: "employee-engagement-game",
    title: "Employee Engagement Game",
    intentCategory: INTENT_CATEGORIES.TEAMS,
    searchIntent:
      "Employee engagement activity using anonymous team voting and shared results.",
    audience: "HR teams, managers, workplace culture leads",
    estimatedPriority: 44,
    status: "planned",
  },
];

export function getIntentBySlug(slug: string): IntentDefinition | undefined {
  return INTENT_REGISTRY.find((intent) => intent.slug === slug);
}

export function getLiveIntents(): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.status === "live");
}

export function getPlannedIntents(): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.status === "planned");
}

export function getIntentsByCategory(
  category: IntentDefinition["intentCategory"],
): IntentDefinition[] {
  return INTENT_REGISTRY.filter((intent) => intent.intentCategory === category);
}
