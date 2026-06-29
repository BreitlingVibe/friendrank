export type KeywordCluster = {
  id: string;
  name: string;
  description: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  targetAudience: string;
  searchIntent: string;
  memberSlugs: string[];
};

export const KEYWORD_CLUSTERS: KeywordCluster[] = [
  {
    id: "friendship",
    name: "Friendship",
    description:
      "Friend quiz and friendship test intents for close groups who want playful voting games.",
    primaryKeyword: "friend quiz",
    supportingKeywords: [
      "best friend quiz",
      "friendship test",
      "friend test",
      "bestie quiz",
      "who knows me best",
      "friend quiz for groups",
    ],
    targetAudience:
      "Close friend groups, besties, roommates, and tight social circles",
    searchIntent:
      "Find a fun quiz or test to play with friends that goes beyond solo compatibility quizzes.",
    memberSlugs: [
      "best-friend-quiz",
      "friendship-test",
      "friend-test",
      "bestie-quiz",
      "who-knows-me-best",
    ],
  },
  {
    id: "social-voting",
    name: "Social Voting",
    description:
      "Anonymous and group voting games where friends pick roles and unlock shared results.",
    primaryKeyword: "anonymous voting game",
    supportingKeywords: [
      "group voting game",
      "friend voting game",
      "anonymous poll friends",
      "friend ranking game",
      "social voting app",
    ],
    targetAudience:
      "Friend groups, group chats, and casual social communities",
    searchIntent:
      "Run a private group vote among friends without accounts or exposed ballots.",
    memberSlugs: [
      "anonymous-voting-game",
      "group-voting-game",
      "party-voting-game",
      "friend-ranking-game",
      "friend-group-game",
    ],
  },
  {
    id: "most-likely",
    name: "Most Likely",
    description:
      "Most Likely To generators and games for classic group-chat prompts.",
    primaryKeyword: "most likely to generator",
    supportingKeywords: [
      "most likely to game",
      "who is most likely to",
      "most likely to questions",
      "most likely to friends",
      "most likely to quiz",
    ],
    targetAudience:
      "Friend groups, parties, college groups, and Discord communities",
    searchIntent:
      "Create or play a Most Likely To game with friends online.",
    memberSlugs: ["most-likely-to-generator", "who-is-most-likely-to"],
  },
  {
    id: "party",
    name: "Party",
    description:
      "Party games and hangout activities powered by anonymous phone voting.",
    primaryKeyword: "party games",
    supportingKeywords: [
      "party game for adults",
      "birthday party game",
      "college party game",
      "girls night game",
      "sleepover game",
      "party voting game",
    ],
    targetAudience:
      "Party hosts, birthday groups, college parties, and casual hangouts",
    searchIntent:
      "Find a quick party game that works on phones without setup or downloads.",
    memberSlugs: [
      "party-voting-game",
      "birthday-party-game",
      "sleepover-game",
      "girls-night-game",
      "adult-party-game",
      "college-party-game",
      "drinking-game",
    ],
  },
  {
    id: "icebreakers",
    name: "Icebreakers",
    description:
      "Icebreaker games for new groups, teams, classrooms, and offices.",
    primaryKeyword: "icebreaker game",
    supportingKeywords: [
      "office icebreaker",
      "classroom icebreaker",
      "team building game",
      "group icebreaker",
      "icebreaker for friends",
    ],
    targetAudience:
      "Teams, classrooms, offices, events, and groups meeting for the first time",
    searchIntent:
      "Break the ice with a quick group activity that works on mobile.",
    memberSlugs: [
      "icebreaker-game",
      "office-icebreaker",
      "classroom-icebreaker",
      "team-building-game",
    ],
  },
  {
    id: "teams",
    name: "Teams",
    description:
      "Workplace and team icebreakers for office meetings and remote syncs.",
    primaryKeyword: "team building game",
    supportingKeywords: [
      "office icebreaker",
      "team icebreaker",
      "workplace game",
      "remote team activity",
      "coworker game",
    ],
    targetAudience: "Office teams, remote teams, managers, and HR socials",
    searchIntent:
      "Run a light team activity with anonymous voting for coworkers.",
    memberSlugs: [
      "office-icebreaker",
      "team-building-game",
      "team-bonding-game",
      "work-team-game",
      "remote-team-game",
      "virtual-team-building",
      "employee-engagement-game",
    ],
  },
  {
    id: "relationships",
    name: "Relationships",
    description:
      "Couple and relationship quiz intents adapted to group voting.",
    primaryKeyword: "relationship quiz",
    supportingKeywords: [
      "couple quiz",
      "relationship test",
      "couples game",
      "relationship game friends",
      "quiz for couples",
    ],
    targetAudience: "Couples, double dates, and friend groups with partners",
    searchIntent:
      "Play a relationship or couple quiz as a social group experience.",
    memberSlugs: [
      "relationship-quiz",
      "couple-quiz",
      "boyfriend-girlfriend-quiz",
      "anniversary-game",
      "date-night-game",
      "newlywed-game",
    ],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    description:
      "Casual group games and question formats adapted to friend voting.",
    primaryKeyword: "group games",
    supportingKeywords: [
      "social game",
      "group questions",
      "would you rather friends",
      "never have i ever friends",
      "this or that friends",
      "games for friend groups",
    ],
    targetAudience:
      "Friend groups, online communities, and casual game-night hosts",
    searchIntent:
      "Find light group games and question formats to play with friends online.",
    memberSlugs: [
      "social-game",
      "group-questions",
      "would-you-rather-friends",
      "never-have-i-ever-friends",
      "this-or-that-friends",
    ],
  },
];

const SLUG_TO_CLUSTERS = new Map<string, KeywordCluster[]>();

for (const cluster of KEYWORD_CLUSTERS) {
  for (const slug of cluster.memberSlugs) {
    const existing = SLUG_TO_CLUSTERS.get(slug) ?? [];
    existing.push(cluster);
    SLUG_TO_CLUSTERS.set(slug, existing);
  }
}

export function getClusters(): KeywordCluster[] {
  return KEYWORD_CLUSTERS;
}

export function getCluster(id: string): KeywordCluster | undefined {
  return KEYWORD_CLUSTERS.find((cluster) => cluster.id === id);
}

/** Returns the first cluster that lists the slug. Slugs in multiple clusters resolve by cluster order. */
export function getClusterBySlug(slug: string): KeywordCluster | undefined {
  return SLUG_TO_CLUSTERS.get(slug)?.[0];
}

/** Returns all clusters that include the slug. */
export function getClustersBySlug(slug: string): KeywordCluster[] {
  return SLUG_TO_CLUSTERS.get(slug) ?? [];
}

export function getClusterMembers(slug: string): string[] {
  const cluster = getClusterBySlug(slug);
  return cluster ? [...cluster.memberSlugs] : [];
}

export function getPrimaryKeyword(slug: string): string | undefined {
  return getClusterBySlug(slug)?.primaryKeyword;
}

export function getSupportingKeywords(slug: string): string[] {
  const cluster = getClusterBySlug(slug);
  return cluster ? [...cluster.supportingKeywords] : [];
}

/** Returns other slugs in the primary cluster for the given slug. */
export function getRelatedSlugs(slug: string): string[] {
  const cluster = getClusterBySlug(slug);
  if (!cluster) {
    return [];
  }

  return cluster.memberSlugs.filter((memberSlug) => memberSlug !== slug);
}

/** Returns related slugs across every cluster that includes the slug. */
export function getAllRelatedSlugs(slug: string): string[] {
  const clusters = getClustersBySlug(slug);
  const related = new Set<string>();

  for (const cluster of clusters) {
    for (const memberSlug of cluster.memberSlugs) {
      if (memberSlug !== slug) {
        related.add(memberSlug);
      }
    }
  }

  return [...related];
}

export function getClusterIdForSlug(slug: string): string | undefined {
  return getClusterBySlug(slug)?.id;
}
