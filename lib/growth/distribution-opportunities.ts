import { pickHighestPriorityPageForAssets } from "@/lib/growth/growth-assets";
import { buildGrowthAssistantReport } from "@/lib/growth/growth-assistant";
import {
  getAllGrowthClassifications,
  type GrowthCategoryGroupKey,
  type GrowthPageClassification,
  type GrowthPageType,
} from "@/lib/growth/growth-priority";

export const DISTRIBUTION_OPPORTUNITY_CATEGORY_IDS = [
  "reddit-community",
  "pinterest",
  "ai-tool-directories",
  "browser-game-directories",
  "team-building-resources",
  "teacher-classroom-resources",
  "party-planning-resources",
  "relationship-couples-resources",
  "startup-indie-directories",
  "product-led-sharing",
] as const;

export type DistributionOpportunityCategoryId =
  (typeof DISTRIBUTION_OPPORTUNITY_CATEGORY_IDS)[number];

export const GROWTH_ASSET_TYPES = [
  "reddit",
  "linkedin",
  "pinterest",
  "ai-directory",
  "backlink-outreach",
  "product-sharing",
  "seo-snippet",
] as const;

export type GrowthAssetType = (typeof GROWTH_ASSET_TYPES)[number];

export type DistributionOpportunityDefinition = {
  id: DistributionOpportunityCategoryId;
  channel: string;
  audience: string;
  suitablePageTypes: GrowthPageType[];
  suitableAssetTypes: GrowthAssetType[];
  effort: "low" | "medium" | "high";
  expectedUpside: "low" | "medium" | "high";
  risk: "low" | "medium" | "high";
  approvalRequired: boolean;
  postingStyle: string;
  avoidRules: string[];
  exampleUseCase: string;
  recommendedCadence: string;
};

export type DistributionTarget = {
  id: string;
  categoryId: DistributionOpportunityCategoryId;
  name: string;
  description: string;
  examplePaths: string[];
  effort: "low" | "medium" | "high";
  expectedUpside: "low" | "medium" | "high";
};

export type DistributionOpportunityMatch = {
  categoryId: DistributionOpportunityCategoryId;
  channel: string;
  score: number;
  reason: string;
  suitableAssetTypes: GrowthAssetType[];
  recommendedCadence: string;
};

export type DistributionOpportunitiesReport = {
  topOpportunities: DistributionOpportunityDefinition[];
  recommendedFirstTargets: DistributionTarget[];
  bestForPriorityPage: {
    path: string;
    title: string;
    matches: DistributionOpportunityMatch[];
  };
  channelsToAvoidThisWeek: string[];
  cadenceRecommendation: string;
  manualApprovalReminder: string;
};

export const DISTRIBUTION_OPPORTUNITIES: DistributionOpportunityDefinition[] = [
  {
    id: "reddit-community",
    channel: "Reddit / community forums",
    audience: "Friend groups, party planners, teachers, remote teams",
    suitablePageTypes: ["topic-hub", "landing-page"],
    suitableAssetTypes: ["reddit", "product-sharing"],
    effort: "medium",
    expectedUpside: "medium",
    risk: "medium",
    approvalRequired: true,
    postingStyle:
      "Answer the question first; mention FriendRank only when it directly solves the thread. No link dumps.",
    avoidRules: [
      "Do not post the same link in multiple subreddits in one week",
      "Do not copy-paste identical posts across communities",
      "Do not use promotional account names or vote manipulation",
    ],
    exampleUseCase:
      "Share /friend-games when someone asks for free browser party games for a friend group.",
    recommendedCadence: "At most one authentic community contribution per week",
  },
  {
    id: "pinterest",
    channel: "Pinterest",
    audience: "Party planners, parents, teachers, couples planning activities",
    suitablePageTypes: ["topic-hub", "landing-page"],
    suitableAssetTypes: ["pinterest"],
    effort: "medium",
    expectedUpside: "medium",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Vertical pin with clear benefit text, occasion keyword, and one destination URL.",
    avoidRules: [
      "Do not pin the same URL to dozens of boards in one session",
      "Do not use misleading images unrelated to group voting games",
    ],
    exampleUseCase:
      "Pin /birthday-party-games for birthday party game idea boards.",
    recommendedCadence: "One new pin per priority page per month",
  },
  {
    id: "ai-tool-directories",
    channel: "AI tool directories",
    audience: "Tool hunters, indie makers, AI early adopters",
    suitablePageTypes: ["topic-hub", "landing-page", "homepage"],
    suitableAssetTypes: ["ai-directory"],
    effort: "low",
    expectedUpside: "low",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Factual listing with 1-sentence hook, 3-sentence summary, and category tags (games, groups, browser).",
    avoidRules: [
      "Do not mislabel FriendRank as an LLM or chatbot product",
      "Do not submit duplicate listings under slightly different names",
    ],
    exampleUseCase:
      "List /friend-games as a free browser group voting game for friends.",
    recommendedCadence: "One directory submission every two weeks",
  },
  {
    id: "browser-game-directories",
    channel: "Browser game directories",
    audience: "Casual gamers, party hosts, no-download game seekers",
    suitablePageTypes: ["topic-hub", "landing-page"],
    suitableAssetTypes: ["ai-directory", "backlink-outreach"],
    effort: "low",
    expectedUpside: "medium",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Emphasize no signup, phone voting, multiplayer via link, and quick setup.",
    avoidRules: [
      "Do not claim app-store availability",
      "Do not spam every directory with identical copy in one day",
    ],
    exampleUseCase:
      "Submit /friend-games to a multiplayer browser game roundup.",
    recommendedCadence: "One directory per week maximum",
  },
  {
    id: "team-building-resources",
    channel: "Team-building blogs and HR resource sites",
    audience: "Managers, HR, remote team leads, workshop facilitators",
    suitablePageTypes: ["landing-page", "topic-hub"],
    suitableAssetTypes: ["backlink-outreach", "linkedin"],
    effort: "high",
    expectedUpside: "medium",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Outreach email offering a free resource link with anonymous voting angle for honest team feedback.",
    avoidRules: [
      "Do not send bulk identical outreach to dozens of HR blogs",
      "Do not promise paid integrations or enterprise features that do not exist",
    ],
    exampleUseCase:
      "Pitch /icebreaker-game to a remote team bonding article author.",
    recommendedCadence: "One outreach email per week",
  },
  {
    id: "teacher-classroom-resources",
    channel: "Teacher and classroom activity resources",
    audience: "Teachers, student activity planners, school clubs",
    suitablePageTypes: ["landing-page"],
    suitableAssetTypes: ["backlink-outreach", "pinterest", "reddit"],
    effort: "high",
    expectedUpside: "medium",
    risk: "medium",
    approvalRequired: true,
    postingStyle:
      "Classroom-safe framing: quick icebreaker, phones optional, no personal data required.",
    avoidRules: [
      "Do not target K-12 communities without age-appropriate framing",
      "Do not imply school district endorsement",
    ],
    exampleUseCase:
      "Suggest /classroom-icebreaker for a teacher icebreaker resource list.",
    recommendedCadence: "One teacher-resource outreach attempt every two weeks",
  },
  {
    id: "party-planning-resources",
    channel: "Party planning blogs and occasion roundups",
    audience: "Party hosts, birthday planners, bachelorette organizers",
    suitablePageTypes: ["landing-page", "topic-hub"],
    suitableAssetTypes: ["backlink-outreach", "pinterest", "reddit"],
    effort: "medium",
    expectedUpside: "medium",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Occasion-first copy: birthday, sleepover, girls night — then free browser game link.",
    avoidRules: [
      "Do not spam wedding or event forums with unrelated links",
      "Do not use affiliate-style language without disclosure if added later",
    ],
    exampleUseCase:
      "Pitch /birthday-party-games for a birthday activity roundup post.",
    recommendedCadence: "One party-blog outreach or pin pair per week",
  },
  {
    id: "relationship-couples-resources",
    channel: "Relationship and couples activity blogs",
    audience: "Couples, date-night planners, relationship content readers",
    suitablePageTypes: ["landing-page", "topic-hub"],
    suitableAssetTypes: ["pinterest", "reddit", "backlink-outreach"],
    effort: "medium",
    expectedUpside: "low",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Group-friendly relationship quiz angle — social voting, not solo compatibility apps.",
    avoidRules: [
      "Do not post in support or breakup communities with promotional links",
      "Do not overpromise relationship outcomes",
    ],
    exampleUseCase:
      "Share relationship hub pages when couples ask for group date activities.",
    recommendedCadence: "One relationship-resource touchpoint per month",
  },
  {
    id: "startup-indie-directories",
    channel: "Startup and indie product directories",
    audience: "Indie hackers, product hunters, side-project communities",
    suitablePageTypes: ["homepage", "topic-hub"],
    suitableAssetTypes: ["ai-directory", "linkedin"],
    effort: "low",
    expectedUpside: "low",
    risk: "low",
    approvalRequired: true,
    postingStyle:
      "Product story: create game → share link → group votes → viral loop. Keep launch tone honest.",
    avoidRules: [
      "Do not relaunch the same product weekly on launch platforms",
      "Do not inflate user numbers or traction claims",
    ],
    exampleUseCase:
      "Submit FriendRank homepage to an indie SaaS or side-project directory.",
    recommendedCadence: "One startup directory submission per month",
  },
  {
    id: "product-led-sharing",
    channel: "Product-led sharing (WhatsApp, Discord, Slack, iMessage)",
    audience: "Existing friend groups, teams, and communities already hosting games",
    suitablePageTypes: ["topic-hub", "landing-page"],
    suitableAssetTypes: ["product-sharing"],
    effort: "low",
    expectedUpside: "high",
    risk: "low",
    approvalRequired: false,
    postingStyle:
      "Short personal invite from a host who already created a game — not a brand broadcast.",
    avoidRules: [
      "Do not mass-message strangers",
      "Do not post invite links in unrelated Discord servers without permission",
    ],
    exampleUseCase:
      "Share /best-friend-quiz link in a friend group chat before game night.",
    recommendedCadence: "Every time a host creates a game — zero marginal cost",
  },
];

export const DISTRIBUTION_TARGETS: DistributionTarget[] = [
  {
    id: "reddit-party-games",
    categoryId: "reddit-community",
    name: "r/PartyGames and similar game threads",
    description: "Threads asking for browser party games or group activities",
    examplePaths: ["/friend-games", "/party-games", "/birthday-party-games"],
    effort: "medium",
    expectedUpside: "medium",
  },
  {
    id: "reddit-teambuilding",
    categoryId: "reddit-community",
    name: "r/Teambuilding and remote work communities",
    description: "Icebreaker and remote team activity questions",
    examplePaths: ["/icebreaker-game", "/team-building-game", "/office-icebreaker"],
    effort: "medium",
    expectedUpside: "medium",
  },
  {
    id: "pinterest-party-boards",
    categoryId: "pinterest",
    name: "Party planning and birthday activity boards",
    description: "Visual pins for occasion-based game landing pages",
    examplePaths: ["/birthday-party-games", "/best-friend-quiz", "/friend-games"],
    effort: "medium",
    expectedUpside: "medium",
  },
  {
    id: "ai-tool-listings",
    categoryId: "ai-tool-directories",
    name: "AI group activity and browser tool directories",
    description: "Listings for free browser tools with AI-friendly descriptions",
    examplePaths: ["/friend-games", "/most-likely-to-generator"],
    effort: "low",
    expectedUpside: "low",
  },
  {
    id: "browser-game-roundups",
    categoryId: "browser-game-directories",
    name: "Multiplayer browser game roundups",
    description: "No-download multiplayer and social game collections",
    examplePaths: ["/friend-games", "/party-games"],
    effort: "low",
    expectedUpside: "medium",
  },
  {
    id: "team-building-blogs",
    categoryId: "team-building-resources",
    name: "HR and workplace icebreaker blogs",
    description: "Outreach for workplace icebreaker and bonding articles",
    examplePaths: ["/icebreaker-game", "/team-building-game", "/meeting-icebreaker"],
    effort: "high",
    expectedUpside: "medium",
  },
  {
    id: "teacher-resource-sites",
    categoryId: "teacher-classroom-resources",
    name: "Teacher icebreaker and classroom activity sites",
    description: "Classroom-safe group activity resource pages",
    examplePaths: ["/classroom-icebreaker", "/icebreaker-game"],
    effort: "high",
    expectedUpside: "medium",
  },
  {
    id: "party-planning-blogs",
    categoryId: "party-planning-resources",
    name: "Birthday and party game roundup blogs",
    description: "Occasion lists linking to free group games",
    examplePaths: ["/birthday-party-games", "/birthday-party-game", "/party-voting-game"],
    effort: "medium",
    expectedUpside: "medium",
  },
  {
    id: "relationship-activity-blogs",
    categoryId: "relationship-couples-resources",
    name: "Date-night and couples activity blogs",
    description: "Group-friendly quiz and couple game suggestions",
    examplePaths: ["/relationship-quiz", "/couple-quiz", "/relationship-games"],
    effort: "medium",
    expectedUpside: "low",
  },
  {
    id: "indie-product-directories",
    categoryId: "startup-indie-directories",
    name: "Indie hacker and product launch directories",
    description: "Side-project and free tool discovery platforms",
    examplePaths: ["/", "/friend-games"],
    effort: "low",
    expectedUpside: "low",
  },
  {
    id: "group-chat-sharing",
    categoryId: "product-led-sharing",
    name: "WhatsApp / Discord / Slack group chats",
    description: "Direct share from a host who created a game",
    examplePaths: ["/best-friend-quiz", "/most-likely-to-generator", "/friend-games"],
    effort: "low",
    expectedUpside: "high",
  },
];

const PAGE_CATEGORY_OVERRIDES: Record<
  string,
  DistributionOpportunityCategoryId[]
> = {
  "/friend-games": [
    "reddit-community",
    "pinterest",
    "ai-tool-directories",
    "browser-game-directories",
    "product-led-sharing",
  ],
  "/party-games": [
    "reddit-community",
    "pinterest",
    "party-planning-resources",
    "browser-game-directories",
  ],
  "/team-building-games": [
    "team-building-resources",
    "reddit-community",
    "browser-game-directories",
  ],
  "/icebreaker-games": [
    "team-building-resources",
    "teacher-classroom-resources",
    "reddit-community",
  ],
  "/relationship-games": [
    "relationship-couples-resources",
    "pinterest",
    "reddit-community",
  ],
  "/question-games": [
    "reddit-community",
    "teacher-classroom-resources",
    "product-led-sharing",
  ],
  "/icebreaker-game": [
    "team-building-resources",
    "teacher-classroom-resources",
    "reddit-community",
  ],
  "/birthday-party-games": [
    "pinterest",
    "party-planning-resources",
    "reddit-community",
  ],
  "/birthday-party-game": [
    "pinterest",
    "party-planning-resources",
    "reddit-community",
  ],
  "/best-friend-quiz": [
    "pinterest",
    "reddit-community",
    "product-led-sharing",
  ],
  "/classroom-icebreaker": [
    "teacher-classroom-resources",
    "reddit-community",
    "pinterest",
  ],
  "/team-building-game": [
    "team-building-resources",
    "reddit-community",
    "browser-game-directories",
  ],
};

const CATEGORY_GROUP_DEFAULTS: Record<
  GrowthCategoryGroupKey,
  DistributionOpportunityCategoryId[]
> = {
  friend: [
    "reddit-community",
    "pinterest",
    "browser-game-directories",
    "product-led-sharing",
  ],
  party: [
    "pinterest",
    "party-planning-resources",
    "reddit-community",
    "product-led-sharing",
  ],
  team: [
    "team-building-resources",
    "reddit-community",
    "browser-game-directories",
  ],
  relationship: [
    "relationship-couples-resources",
    "pinterest",
    "reddit-community",
  ],
  question: [
    "reddit-community",
    "teacher-classroom-resources",
    "product-led-sharing",
  ],
};

const HUB_DEFAULTS: Record<string, DistributionOpportunityCategoryId[]> = {
  "friend-games": PAGE_CATEGORY_OVERRIDES["/friend-games"]!,
  "party-games": PAGE_CATEGORY_OVERRIDES["/party-games"]!,
  "team-building-games": PAGE_CATEGORY_OVERRIDES["/team-building-games"]!,
  "icebreaker-games": PAGE_CATEGORY_OVERRIDES["/icebreaker-games"]!,
  "relationship-games": PAGE_CATEGORY_OVERRIDES["/relationship-games"]!,
  "question-games": PAGE_CATEGORY_OVERRIDES["/question-games"]!,
};

function getOpportunityById(
  id: DistributionOpportunityCategoryId,
): DistributionOpportunityDefinition {
  const entry = DISTRIBUTION_OPPORTUNITIES.find((item) => item.id === id);
  if (!entry) {
    throw new Error(`Unknown distribution opportunity category: ${id}`);
  }
  return entry;
}

function scoreOpportunity(
  opportunity: DistributionOpportunityDefinition,
  page: GrowthPageClassification,
): number {
  let score = 0;

  if (opportunity.suitablePageTypes.includes(page.pageType)) {
    score += 20;
  }

  if (page.growthTier === "P0") {
    score += 15;
  } else if (page.growthTier === "P1") {
    score += 10;
  } else if (page.growthTier === "P2") {
    score += 5;
  }

  if (opportunity.expectedUpside === "high") {
    score += 12;
  } else if (opportunity.expectedUpside === "medium") {
    score += 8;
  } else {
    score += 4;
  }

  if (opportunity.effort === "low") {
    score += 6;
  } else if (opportunity.effort === "medium") {
    score += 4;
  }

  if (opportunity.risk === "low") {
    score += 4;
  }

  if (page.featuredInHub) {
    score += 5;
  }

  return score;
}

function resolveCategoryIdsForPage(
  page: GrowthPageClassification,
): DistributionOpportunityCategoryId[] {
  const override = PAGE_CATEGORY_OVERRIDES[page.path];
  if (override) {
    return override;
  }

  if (page.pageType === "topic-hub" && page.topicHubId) {
    const hubDefaults = HUB_DEFAULTS[page.topicHubId];
    if (hubDefaults) {
      return hubDefaults;
    }
  }

  if (page.categoryGroup) {
    return CATEGORY_GROUP_DEFAULTS[page.categoryGroup];
  }

  return ["reddit-community", "product-led-sharing", "browser-game-directories"];
}

function buildMatchReason(
  opportunity: DistributionOpportunityDefinition,
  page: GrowthPageClassification,
): string {
  if (PAGE_CATEGORY_OVERRIDES[page.path]?.includes(opportunity.id)) {
    return `Explicit registry match for ${page.path}.`;
  }

  if (page.pageType === "topic-hub") {
    return `${opportunity.channel} fits topic hub discovery for ${page.title}.`;
  }

  if (page.categoryGroup) {
    return `${opportunity.channel} aligns with ${page.categoryGroup} category pages.`;
  }

  return `${opportunity.channel} is a general fit for ${page.path}.`;
}

/** Returns ranked distribution opportunities for a page path. */
export function getDistributionOpportunitiesForPath(
  path: string,
): DistributionOpportunityMatch[] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const page = getAllGrowthClassifications().find(
    (entry) => entry.path === normalizedPath,
  );

  if (!page) {
    return [];
  }

  return getDistributionOpportunitiesForPage(page);
}

/** Returns ranked distribution opportunities for a classified page. */
export function getDistributionOpportunitiesForPage(
  page: GrowthPageClassification,
): DistributionOpportunityMatch[] {
  const categoryIds = resolveCategoryIdsForPage(page);

  return categoryIds
    .map((categoryId) => {
      const opportunity = getOpportunityById(categoryId);
      return {
        categoryId,
        channel: opportunity.channel,
        score: scoreOpportunity(opportunity, page),
        reason: buildMatchReason(opportunity, page),
        suitableAssetTypes: opportunity.suitableAssetTypes,
        recommendedCadence: opportunity.recommendedCadence,
      };
    })
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return left.channel.localeCompare(right.channel);
    });
}

/** Returns distribution categories suitable for a generated asset type. */
export function getDistributionOpportunitiesForAssetType(
  assetType: GrowthAssetType,
): DistributionOpportunityDefinition[] {
  return DISTRIBUTION_OPPORTUNITIES.filter((entry) =>
    entry.suitableAssetTypes.includes(assetType),
  );
}

/** Returns concrete targets ranked for a page path. */
export function getDistributionTargetsForPath(path: string): DistributionTarget[] {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const matches = getDistributionOpportunitiesForPath(normalizedPath);
  const matchIds = new Set(matches.map((match) => match.categoryId));

  return DISTRIBUTION_TARGETS.filter((target) => {
    if (target.examplePaths.includes(normalizedPath)) {
      return true;
    }
    return matchIds.has(target.categoryId);
  }).sort((left, right) => {
    const leftDirect = left.examplePaths.includes(normalizedPath) ? 1 : 0;
    const rightDirect = right.examplePaths.includes(normalizedPath) ? 1 : 0;
    if (rightDirect !== leftDirect) {
      return rightDirect - leftDirect;
    }
    return left.name.localeCompare(right.name);
  });
}

/** Returns the first 10 recommended distribution targets across priority pages. */
export function getRecommendedFirstTargets(limit = 10): DistributionTarget[] {
  const priorityPaths = new Set(
    [
      pickHighestPriorityPageForAssets().path,
      "/friend-games",
      "/icebreaker-game",
      "/birthday-party-games",
      "/best-friend-quiz",
    ].map((path) => path),
  );

  const scored = DISTRIBUTION_TARGETS.map((target) => {
    let score = 0;
    for (const path of target.examplePaths) {
      if (priorityPaths.has(path)) {
        score += 10;
      }
    }
    if (target.expectedUpside === "high") {
      score += 5;
    } else if (target.expectedUpside === "medium") {
      score += 3;
    }
    if (target.effort === "low") {
      score += 2;
    }
    return { target, score };
  }).sort((left, right) => {
    if (right.score !== left.score) {
      return right.score - left.score;
    }
    return left.target.name.localeCompare(right.target.name);
  });

  return scored.slice(0, limit).map((entry) => entry.target);
}

function resolveChannelsToAvoidThisWeek(): string[] {
  const assistantReport = buildGrowthAssistantReport();

  return assistantReport.channelRecommendations
    .filter((entry) => entry.decision === "ignore" || entry.decision === "defer")
    .map((entry) => `${entry.channel} (${entry.decision}) — ${entry.reason}`);
}

function resolveCadenceRecommendation(
  matches: DistributionOpportunityMatch[],
): string {
  if (matches.length === 0) {
    return "No distribution this week — fix audit failures first, then revisit.";
  }

  const lowEffortMatch = matches.find((match) => {
    const opportunity = getOpportunityById(match.categoryId);
    return opportunity.effort === "low";
  });

  const primary = matches[0]!;
  const secondary =
    matches.find(
      (match) =>
        match.categoryId !== primary.categoryId &&
        match.categoryId !== lowEffortMatch?.categoryId,
    ) ?? matches[1];

  if (lowEffortMatch && secondary) {
    return `Start with ${lowEffortMatch.channel} (${lowEffortMatch.recommendedCadence}), then one ${secondary.channel} touchpoint (${secondary.recommendedCadence}).`;
  }

  return `Primary cadence: ${primary.channel} — ${primary.recommendedCadence}.`;
}

export const MANUAL_APPROVAL_REMINDER =
  "All distribution is manual. Review each post, email, pin, and directory submission before publishing. Never auto-post. Respect community rules and approvalRequired flags.";

/** Builds the distribution opportunities report. */
export function buildDistributionOpportunitiesReport(): DistributionOpportunitiesReport {
  const priorityPage = pickHighestPriorityPageForAssets();
  const matches = getDistributionOpportunitiesForPage(priorityPage);

  return {
    topOpportunities: [...DISTRIBUTION_OPPORTUNITIES],
    recommendedFirstTargets: getRecommendedFirstTargets(10),
    bestForPriorityPage: {
      path: priorityPage.path,
      title: priorityPage.title,
      matches,
    },
    channelsToAvoidThisWeek: resolveChannelsToAvoidThisWeek(),
    cadenceRecommendation: resolveCadenceRecommendation(matches),
    manualApprovalReminder: MANUAL_APPROVAL_REMINDER,
  };
}

/** Validates registry completeness. */
export function validateDistributionOpportunitiesRegistry(): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (DISTRIBUTION_OPPORTUNITIES.length !== DISTRIBUTION_OPPORTUNITY_CATEGORY_IDS.length) {
    issues.push("Distribution opportunity categories are incomplete.");
  }

  for (const opportunity of DISTRIBUTION_OPPORTUNITIES) {
    if (opportunity.avoidRules.length === 0) {
      issues.push(`${opportunity.id} is missing avoid/spam rules.`);
    }
    if (!opportunity.exampleUseCase.trim()) {
      issues.push(`${opportunity.id} is missing an example use case.`);
    }
  }

  if (getRecommendedFirstTargets(10).length < 10) {
    issues.push("Recommended first targets must include 10 entries.");
  }

  const friendGamesMatches = getDistributionOpportunitiesForPath("/friend-games");
  const friendGameIds = new Set(friendGamesMatches.map((match) => match.categoryId));
  for (const required of [
    "reddit-community",
    "pinterest",
    "ai-tool-directories",
    "browser-game-directories",
  ] as const) {
    if (!friendGameIds.has(required)) {
      issues.push(`/friend-games should match ${required}.`);
    }
  }

  return { valid: issues.length === 0, issues };
}

/** Formats the distribution opportunities report for CLI output. */
export function formatDistributionOpportunitiesReport(
  report?: DistributionOpportunitiesReport,
): string {
  const data = report ?? buildDistributionOpportunitiesReport();
  const validation = validateDistributionOpportunitiesRegistry();

  const lines: string[] = [
    "FriendRank distribution opportunity registry",
    `Status: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    "Top distribution opportunity categories",
  ];

  for (const opportunity of data.topOpportunities) {
    lines.push(
      `- ${opportunity.channel} | effort ${opportunity.effort} | upside ${opportunity.expectedUpside} | risk ${opportunity.risk} | approval ${opportunity.approvalRequired ? "yes" : "no"}`,
    );
    lines.push(`  cadence: ${opportunity.recommendedCadence}`);
    lines.push(`  example: ${opportunity.exampleUseCase}`);
  }

  lines.push("", "Recommended first 10 targets");
  for (const [index, target] of data.recommendedFirstTargets.entries()) {
    lines.push(
      `${index + 1}. ${target.name} (${target.categoryId}) — ${target.description}`,
    );
    lines.push(
      `   example paths: ${target.examplePaths.join(", ")} | effort ${target.effort} | upside ${target.expectedUpside}`,
    );
  }

  lines.push(
    "",
    "Best opportunities for current highest-priority page",
    `- page: ${data.bestForPriorityPage.path} (${data.bestForPriorityPage.title})`,
  );

  for (const match of data.bestForPriorityPage.matches) {
    lines.push(
      `- ${match.channel} (score ${match.score}) — assets: ${match.suitableAssetTypes.join(", ")}`,
    );
    lines.push(`  reason: ${match.reason}`);
    lines.push(`  cadence: ${match.recommendedCadence}`);
  }

  lines.push("", "Channels to avoid this week");
  for (const entry of data.channelsToAvoidThisWeek) {
    lines.push(`- ${entry}`);
  }

  lines.push("", "Cadence recommendation", data.cadenceRecommendation);
  lines.push("", "Manual approval reminder", data.manualApprovalReminder);

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const issue of validation.issues) {
      lines.push(`- ${issue}`);
    }
  }

  return lines.join("\n").trimEnd();
}

export {
  getOpportunityById,
  resolveCategoryIdsForPage,
};
