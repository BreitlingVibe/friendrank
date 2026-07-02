import { buildAuthorityRoadmapReport } from "@/lib/growth/authority-roadmap";
import {
  buildWeeklyCampaignPlan,
  type WeeklyCampaignPlan,
} from "@/lib/growth/campaign-planner";
import { buildGrowthAssistantReport } from "@/lib/growth/growth-assistant";
import {
  buildGrowthAssetsReport,
  countWords,
  type GrowthAssetsReport,
} from "@/lib/growth/growth-assets";
import { buildIndexingQueue } from "@/lib/growth/search-console-action-plan";

export const AUTOMATION_READINESS_LEVELS = [
  "manual-only",
  "draft-automation-only",
  "scheduler-ready-later",
  "api-automation-possible-later",
  "not-recommended-for-automation",
] as const;

export type AutomationReadinessLevel =
  (typeof AUTOMATION_READINESS_LEVELS)[number];

export type AutomationReadinessEntry = {
  channel: string;
  classification: AutomationReadinessLevel;
  reason: string;
};

export type AccountChannelReadiness = {
  suggestedBrandName: string;
  suggestedHandles: string[];
  suggestedEmails: string[];
  futureAutomationCandidates: string[];
  remainManual: string[];
  notes: string[];
};

export type PublicationCopyBlock = {
  id: string;
  label: string;
  content: string;
};

export type PublishingPackageMeasurementItem = {
  metric: string;
  source: string;
  check: string;
};

export type NextStepRecommendation = {
  focus: string;
  reason: string;
  alternatives: string[];
};

export type PublishingPackage = {
  overview: {
    campaignName: string;
    priorityPage: string;
    priorityPageTitle: string;
    priorityPageUrl: string;
    targetAudience: string;
    goal: string;
    confidenceScore: number;
    expectedEffort: GrowthAssetsReport["expectedEffort"];
    expectedReach: GrowthAssetsReport["expectedReach"];
  };
  publicationBlocks: PublicationCopyBlock[];
  publishingOrder: string[];
  accountReadiness: AccountChannelReadiness;
  automationReadiness: AutomationReadinessEntry[];
  guardrails: string[];
  measurementChecklist: PublishingPackageMeasurementItem[];
  nextStepRecommendation: NextStepRecommendation;
  indexingBatchOneUrls: string[];
};

const PACKAGE_GUARDRAILS = [
  "Human approval required before every external publish, email, pin, or directory submission.",
  "Do not spam communities — one authentic touchpoint per channel per week.",
  "Do not reuse the same copy everywhere — adapt tone and length per platform.",
  "No auto-posting in this sprint — all distribution is manual.",
  "No credentials, tokens, or passwords in this package or repository.",
  "Do not bypass platform policies, rate limits, or community rules.",
  "Do not simulate fake users, votes, or engagement.",
];

function buildBrowserGameDirectoryDescription(
  assetsReport: GrowthAssetsReport,
): string {
  const { aiDirectory } = assetsReport.assets;
  const { title, url } = assetsReport.bestPage;

  return [
    `${title} — free multiplayer browser game for groups.`,
    aiDirectory.threeSentence,
    `No download, no signup — share one link, vote from phones, reveal group results together.`,
    `Play: ${url}`,
  ].join(" ");
}

function buildPublicationBlocks(assetsReport: GrowthAssetsReport): PublicationCopyBlock[] {
  const { assets, bestPage } = assetsReport;
  const browserDescription = buildBrowserGameDirectoryDescription(assetsReport);

  return [
    {
      id: "reddit",
      label: "Reddit / community post",
      content: [
        `TITLE: ${assets.reddit.title}`,
        "",
        `Suggested category: ${assets.reddit.suggestedSubredditCategory}`,
        "",
        assets.reddit.body,
        "",
        assets.reddit.softCta,
      ].join("\n"),
    },
    {
      id: "linkedin",
      label: "LinkedIn post",
      content: [
        "SHORT VERSION:",
        assets.linkedIn.shortVersion,
        "",
        "LONG VERSION:",
        assets.linkedIn.longVersion,
        "",
        `CTA: ${assets.linkedIn.cta}`,
      ].join("\n"),
    },
    {
      id: "pinterest",
      label: "Pinterest title / description / image concept",
      content: [
        `TITLE: ${assets.pinterest.title}`,
        "",
        `DESCRIPTION: ${assets.pinterest.description}`,
        "",
        `IMAGE CONCEPT: ${assets.pinterest.suggestedImageConcept}`,
        "",
        `URL: ${bestPage.url}`,
      ].join("\n"),
    },
    {
      id: "ai-directory",
      label: "AI directory description",
      content: [
        "ONE SENTENCE:",
        assets.aiDirectory.oneSentence,
        "",
        "THREE SENTENCES:",
        assets.aiDirectory.threeSentence,
        "",
        `150 WORDS (${countWords(assets.aiDirectory.oneHundredFiftyWords)} words):`,
        assets.aiDirectory.oneHundredFiftyWords,
      ].join("\n"),
    },
    {
      id: "browser-game-directory",
      label: "Browser game directory description",
      content: browserDescription,
    },
    {
      id: "backlink-outreach",
      label: "Backlink outreach email",
      content: [
        `SUBJECT: ${assets.backlinkOutreach.subject}`,
        "",
        assets.backlinkOutreach.body,
        "",
        `CTA: ${assets.backlinkOutreach.cta}`,
      ].join("\n"),
    },
    {
      id: "product-sharing",
      label: "WhatsApp / Discord / Slack sharing message",
      content: [
        "WHATSAPP:",
        assets.productSharing.whatsapp,
        "",
        "DISCORD:",
        assets.productSharing.discord,
        "",
        "SLACK:",
        assets.productSharing.slack,
      ].join("\n"),
    },
  ];
}

function buildPublishingOrder(): string[] {
  return [
    "Request or confirm indexing for Batch 1 URLs in Search Console",
    "Share manually with a small private group (WhatsApp, Discord, or Slack)",
    "Publish one Reddit / community post (human-approved copy)",
    "Submit to one AI tool or browser game directory",
    "Prepare Pinterest pin asset (publish next week if deferred)",
    "Send one backlink outreach email",
    "Review metrics after 7 days using the measurement checklist",
  ];
}

function buildAccountReadiness(): AccountChannelReadiness {
  return {
    suggestedBrandName: "FriendRank",
    suggestedHandles: ["friendrankapp", "playfriendrank"],
    suggestedEmails: ["hello@friendrank.app", "team@friendrank.app"],
    futureAutomationCandidates: [
      "Directory submission drafts (copy pre-fill only, human submits)",
      "LinkedIn post drafts (scheduler-ready later after approval workflow)",
      "Pinterest pin scheduling (after visual asset pipeline exists)",
      "Internal Slack reminders for weekly campaign steps (not public posting)",
    ],
    remainManual: [
      "Reddit / community posts",
      "Backlink outreach emails",
      "WhatsApp / Discord / Slack sharing",
      "Search Console indexing requests",
      "All first-contact community participation",
    ],
    notes: [
      "This package does not create accounts or store credentials.",
      "Use hello@friendrank.app or team@friendrank.app when a public contact email is required.",
      "Register handles friendrankapp / playfriendrank only when ready to maintain them consistently.",
    ],
  };
}

function buildAutomationReadiness(
  campaign: WeeklyCampaignPlan,
): AutomationReadinessEntry[] {
  return [
    {
      channel: "Search Console indexing",
      classification: "manual-only",
      reason: "Google Search Console has no safe public auto-index API for this workflow.",
    },
    {
      channel: "Product-led sharing (WhatsApp / Discord / Slack)",
      classification: "manual-only",
      reason: "Personal invites from a host outperform brand broadcasts.",
    },
    {
      channel: "Reddit / community",
      classification: "not-recommended-for-automation",
      reason: "Platform policy and community trust require authentic manual participation.",
    },
    {
      channel: "LinkedIn",
      classification: "draft-automation-only",
      reason: "Copy can be drafted automatically later; publishing stays human-approved.",
    },
    {
      channel: "Pinterest",
      classification: "scheduler-ready-later",
      reason: "Pin metadata can be scheduled after image assets and approval flow exist.",
    },
    {
      channel: "AI tool directories",
      classification: "manual-only",
      reason: "Form submissions need human review and category selection.",
    },
    {
      channel: "Browser game directories",
      classification: "manual-only",
      reason: "Each directory has different fields and moderation — no unified API.",
    },
    {
      channel: "Backlink outreach email",
      classification: "draft-automation-only",
      reason: "Email body can be pre-filled; send remains manual and personalized.",
    },
    {
      channel: "TikTok / Reels / Shorts",
      classification: "not-recommended-for-automation",
      reason: campaign.recommendedChannels.some((entry) =>
        entry.channel.toLowerCase().includes("tiktok"),
      )
        ? "Ignored this week — no video strategy yet."
        : "Video channels need creative assets before any automation discussion.",
    },
  ];
}

function buildMeasurementChecklist(
  campaign: WeeklyCampaignPlan,
): PublishingPackageMeasurementItem[] {
  return [
    ...campaign.measurementPlan.map((item) => ({
      metric: item.metric,
      source: item.source,
      check: item.whatToLookFor,
    })),
    {
      metric: "Comments / replies (external)",
      source: "Reddit, LinkedIn, or directory listings posted this week",
      check: "Note qualitative feedback and questions for next week's copy tweaks.",
    },
  ];
}

function buildNextStepRecommendation(input: {
  campaign: WeeklyCampaignPlan;
  assistantConfidence: number;
  assetsEffort: GrowthAssetsReport["expectedEffort"];
  authorityWeekLabel: string;
}): NextStepRecommendation {
  const { campaign, assistantConfidence, assetsEffort, authorityWeekLabel } =
    input;

  if (assistantConfidence >= 85 && assetsEffort !== "high") {
    return {
      focus: "Manual distribution workflow",
      reason: `Execute this week's publishing package manually (${authorityWeekLabel}), then log metrics before adding scheduling tooling.`,
      alternatives: [
        "Directory submissions batch",
        "Analytics feedback loop",
        "Account readiness checklist",
      ],
    };
  }

  if (campaign.nextCampaignRecommendation.focus.toLowerCase().includes("ctr")) {
    return {
      focus: "Analytics feedback loop",
      reason:
        "Search Console and GA4 review should precede more distribution volume.",
      alternatives: [
        "Manual distribution workflow",
        "Lightweight scheduling",
        "Directory submissions",
      ],
    };
  }

  return {
    focus: "Directory submissions",
    reason:
      "Low-effort directory listings compound while community tests run in parallel.",
    alternatives: [
      "Manual distribution workflow",
      "Account readiness checklist",
      "Lightweight scheduling",
    ],
  };
}

/** Builds the complete weekly publishing package from existing growth modules. */
export function buildPublishingPackage(): PublishingPackage {
  const campaign = buildWeeklyCampaignPlan();
  const assetsReport = buildGrowthAssetsReport();
  const assistantReport = buildGrowthAssistantReport();
  const authorityReport = buildAuthorityRoadmapReport();
  const batchOne = buildIndexingQueue().find((batch) => batch.id === "batch-1");

  return {
    overview: {
      campaignName: campaign.summary.campaignName,
      priorityPage: campaign.summary.priorityPage,
      priorityPageTitle: campaign.summary.priorityPageTitle,
      priorityPageUrl: campaign.summary.priorityPageUrl,
      targetAudience: campaign.summary.targetAudience,
      goal: campaign.summary.campaignGoal,
      confidenceScore: campaign.summary.confidenceScore,
      expectedEffort: assetsReport.expectedEffort,
      expectedReach: assetsReport.expectedReach,
    },
    publicationBlocks: buildPublicationBlocks(assetsReport),
    publishingOrder: buildPublishingOrder(),
    accountReadiness: buildAccountReadiness(),
    automationReadiness: buildAutomationReadiness(campaign),
    guardrails: [...PACKAGE_GUARDRAILS, ...campaign.guardrails.slice(0, 3)],
    measurementChecklist: buildMeasurementChecklist(campaign),
    nextStepRecommendation: buildNextStepRecommendation({
      campaign,
      assistantConfidence: assistantReport.executiveSummary.confidenceScore,
      assetsEffort: assetsReport.expectedEffort,
      authorityWeekLabel:
        authorityReport.thirtyDayPlan[2]?.title ??
        "Week 3 external distribution tests",
    }),
    indexingBatchOneUrls: batchOne?.urls ?? [],
  };
}

/** Validates the publishing package structure and copy blocks. */
export function validatePublishingPackage(pkg?: PublishingPackage): {
  valid: boolean;
  issues: string[];
} {
  const data = pkg ?? buildPublishingPackage();
  const issues: string[] = [];

  if (!data.overview.campaignName.trim()) {
    issues.push("Campaign overview is missing a name.");
  }

  if (data.publicationBlocks.length < 7) {
    issues.push("Publication package must include seven copy blocks.");
  }

  for (const block of data.publicationBlocks) {
    if (!block.content.trim()) {
      issues.push(`Copy block "${block.label}" is empty.`);
    }
  }

  if (data.publishingOrder.length < 7) {
    issues.push("Publishing order must include seven steps.");
  }

  if (data.automationReadiness.length < 8) {
    issues.push("Automation readiness classification is incomplete.");
  }

  if (data.guardrails.length < 6) {
    issues.push("Guardrails are incomplete.");
  }

  if (data.measurementChecklist.length < 8) {
    issues.push("Measurement checklist must include at least eight items.");
  }

  if (data.accountReadiness.suggestedEmails.length === 0) {
    issues.push("Account readiness must document suggested emails without storing credentials.");
  }

  return { valid: issues.length === 0, issues };
}

function formatCopyBlock(block: PublicationCopyBlock): string[] {
  return [
    "",
    "────────────────────────────────────────",
    block.label.toUpperCase(),
    "────────────────────────────────────────",
    block.content,
  ];
}

/** Formats the publishing package for CLI output with copy-ready blocks. */
export function formatPublishingPackage(pkg?: PublishingPackage): string {
  const data = pkg ?? buildPublishingPackage();
  const validation = validatePublishingPackage(data);

  const publishChannels = data.automationReadiness.filter(
    (entry) =>
      entry.classification === "manual-only" ||
      entry.classification === "draft-automation-only",
  );

  const lines: string[] = [
    "FriendRank Weekly Publishing Package",
    `Status: ${validation.valid ? "PASS" : "FAIL"}`,
    "",
    "══════════════════════════════════════",
    "1. CAMPAIGN OVERVIEW",
    "══════════════════════════════════════",
    `Campaign: ${data.overview.campaignName}`,
    `Priority page: ${data.overview.priorityPage} (${data.overview.priorityPageTitle})`,
    data.overview.priorityPageUrl,
    `Audience: ${data.overview.targetAudience}`,
    `Goal: ${data.overview.goal}`,
    `Confidence: ${data.overview.confidenceScore}/100`,
    `Expected effort: ${data.overview.expectedEffort}`,
    `Expected reach: ${data.overview.expectedReach}`,
    "",
    "══════════════════════════════════════",
    "2. PUBLICATION PACKAGE (copy-ready)",
    "══════════════════════════════════════",
  ];

  for (const block of data.publicationBlocks) {
    lines.push(...formatCopyBlock(block));
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "3. RECOMMENDED PUBLISHING ORDER",
    "══════════════════════════════════════",
  );

  for (const [index, step] of data.publishingOrder.entries()) {
    lines.push(`${index + 1}. ${step}`);
  }

  if (data.indexingBatchOneUrls.length > 0) {
    lines.push("", "Batch 1 indexing URLs (Search Console):");
    for (const url of data.indexingBatchOneUrls.slice(0, 8)) {
      lines.push(`- ${url}`);
    }
    if (data.indexingBatchOneUrls.length > 8) {
      lines.push(`- …and ${data.indexingBatchOneUrls.length - 8} more`);
    }
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "4. ACCOUNT / CHANNEL READINESS (no credentials)",
    "══════════════════════════════════════",
    `Brand name: ${data.accountReadiness.suggestedBrandName}`,
    `Suggested handles: ${data.accountReadiness.suggestedHandles.join(", ")}`,
    `Suggested emails: ${data.accountReadiness.suggestedEmails.join(", ")}`,
    "",
    "Can support safe automation later:",
  );

  for (const entry of data.accountReadiness.futureAutomationCandidates) {
    lines.push(`- ${entry}`);
  }

  lines.push("", "Should remain manual:");
  for (const entry of data.accountReadiness.remainManual) {
    lines.push(`- ${entry}`);
  }

  lines.push("", "Notes:");
  for (const note of data.accountReadiness.notes) {
    lines.push(`- ${note}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "5. AUTOMATION READINESS CLASSIFICATION",
    "══════════════════════════════════════",
  );

  for (const entry of data.automationReadiness) {
    lines.push(`- ${entry.channel}: ${entry.classification.replace(/-/g, " ")}`);
    lines.push(`  ${entry.reason}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "6. GUARDRAILS",
    "══════════════════════════════════════",
  );

  for (const rule of data.guardrails) {
    lines.push(`- ${rule}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "7. 7-DAY MEASUREMENT CHECKLIST",
    "══════════════════════════════════════",
  );

  for (const item of data.measurementChecklist) {
    lines.push(`- [ ] ${item.metric} (${item.source})`);
    lines.push(`      ${item.check}`);
  }

  lines.push(
    "",
    "══════════════════════════════════════",
    "8. NEXT-STEP RECOMMENDATION",
    "══════════════════════════════════════",
    `Focus: ${data.nextStepRecommendation.focus}`,
    `Reason: ${data.nextStepRecommendation.reason}`,
    "",
    "Alternatives:",
  );

  for (const alt of data.nextStepRecommendation.alternatives) {
    lines.push(`- ${alt}`);
  }

  lines.push(
    "",
    `Channels ready for manual publish this week: ${publishChannels.length}`,
  );

  if (validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const issue of validation.issues) {
      lines.push(`- ${issue}`);
    }
  }

  return lines.join("\n").trimEnd();
}
