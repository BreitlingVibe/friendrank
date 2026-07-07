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
      "friend-games",
      "best-friend-quiz",
      "friendship-test",
      "friend-test",
      "bestie-quiz",
      "funny-friend-quiz",
      "who-knows-me-best",
      "childhood-friends-quiz",
      "new-friends-game",
      "friendship-challenge",
      "games-for-large-groups",
      "games-for-small-groups",
      "games-for-roommates",
      "games-for-college-students",
      "double-date-games",
      "games-for-teens",
      "games-for-families",
      "reunion-games",
      "vacation-games",
      "road-trip-games",
      "high-school-games",
      "pregame-games",
      "boys-night-games",
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
      "anonymous-voting-games",
      "anonymous-voting-game",
      "group-voting-game",
      "party-voting-game",
      "friend-ranking-game",
      "friend-group-game",
      "games-for-large-groups",
      "games-for-small-groups",
      "games-for-roommates",
      "games-for-college-students",
      "games-for-groups",
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
      "party-games",
      "browser-party-games",
      "party-voting-game",
      "birthday-party-game",
      "sleepover-game",
      "girls-night-game",
      "adult-party-game",
      "college-party-game",
      "drinking-game",
      "games-for-college-students",
      "sleepover-games",
      "house-party-games",
      "birthday-party-games",
      "bachelorette-party-games",
      "games-for-adults",
      "pregame-games",
      "boys-night-games",
      "thanksgiving-games",
      "graduation-party-games",
      "baby-shower-games",
      "bridal-shower-games",
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
      "icebreaker-games",
      "icebreaker-game",
      "office-icebreaker",
      "classroom-icebreaker",
      "team-building-game",
      "team-introduction-game",
      "get-to-know-you-game",
      "meeting-icebreaker",
      "games-for-work-meetings",
      "classroom-games",
      "student-orientation-games",
      "conference-icebreaker-games",
      "middle-school-games",
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
      "team-building-games",
      "office-icebreaker",
      "team-building-game",
      "team-bonding-game",
      "work-team-game",
      "remote-team-game",
      "virtual-team-building",
      "employee-engagement-game",
      "games-for-work-meetings",
      "games-for-remote-teams",
      "friday-team-games",
      "team-lunch-games",
      "new-employee-games",
      "onboarding-games",
      "workshop-games",
      "conference-icebreaker-games",
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
      "relationship-games",
      "relationship-quiz",
      "couple-quiz",
      "boyfriend-girlfriend-quiz",
      "anniversary-game",
      "date-night-game",
      "newlywed-game",
      "long-distance-couple-games",
      "newly-dating-games",
      "married-couple-games",
      "double-date-games",
      "bachelorette-party-games",
      "baby-shower-games",
      "bridal-shower-games",
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
      "games-for-large-groups",
      "games-for-small-groups",
      "games-for-adults",
      "games-for-teens",
      "games-for-families",
      "games-for-groups",
      "vacation-games",
      "road-trip-games",
      "high-school-games",
      "middle-school-games",
      "family-reunion-games",
      "holiday-family-games",
      "christmas-family-games",
      "thanksgiving-games",
    ],
  },
  {
    id: "questions",
    name: "Questions",
    description:
      "Question prompts and formats turned into live friend group voting games.",
    primaryKeyword: "questions for friends",
    supportingKeywords: [
      "would you rather friends",
      "never have i ever friends",
      "this or that friends",
      "most likely to questions",
      "friendship questions",
      "icebreaker questions",
      "party questions",
      "couple questions",
      "team building questions",
      "deep questions for friends",
      "funny questions for friends",
      "conversation starter questions",
      "romantic questions",
      "virtual icebreaker questions",
    ],
    targetAudience:
      "Friend groups, parties, teams, couples, and hosts looking for question prompts",
    searchIntent:
      "Find question prompts to play as a live group voting game with friends online.",
    memberSlugs: [
      "question-games",
      "would-you-rather-friends",
      "never-have-i-ever-friends",
      "this-or-that-friends",
      "most-likely-to-questions",
      "friendship-questions",
      "icebreaker-questions",
      "team-building-questions",
      "party-questions",
      "couple-questions",
      "deep-questions-for-friends",
      "funny-questions-for-friends",
      "random-questions-for-friends",
      "deep-questions-for-couples",
      "romantic-questions",
      "couple-conversation-starters",
      "funny-icebreaker-questions",
      "virtual-icebreaker-questions",
      "work-icebreaker-questions",
      "team-meeting-questions",
      "team-check-in-questions",
      "team-conversation-starters",
      "drinking-questions",
      "birthday-questions",
      "conversation-starter-questions",
      "truth-or-dare-questions",
    ],
  },
  {
    id: "audience",
    name: "Audience",
    description:
      "Audience-specific game intents for groups, teams, couples, parties, and life stages.",
    primaryKeyword: "games for groups",
    supportingKeywords: [
      "games for large groups",
      "games for couples",
      "games for remote teams",
      "games for teens",
      "games for families",
      "games for roommates",
      "games for adults",
      "team lunch games",
      "sleepover games",
      "birthday party games",
      "pregame games",
      "boys night games",
      "vacation games",
      "classroom games",
      "graduation party games",
      "baby shower games",
    ],
    targetAudience:
      "Hosts searching by group type, life stage, event, or social setting",
    searchIntent:
      "Find browser games tailored to a specific audience, group size, or occasion.",
    memberSlugs: [
      "games-for-large-groups",
      "games-for-small-groups",
      "games-for-roommates",
      "games-for-college-students",
      "games-for-work-meetings",
      "games-for-remote-teams",
      "friday-team-games",
      "team-lunch-games",
      "long-distance-couple-games",
      "newly-dating-games",
      "married-couple-games",
      "double-date-games",
      "sleepover-games",
      "house-party-games",
      "birthday-party-games",
      "bachelorette-party-games",
      "games-for-adults",
      "games-for-teens",
      "games-for-families",
      "games-for-groups",
      "pregame-games",
      "boys-night-games",
      "vacation-games",
      "road-trip-games",
      "classroom-games",
      "high-school-games",
      "middle-school-games",
      "student-orientation-games",
      "new-employee-games",
      "onboarding-games",
      "workshop-games",
      "conference-icebreaker-games",
      "family-reunion-games",
      "holiday-family-games",
      "christmas-family-games",
      "thanksgiving-games",
      "graduation-party-games",
      "baby-shower-games",
      "bridal-shower-games",
      "reunion-games",
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
