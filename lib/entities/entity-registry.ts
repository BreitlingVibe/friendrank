/** Canonical entity types for the FriendRank knowledge graph. */
export const ENTITY_TYPES = {
  GAME_FORMAT: "Game Format",
  AUDIENCE: "Audience",
  OCCASION: "Occasion",
  ICEBREAKER: "Icebreaker",
  RELATIONSHIP: "Relationship",
  PARTY: "Party",
  WORK: "Work",
  EDUCATION: "Education",
  FAMILY: "Family",
  HOLIDAY: "Holiday",
} as const;

export type EntityType = (typeof ENTITY_TYPES)[keyof typeof ENTITY_TYPES];

export type EntityDefinition = {
  id: string;
  slug: string;
  name: string;
  description: string;
  entityType: EntityType;
  relatedEntities?: string[];
  relatedTopicHubs?: string[];
  relatedLandingPages?: string[];
  keywords?: string[];
  aliases?: string[];
};

/** Single source of truth for FriendRank entities. */
export const ENTITY_REGISTRY: EntityDefinition[] = [
  {
    id: "social-voting-game",
    slug: "social-voting-game",
    name: "Social Voting Game",
    description:
      "Anonymous group voting where friends pick roles and reveal shared results together.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "large-groups", "party"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["anonymous-voting-game", "group-voting-game"],
    keywords: ["anonymous voting", "group vote", "friend voting"],
    aliases: ["group voting game", "anonymous poll"],
  },
  {
    id: "friend-quiz",
    slug: "friend-quiz",
    name: "Friend Quiz",
    description:
      "Playful quizzes and friendship tests adapted to live group voting.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "relationship"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["best-friend-quiz", "friendship-test"],
    keywords: ["friend quiz", "friendship test", "best friend quiz"],
    aliases: ["friendship quiz", "bestie quiz"],
  },
  {
    id: "most-likely-to",
    slug: "most-likely-to",
    name: "Most Likely To",
    description:
      "Classic Most Likely To prompts turned into a quick group voting game.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "party", "college-students"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["most-likely-to-generator"],
    keywords: ["most likely to", "who is most likely"],
    aliases: ["most likely to game", "most likely to questions"],
  },
  {
    id: "party-voting-game",
    slug: "party-voting-game",
    name: "Party Voting Game",
    description:
      "Phone-based party games with anonymous voting for birthdays and hangouts.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["party", "friends", "birthday-party"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["party-voting-game"],
    keywords: ["party game", "party voting", "hangout game"],
  },
  {
    id: "icebreaker-game-format",
    slug: "icebreaker-game-format",
    name: "Icebreaker Game",
    description:
      "Quick icebreaker activities for new groups using anonymous mobile voting.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["icebreaker", "teams", "work"],
    relatedTopicHubs: ["icebreaker-games"],
    relatedLandingPages: ["icebreaker-game"],
    keywords: ["icebreaker game", "group icebreaker"],
    aliases: ["ice breaker game"],
  },
  {
    id: "team-building-game",
    slug: "team-building-game",
    name: "Team Building Game",
    description:
      "Light workplace team activities with anonymous coworker voting.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["work", "teams", "coworkers"],
    relatedTopicHubs: ["team-building-games"],
    relatedLandingPages: ["team-building-game"],
    keywords: ["team building game", "workplace game"],
  },
  {
    id: "couple-quiz",
    slug: "couple-quiz",
    name: "Couple Quiz",
    description:
      "Relationship and couple quizzes adapted to social group voting.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["relationship", "couples", "date-night"],
    relatedTopicHubs: ["relationship-games"],
    relatedLandingPages: ["couple-quiz", "relationship-quiz"],
    keywords: ["couple quiz", "relationship quiz"],
  },
  {
    id: "question-game",
    slug: "question-game",
    name: "Question Game",
    description:
      "Question lists and prompts turned into live group voting rounds.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "party", "relationship"],
    relatedTopicHubs: ["question-games"],
    relatedLandingPages: ["question-games"],
    keywords: ["question game", "conversation questions"],
  },
  {
    id: "would-you-rather",
    slug: "would-you-rather",
    name: "Would You Rather",
    description:
      "Would You Rather prompts adapted to anonymous friend group voting.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "party"],
    relatedTopicHubs: ["question-games", "friend-games"],
    relatedLandingPages: ["would-you-rather-friends"],
    keywords: ["would you rather", "this or that"],
  },
  {
    id: "never-have-i-ever",
    slug: "never-have-i-ever",
    name: "Never Have I Ever",
    description:
      "Never Have I Ever style prompts for playful group voting sessions.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "party", "college-students"],
    relatedTopicHubs: ["question-games", "party-games"],
    relatedLandingPages: ["never-have-i-ever-friends"],
    keywords: ["never have i ever", "nhie"],
  },
  {
    id: "this-or-that",
    slug: "this-or-that",
    name: "This or That",
    description:
      "Fast This or That choices for groups voting from their phones.",
    entityType: ENTITY_TYPES.GAME_FORMAT,
    relatedEntities: ["friends", "icebreaker"],
    relatedTopicHubs: ["question-games"],
    relatedLandingPages: ["this-or-that-friends"],
    keywords: ["this or that", "either or questions"],
  },
  {
    id: "friends",
    slug: "friends",
    name: "Friends",
    description:
      "Close friend groups, besties, roommates, and casual social circles.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["friend-quiz", "social-voting-game", "party"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["friend-games", "best-friend-quiz"],
    keywords: ["friends", "friend group", "besties"],
    aliases: ["friend group", "best friends"],
  },
  {
    id: "couples",
    slug: "couples",
    name: "Couples",
    description:
      "Couples, partners, and pairs looking for playful date-night games.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["relationship", "couple-quiz", "date-night"],
    relatedTopicHubs: ["relationship-games"],
    relatedLandingPages: ["couple-quiz", "date-night-game"],
    keywords: ["couples", "couple", "partners", "dating"],
  },
  {
    id: "teams",
    slug: "teams",
    name: "Teams",
    description:
      "Office teams, remote groups, and coworkers who need a quick group activity.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["work", "team-building-game", "icebreaker"],
    relatedTopicHubs: ["team-building-games"],
    relatedLandingPages: ["team-building-game"],
    keywords: ["teams", "team", "coworkers", "workplace"],
  },
  {
    id: "coworkers",
    slug: "coworkers",
    name: "Coworkers",
    description:
      "Coworkers and workplace groups meeting in person or on video calls.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["work", "teams", "work-meeting"],
    relatedTopicHubs: ["team-building-games"],
    relatedLandingPages: ["office-icebreaker"],
    keywords: ["coworkers", "colleagues", "office"],
  },
  {
    id: "families",
    slug: "families",
    name: "Families",
    description:
      "Family gatherings, reunions, and mixed-age groups at home.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["family", "holiday"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["games-for-families"],
    keywords: ["family", "families", "relatives", "reunion"],
  },
  {
    id: "teens",
    slug: "teens",
    name: "Teens",
    description:
      "Teen friend groups, sleepovers, and school social settings.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["friends", "sleepover"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["games-for-teens"],
    keywords: ["teens", "teenagers", "high school"],
  },
  {
    id: "college-students",
    slug: "college-students",
    name: "College Students",
    description:
      "College dorms, house parties, and campus friend groups.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["party", "friends", "pregame"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["games-for-college-students"],
    keywords: ["college", "campus", "dorm"],
  },
  {
    id: "remote-teams",
    slug: "remote-teams",
    name: "Remote Teams",
    description:
      "Distributed teams voting together over Slack, Teams, or video calls.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["teams", "work", "icebreaker"],
    relatedTopicHubs: ["team-building-games"],
    relatedLandingPages: ["remote-team-game", "virtual-team-building"],
    keywords: ["remote", "virtual", "distributed", "zoom"],
  },
  {
    id: "large-groups",
    slug: "large-groups",
    name: "Large Groups",
    description:
      "Big groups, parties, reunions, and events with many participants.",
    entityType: ENTITY_TYPES.AUDIENCE,
    relatedEntities: ["party", "social-voting-game"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["games-for-large-groups"],
    keywords: ["large group", "big group", "crowd"],
  },
  {
    id: "birthday-party",
    slug: "birthday-party",
    name: "Birthday Party",
    description:
      "Birthday celebrations where guests vote from their phones.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["party", "friends", "party-voting-game"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["birthday-party-game"],
    keywords: ["birthday", "birthday party"],
  },
  {
    id: "date-night",
    slug: "date-night",
    name: "Date Night",
    description:
      "Date nights and romantic evenings with playful couple voting.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["couples", "relationship", "couple-quiz"],
    relatedTopicHubs: ["relationship-games"],
    relatedLandingPages: ["date-night-game"],
    keywords: ["date night", "date", "romantic evening"],
  },
  {
    id: "girls-night",
    slug: "girls-night",
    name: "Girls Night",
    description:
      "Girls nights, bachelorettes, and friend-group hangouts.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["party", "friends"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["girls-night-game"],
    keywords: ["girls night", "bachelorette", "girls trip"],
  },
  {
    id: "sleepover",
    slug: "sleepover",
    name: "Sleepover",
    description:
      "Sleepovers and late-night friend hangouts with quick phone games.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["friends", "teens", "party"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["sleepover-game"],
    keywords: ["sleepover", "overnight", "late night"],
  },
  {
    id: "work-meeting",
    slug: "work-meeting",
    name: "Work Meeting",
    description:
      "Meetings, standups, and team check-ins that need a fast icebreaker.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["work", "teams", "icebreaker"],
    relatedTopicHubs: ["team-building-games", "icebreaker-games"],
    relatedLandingPages: ["meeting-icebreaker"],
    keywords: ["meeting", "standup", "team meeting"],
  },
  {
    id: "holiday-gathering",
    slug: "holiday-gathering",
    name: "Holiday Gathering",
    description:
      "Holiday dinners, Thanksgiving, Christmas, and seasonal family events.",
    entityType: ENTITY_TYPES.OCCASION,
    relatedEntities: ["holiday", "family", "families"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["holiday-family-games"],
    keywords: ["holiday", "thanksgiving", "christmas", "seasonal"],
  },
  {
    id: "icebreaker",
    slug: "icebreaker",
    name: "Icebreaker",
    description:
      "Breaking the ice for new groups, offices, classrooms, and events.",
    entityType: ENTITY_TYPES.ICEBREAKER,
    relatedEntities: ["icebreaker-game-format", "teams", "work"],
    relatedTopicHubs: ["icebreaker-games"],
    relatedLandingPages: ["icebreaker-game"],
    keywords: ["icebreaker", "break the ice", "warm up"],
  },
  {
    id: "party",
    slug: "party",
    name: "Party",
    description:
      "Parties, hangouts, and social events powered by phone voting.",
    entityType: ENTITY_TYPES.PARTY,
    relatedEntities: ["party-voting-game", "friends", "birthday-party"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["party-games"],
    keywords: ["party", "hangout", "get together"],
  },
  {
    id: "relationship",
    slug: "relationship",
    name: "Relationship",
    description:
      "Relationship games for couples, dates, and close pairs.",
    entityType: ENTITY_TYPES.RELATIONSHIP,
    relatedEntities: ["couple-quiz", "couples", "date-night"],
    relatedTopicHubs: ["relationship-games"],
    relatedLandingPages: ["relationship-games"],
    keywords: ["relationship", "romance", "couple"],
  },
  {
    id: "work",
    slug: "work",
    name: "Work",
    description:
      "Workplace-friendly games for offices, managers, and HR socials.",
    entityType: ENTITY_TYPES.WORK,
    relatedEntities: ["teams", "coworkers", "team-building-game"],
    relatedTopicHubs: ["team-building-games"],
    relatedLandingPages: ["team-building-games"],
    keywords: ["work", "office", "workplace", "corporate"],
  },
  {
    id: "education",
    slug: "education",
    name: "Education",
    description:
      "Classrooms, orientations, and student groups needing quick activities.",
    entityType: ENTITY_TYPES.EDUCATION,
    relatedEntities: ["icebreaker", "teams"],
    relatedTopicHubs: ["icebreaker-games"],
    relatedLandingPages: ["classroom-icebreaker"],
    keywords: ["classroom", "school", "students", "teacher"],
  },
  {
    id: "family",
    slug: "family",
    name: "Family",
    description:
      "Family-friendly games for reunions and mixed-age gatherings.",
    entityType: ENTITY_TYPES.FAMILY,
    relatedEntities: ["families", "holiday"],
    relatedTopicHubs: ["friend-games"],
    relatedLandingPages: ["games-for-families"],
    keywords: ["family", "relatives", "kids and adults"],
  },
  {
    id: "holiday",
    slug: "holiday",
    name: "Holiday",
    description:
      "Seasonal and holiday gatherings with group voting games.",
    entityType: ENTITY_TYPES.HOLIDAY,
    relatedEntities: ["holiday-gathering", "family"],
    relatedTopicHubs: ["party-games"],
    relatedLandingPages: ["thanksgiving-games"],
    keywords: ["holiday", "seasonal", "festive"],
  },
];

/** Intent category to domain entity ids. */
export const INTENT_CATEGORY_ENTITY_MAP: Record<string, string[]> = {
  "Social Voting": ["social-voting-game", "friends"],
  Friendship: ["friend-quiz", "friends"],
  Party: ["party", "party-voting-game"],
  Icebreakers: ["icebreaker", "icebreaker-game-format"],
  Teams: ["work", "teams", "team-building-game"],
  Relationships: ["relationship", "couple-quiz", "couples"],
  Entertainment: ["question-game", "friends"],
};

/** Keyword cluster to primary format entity ids. */
export const CLUSTER_FORMAT_ENTITY_MAP: Record<string, string[]> = {
  friendship: ["friend-quiz"],
  "social-voting": ["social-voting-game"],
  "most-likely": ["most-likely-to"],
  party: ["party-voting-game", "party"],
  icebreakers: ["icebreaker-game-format", "icebreaker"],
  teams: ["team-building-game", "work"],
  relationships: ["couple-quiz", "relationship"],
  entertainment: ["question-game"],
  questions: ["question-game"],
  audience: [],
};

/** Text signal patterns for audience and occasion entity matching. */
export const ENTITY_SIGNAL_PATTERNS: {
  entityId: string;
  patterns: RegExp[];
  weight: number;
}[] = [
  { entityId: "friends", patterns: [/friend|bestie|roommate|crew|group chat/i], weight: 6 },
  { entityId: "couples", patterns: [/couple|partner|dating|boyfriend|girlfriend|newlywed|married/i], weight: 8 },
  { entityId: "teams", patterns: [/team|coworker|workplace|office|employee|hr/i], weight: 7 },
  { entityId: "coworkers", patterns: [/coworker|colleague|office|workplace/i], weight: 6 },
  { entityId: "families", patterns: [/family|reunion|relatives|parents|kids/i], weight: 7 },
  { entityId: "teens", patterns: [/teen|high school|middle school/i], weight: 7 },
  { entityId: "college-students", patterns: [/college|campus|dorm|university/i], weight: 7 },
  { entityId: "remote-teams", patterns: [/remote|virtual|distributed|zoom|slack|long distance/i], weight: 8 },
  { entityId: "large-groups", patterns: [/large group|big group|crowd|conference|reunion/i], weight: 6 },
  { entityId: "birthday-party", patterns: [/birthday/i], weight: 9 },
  { entityId: "date-night", patterns: [/date night|anniversary|romantic/i], weight: 8 },
  { entityId: "girls-night", patterns: [/girls night|bachelorette|bridal shower/i], weight: 9 },
  { entityId: "sleepover", patterns: [/sleepover|overnight/i], weight: 9 },
  { entityId: "work-meeting", patterns: [/meeting|standup|onboarding|workshop/i], weight: 7 },
  { entityId: "holiday-gathering", patterns: [/thanksgiving|christmas|holiday|seasonal/i], weight: 8 },
  { entityId: "would-you-rather", patterns: [/would you rather/i], weight: 10 },
  { entityId: "never-have-i-ever", patterns: [/never have i ever|nhie/i], weight: 10 },
  { entityId: "this-or-that", patterns: [/this or that|either or/i], weight: 10 },
  { entityId: "most-likely-to", patterns: [/most likely/i], weight: 10 },
  { entityId: "education", patterns: [/classroom|school|student|teacher|orientation/i], weight: 7 },
  { entityId: "family", patterns: [/family|reunion/i], weight: 5 },
  { entityId: "holiday", patterns: [/holiday|thanksgiving|christmas/i], weight: 6 },
];

/** Topic hub id to entity boosts. */
export const HUB_ENTITY_BOOSTS: Record<string, string[]> = {
  "friend-games": ["friends", "friend-quiz", "social-voting-game"],
  "party-games": ["party", "party-voting-game", "birthday-party"],
  "team-building-games": ["work", "teams", "team-building-game"],
  "relationship-games": ["relationship", "couples", "couple-quiz"],
  "icebreaker-games": ["icebreaker", "icebreaker-game-format"],
  "question-games": ["question-game"],
};
