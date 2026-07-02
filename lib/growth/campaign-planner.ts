import { buildAuthorityRoadmapReport } from "@/lib/growth/authority-roadmap";
import {
  buildDistributionOpportunitiesReport,
  getDistributionOpportunitiesForPath,
  getDistributionTargetsForPath,
  getOpportunityById,
  type DistributionOpportunityCategoryId,
  type DistributionOpportunityMatch,
} from "@/lib/growth/distribution-opportunities";
import { buildGrowthAssistantReport } from "@/lib/growth/growth-assistant";
import {
  buildGrowthAssetsReport,
  pickHighestPriorityPageForAssets,
  type GrowthAssetsReport,
} from "@/lib/growth/growth-assets";
import {
  type GrowthPageClassification,
  type GrowthCategoryGroupKey,
} from "@/lib/growth/growth-priority";
import {
  buildIndexingQueue,
  getSearchConsoleActionPlan,
} from "@/lib/growth/search-console-action-plan";

export const CAMPAIGN_CHANNEL_DECISIONS = [
  "publish-this-week",
  "prepare-but-wait",
  "ignore-this-week",
] as const;

export type CampaignChannelDecision =
  (typeof CAMPAIGN_CHANNEL_DECISIONS)[number];

export type CampaignChannelRecommendation = {
  channel: string;
  categoryId: DistributionOpportunityCategoryId | null;
  decision: CampaignChannelDecision;
  reason: string;
};

export type CampaignAssetsSummary = {
  reddit: { ready: boolean; title: string };
  linkedIn: { ready: boolean; preview: string };
  pinterest: { ready: boolean; title: string; imageConcept: string };
  aiDirectory: { ready: boolean; oneSentence: string };
  backlinkOutreach: { ready: boolean; subject: string };
  productSharing: { ready: boolean; whatsapp: string };
};

export type CampaignManualAction = {
  rank: number;
  action: string;
  channel: string;
  asset: string;
  targetPage: string;
  effort: "low" | "medium" | "high";
  expectedImpact: "low" | "medium" | "high";
  approvalNeeded: boolean;
  whyNow: string;
};

export type CampaignMeasurementItem = {
  metric: string;
  source: string;
  whatToLookFor: string;
};

export type WeeklyCampaignPlan = {
  summary: {
    campaignName: string;
    priorityPage: string;
    priorityPageTitle: string;
    priorityPageUrl: string;
    targetAudience: string;
    campaignGoal: string;
    confidenceScore: number;
  };
  recommendedChannels: CampaignChannelRecommendation[];
  assetsToUse: CampaignAssetsSummary;
  manualActionPlan: CampaignManualAction[];
  publishingOrder: string[];
  guardrails: string[];
  measurementPlan: CampaignMeasurementItem[];
  nextCampaignRecommendation: {
    name: string;
    focus: string;
    reason: string;
  };
};

const AUDIENCE_BY_CATEGORY_GROUP: Record<GrowthCategoryGroupKey, string> = {
  friend: "Friend groups, roommates, and group chats",
  party: "Party hosts, birthday planners, and hangout groups",
  team: "Teams, coworkers, and remote meeting hosts",
  relationship: "Couples and friend groups doing social quizzes",
  question: "Groups looking for conversation starters and question games",
};

const ASSISTANT_IGNORE_CHANNEL_KEYWORDS = ["tiktok", "partnerships"];

function resolveTargetAudience(page: GrowthPageClassification): string {
  if (page.categoryGroup) {
    return AUDIENCE_BY_CATEGORY_GROUP[page.categoryGroup];
  }

  if (page.pageType === "topic-hub") {
    return "Friend groups, party planners, and casual hangout hosts";
  }

  return "Groups looking for free browser voting games";
}

function resolveCampaignGoal(page: GrowthPageClassification): string {
  if (page.pageType === "topic-hub") {
    return `Increase discovery, first visits, and game creation from ${page.title} hub traffic.`;
  }

  return `Drive targeted visits and game creation for ${page.title} through manual distribution.`;
}

function resolveCampaignName(page: GrowthPageClassification): string {
  const slugLabel = page.title || page.path.slice(1);
  return `${slugLabel} Weekly Growth Campaign`;
}

function isAssistantChannelIgnored(channelLabel: string): boolean {
  const lower = channelLabel.toLowerCase();
  return ASSISTANT_IGNORE_CHANNEL_KEYWORDS.some((keyword) => lower.includes(keyword));
}

function classifyDistributionChannel(
  match: DistributionOpportunityMatch,
  assistantDeferChannels: string[],
): CampaignChannelRecommendation {
  const opportunity = getOpportunityById(match.categoryId);

  for (const defer of assistantDeferChannels) {
    if (
      defer.toLowerCase().includes("pinterest") &&
      match.categoryId === "pinterest"
    ) {
      return {
        channel: match.channel,
        categoryId: match.categoryId,
        decision: "prepare-but-wait",
        reason:
          "Growth Assistant deferred Pinterest this week — prepare pin copy now, publish next week.",
      };
    }
  }

  if (match.categoryId === "product-led-sharing") {
    return {
      channel: match.channel,
      categoryId: match.categoryId,
      decision: "publish-this-week",
      reason: "Lowest effort, highest product-led upside — share after creating a demo game.",
    };
  }

  if (
    match.categoryId === "reddit-community" ||
    match.categoryId === "ai-tool-directories" ||
    match.categoryId === "browser-game-directories"
  ) {
    return {
      channel: match.channel,
      categoryId: match.categoryId,
      decision: "publish-this-week",
      reason: `Strong fit for ${match.categoryId} with ready assets and moderate risk.`,
    };
  }

  if (
    opportunity.effort === "high" ||
    match.categoryId === "team-building-resources" ||
    match.categoryId === "teacher-classroom-resources"
  ) {
    return {
      channel: match.channel,
      categoryId: match.categoryId,
      decision: "prepare-but-wait",
      reason: "High-effort outreach — draft email this week, send after Reddit and sharing tests.",
    };
  }

  if (match.categoryId === "pinterest") {
    return {
      channel: match.channel,
      categoryId: match.categoryId,
      decision: "prepare-but-wait",
      reason: "Prepare pin creative now; publish once community copy is validated.",
    };
  }

  if (match.categoryId === "startup-indie-directories") {
    return {
      channel: match.channel,
      categoryId: match.categoryId,
      decision: "prepare-but-wait",
      reason: "One directory submission per week — queue after priority community tests.",
    };
  }

  return {
    channel: match.channel,
    categoryId: match.categoryId,
    decision: "publish-this-week",
    reason: match.reason,
  };
}

function buildRecommendedChannels(
  path: string,
  assistantDeferLabels: string[],
): CampaignChannelRecommendation[] {
  const matches = getDistributionOpportunitiesForPath(path);
  const classified = matches.map((match) =>
    classifyDistributionChannel(match, assistantDeferLabels),
  );

  classified.push({
    channel: "TikTok / Reels / Shorts",
    categoryId: null,
    decision: "ignore-this-week",
    reason:
      "No video asset strategy yet — avoid until search baseline and community tests complete.",
  });

  const seen = new Set(classified.map((entry) => entry.channel.toLowerCase()));

  for (const deferLabel of assistantDeferLabels) {
    const label = deferLabel.split(" (")[0]?.trim() ?? deferLabel;
    const key = label.toLowerCase();

    if (key.includes("tiktok") && seen.has("tiktok / reels / shorts")) {
      continue;
    }

    if (!isAssistantChannelIgnored(deferLabel)) {
      continue;
    }

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    classified.push({
      channel: label,
      categoryId: null,
      decision: "ignore-this-week",
      reason: deferLabel.includes("—")
        ? deferLabel.split("—")[1]?.trim() ?? "Deferred by Growth Assistant."
        : "Deferred by Growth Assistant.",
    });
  }

  return classified;
}

function buildAssetsSummary(assetsReport: GrowthAssetsReport): CampaignAssetsSummary {
  const { assets } = assetsReport;

  return {
    reddit: {
      ready: Boolean(assets.reddit.title && assets.reddit.body),
      title: assets.reddit.title,
    },
    linkedIn: {
      ready: Boolean(assets.linkedIn.shortVersion),
      preview: assets.linkedIn.shortVersion.slice(0, 120),
    },
    pinterest: {
      ready: Boolean(assets.pinterest.title),
      title: assets.pinterest.title,
      imageConcept: assets.pinterest.suggestedImageConcept,
    },
    aiDirectory: {
      ready: Boolean(assets.aiDirectory.oneSentence),
      oneSentence: assets.aiDirectory.oneSentence,
    },
    backlinkOutreach: {
      ready: Boolean(assets.backlinkOutreach.subject),
      subject: assets.backlinkOutreach.subject,
    },
    productSharing: {
      ready: Boolean(assets.productSharing.whatsapp),
      whatsapp: assets.productSharing.whatsapp,
    },
  };
}

function buildManualActionPlan(input: {
  page: GrowthPageClassification;
  assetsReport: GrowthAssetsReport;
  distributionTargets: ReturnType<typeof getDistributionTargetsForPath>;
  indexingUrlCount: number;
}): CampaignManualAction[] {
  const { page, assetsReport, distributionTargets, indexingUrlCount } = input;
  const path = page.path;
  const directoryTarget =
    distributionTargets.find((target) => target.categoryId.includes("directory")) ??
    distributionTargets[0];
  const outreachTarget =
    distributionTargets.find((target) =>
      ["team-building-resources", "party-planning-resources"].includes(
        target.categoryId,
      ),
    ) ?? distributionTargets[0];

  const actions: CampaignManualAction[] = [
    {
      rank: 1,
      action: "Request indexing for Batch 1 priority URLs",
      channel: "Search Console",
      asset: "Search Console action plan (no copy asset)",
      targetPage: path,
      effort: "low",
      expectedImpact: "high",
      approvalNeeded: true,
      whyNow: `${indexingUrlCount} URLs in Batch 1 need index coverage before distribution traffic can convert.`,
    },
    {
      rank: 2,
      action: "Publish one Reddit / community contribution",
      channel: "Reddit / community",
      asset: `Reddit post — "${assetsReport.assets.reddit.title}"`,
      targetPage: path,
      effort: "medium",
      expectedImpact: "medium",
      approvalNeeded: true,
      whyNow:
        "Authentic community post is the highest-leverage external test for hub discovery keywords.",
    },
    {
      rank: 3,
      action: "Share with a small private group",
      channel: "Product-led sharing",
      asset: "WhatsApp / Discord product-sharing message",
      targetPage: path,
      effort: "low",
      expectedImpact: "high",
      approvalNeeded: false,
      whyNow:
        "Validate the invite loop with a real group before scaling outreach or directory submissions.",
    },
    {
      rank: 4,
      action: "Submit to one AI or browser game directory",
      channel: directoryTarget?.categoryId ?? "ai-tool-directories",
      asset: "AI directory one-sentence + 150-word description",
      targetPage: path,
      effort: "low",
      expectedImpact: "low",
      approvalNeeded: true,
      whyNow: `Low-effort listing on ${directoryTarget?.name ?? "a directory"} builds long-tail referral surface area.`,
    },
    {
      rank: 5,
      action: "Send one backlink outreach email",
      channel: outreachTarget?.categoryId ?? "party-planning-resources",
      asset: `Outreach email — "${assetsReport.assets.backlinkOutreach.subject}"`,
      targetPage: path,
      effort: "high",
      expectedImpact: "medium",
      approvalNeeded: true,
      whyNow:
        "Authority roadmap cadence allows one outreach email per week — pair with the priority page asset bundle.",
    },
    {
      rank: 6,
      action: "Review campaign results after 7 days",
      channel: "Measurement",
      asset: "Campaign measurement checklist",
      targetPage: path,
      effort: "low",
      expectedImpact: "medium",
      approvalNeeded: false,
      whyNow:
        "Weekly Monday review compares Vercel, Search Console, GA4, and referral signals before the next campaign.",
    },
  ];

  return actions.slice(0, 6);
}

function buildPublishingOrder(): string[] {
  return [
    "Request indexing for Batch 1 URLs in Search Console",
    "Publish one Reddit / community post (human-approved copy)",
    "Share the priority page with a small private group (WhatsApp / Discord / Slack)",
    "Submit to one AI or browser game directory",
    "Send one backlink outreach email",
    "Review results after 7 days using the measurement checklist",
  ];
}

function buildGuardrails(
  assistantThingsNotToDo: string[],
): string[] {
  return [
    "No spam — one community touchpoint and one outreach email per week maximum.",
    "Do not post the same copy everywhere — adapt tone per channel.",
    "Avoid TikTok until a video asset strategy exists.",
    "Do not automate publishing — human approval required for every external post.",
    "Do not rewrite live metadata without Search Console impression data.",
    ...assistantThingsNotToDo.slice(0, 3),
  ];
}

function buildMeasurementPlan(): CampaignMeasurementItem[] {
  return [
    {
      metric: "Vercel visitors",
      source: "Vercel Analytics / project dashboard",
      whatToLookFor: "Week-over-week sessions to the priority page URL.",
    },
    {
      metric: "Search Console impressions",
      source: "Google Search Console → Performance",
      whatToLookFor: "Impressions for priority page and hub queries.",
    },
    {
      metric: "Search Console clicks",
      source: "Google Search Console → Performance",
      whatToLookFor: "Clicks and CTR change after indexing and distribution.",
    },
    {
      metric: "Referrers",
      source: "GA4 → Traffic acquisition",
      whatToLookFor: "Referral sessions from Reddit, directories, or blogs touched this week.",
    },
    {
      metric: "AI assistant traffic",
      source: "GA4 → referral sources (Perplexity, ChatGPT, etc.)",
      whatToLookFor: "Any early AI referral sessions to the priority page.",
    },
    {
      metric: "CTA clicks",
      source: "GA4 → cta_clicked",
      whatToLookFor: "Landing or hub CTA clicks from new referral segments.",
    },
    {
      metric: "Games created",
      source: "GA4 → game_created",
      whatToLookFor: "Product conversion from campaign-driven visits.",
    },
  ];
}

function buildNextCampaignRecommendation(input: {
  assistantNextSprint: string;
  authorityWeek: string;
  currentPath: string;
}): WeeklyCampaignPlan["nextCampaignRecommendation"] {
  const alternatePaths = [
    "/party-games",
    "/best-friend-quiz",
    "/icebreaker-game",
    "/birthday-party-games",
  ].filter((path) => path !== input.currentPath);

  return {
    name: `${alternatePaths[0] ?? "/party-games"} Campaign`,
    focus: input.assistantNextSprint,
    reason: `Authority roadmap ${input.authorityWeek} — rotate priority page and double down on ${input.assistantNextSprint.toLowerCase()} after reviewing this week's metrics.`,
  };
}

/** Builds the weekly campaign plan from existing growth intelligence modules. */
export function buildWeeklyCampaignPlan(): WeeklyCampaignPlan {
  const assistantReport = buildGrowthAssistantReport();
  const assetsReport = buildGrowthAssetsReport();
  const distributionReport = buildDistributionOpportunitiesReport();
  const authorityReport = buildAuthorityRoadmapReport();
  const priorityPage = pickHighestPriorityPageForAssets();
  const distributionTargets = getDistributionTargetsForPath(priorityPage.path);
  const batchOne = buildIndexingQueue().find((batch) => batch.id === "batch-1");
  const indexingActionCount = getSearchConsoleActionPlan().filter(
    (item) => item.suggestedAction === "request-indexing",
  ).length;

  const assistantDeferChannels = distributionReport.channelsToAvoidThisWeek;

  return {
    summary: {
      campaignName: resolveCampaignName(priorityPage),
      priorityPage: priorityPage.path,
      priorityPageTitle: assetsReport.bestPage.title,
      priorityPageUrl: assetsReport.bestPage.url,
      targetAudience: resolveTargetAudience(priorityPage),
      campaignGoal: resolveCampaignGoal(priorityPage),
      confidenceScore: assistantReport.executiveSummary.confidenceScore,
    },
    recommendedChannels: buildRecommendedChannels(
      priorityPage.path,
      assistantDeferChannels,
    ),
    assetsToUse: buildAssetsSummary(assetsReport),
    manualActionPlan: buildManualActionPlan({
      page: priorityPage,
      assetsReport,
      distributionTargets,
      indexingUrlCount: batchOne?.urls.length ?? indexingActionCount,
    }),
    publishingOrder: buildPublishingOrder(),
    guardrails: buildGuardrails(assistantReport.thingsNotToDo),
    measurementPlan: buildMeasurementPlan(),
    nextCampaignRecommendation: buildNextCampaignRecommendation({
      assistantNextSprint: assistantReport.nextSprintRecommendation.focus,
      authorityWeek: authorityReport.thirtyDayPlan[3]?.title ?? "Week 4 review",
      currentPath: priorityPage.path,
    }),
  };
}

/** Validates the weekly campaign plan structure. */
export function validateWeeklyCampaignPlan(
  plan?: WeeklyCampaignPlan,
): { valid: boolean; issues: string[] } {
  const data = plan ?? buildWeeklyCampaignPlan();
  const issues: string[] = [];

  if (!data.summary.campaignName.trim()) {
    issues.push("Campaign name is missing.");
  }

  if (data.manualActionPlan.length === 0 || data.manualActionPlan.length > 6) {
    issues.push("Manual action plan must include 1–6 actions.");
  }

  if (data.publishingOrder.length < 5) {
    issues.push("Publishing order is incomplete.");
  }

  if (data.guardrails.length < 4) {
    issues.push("Guardrails are incomplete.");
  }

  if (data.measurementPlan.length < 7) {
    issues.push("Measurement plan must include seven metrics.");
  }

  const publishChannels = data.recommendedChannels.filter(
    (entry) => entry.decision === "publish-this-week",
  );
  if (publishChannels.length === 0) {
    issues.push("At least one publish-this-week channel is required.");
  }

  if (!data.assetsToUse.reddit.ready || !data.assetsToUse.productSharing.ready) {
    issues.push("Core campaign assets are not ready.");
  }

  return { valid: issues.length === 0, issues };
}

/** Formats the weekly campaign plan for CLI output. */
export function formatWeeklyCampaignPlan(plan?: WeeklyCampaignPlan): string {
  const data = plan ?? buildWeeklyCampaignPlan();
  const validation = validateWeeklyCampaignPlan(data);

  const publishChannels = data.recommendedChannels.filter(
    (entry) => entry.decision === "publish-this-week",
  );
  const prepareChannels = data.recommendedChannels.filter(
    (entry) => entry.decision === "prepare-but-wait",
  );
  const ignoreChannels = data.recommendedChannels.filter(
    (entry) => entry.decision === "ignore-this-week",
  );

  const lines: string[] = [
    "FriendRank Weekly Campaign Planner",
    `Status: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    "Campaign name:",
    data.summary.campaignName,
    "",
    "Priority page:",
    `${data.summary.priorityPage} (${data.summary.priorityPageTitle})`,
    data.summary.priorityPageUrl,
    "",
    "Target audience:",
    data.summary.targetAudience,
    "",
    "Campaign goal:",
    data.summary.campaignGoal,
    "",
    `Confidence score: ${data.summary.confidenceScore}/100`,
    "",
    "Publish this week:",
  ];

  for (const channel of publishChannels) {
    lines.push(`- ${channel.channel} — ${channel.reason}`);
  }

  lines.push("", "Prepare but wait:");
  for (const channel of prepareChannels) {
    lines.push(`- ${channel.channel} — ${channel.reason}`);
  }

  lines.push("", "Ignore this week:");
  for (const channel of ignoreChannels) {
    lines.push(`- ${channel.channel} — ${channel.reason}`);
  }

  lines.push("", "Assets ready:");
  lines.push(`✓ Reddit — ${data.assetsToUse.reddit.title}`);
  lines.push(`✓ LinkedIn — ${data.assetsToUse.linkedIn.preview}…`);
  lines.push(`✓ Pinterest — ${data.assetsToUse.pinterest.title}`);
  lines.push(`✓ AI Directory — ${data.assetsToUse.aiDirectory.oneSentence}`);
  lines.push(`✓ Outreach Email — ${data.assetsToUse.backlinkOutreach.subject}`);
  lines.push(`✓ Product Sharing — ${data.assetsToUse.productSharing.whatsapp.slice(0, 80)}…`);
  lines.push("", "Top 6 actions:");

  for (const action of data.manualActionPlan) {
    lines.push("");
    lines.push(`${action.rank}. ${action.action}`);
    lines.push(
      `   channel: ${action.channel} | asset: ${action.asset} | page: ${action.targetPage}`,
    );
    lines.push(
      `   effort: ${action.effort} | impact: ${action.expectedImpact} | approval: ${action.approvalNeeded ? "yes" : "no"}`,
    );
    lines.push(`   why now: ${action.whyNow}`);
  }

  lines.push("", "Recommended publishing order");
  for (const [index, step] of data.publishingOrder.entries()) {
    lines.push(`${index + 1}. ${step}`);
  }

  lines.push("", "Measurement checklist (review after 7 days)");
  for (const item of data.measurementPlan) {
    lines.push(`- ${item.metric} (${item.source}) — ${item.whatToLookFor}`);
  }

  lines.push("", "Guardrails");
  for (const rule of data.guardrails) {
    lines.push(`- ${rule}`);
  }

  lines.push(
    "",
    "Next campaign suggestion",
    `Name: ${data.nextCampaignRecommendation.name}`,
    `Focus: ${data.nextCampaignRecommendation.focus}`,
    `Reason: ${data.nextCampaignRecommendation.reason}`,
  );

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const issue of validation.issues) {
      lines.push(`- ${issue}`);
    }
  }

  return lines.join("\n").trimEnd();
}
