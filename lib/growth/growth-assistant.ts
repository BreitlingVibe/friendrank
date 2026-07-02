import { runFullAudit } from "@/lib/audit/run-full-audit";
import {
  AUTHORITY_TARGET_CATEGORIES,
  GROWTH_CHANNEL_MATRIX,
  type GrowthChannelMatrixEntry,
} from "@/lib/growth/authority-roadmap";
import {
  auditGrowthPriorities,
  getAllGrowthClassifications,
  getGrowthPriorityPages,
  type GrowthPageClassification,
} from "@/lib/growth/growth-priority";
import {
  getCtrImprovementCandidates,
  validateCtrOptimizations,
} from "@/lib/growth/ctr-optimization";
import {
  buildIndexingQueue,
  getSearchConsoleActionPlan,
  getTitleMetaCandidates,
  type SearchConsoleActionPlanItem,
} from "@/lib/growth/search-console-action-plan";
import { buildAiCitationAuditReport } from "@/lib/seo/validation/ai-citation-validation";
import { buildGeoAuditReport } from "@/lib/seo/validation/geo-validation";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";

export const GROWTH_HEALTH_LABELS = [
  "Excellent",
  "Good",
  "Needs Attention",
] as const;

export type GrowthHealthLabel = (typeof GROWTH_HEALTH_LABELS)[number];

export const TRAFFIC_TREND_LABELS = ["Positive", "Stable", "Early baseline"] as const;
export type TrafficTrendLabel = (typeof TRAFFIC_TREND_LABELS)[number];

export type GrowthAssistantAction = {
  rank: number;
  title: string;
  detail: string;
  urls: string[];
  expectedImpact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  whyNow: string;
};

export type GrowthAssistantChannelDecision = {
  channel: string;
  decision: "focus" | "defer" | "ignore";
  reason: string;
};

export type GrowthAssistantContentPick = {
  label: string;
  path: string;
  reason: string;
};

export type GrowthAssistantAuthorityPick = {
  category: string;
  examples: string[];
  approach: string;
};

export type GrowthAssistantReport = {
  executiveSummary: {
    overallHealth: GrowthHealthLabel;
    confidenceScore: number;
    trafficTrend: TrafficTrendLabel;
    reasoning: string[];
    topPrioritiesThisWeek: string[];
    highestOpportunity: string;
  };
  trafficSignals: {
    priorityUrlCount: number;
    priorityUrls: string[];
    indexablePages: number;
    sitemapReady: boolean;
    pagesNeedingMonitoring: string[];
    ctrCandidateCount: number;
    ctrCandidates: string[];
    position830Count: number;
    position830Urls: string[];
    expectedWins: string[];
  };
  weeklyActionPlan: GrowthAssistantAction[];
  channelRecommendations: GrowthAssistantChannelDecision[];
  contentRecommendations: GrowthAssistantContentPick[];
  authorityRecommendations: GrowthAssistantAuthorityPick[];
  thingsNotToDo: string[];
  nextSprintRecommendation: {
    focus: string;
    reason: string;
  };
  sourceSignals: {
    auditValid: boolean;
    geoValid: boolean;
    aiCitationValid: boolean;
    growthPriorityValid: boolean;
    ctrValidationValid: boolean;
    auditErrors: number;
    auditWarnings: number;
  };
};

type AssistantChannelDefinition = {
  key: string;
  label: string;
  roadmapId: string | null;
  fallbackPriority?: number;
  fallbackReason?: string;
};

const ASSISTANT_CHANNELS: AssistantChannelDefinition[] = [
  { key: "search", label: "Search", roadmapId: "search-console-seo" },
  { key: "geo", label: "GEO", roadmapId: "geo-ai-discoverability" },
  { key: "reddit", label: "Reddit", roadmapId: "reddit-community" },
  { key: "pinterest", label: "Pinterest", roadmapId: "pinterest" },
  { key: "direct", label: "Direct", roadmapId: "direct-referral" },
  { key: "referral", label: "Referral", roadmapId: "product-led-sharing" },
  { key: "partnerships", label: "Partnerships", roadmapId: "partnerships" },
  {
    key: "linkedin",
    label: "LinkedIn",
    roadmapId: null,
    fallbackPriority: 4,
    fallbackReason:
      "Team-building and workplace landing pages map to LinkedIn audiences for light B2B discovery.",
  },
  { key: "tiktok", label: "TikTok", roadmapId: "tiktok-reels-shorts" },
];

function resolveHealthLabel(score: number): GrowthHealthLabel {
  if (score >= 85) {
    return "Excellent";
  }
  if (score >= 70) {
    return "Good";
  }
  return "Needs Attention";
}

function resolveTrafficTrend(
  score: number,
  auditValid: boolean,
  geoValid: boolean,
  citationValid: boolean,
): TrafficTrendLabel {
  if (score >= 85 && auditValid && geoValid && citationValid) {
    return "Positive";
  }
  if (score >= 70) {
    return "Stable";
  }
  return "Early baseline";
}

function pickHighestOpportunityHub(): string {
  const hub = getAllHubDefinitions().find((entry) => entry.id === "friend-games");
  return hub?.title ?? "Friend Games";
}

function pickBestLandingPage(
  predicate?: (page: GrowthPageClassification) => boolean,
): GrowthPageClassification | undefined {
  return getAllGrowthClassifications()
    .filter((page) => page.pageType === "landing-page")
    .filter((page) => (predicate ? predicate(page) : true))
    .sort((left, right) => right.estimatedPriority - left.estimatedPriority)[0];
}

function pickBestTopicHub(): GrowthPageClassification | undefined {
  return getAllGrowthClassifications().find(
    (page) => page.pageType === "topic-hub" && page.topicHubId === "friend-games",
  );
}

function pickBestPageForReddit(): GrowthPageClassification | undefined {
  return (
    pickBestLandingPage((page) => page.categoryGroup === "party") ??
    pickBestLandingPage((page) => page.categoryGroup === "friend")
  );
}

function pickBestPageForPinterest(): GrowthPageClassification | undefined {
  return (
    pickBestLandingPage((page) => page.categoryGroup === "party") ??
    pickBestLandingPage((page) => page.categoryGroup === "relationship")
  );
}

function pickBestPageForBacklinks(): GrowthPageClassification | undefined {
  return (
    pickBestLandingPage((page) => page.categoryGroup === "team") ??
    pickBestLandingPage((page) =>
      /classroom|teacher|workshop|conference/.test(page.path),
    )
  );
}

function pickBestPageForAiCitation(): string {
  const citationReport = buildAiCitationAuditReport();
  if (!citationReport.valid) {
    return "/friend-games";
  }

  const priorityPaths = new Set(
    getGrowthPriorityPages()
      .filter((page) => page.pageType !== "homepage")
      .map((page) => page.path),
  );

  const ranked = getAllGrowthClassifications()
    .filter((page) => priorityPaths.has(page.path))
    .sort((left, right) => right.trafficPotential - left.trafficPotential);

  return ranked[0]?.path ?? "/friend-games";
}

function computeConfidenceScore(input: {
  auditValid: boolean;
  geoValid: boolean;
  citationValid: boolean;
  growthValid: boolean;
  ctrValid: boolean;
  auditErrors: number;
  indexablePages: number;
  ctrCandidates: number;
  citationHighCount: number;
  citationTotal: number;
}): number {
  let score = 0;

  if (input.auditValid) {
    score += 25;
  }
  if (input.geoValid) {
    score += 15;
  }
  if (input.citationValid) {
    score += 15;
  }
  if (input.growthValid) {
    score += 10;
  }
  if (input.ctrValid) {
    score += 10;
  }
  if (input.auditErrors === 0) {
    score += 10;
  }
  if (input.indexablePages >= 100) {
    score += 5;
  }
  if (input.ctrCandidates > 0) {
    score += 5;
  }
  if (
    input.citationTotal > 0 &&
    input.citationHighCount / input.citationTotal >= 0.9
  ) {
    score += 5;
  }

  return Math.min(score, 100);
}

function buildWeeklyActions(input: {
  indexingItems: SearchConsoleActionPlanItem[];
  monitorItems: SearchConsoleActionPlanItem[];
  ctrPaths: string[];
}): GrowthAssistantAction[] {
  const batchOne = buildIndexingQueue().find((batch) => batch.id === "batch-1");
  const indexingUrls = input.indexingItems.slice(0, 8).map((item) => item.path);
  const monitorUrls = input.monitorItems.slice(0, 5).map((item) => item.path);

  const actions: GrowthAssistantAction[] = [
    {
      rank: 1,
      title: "Request indexing",
      detail: "Execute Batch 1 indexing queue in Search Console after confirming sitemap is processed.",
      urls: batchOne?.urls.map((url) => url.replace("https://friendrank.app", "")) ?? indexingUrls,
      expectedImpact: "high",
      effort: "low",
      whyNow:
        "Priority surfaces (homepage, topic hubs, top landing pages) need index coverage before traffic compounds.",
    },
    {
      rank: 2,
      title: "Review Search Console",
      detail: "Inspect P0 URLs and record indexed vs crawled-not-indexed counts.",
      urls: monitorUrls.length > 0 ? monitorUrls : ["/", "/friend-games"],
      expectedImpact: "high",
      effort: "medium",
      whyNow: "Weekly Monday cadence — baseline impressions and index health drive every other growth decision.",
    },
    {
      rank: 3,
      title: "Review CTR candidates",
      detail: "Cross-check top CTR optimization candidates with Search Console Performance before adopting.",
      urls: input.ctrPaths.slice(0, 5),
      expectedImpact: "medium",
      effort: "medium",
      whyNow:
        "Pages ranking positions 8–30 with generic metadata are the highest-leverage snippet improvements.",
    },
    {
      rank: 4,
      title: "Run backlink experiment",
      detail: "Send one outreach email to a party-game, classroom, or team-building blog from the authority roadmap.",
      urls: [],
      expectedImpact: "medium",
      effort: "high",
      whyNow: "Week 3 authority roadmap milestone — one quality mention beats passive waiting.",
    },
    {
      rank: 5,
      title: "Run Reddit / community experiment",
      detail: "Contribute one authentic answer in a relevant community thread; link only when it directly helps.",
      urls: [pickBestPageForReddit()?.path ?? "/party-voting-game"],
      expectedImpact: "medium",
      effort: "medium",
      whyNow: "Product-led sharing works best when paired with authentic community discovery tests.",
    },
    {
      rank: 6,
      title: "Monitor AI assistant traffic",
      detail: "Check GA4 referral sources for AI assistants and run npm run geo:report + npm run ai:citation.",
      urls: [pickBestPageForAiCitation()],
      expectedImpact: "low",
      effort: "low",
      whyNow: "GEO and AI Citation layers are ready — early AI referral signals validate semantic investment.",
    },
  ];

  return actions.slice(0, 6);
}

function buildChannelRecommendations(
  roadmapById: Map<string, GrowthChannelMatrixEntry>,
): GrowthAssistantChannelDecision[] {
  return ASSISTANT_CHANNELS.map((channel) => {
    const roadmapEntry = channel.roadmapId
      ? roadmapById.get(channel.roadmapId)
      : undefined;
    const priority = roadmapEntry?.recommendedPriority ?? channel.fallbackPriority ?? 5;

    let decision: GrowthAssistantChannelDecision["decision"];
    let reason: string;

    if (priority <= 2) {
      decision = "focus";
      reason =
        roadmapEntry?.whyItMattersForFriendRank ??
        channel.fallbackReason ??
        "High-priority channel for current FriendRank growth stage.";
    } else if (priority <= 3) {
      decision = "focus";
      reason =
        roadmapEntry?.whyItMattersForFriendRank ??
        "Worth one lightweight experiment this week.";
    } else if (priority === 4) {
      decision = "defer";
      reason =
        roadmapEntry?.whyItMattersForFriendRank ??
        channel.fallbackReason ??
        "Valuable medium-term — defer until Search Console baseline exists.";
    } else {
      decision = channel.key === "tiktok" ? "ignore" : "defer";
      reason =
        channel.key === "tiktok"
          ? "Production cost is high and traffic is less intent-matched than search — no audience baseline yet."
          : (roadmapEntry?.whyItMattersForFriendRank ??
            "Long-horizon channel — defer until organic search and product loops stabilize.");
    }

    return {
      channel: channel.label,
      decision,
      reason,
    };
  });
}

function buildThingsNotToDo(input: {
  ctrCandidateCount: number;
  indexingActionCount: number;
}): string[] {
  return [
    "Do not rewrite live metadata without Search Console impression data for the target URL.",
    "Do not publish new landing pages — optimize and distribute existing indexable URLs first.",
    "Do not spend time on TikTok / Reels this week — defer until search baseline and one community test complete.",
    input.indexingActionCount > 0
      ? "Do not re-request indexing for the same URL within 7 days unless content or metadata changed."
      : "Do not spam Search Console indexing requests — batch carefully after deploys only.",
    input.ctrCandidateCount > 20
      ? "Do not batch-edit multiple titles at once — change one P0/P1 page per week and measure CTR for 7 days."
      : "Do not change titles on pages with no impressions yet — wait for Performance data.",
    "Do not duplicate SEO/GEO engines or add runtime growth logic — use existing npm scripts only.",
  ];
}

function buildNextSprintRecommendation(input: {
  ctrCandidateCount: number;
  position830Count: number;
  citationValid: boolean;
}): GrowthAssistantReport["nextSprintRecommendation"] {
  if (input.ctrCandidateCount >= 15) {
    return {
      focus: "Better CTR",
      reason: `${input.ctrCandidateCount} CTR candidates are queued — snippet iteration will outperform new content work.`,
    };
  }

  if (input.position830Count >= 10) {
    return {
      focus: "Internal linking",
      reason: `${input.position830Count} P1 pages target positions 8–30 — hub-to-landing links can lift rankings without metadata changes.`,
    };
  }

  if (input.citationValid) {
    return {
      focus: "Community experiments",
      reason: "Semantic layers pass validation — test Reddit and referral loops while Search Console baseline matures.",
    };
  }

  return {
    focus: "More backlinks",
    reason: "Authority roadmap targets are defined — outreach to party, classroom, and team-building blogs builds trust.",
  };
}

/** Aggregates existing growth systems into one actionable weekly report. */
export function buildGrowthAssistantReport(): GrowthAssistantReport {
  const fullAudit = runFullAudit();
  const geoReport = buildGeoAuditReport();
  const citationReport = buildAiCitationAuditReport();
  const growthAudit = auditGrowthPriorities();
  const ctrCandidates = getCtrImprovementCandidates({ includeTiers: ["P0", "P1", "P2"] });
  const ctrValidation = validateCtrOptimizations(ctrCandidates);
  const actionPlan = getSearchConsoleActionPlan();
  const priorityPages = getGrowthPriorityPages();

  const indexingItems = actionPlan.filter(
    (item) => item.suggestedAction === "request-indexing",
  );
  const monitorItems = actionPlan.filter(
    (item) =>
      item.suggestedAction === "inspect-url" ||
      item.suggestedAction === "monitor-ctr" ||
      item.suggestedAction === "monitor-impressions",
  );
  const position830Pages = getAllGrowthClassifications().filter(
    (page) => page.searchConsoleAction === "track-position-8-30",
  );

  const citationHighCount =
    citationReport.confidenceDistribution.get("High") ?? 0;

  const confidenceScore = computeConfidenceScore({
    auditValid: fullAudit.valid,
    geoValid: geoReport.valid,
    citationValid: citationReport.valid,
    growthValid: growthAudit.valid,
    ctrValid: ctrValidation.valid,
    auditErrors: fullAudit.totals.errors,
    indexablePages: growthAudit.totals.indexablePages,
    ctrCandidates: ctrCandidates.length,
    citationHighCount,
    citationTotal: citationReport.pagesAnalyzed,
  });

  const overallHealth = resolveHealthLabel(confidenceScore);
  const trafficTrend = resolveTrafficTrend(
    confidenceScore,
    fullAudit.valid,
    geoReport.valid,
    citationReport.valid,
  );

  const reasoning = [
    fullAudit.valid
      ? "Build-time audit passes with no blocking errors."
      : `Audit has ${fullAudit.totals.errors} error(s) — fix before growth experiments.`,
    geoReport.valid
      ? `GEO foundation covers ${geoReport.totalPages} pages.`
      : "GEO foundation validation failed — run npm run geo:report.",
    citationReport.valid
      ? `AI citation layer covers ${citationReport.pagesAnalyzed} pages (${citationHighCount} High confidence).`
      : "AI citation validation failed — run npm run ai:citation.",
    `${ctrCandidates.length} CTR candidates and ${getTitleMetaCandidates().length} title/meta flags ready for Search Console cross-check.`,
    `${growthAudit.totals.indexablePages} indexable URLs in sitemap monitor set.`,
  ];

  const topPrioritiesThisWeek = [
    "Confirm Batch 1 indexing in Search Console",
    "Review top CTR candidates against Performance data",
    "Run one community or backlink experiment",
    "Monitor P0 topic hubs and homepage index status",
    "Keep GEO + AI citation audits passing weekly",
  ];

  const expectedWins = [
    "Batch 1 URLs move to Indexed in Search Console Pages report",
    "One P0/P1 page adopted for CTR testing with measurable 7-day snippet change",
    "Referral or community experiment logged with GA4 source tracking",
    "GEO and AI citation audits remain PASS without engine changes",
  ];

  const roadmapById = new Map(
    GROWTH_CHANNEL_MATRIX.map((entry) => [entry.id, entry]),
  );

  const bestLanding = pickBestLandingPage();
  const bestHub = pickBestTopicHub();
  const bestReddit = pickBestPageForReddit();
  const bestPinterest = pickBestPageForPinterest();
  const bestBacklinks = pickBestPageForBacklinks();

  return {
    executiveSummary: {
      overallHealth,
      confidenceScore,
      trafficTrend,
      reasoning,
      topPrioritiesThisWeek,
      highestOpportunity: pickHighestOpportunityHub(),
    },
    trafficSignals: {
      priorityUrlCount: priorityPages.length,
      priorityUrls: priorityPages.map((page) => page.path),
      indexablePages: growthAudit.totals.indexablePages,
      sitemapReady: fullAudit.indexAudit.results.sitemap.valid,
      pagesNeedingMonitoring: monitorItems.slice(0, 10).map((item) => item.path),
      ctrCandidateCount: ctrCandidates.length,
      ctrCandidates: ctrCandidates.slice(0, 10).map((candidate) => candidate.path),
      position830Count: position830Pages.length,
      position830Urls: position830Pages.slice(0, 10).map((page) => page.path),
      expectedWins,
    },
    weeklyActionPlan: buildWeeklyActions({
      indexingItems,
      monitorItems,
      ctrPaths: ctrCandidates.map((candidate) => candidate.path),
    }),
    channelRecommendations: buildChannelRecommendations(roadmapById),
    contentRecommendations: [
      {
        label: "Best landing page to promote",
        path: bestLanding?.path ?? "/most-likely-to-generator",
        reason: `Highest estimatedPriority (${bestLanding?.estimatedPriority ?? 90}) ${bestLanding?.categoryGroup ?? "friend"} page with strong CTA mapping.`,
      },
      {
        label: "Best topic hub",
        path: bestHub?.path ?? "/friend-games",
        reason: "Friend Games hub has the broadest category coverage and highest hub traffic potential score.",
      },
      {
        label: "Best page for Reddit",
        path: bestReddit?.path ?? "/party-voting-game",
        reason: "Party and friend game formats map to active community threads with immediate play value.",
      },
      {
        label: "Best page for Pinterest",
        path: bestPinterest?.path ?? "/birthday-party-game",
        reason: "Occasion-based party and relationship pages fit visual pin formats and planning intent.",
      },
      {
        label: "Best page for AI citations",
        path: pickBestPageForAiCitation(),
        reason: "Priority page with High AI citation confidence and strong GEO entity clarity for LLM summarization.",
      },
      {
        label: "Best page for backlinks",
        path: bestBacklinks?.path ?? "/team-building-game",
        reason: "Team-building and classroom pages align with resource blogs that link to free group activities.",
      },
    ],
    authorityRecommendations: AUTHORITY_TARGET_CATEGORIES.map((target) => ({
      category: target.category,
      examples: target.examples.slice(0, 3),
      approach: target.approach,
    })),
    thingsNotToDo: buildThingsNotToDo({
      ctrCandidateCount: ctrCandidates.length,
      indexingActionCount: indexingItems.length,
    }),
    nextSprintRecommendation: buildNextSprintRecommendation({
      ctrCandidateCount: ctrCandidates.length,
      position830Count: position830Pages.length,
      citationValid: citationReport.valid,
    }),
    sourceSignals: {
      auditValid: fullAudit.valid,
      geoValid: geoReport.valid,
      aiCitationValid: citationReport.valid,
      growthPriorityValid: growthAudit.valid,
      ctrValidationValid: ctrValidation.valid,
      auditErrors: fullAudit.totals.errors,
      auditWarnings: fullAudit.totals.warnings,
    },
  };
}

function formatAction(action: GrowthAssistantAction): string[] {
  const lines = [
    `${action.rank}. ${action.title}`,
    `   impact: ${action.expectedImpact} | effort: ${action.effort}`,
    `   why now: ${action.whyNow}`,
    `   ${action.detail}`,
  ];

  if (action.urls.length > 0) {
    lines.push(`   URLs: ${action.urls.slice(0, 6).join(", ")}`);
  }

  return lines;
}

/** Formats the unified growth assistant report for CLI output. */
export function formatGrowthAssistantReport(report?: GrowthAssistantReport): string {
  const data = report ?? buildGrowthAssistantReport();

  const focusChannels = data.channelRecommendations
    .filter((entry) => entry.decision === "focus")
    .map((entry) => entry.channel);
  const deferChannels = data.channelRecommendations
    .filter((entry) => entry.decision === "defer")
    .map((entry) => entry.channel);
  const ignoreChannels = data.channelRecommendations
    .filter((entry) => entry.decision === "ignore")
    .map((entry) => entry.channel);

  const bestPromote =
    data.contentRecommendations.find(
      (entry) => entry.label === "Best topic hub",
    ) ?? data.contentRecommendations[0]!;

  const lines: string[] = [
    "====================================",
    "FriendRank AI Growth Assistant",
    "====================================",
    "",
    `Overall health: ${data.executiveSummary.overallHealth} (${data.executiveSummary.confidenceScore}/100)`,
    `Traffic trend: ${data.executiveSummary.trafficTrend}`,
    `Highest opportunity: ${data.executiveSummary.highestOpportunity}`,
    "",
    "This week's priorities:",
  ];

  for (const priority of data.executiveSummary.topPrioritiesThisWeek) {
    lines.push(`✔ ${priority}`);
  }

  lines.push("", "Focus:", focusChannels.join(", ") || "—");

  if (deferChannels.length > 0) {
    lines.push("Defer:", deferChannels.join(", "));
  }

  if (ignoreChannels.length > 0) {
    lines.push("Ignore:", ignoreChannels.join(", "));
    lines.push(
      "Reason:",
      data.channelRecommendations.find((entry) => entry.decision === "ignore")
        ?.reason ?? "Low priority for current stage.",
    );
  }

  lines.push(
    "",
    "Best page to promote:",
    bestPromote.path,
    "Expected impact: High",
    `Confidence: ${data.executiveSummary.confidenceScore}%`,
    "",
    "====================================",
    "1. Executive Summary",
    "====================================",
    `Overall Growth Health: ${data.executiveSummary.overallHealth}`,
    `Confidence score: ${data.executiveSummary.confidenceScore}/100`,
    `Traffic trend: ${data.executiveSummary.trafficTrend}`,
    "",
    "Reasoning:",
  );

  for (const reason of data.executiveSummary.reasoning) {
    lines.push(`- ${reason}`);
  }

  lines.push("", "Top priorities this week:");
  for (const priority of data.executiveSummary.topPrioritiesThisWeek) {
    lines.push(`- ${priority}`);
  }

  lines.push(
    "",
    "====================================",
    "2. Traffic Signals",
    "====================================",
    `Priority URLs: ${data.trafficSignals.priorityUrlCount}`,
    `Indexable pages (sitemap): ${data.trafficSignals.indexablePages}`,
    `Sitemap audit: ${data.trafficSignals.sitemapReady ? "PASS" : "FAIL"}`,
    `CTR candidates: ${data.trafficSignals.ctrCandidateCount}`,
    `Position 8–30 opportunities: ${data.trafficSignals.position830Count}`,
    "",
    "Pages needing monitoring:",
  );

  for (const path of data.trafficSignals.pagesNeedingMonitoring.slice(0, 8)) {
    lines.push(`- ${path}`);
  }

  lines.push("", "Top CTR candidates:");
  for (const path of data.trafficSignals.ctrCandidates.slice(0, 5)) {
    lines.push(`- ${path}`);
  }

  lines.push("", "Expected wins:");
  for (const win of data.trafficSignals.expectedWins) {
    lines.push(`- ${win}`);
  }

  lines.push(
    "",
    "====================================",
    "3. Weekly Action Plan (max 6)",
    "====================================",
  );

  for (const action of data.weeklyActionPlan) {
    lines.push("");
    lines.push(...formatAction(action));
  }

  lines.push(
    "",
    "====================================",
    "4. Channel Recommendation",
    "====================================",
  );

  for (const channel of data.channelRecommendations) {
    lines.push(
      `- ${channel.channel}: ${channel.decision.toUpperCase()} — ${channel.reason}`,
    );
  }

  lines.push(
    "",
    "====================================",
    "5. Content Recommendation",
    "====================================",
  );

  for (const pick of data.contentRecommendations) {
    lines.push(`- ${pick.label}: ${pick.path}`);
    lines.push(`  reason: ${pick.reason}`);
  }

  lines.push(
    "",
    "====================================",
    "6. Authority Recommendation",
    "====================================",
  );

  for (const target of data.authorityRecommendations) {
    lines.push(`- ${target.category}`);
    lines.push(`  examples: ${target.examples.join("; ")}`);
    lines.push(`  approach: ${target.approach}`);
  }

  lines.push(
    "",
    "====================================",
    "7. Things NOT to do",
    "====================================",
  );

  for (const item of data.thingsNotToDo) {
    lines.push(`- ${item}`);
  }

  lines.push(
    "",
    "====================================",
    "8. Next Sprint Recommendation",
    "====================================",
    `Focus: ${data.nextSprintRecommendation.focus}`,
    `Reason: ${data.nextSprintRecommendation.reason}`,
    "",
    "Source signals:",
    `- audit:all ${data.sourceSignals.auditValid ? "PASS" : "FAIL"} (${data.sourceSignals.auditErrors} errors, ${data.sourceSignals.auditWarnings} warnings)`,
    `- geo:report ${data.sourceSignals.geoValid ? "PASS" : "FAIL"}`,
    `- ai:citation ${data.sourceSignals.aiCitationValid ? "PASS" : "FAIL"}`,
    `- growth priorities ${data.sourceSignals.growthPriorityValid ? "PASS" : "FAIL"}`,
    `- CTR validation ${data.sourceSignals.ctrValidationValid ? "PASS" : "FAIL"}`,
    "",
    `Status: ${data.sourceSignals.auditValid && data.sourceSignals.geoValid && data.sourceSignals.aiCitationValid ? "PASS" : "NEEDS ATTENTION"}`,
  );

  return lines.join("\n").trimEnd();
}

/** Validates that the assistant report is complete and sourced from existing modules. */
export function validateGrowthAssistantReport(
  report?: GrowthAssistantReport,
): { valid: boolean; issues: string[] } {
  const data = report ?? buildGrowthAssistantReport();
  const issues: string[] = [];

  if (data.weeklyActionPlan.length === 0 || data.weeklyActionPlan.length > 6) {
    issues.push("Weekly action plan must include 1–6 actions.");
  }

  if (data.executiveSummary.confidenceScore < 0 || data.executiveSummary.confidenceScore > 100) {
    issues.push("Confidence score must be between 0 and 100.");
  }

  if (data.contentRecommendations.length < 6) {
    issues.push("Content recommendations must include six picks.");
  }

  if (data.authorityRecommendations.length < 5) {
    issues.push("Authority recommendations must come from the roadmap.");
  }

  if (data.thingsNotToDo.length < 4) {
    issues.push("Things NOT to do list is incomplete.");
  }

  if (!data.nextSprintRecommendation.focus.trim()) {
    issues.push("Next sprint recommendation is missing.");
  }

  return { valid: issues.length === 0, issues };
}
