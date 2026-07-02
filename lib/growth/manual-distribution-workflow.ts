import {
  buildWeeklyCampaignPlan,
  type CampaignManualAction,
} from "@/lib/growth/campaign-planner";
import {
  getDistributionOpportunitiesForPath,
  getOpportunityById,
} from "@/lib/growth/distribution-opportunities";
import { buildGrowthAssistantReport } from "@/lib/growth/growth-assistant";
import {
  buildPublishingPackage,
  type PublishingPackage,
} from "@/lib/growth/publishing-package";

export const CHANNEL_READINESS_CLASSES = [
  "create-now",
  "prepare-later",
  "defer",
  "avoid",
  "automation-candidate-later",
  "manual-only",
] as const;

export type ChannelReadinessClass = (typeof CHANNEL_READINESS_CLASSES)[number];

export const FUTURE_AUTOMATION_CLASSES = [
  "draft-automation",
  "reminder-automation",
  "scheduler-automation",
  "api-automation",
  "never-automate",
] as const;

export type FutureAutomationClass = (typeof FUTURE_AUTOMATION_CLASSES)[number];

export type AccountReadinessPlan = {
  recommendedBrandName: string;
  recommendedHandles: string[];
  recommendedEmailAliases: string[];
  channelsToCreateFirst: string[];
  channelsToDefer: string[];
  channelsToAvoidForNow: string[];
  notes: string[];
};

export type FirstCampaignChecklistStep = {
  step: number;
  action: string;
  detail: string;
};

export type ChannelReadinessEntry = {
  channel: string;
  classification: ChannelReadinessClass;
  reason: string;
};

export type BacklinkReachTarget = {
  category: string;
  whyUseful: string;
  effort: "low" | "medium" | "high";
  risk: "low" | "medium" | "high";
  expectedReach: "low" | "medium" | "high";
  backlinkValue: "low" | "medium" | "high";
  recommendedFirstAction: string;
};

export type ManualDistributionAction = {
  rank: number;
  action: string;
  channel: string;
  page: string;
  assetToUse: string;
  effort: "low" | "medium" | "high";
  expectedImpact: "low" | "medium" | "high";
  backlinkReachValue: "low" | "medium" | "high" | "none";
  approvalRequired: boolean;
  metricToCheckLater: string;
};

export type FutureAutomationEntry = {
  action: string;
  futureClass: FutureAutomationClass;
  reason: string;
};

export type ManualDistributionMeasurementItem = {
  metric: string;
  source: string;
  check: string;
};

export type ManualDistributionWorkflow = {
  accountReadiness: AccountReadinessPlan;
  firstCampaignPage: {
    path: string;
    title: string;
    url: string;
  };
  firstCampaignChecklist: FirstCampaignChecklistStep[];
  channelReadiness: ChannelReadinessEntry[];
  backlinkReachWorkflow: BacklinkReachTarget[];
  validBacklinkRules: string[];
  firstTenManualActions: ManualDistributionAction[];
  futureAutomationReadiness: FutureAutomationEntry[];
  measurementChecklist: ManualDistributionMeasurementItem[];
};

const VALID_BACKLINK_RULES = [
  "No paid spam links or link farms.",
  "No irrelevant directories that do not match games, groups, or social activities.",
  "No automated commenting or forum bots.",
  "No fake engagement, upvotes, or astroturfing.",
  "No mass identical outreach — personalize each email.",
  "Prefer relevant contextual links on pages that match the audience and use case.",
  "Prefer resource pages (roundups, classroom lists, party ideas) over generic directories.",
  "Track each outreach in a simple log: URL, contact, date, follow-up.",
];

const BACKLINK_REACH_TARGETS: BacklinkReachTarget[] = [
  {
    category: "AI tool directories",
    whyUseful:
      "Early referral traffic and topical signals as AI-assisted discovery grows.",
    effort: "low",
    risk: "low",
    expectedReach: "low",
    backlinkValue: "medium",
    recommendedFirstAction:
      "Submit one listing using the AI directory one-sentence and 150-word copy from the publishing package.",
  },
  {
    category: "Browser game directories",
    whyUseful:
      "Intent-matched traffic from users searching for no-download multiplayer games.",
    effort: "low",
    risk: "low",
    expectedReach: "medium",
    backlinkValue: "medium",
    recommendedFirstAction:
      "Submit /friend-games with the browser game directory description block.",
  },
  {
    category: "Team-building / resource blogs",
    whyUseful:
      "Contextual backlinks from workplace icebreaker and bonding content.",
    effort: "high",
    risk: "low",
    expectedReach: "medium",
    backlinkValue: "high",
    recommendedFirstAction:
      "Send one outreach email to an HR or remote-team icebreaker roundup author.",
  },
  {
    category: "Teacher / classroom resources",
    whyUseful:
      "Qualified edu-adjacent traffic for classroom-safe icebreaker pages.",
    effort: "high",
    risk: "medium",
    expectedReach: "low",
    backlinkValue: "medium",
    recommendedFirstAction:
      "Pitch /classroom-icebreaker or hub pages to one teacher resource blog.",
  },
  {
    category: "Party planning resources",
    whyUseful:
      "Occasion-based referral traffic for birthday and hangout game pages.",
    effort: "medium",
    risk: "low",
    expectedReach: "medium",
    backlinkValue: "high",
    recommendedFirstAction:
      "Email one party game roundup blog with the backlink outreach template.",
  },
  {
    category: "Indie / startup directories",
    whyUseful:
      "Brand discovery among makers; usually low traffic but easy to complete.",
    effort: "low",
    risk: "low",
    expectedReach: "low",
    backlinkValue: "low",
    recommendedFirstAction:
      "Submit homepage or /friend-games to one indie product directory this month.",
  },
];

function buildAccountReadinessPlan(
  publishingPackage: PublishingPackage,
  assistantDeferChannels: string[],
): AccountReadinessPlan {
  return {
    recommendedBrandName: publishingPackage.accountReadiness.suggestedBrandName,
    recommendedHandles: publishingPackage.accountReadiness.suggestedHandles,
    recommendedEmailAliases: publishingPackage.accountReadiness.suggestedEmails,
    channelsToCreateFirst: [
      "Google Search Console (already required — verify property)",
      "Reddit account for authentic community participation",
      "One Pinterest business account (prepare pin, publish next week if deferred)",
    ],
    channelsToDefer: [
      "LinkedIn company page — defer until consistent weekly posting rhythm exists",
      "TikTok / Reels — defer until video asset strategy exists",
      ...assistantDeferChannels
        .filter((entry) => entry.toLowerCase().includes("defer"))
        .map((entry) => entry.split(" (")[0] ?? entry)
        .slice(0, 2),
    ],
    channelsToAvoidForNow: [
      "Paid link services and spam directories",
      "Mass automation bots on Reddit or forums",
      "TikTok paid promotion",
      ...assistantDeferChannels
        .filter((entry) => entry.toLowerCase().includes("ignore"))
        .map((entry) => entry.split(" (")[0] ?? entry),
    ],
    notes: publishingPackage.accountReadiness.notes,
  };
}

function buildFirstCampaignChecklist(
  page: { path: string; url: string; title: string },
): FirstCampaignChecklistStep[] {
  return [
    {
      step: 1,
      action: "Inspect / request indexing",
      detail: `In Search Console, inspect ${page.path} and Batch 1 URLs. Request indexing only if content or metadata changed recently.`,
    },
    {
      step: 2,
      action: "Prepare copy",
      detail:
        "Run npm run growth:publishing-package and human-review every copy block before publishing.",
    },
    {
      step: 3,
      action: "Pick first channel",
      detail:
        "Start with product-led sharing (WhatsApp/Discord/Slack) — lowest risk, highest product loop.",
    },
    {
      step: 4,
      action: "Publish manually",
      detail:
        "Post one Reddit/community contribution OR share privately first — never both copies identically on the same day.",
    },
    {
      step: 5,
      action: "Record date",
      detail:
        "Log: date, channel, URL posted, page promoted, and whether approval was granted.",
    },
    {
      step: 6,
      action: "Check metrics after 7 days",
      detail:
        "Review Vercel, Search Console, GA4 referrers, CTA clicks, games created, and any external replies.",
    },
  ];
}

function buildChannelReadiness(
  publishingPackage: PublishingPackage,
  priorityPath: string,
): ChannelReadinessEntry[] {
  const matches = getDistributionOpportunitiesForPath(priorityPath);
  const entries: ChannelReadinessEntry[] = matches.map((match) => {
    const opportunity = getOpportunityById(match.categoryId);
    let classification: ChannelReadinessClass = "manual-only";

    if (match.categoryId === "product-led-sharing") {
      classification = "create-now";
    } else if (
      match.categoryId === "reddit-community" ||
      match.categoryId === "ai-tool-directories" ||
      match.categoryId === "browser-game-directories"
    ) {
      classification = "create-now";
    } else if (match.categoryId === "pinterest") {
      classification = "prepare-later";
    } else if (
      match.categoryId === "team-building-resources" ||
      match.categoryId === "teacher-classroom-resources"
    ) {
      classification = "defer";
    } else if (match.categoryId === "startup-indie-directories") {
      classification = "prepare-later";
    }

    if (opportunity.effort === "low" && opportunity.risk === "low") {
      if (classification === "manual-only") {
        classification = "automation-candidate-later";
      }
    }

    return {
      channel: match.channel,
      classification,
      reason: match.reason,
    };
  });

  entries.push({
    channel: "TikTok / Reels / Shorts",
    classification: "avoid",
    reason: "No video strategy — ignore until search and community baseline exists.",
  });

  entries.push({
    channel: "Search Console",
    classification: "manual-only",
    reason: "Indexing and performance review stay manual every Monday.",
  });

  for (const auto of publishingPackage.automationReadiness) {
    if (auto.classification === "not-recommended-for-automation") {
      const existing = entries.find(
        (entry) => entry.channel.toLowerCase() === auto.channel.toLowerCase(),
      );
      if (!existing) {
        entries.push({
          channel: auto.channel,
          classification: "avoid",
          reason: auto.reason,
        });
      }
    }
  }

  return entries;
}

function mapCampaignActionToManual(
  action: CampaignManualAction,
  rank: number,
): ManualDistributionAction {
  let backlinkReachValue: ManualDistributionAction["backlinkReachValue"] = "none";
  let metric = "Vercel visitors to target page";

  if (action.channel.includes("directory") || action.action.includes("directory")) {
    backlinkReachValue = "medium";
    metric = "Referral traffic + directory backlink if approved";
  }
  if (action.action.includes("backlink") || action.action.includes("outreach")) {
    backlinkReachValue = "high";
    metric = "Referral traffic + contextual backlink if placed";
  }
  if (action.channel.includes("Reddit") || action.channel.includes("community")) {
    backlinkReachValue = "low";
    metric = "Referrers + external comments/replies";
  }
  if (action.channel.includes("Product-led")) {
    backlinkReachValue = "none";
    metric = "Games created + invite_link_copied";
  }
  if (action.action.includes("indexing")) {
    backlinkReachValue = "none";
    metric = "Search Console indexed status + impressions";
  }
  if (action.action.includes("Review")) {
    metric = "Full 7-day measurement checklist";
  }

  return {
    rank,
    action: action.action,
    channel: action.channel,
    page: action.targetPage,
    assetToUse: action.asset,
    effort: action.effort,
    expectedImpact: action.expectedImpact,
    backlinkReachValue,
    approvalRequired: action.approvalNeeded,
    metricToCheckLater: metric,
  };
}

function buildFirstTenManualActions(
  campaign: ReturnType<typeof buildWeeklyCampaignPlan>,
  publishingPackage: PublishingPackage,
  priorityPath: string,
): ManualDistributionAction[] {
  const base = campaign.manualActionPlan.map((action, index) =>
    mapCampaignActionToManual(action, index + 1),
  );

  const extras: ManualDistributionAction[] = [
    {
      rank: 7,
      action: "Human-review all publication copy blocks",
      channel: "Publishing package",
      page: priorityPath,
      assetToUse: "npm run growth:publishing-package output",
      effort: "low",
      expectedImpact: "medium",
      backlinkReachValue: "none",
      approvalRequired: true,
      metricToCheckLater: "Zero policy violations or copy errors reported",
    },
    {
      rank: 8,
      action: "Submit one browser game directory listing",
      channel: "Browser game directories",
      page: priorityPath,
      assetToUse: "Browser game directory description block",
      effort: "low",
      expectedImpact: "medium",
      backlinkReachValue: "medium",
      approvalRequired: true,
      metricToCheckLater: "Referral sessions from directory domain",
    },
    {
      rank: 9,
      action: "Log outreach in backlink tracker",
      channel: "Backlink / reach workflow",
      page: priorityPath,
      assetToUse: "Spreadsheet or notes — URL, contact, date, follow-up",
      effort: "low",
      expectedImpact: "low",
      backlinkReachValue: "high",
      approvalRequired: false,
      metricToCheckLater: "Follow-up dates and response rate",
    },
    {
      rank: 10,
      action: "Prepare Pinterest pin (publish next week if deferred)",
      channel: "Pinterest",
      page: priorityPath,
      assetToUse: "Pinterest title/description/image concept block",
      effort: "medium",
      expectedImpact: "medium",
      backlinkReachValue: "low",
      approvalRequired: true,
      metricToCheckLater: "Pinterest referral traffic after publish",
    },
  ];

  return [...base, ...extras].slice(0, 10);
}

function buildFutureAutomationReadiness(): FutureAutomationEntry[] {
  return [
    {
      action: "Generate publication copy blocks",
      futureClass: "draft-automation",
      reason: "Already build-time — could surface in internal UI later; never auto-publish.",
    },
    {
      action: "Weekly Monday measurement reminder",
      futureClass: "reminder-automation",
      reason: "Calendar or Slack reminder to run checklist — no external posting.",
    },
    {
      action: "Pinterest pin scheduling",
      futureClass: "scheduler-automation",
      reason: "After visual assets exist and human approves pin copy.",
    },
    {
      action: "LinkedIn post scheduling",
      futureClass: "scheduler-automation",
      reason: "Schedule only after human approval workflow is defined.",
    },
    {
      action: "Directory form pre-fill",
      futureClass: "draft-automation",
      reason: "Pre-fill description fields; human submits each form manually.",
    },
    {
      action: "Search Console indexing request",
      futureClass: "never-automate",
      reason: "Manual indexing requests prevent spam and policy violations.",
    },
    {
      action: "Reddit / community posting",
      futureClass: "never-automate",
      reason: "Authentic participation cannot be automated safely.",
    },
    {
      action: "Backlink outreach email send",
      futureClass: "never-automate",
      reason: "Personalization and relevance require human review per send.",
    },
    {
      action: "WhatsApp / Discord / Slack sharing",
      futureClass: "never-automate",
      reason: "Personal invites from hosts — not brand broadcasts.",
    },
    {
      action: "Bulk directory API submissions",
      futureClass: "never-automate",
      reason: "High spam risk; violates valid backlink rules.",
    },
  ];
}

function buildMeasurementChecklist(
  publishingPackage: PublishingPackage,
): ManualDistributionMeasurementItem[] {
  return [
    ...publishingPackage.measurementChecklist.map((item) => ({
      metric: item.metric,
      source: item.source,
      check: item.check,
    })),
    {
      metric: "Backlinks acquired (if any)",
      source: "Manual outreach log + referring domains in GA4 / Search Console",
      check: "Note any new contextual links from outreach or directory approvals.",
    },
  ];
}

/** Builds the manual distribution workflow from existing growth modules. */
export function buildManualDistributionWorkflow(): ManualDistributionWorkflow {
  const publishingPackage = buildPublishingPackage();
  const campaign = buildWeeklyCampaignPlan();
  const assistantReport = buildGrowthAssistantReport();
  const priorityPath = publishingPackage.overview.priorityPage;

  const assistantAvoid = assistantReport.channelRecommendations
    .filter(
      (entry) => entry.decision === "ignore" || entry.decision === "defer",
    )
    .map((entry) => `${entry.channel} (${entry.decision}) — ${entry.reason}`);

  return {
    accountReadiness: buildAccountReadinessPlan(publishingPackage, assistantAvoid),
    firstCampaignPage: {
      path: priorityPath,
      title: publishingPackage.overview.priorityPageTitle,
      url: publishingPackage.overview.priorityPageUrl,
    },
    firstCampaignChecklist: buildFirstCampaignChecklist({
      path: priorityPath,
      url: publishingPackage.overview.priorityPageUrl,
      title: publishingPackage.overview.priorityPageTitle,
    }),
    channelReadiness: buildChannelReadiness(publishingPackage, priorityPath),
    backlinkReachWorkflow: BACKLINK_REACH_TARGETS,
    validBacklinkRules: VALID_BACKLINK_RULES,
    firstTenManualActions: buildFirstTenManualActions(
      campaign,
      publishingPackage,
      priorityPath,
    ),
    futureAutomationReadiness: buildFutureAutomationReadiness(),
    measurementChecklist: buildMeasurementChecklist(publishingPackage),
  };
}

/** Validates the manual distribution workflow structure. */
export function validateManualDistributionWorkflow(
  workflow?: ManualDistributionWorkflow,
): { valid: boolean; issues: string[] } {
  const data = workflow ?? buildManualDistributionWorkflow();
  const issues: string[] = [];

  if (data.accountReadiness.channelsToCreateFirst.length < 2) {
    issues.push("Account readiness must list channels to create first.");
  }

  if (data.firstCampaignChecklist.length < 6) {
    issues.push("First campaign checklist must include six steps.");
  }

  if (data.channelReadiness.length < 5) {
    issues.push("Channel readiness classification is incomplete.");
  }

  if (data.backlinkReachWorkflow.length < 6) {
    issues.push("Backlink/reach workflow must include six target categories.");
  }

  if (data.validBacklinkRules.length < 6) {
    issues.push("Valid backlink rules are incomplete.");
  }

  if (data.firstTenManualActions.length !== 10) {
    issues.push("First ten manual actions must include exactly 10 items.");
  }

  if (data.futureAutomationReadiness.length < 8) {
    issues.push("Future automation readiness is incomplete.");
  }

  if (data.measurementChecklist.length < 9) {
    issues.push("Measurement checklist must include at least nine metrics.");
  }

  return { valid: issues.length === 0, issues };
}

/** Formats the manual distribution workflow for CLI output. */
export function formatManualDistributionWorkflow(
  workflow?: ManualDistributionWorkflow,
): string {
  const data = workflow ?? buildManualDistributionWorkflow();
  const validation = validateManualDistributionWorkflow(data);

  const lines: string[] = [
    "FriendRank Manual Distribution Workflow",
    `Status: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    "══════════════════════════════════════",
    "ACCOUNT READINESS SUMMARY",
    "══════════════════════════════════════",
    `Brand: ${data.accountReadiness.recommendedBrandName}`,
    `Handles: ${data.accountReadiness.recommendedHandles.join(", ")}`,
    `Email aliases: ${data.accountReadiness.recommendedEmailAliases.join(", ")}`,
    "",
    "Channels to create first:",
  ];

  for (const channel of data.accountReadiness.channelsToCreateFirst) {
    lines.push(`- ${channel}`);
  }

  lines.push("", "Channels to defer:");
  for (const channel of data.accountReadiness.channelsToDefer) {
    lines.push(`- ${channel}`);
  }

  lines.push("", "Channels to avoid for now:");
  for (const channel of data.accountReadiness.channelsToAvoidForNow) {
    lines.push(`- ${channel}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "FIRST CAMPAIGN PAGE",
    "══════════════════════════════════════",
    `${data.firstCampaignPage.path} (${data.firstCampaignPage.title})`,
    data.firstCampaignPage.url,
    "",
    "First campaign checklist:",
  );

  for (const step of data.firstCampaignChecklist) {
    lines.push(`${step.step}. ${step.action} — ${step.detail}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "CHANNEL READINESS CLASSIFICATION",
    "══════════════════════════════════════",
  );

  for (const entry of data.channelReadiness) {
    lines.push(`- ${entry.channel}: ${entry.classification.replace(/-/g, " ")}`);
    lines.push(`  ${entry.reason}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "FIRST 10 MANUAL ACTIONS",
    "══════════════════════════════════════",
  );

  for (const action of data.firstTenManualActions) {
    lines.push("");
    lines.push(`${action.rank}. ${action.action}`);
    lines.push(
      `   channel: ${action.channel} | page: ${action.page} | effort: ${action.effort} | impact: ${action.expectedImpact}`,
    );
    lines.push(
      `   asset: ${action.assetToUse} | backlink/reach: ${action.backlinkReachValue} | approval: ${action.approvalRequired ? "yes" : "no"}`,
    );
    lines.push(`   check later: ${action.metricToCheckLater}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "BACKLINK / REACH TARGETS",
    "══════════════════════════════════════",
  );

  for (const target of data.backlinkReachWorkflow) {
    lines.push(`- ${target.category}`);
    lines.push(`  why: ${target.whyUseful}`);
    lines.push(
      `  effort ${target.effort} | risk ${target.risk} | reach ${target.expectedReach} | backlink value ${target.backlinkValue}`,
    );
    lines.push(`  first action: ${target.recommendedFirstAction}`);
  }

  lines.push("", "Valid backlink rules:");
  for (const rule of data.validBacklinkRules) {
    lines.push(`- ${rule}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "FUTURE AUTOMATION READINESS (not implemented)",
    "══════════════════════════════════════",
  );

  for (const entry of data.futureAutomationReadiness) {
    lines.push(`- ${entry.action}: ${entry.futureClass.replace(/-/g, " ")}`);
    lines.push(`  ${entry.reason}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "7-DAY MEASUREMENT CHECKLIST",
    "══════════════════════════════════════",
  );

  for (const item of data.measurementChecklist) {
    lines.push(`- [ ] ${item.metric} (${item.source})`);
    lines.push(`      ${item.check}`);
  }

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const issue of validation.issues) {
      lines.push(`- ${issue}`);
    }
  }

  return lines.join("\n").trimEnd();
}
