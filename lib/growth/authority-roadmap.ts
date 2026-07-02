import {
  getGrowthPriorityPages,
  getSearchConsoleLandingPageTargets,
} from "@/lib/growth/growth-priority";
import { buildIndexingQueue } from "@/lib/growth/search-console-action-plan";

export const GROWTH_CHANNEL_IDS = [
  "search-console-seo",
  "geo-ai-discoverability",
  "reddit-community",
  "pinterest",
  "tiktok-reels-shorts",
  "backlink-outreach",
  "partnerships",
  "product-led-sharing",
  "direct-referral",
] as const;

export type GrowthChannelId = (typeof GROWTH_CHANNEL_IDS)[number];

export const EFFORT_LEVELS = ["low", "medium", "high"] as const;
export type EffortLevel = (typeof EFFORT_LEVELS)[number];

export const IMPACT_LEVELS = ["low", "medium", "high"] as const;
export type ImpactLevel = (typeof IMPACT_LEVELS)[number];

export const TIME_TO_IMPACT_LEVELS = [
  "immediate",
  "weeks",
  "months",
  "quarter+",
] as const;
export type TimeToImpact = (typeof TIME_TO_IMPACT_LEVELS)[number];

export const RISK_LEVELS = ["low", "medium", "high"] as const;
export type RiskLevel = (typeof RISK_LEVELS)[number];

export type GrowthChannelMatrixEntry = {
  id: GrowthChannelId;
  label: string;
  effort: EffortLevel;
  expectedUpside: ImpactLevel;
  timeToImpact: TimeToImpact;
  risk: RiskLevel;
  recommendedPriority: number;
  whyItMattersForFriendRank: string;
};

export type WeeklyOperatingDay = {
  day: string;
  focus: string;
  tasks: string[];
};

export type ThirtyDayWeekPlan = {
  week: number;
  title: string;
  milestones: string[];
};

export type AuthorityTargetCategory = {
  category: string;
  examples: string[];
  approach: string;
};

export type GrowthKpiDefinition = {
  kpi: string;
  source: string;
  cadence: string;
  whyItMatters: string;
};

export type MonetizationOption = {
  option: string;
  whenToConsider: string;
};

export const MONETIZATION_READINESS_RULE =
  "No monetization sprint until there is meaningful traffic and usage — target sustained organic clicks, recurring game creation, and returning users before testing revenue.";

export const GROWTH_CHANNEL_MATRIX: GrowthChannelMatrixEntry[] = [
  {
    id: "search-console-seo",
    label: "Search Console / SEO",
    effort: "medium",
    expectedUpside: "high",
    timeToImpact: "weeks",
    risk: "low",
    recommendedPriority: 1,
    whyItMattersForFriendRank:
      "FriendRank has 107 indexable pages and strong on-page SEO. Search Console is the primary lever for impressions, indexing, and CTR on existing landing pages and topic hubs.",
  },
  {
    id: "geo-ai-discoverability",
    label: "GEO / AI discoverability",
    effort: "low",
    expectedUpside: "medium",
    timeToImpact: "months",
    risk: "low",
    recommendedPriority: 2,
    whyItMattersForFriendRank:
      "GEO Foundation and AI Citation layers already structure entity clarity and quotable summaries. Audits keep pages ready as LLM search and AI overviews mature.",
  },
  {
    id: "product-led-sharing",
    label: "Product-led sharing",
    effort: "low",
    expectedUpside: "high",
    timeToImpact: "immediate",
    risk: "low",
    recommendedPriority: 2,
    whyItMattersForFriendRank:
      "Every game creates a shareable link, invite loop, and group results moment. Strong product UX converts visitors into organic distribution without paid spend.",
  },
  {
    id: "reddit-community",
    label: "Reddit / community",
    effort: "medium",
    expectedUpside: "medium",
    timeToImpact: "weeks",
    risk: "medium",
    recommendedPriority: 3,
    whyItMattersForFriendRank:
      "Party games, icebreakers, and friend quizzes map to active subreddits. Authentic participation can drive referral traffic and branded search when done sparingly.",
  },
  {
    id: "backlink-outreach",
    label: "Backlink outreach",
    effort: "high",
    expectedUpside: "medium",
    timeToImpact: "months",
    risk: "low",
    recommendedPriority: 4,
    whyItMattersForFriendRank:
      "Authority links from party-game blogs, classroom resources, and team-building sites strengthen topical trust for competitive game and quiz queries.",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    effort: "medium",
    expectedUpside: "medium",
    timeToImpact: "months",
    risk: "low",
    recommendedPriority: 4,
    whyItMattersForFriendRank:
      "Visual boards for party ideas, classroom activities, and date-night games fit FriendRank's occasion-based landing pages and can compound over time.",
  },
  {
    id: "partnerships",
    label: "Partnerships",
    effort: "high",
    expectedUpside: "medium",
    timeToImpact: "quarter+",
    risk: "medium",
    recommendedPriority: 5,
    whyItMattersForFriendRank:
      "Co-marketing with event planners, HR tools, or education communities can unlock qualified traffic but requires relationship building before scale.",
  },
  {
    id: "tiktok-reels-shorts",
    label: "TikTok / Reels / Shorts",
    effort: "high",
    expectedUpside: "medium",
    timeToImpact: "months",
    risk: "medium",
    recommendedPriority: 5,
    whyItMattersForFriendRank:
      "Short-form demos of funny group results can spike awareness, but production cost is high and traffic is less intent-matched than search.",
  },
  {
    id: "direct-referral",
    label: "Direct / referral traffic",
    effort: "low",
    expectedUpside: "medium",
    timeToImpact: "immediate",
    risk: "low",
    recommendedPriority: 3,
    whyItMattersForFriendRank:
      "Word-of-mouth from game hosts is the baseline loop. Track referral sources in GA4 to see which pages and occasions drive repeat creation.",
  },
];

export const WEEKLY_OPERATING_PLAN: WeeklyOperatingDay[] = [
  {
    day: "Monday",
    focus: "Search Console / GA4 review",
    tasks: [
      "Export last 7 days Performance (queries + pages)",
      "Check indexed vs crawled-not-indexed page counts",
      "Review GA4: cta_clicked, game_created, game_creation_started",
      "Run npm run growth:priorities and npm run growth:search-console-plan",
    ],
  },
  {
    day: "Tuesday",
    focus: "Metadata / title opportunities",
    tasks: [
      "Run npm run growth:ctr for title/meta candidates",
      "Flag pages ranking positions 8–30 with CTR below 2%",
      "Pick at most one title/meta experiment for the week",
      "Log old vs new metadata before deploy",
    ],
  },
  {
    day: "Wednesday",
    focus: "Community / content distribution",
    tasks: [
      "Share one useful thread or comment in a relevant community",
      "Draft one Pinterest pin or social snippet from a live landing page",
      "Avoid spam — lead with value, link only when appropriate",
    ],
  },
  {
    day: "Thursday",
    focus: "AI / GEO checks",
    tasks: [
      "Run npm run geo:report and npm run ai:citation",
      "Run npm run audit:all — fix errors, triage warnings",
      "Review AI referral or branded query trends in GA4 if available",
    ],
  },
  {
    day: "Friday",
    focus: "Backlink / partner experiments",
    tasks: [
      "Send one outreach email or partnership note",
      "Submit to one relevant directory (browser game, AI tool, startup)",
      "Update outreach log with URL, contact, and follow-up date",
    ],
  },
  {
    day: "Weekend",
    focus: "Optional social content or page review",
    tasks: [
      "Optional: record a short game demo for TikTok/Reels",
      "Optional: review one underperforming P1 landing page content",
      "Optional: add internal links from a topic hub to a support page",
    ],
  },
];

export const THIRTY_DAY_PLAN: ThirtyDayWeekPlan[] = [
  {
    week: 1,
    title: "Search Console baseline + priority URL monitoring",
    milestones: [
      "Verify Search Console property and submit sitemap",
      "Run npm run growth:search-console-plan — request Batch 1 indexing",
      "Record baseline: impressions, clicks, CTR, indexed page count",
      "Inspect all P0 URLs (homepage + 6 topic hubs)",
      "Link Search Console to GA4",
    ],
  },
  {
    week: 2,
    title: "CTR / title / meta candidate review",
    milestones: [
      "Run npm run growth:ctr — review top 10 candidates",
      "Identify pages with impressions but zero clicks",
      "Adopt one P0/P1 title/meta change backed by Search Console data",
      "Request indexing once for the updated URL only",
      "Monitor CTR for 7 days after change",
    ],
  },
  {
    week: 3,
    title: "First external distribution tests",
    milestones: [
      "Post one authentic community contribution (Reddit or forum)",
      "Create one Pinterest pin linking to a topic hub or top landing page",
      "Send two backlink outreach emails to relevant blogs",
      "Submit FriendRank to one browser-game or AI-tool directory",
      "Track referral sessions in GA4",
    ],
  },
  {
    week: 4,
    title: "Review early traffic signals and decide next experiments",
    milestones: [
      "Compare week-4 vs week-1 impressions, clicks, and indexed pages",
      "Review top 10 queries and top 10 landing pages by clicks",
      "Decide whether to double down on SEO, community, or outreach",
      "Submit Batch 2 indexing for URLs still not indexed",
      "Set month-2 goals based on actual baseline",
    ],
  },
];

export const AUTHORITY_TARGET_CATEGORIES: AuthorityTargetCategory[] = [
  {
    category: "Party game blogs",
    examples: [
      "Birthday party game roundups",
      "Sleepover and girls-night activity lists",
      "Adult party icebreaker blogs",
    ],
    approach:
      "Offer a free embeddable game link or quote about anonymous group voting for party lists.",
  },
  {
    category: "Classroom activity resources",
    examples: [
      "Teacher icebreaker collections",
      "Student engagement activity blogs",
      "Remote learning game lists",
    ],
    approach:
      "Pitch classroom-safe question games and quick setup for group devices.",
  },
  {
    category: "Team-building blogs",
    examples: [
      "HR and workplace icebreaker guides",
      "Remote team bonding articles",
      "Conference and workshop activity lists",
    ],
    approach:
      "Highlight anonymous voting for honest team feedback and low-friction browser play.",
  },
  {
    category: "Relationship / couple activity blogs",
    examples: [
      "Date-night idea lists",
      "Couple quiz and compatibility articles",
      "Friend-group relationship game roundups",
    ],
    approach:
      "Position relationship quizzes as group-friendly voting games, not solo apps.",
  },
  {
    category: "Reddit discussions",
    examples: [
      "r/PartyGames",
      "r/Teambuilding",
      "r/Teachers",
      "r/weddingplanning",
    ],
    approach:
      "Answer questions helpfully; share FriendRank only when it directly solves the thread.",
  },
  {
    category: "Pinterest boards",
    examples: [
      "Party planning boards",
      "Classroom icebreaker pins",
      "Team-building activity pins",
    ],
    approach:
      "Pin occasion-specific landing pages with clear visuals and benefit-led descriptions.",
  },
  {
    category: "AI tool directories",
    examples: [
      "AI game generators lists",
      "Group activity tool directories",
      "Free browser tool roundups",
    ],
    approach:
      "Submit with GEO-ready summary: free browser voting games for groups.",
  },
  {
    category: "Browser game directories",
    examples: [
      "Multiplayer browser game lists",
      "No-download party game collections",
      "Social voting game roundups",
    ],
    approach:
      "Emphasize no signup, phone voting, and shareable results.",
  },
  {
    category: "Startup / product directories",
    examples: [
      "Indie product launch sites",
      "SaaS and tool discovery lists",
      "Side-project showcase communities",
    ],
    approach:
      "Focus on product-led growth story: create game → share link → group plays.",
  },
];

export const GROWTH_KPI_MODEL: GrowthKpiDefinition[] = [
  {
    kpi: "Impressions",
    source: "Search Console → Performance",
    cadence: "Weekly",
    whyItMatters: "Measures search visibility and demand capture trend.",
  },
  {
    kpi: "Clicks",
    source: "Search Console → Performance",
    cadence: "Weekly",
    whyItMatters: "Actual organic traffic from Google search.",
  },
  {
    kpi: "CTR",
    source: "Search Console → Performance",
    cadence: "Weekly",
    whyItMatters: "Snippet and title effectiveness on priority queries.",
  },
  {
    kpi: "Indexed pages",
    source: "Search Console → Pages",
    cadence: "Weekly",
    whyItMatters: "Index coverage vs sitemap size (target 95%+).",
  },
  {
    kpi: "Ranking positions 8–30",
    source: "Search Console → Performance filtered by position",
    cadence: "Weekly",
    whyItMatters: "Highest-leverage URLs for title/meta and internal linking.",
  },
  {
    kpi: "Referral traffic",
    source: "GA4 → Traffic acquisition",
    cadence: "Weekly",
    whyItMatters: "Community, outreach, and directory experiment results.",
  },
  {
    kpi: "AI assistant traffic",
    source: "GA4 → referral / source (Perplexity, ChatGPT, etc.)",
    cadence: "Monthly",
    whyItMatters: "Early signal for GEO and AI citation investment.",
  },
  {
    kpi: "Games created",
    source: "GA4 → game_created",
    cadence: "Weekly",
    whyItMatters: "Core product conversion from search and referral visitors.",
  },
  {
    kpi: "CTA clicks",
    source: "GA4 → cta_clicked",
    cadence: "Weekly",
    whyItMatters: "Landing page and homepage intent before game creation.",
  },
  {
    kpi: "Creation completion rate",
    source: "GA4 → game_created ÷ game_creation_started",
    cadence: "Weekly",
    whyItMatters: "Funnel health from CTA to finished game.",
  },
  {
    kpi: "Returning users",
    source: "GA4 → Retention / returning users",
    cadence: "Monthly",
    whyItMatters: "Repeat hosts signal product-market fit before monetization.",
  },
];

export const MONETIZATION_OPTIONS: MonetizationOption[] = [
  {
    option: "Ads",
    whenToConsider: "After sustained traffic (5k+ monthly organic clicks) without hurting UX.",
  },
  {
    option: "Sponsored placements",
    whenToConsider: "When party, event, or brand partners align with game categories.",
  },
  {
    option: "Affiliate partnerships",
    whenToConsider: "When occasion pages drive enough clicks to test relevant affiliates.",
  },
  {
    option: "Premium templates",
    whenToConsider: "When repeat creators ask for advanced themes or question packs.",
  },
  {
    option: "Branded group games",
    whenToConsider: "When teams or brands request white-label voting experiences.",
  },
  {
    option: "B2B / team-building version",
    whenToConsider: "When workplace pages drive qualified leads and repeat team usage.",
  },
  {
    option: "Classroom / teacher version",
    whenToConsider: "When classroom landing pages show consistent creation and retention.",
  },
];

const STATIC_FIRST_ACTIONS = [
  "Verify Search Console property and confirm sitemap submitted",
  "Run npm run audit:all — ensure build-time SEO integrity",
  "Run npm run growth:search-console-plan — execute Batch 1 indexing queue",
  "Record Search Console baseline: impressions, clicks, CTR, indexed pages",
  "Run npm run geo:report and npm run ai:citation — confirm semantic layers PASS",
  "Run npm run growth:ctr — queue title/meta candidates for week 2",
  "Set GA4 weekly dashboard: cta_clicked, game_created, game_creation_started",
  "Link Search Console to GA4 for query ↔ behavior analysis",
];

/** Builds the top 10 first actions mixing static ops steps and live priority URLs. */
export function buildTopFirstActions(limit = 10): string[] {
  const priorityPages = getGrowthPriorityPages().slice(0, 3);
  const inspectTargets = getSearchConsoleLandingPageTargets(3);
  const batchOne = buildIndexingQueue().find((batch) => batch.id === "batch-1");

  const dynamicActions = [
    batchOne
      ? `Request indexing for Batch 1 (${batchOne.urls.length} URLs: homepage, hubs, top landing pages)`
      : "Request indexing for Batch 1 homepage and topic hubs",
    ...priorityPages.map(
      (page) => `Inspect weekly: ${page.path} (${page.growthTier} — ${page.searchConsoleActionLabel})`,
    ),
    ...inspectTargets.map(
      (page) => `Monitor Search Console: ${page.path} (priority ${page.estimatedPriority})`,
    ),
  ];

  return uniqueNonEmpty([...STATIC_FIRST_ACTIONS, ...dynamicActions]).slice(
    0,
    limit,
  );
}

function uniqueNonEmpty(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed || seen.has(trimmed)) {
      continue;
    }
    seen.add(trimmed);
    result.push(trimmed);
  }

  return result;
}

export type AuthorityRoadmapReport = {
  channelPriorities: GrowthChannelMatrixEntry[];
  thirtyDayPlan: ThirtyDayWeekPlan[];
  weeklyOperatingPlan: WeeklyOperatingDay[];
  topFirstActions: string[];
  kpisToWatch: GrowthKpiDefinition[];
  authorityTargets: AuthorityTargetCategory[];
  monetizationReadinessRule: string;
  monetizationOptions: MonetizationOption[];
};

/** Builds the full authority roadmap report object. */
export function buildAuthorityRoadmapReport(): AuthorityRoadmapReport {
  return {
    channelPriorities: [...GROWTH_CHANNEL_MATRIX].sort(
      (left, right) => left.recommendedPriority - right.recommendedPriority,
    ),
    thirtyDayPlan: THIRTY_DAY_PLAN,
    weeklyOperatingPlan: WEEKLY_OPERATING_PLAN,
    topFirstActions: buildTopFirstActions(10),
    kpisToWatch: GROWTH_KPI_MODEL,
    authorityTargets: AUTHORITY_TARGET_CATEGORIES,
    monetizationReadinessRule: MONETIZATION_READINESS_RULE,
    monetizationOptions: MONETIZATION_OPTIONS,
  };
}

function formatChannelEntry(entry: GrowthChannelMatrixEntry): string {
  return [
    `- ${entry.label} (priority ${entry.recommendedPriority})`,
    `  effort: ${entry.effort} | upside: ${entry.expectedUpside} | time: ${entry.timeToImpact} | risk: ${entry.risk}`,
    `  why: ${entry.whyItMattersForFriendRank}`,
  ].join("\n");
}

/** Formats the authority roadmap for CLI output. */
export function formatAuthorityRoadmapReport(report?: AuthorityRoadmapReport): string {
  const data = report ?? buildAuthorityRoadmapReport();

  const lines: string[] = [
    "FriendRank traffic & authority growth roadmap",
    "Status: PASS",
    "",
    "Recommended channel priorities",
  ];

  for (const entry of data.channelPriorities) {
    lines.push(formatChannelEntry(entry));
  }

  lines.push("", "30-day plan");

  for (const week of data.thirtyDayPlan) {
    lines.push("", `Week ${week.week}: ${week.title}`);
    for (const milestone of week.milestones) {
      lines.push(`  - ${milestone}`);
    }
  }

  lines.push("", "Weekly operating cadence");

  for (const day of data.weeklyOperatingPlan) {
    lines.push("", `${day.day}: ${day.focus}`);
    for (const task of day.tasks) {
      lines.push(`  - ${task}`);
    }
  }

  lines.push("", "Top 10 first actions");

  for (const [index, action] of data.topFirstActions.entries()) {
    lines.push(`${index + 1}. ${action}`);
  }

  lines.push("", "KPIs to watch");

  for (const kpi of data.kpisToWatch) {
    lines.push(`- ${kpi.kpi} (${kpi.cadence}) — ${kpi.source}`);
  }

  lines.push("", "Authority target categories");

  for (const target of data.authorityTargets) {
    lines.push(`- ${target.category}: ${target.examples.slice(0, 2).join("; ")}`);
  }

  lines.push("", "Monetization readiness");
  lines.push(data.monetizationReadinessRule);
  lines.push("");
  lines.push("Future options (document only — not implemented):");

  for (const option of data.monetizationOptions) {
    lines.push(`- ${option.option}: ${option.whenToConsider}`);
  }

  return lines.join("\n").trimEnd();
}

/** Lightweight validation — roadmap data must be complete. */
export function validateAuthorityRoadmap(): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (GROWTH_CHANNEL_MATRIX.length !== GROWTH_CHANNEL_IDS.length) {
    issues.push("Growth channel matrix is incomplete.");
  }

  if (THIRTY_DAY_PLAN.length !== 4) {
    issues.push("30-day plan must cover four weeks.");
  }

  if (WEEKLY_OPERATING_PLAN.length < 6) {
    issues.push("Weekly operating plan must cover Monday through weekend.");
  }

  if (buildTopFirstActions(10).length < 10) {
    issues.push("Top first actions list must include 10 items.");
  }

  if (GROWTH_KPI_MODEL.length < 10) {
    issues.push("KPI model must include at least 10 metrics.");
  }

  if (!MONETIZATION_READINESS_RULE.includes("No monetization sprint")) {
    issues.push("Monetization readiness rule is missing.");
  }

  return { valid: issues.length === 0, issues };
}
