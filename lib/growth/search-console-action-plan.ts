import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { validateSearchOverlap } from "@/lib/seo/validation/overlap-validation";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import { buildTopicHubMetadata } from "@/lib/seo/page-metadata";
import type { ValidationIssue } from "@/lib/entities/validation/types";
import {
  getAllGrowthClassifications,
  getSearchConsoleLandingPageTargets,
  type GrowthPageClassification,
  type GrowthTier,
} from "@/lib/growth/growth-priority";

export const ACTION_CATEGORY_DESCRIPTIONS: Record<
  GrowthTier,
  { label: string; description: string }
> = {
  P0: {
    label: "Critical surfaces",
    description:
      "Homepage, topic hubs, and highest-priority landing pages. Inspect first and request indexing after deploys.",
  },
  P1: {
    label: "Strong landing pages",
    description:
      "High estimatedPriority or featured hub pages with broad audience and search intent.",
  },
  P2: {
    label: "Long-tail authority",
    description:
      "Audience, occasion, and medium-priority pages supporting topical coverage and internal linking.",
  },
  P3: {
    label: "Support pages",
    description:
      "Lower-priority pages mainly supporting internal linking. Monitor only when impressions appear.",
  },
};

export const INDEXING_QUEUE_NOTE =
  "Use Search Console manual indexing carefully. Request indexing for Batch 1 after launch, then Batch 2 over the following week. Avoid spamming daily requests for the same URLs.";

export type SearchConsolePlanAction =
  | "inspect-url"
  | "request-indexing"
  | "monitor-impressions"
  | "monitor-ctr"
  | "review-title-meta-later"
  | "watch-cannibalization-warning"
  | "ignore-low-risk-overlap";

export type MonitoringFrequency =
  | "daily"
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly";

export type SearchConsoleActionPlanItem = {
  url: string;
  path: string;
  pageType: GrowthPageClassification["pageType"];
  hub: string | null;
  category: string | null;
  priorityTier: GrowthTier;
  suggestedAction: SearchConsolePlanAction;
  reason: string;
  monitoringFrequency: MonitoringFrequency;
  expectedSignal: string;
};

export type IndexingBatchId = "batch-1" | "batch-2" | "batch-3" | "batch-4";

export type IndexingBatch = {
  id: IndexingBatchId;
  label: string;
  description: string;
  urls: string[];
};

export type TitleMetaCandidate = {
  url: string;
  path: string;
  pageType: GrowthPageClassification["pageType"];
  priorityTier: GrowthTier;
  hub: string | null;
  reasons: string[];
  metaTitle: string;
  metaDescription: string;
};

export type OverlapTriageCategory = "ignore-for-now" | "monitor" | "fix-later";

export type OverlapTriageItem = {
  code: string;
  slug: string;
  relatedSlug: string | null;
  triage: OverlapTriageCategory;
  reason: string;
};

export type AuditWarningTriage = {
  codePrefix: string;
  disposition: "safe" | "monitor" | "fix-when-capacity";
  guidance: string;
};

const COMPETITIVE_HUB_IDS = new Set([
  "friend-games",
  "party-games",
  "relationship-games",
  "question-games",
]);

const AUDIENCE_PAGE_PREFIXES = ["games-for-"];

const AUDIENCE_PAGE_SUFFIXES = [
  "-party-games",
  "-family-games",
  "-team-games",
  "-couple-games",
];

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function extractRelatedSlug(message: string): string | null {
  const quoted = message.match(/"([^"]+)"/g);
  if (!quoted || quoted.length < 2) {
    return null;
  }

  return quoted[1]?.replace(/"/g, "") ?? null;
}

function isAudienceOccasionPage(slug: string): boolean {
  if (AUDIENCE_PAGE_PREFIXES.some((prefix) => slug.startsWith(prefix))) {
    return true;
  }

  return AUDIENCE_PAGE_SUFFIXES.some((suffix) => slug.endsWith(suffix));
}

function resolveMonitoringFrequency(tier: GrowthTier): MonitoringFrequency {
  switch (tier) {
    case "P0":
      return "weekly";
    case "P1":
      return "weekly";
    case "P2":
      return "biweekly";
    default:
      return "monthly";
  }
}

function resolveExpectedSignal(action: SearchConsolePlanAction): string {
  switch (action) {
    case "inspect-url":
      return "URL shows Indexed or Valid with canonical matching production URL.";
    case "request-indexing":
      return "URL moves from Discovered/Crawled to Indexed within 7–14 days.";
    case "monitor-impressions":
      return "Impressions trend upward or stabilize; page appears in Performance report.";
    case "monitor-ctr":
      return "CTR improves after snippet review while impressions remain stable.";
    case "review-title-meta-later":
      return "Higher CTR and clearer query mapping after a future title/meta iteration.";
    case "watch-cannibalization-warning":
      return "Only one URL ranks for the shared query cluster; split impressions decrease.";
    default:
      return "No action needed unless impressions appear on both overlapping URLs.";
  }
}

function getOverlapIssuesBySlug(): Map<string, ValidationIssue[]> {
  const overlap = validateSearchOverlap();
  const bySlug = new Map<string, ValidationIssue[]>();

  for (const entry of overlap.issues) {
    const slug = entry.context ?? "unknown";
    const existing = bySlug.get(slug) ?? [];
    existing.push(entry);
    bySlug.set(slug, existing);
  }

  return bySlug;
}

function resolvePrimaryAction(
  page: GrowthPageClassification,
  indexingBatch: IndexingBatchId | null,
  overlapIssues: ValidationIssue[],
  titleMetaCandidate: boolean,
): SearchConsolePlanAction {
  if (overlapIssues.some((issue) => issue.code === "overlap.similar_slug")) {
    return "ignore-low-risk-overlap";
  }

  if (
    overlapIssues.some(
      (issue) =>
        issue.code === "overlap.similar_title" ||
        issue.code === "overlap.similar_description" ||
        issue.code === "overlap.shared_primary_keyword",
    )
  ) {
    return "watch-cannibalization-warning";
  }

  if (titleMetaCandidate && page.growthTier !== "P3") {
    return "review-title-meta-later";
  }

  if (page.pageType === "homepage" || page.growthTier === "P1") {
    if (indexingBatch === "batch-1" || indexingBatch === "batch-2") {
      return "request-indexing";
    }

    return page.pageType === "homepage" ? "inspect-url" : "monitor-ctr";
  }

  if (page.pageType === "topic-hub") {
    return indexingBatch === "batch-1" ? "request-indexing" : "inspect-url";
  }

  if (indexingBatch === "batch-1" || indexingBatch === "batch-2") {
    return "request-indexing";
  }

  if (page.growthTier === "P2") {
    return "monitor-impressions";
  }

  return "monitor-impressions";
}

function resolveActionReason(
  page: GrowthPageClassification,
  action: SearchConsolePlanAction,
  indexingBatch: IndexingBatchId | null,
): string {
  switch (action) {
    case "inspect-url":
      return "Priority surface that should stay indexed with the correct canonical.";
    case "request-indexing":
      return indexingBatch
        ? `Included in ${indexingBatch} indexing queue after deploy or sitemap update.`
        : "High-priority page that should be indexed early.";
    case "monitor-impressions":
      return isAudienceOccasionPage(page.path.slice(1))
        ? "Long-tail audience/occasion page — watch for first impressions before optimizing."
        : "Medium-priority page — track visibility before changing copy.";
    case "monitor-ctr":
      return "Strong landing page — prioritize CTR and position 8–30 query opportunities.";
    case "review-title-meta-later":
      return "High-priority page with generic title or meta description pattern.";
    case "watch-cannibalization-warning":
      return "Overlap audit flagged a nearby page — confirm queries are not split unnecessarily.";
    default:
      return "Singular/plural or variant slug pair with intentionally different user intent.";
  }
}

function getIndexingBatchMap(): Map<string, IndexingBatchId> {
  const batches = buildIndexingQueue();
  const map = new Map<string, IndexingBatchId>();

  for (const batch of batches) {
    for (const url of batch.urls) {
      map.set(url, batch.id);
    }
  }

  return map;
}

function isGenericMetaTitle(metaTitle: string, title: string): boolean {
  const trimmed = metaTitle.trim();
  if (trimmed.length < 42) {
    return true;
  }

  const simpleTitle = `${title} | FriendRank`;
  if (normalizeText(trimmed) === normalizeText(simpleTitle)) {
    return true;
  }

  const pipeSegments = trimmed.split("|").map((segment) => segment.trim());
  if (
    pipeSegments.length <= 2 &&
    normalizeText(pipeSegments[0] ?? "") === normalizeText(title)
  ) {
    return true;
  }

  return false;
}

function isGenericMetaDescription(metaDescription: string): boolean {
  const trimmed = metaDescription.trim();
  if (trimmed.length < 95) {
    return true;
  }

  const genericPrefixes = [
    "create a fun",
    "find games for",
    "browse games for",
    "discover games for",
  ];

  return genericPrefixes.some((prefix) =>
    trimmed.toLowerCase().startsWith(prefix),
  );
}

function getPageMetadata(page: GrowthPageClassification): {
  metaTitle: string;
  metaDescription: string;
} | null {
  if (page.pageType === "landing-page") {
    const landingPage = LANDING_PAGES.find((entry) => entry.slug === page.path.slice(1));
    if (!landingPage) {
      return null;
    }

    return {
      metaTitle: landingPage.metaTitle,
      metaDescription: landingPage.metaDescription,
    };
  }

  if (page.pageType === "topic-hub" && page.topicHubId) {
    const hub = getAllHubDefinitions().find((entry) => entry.id === page.topicHubId);
    if (!hub) {
      return null;
    }

    const description =
      getHubPageContent(hub.id)?.metaDescription ?? hub.description;
    const metadata = buildTopicHubMetadata({
      title: hub.title,
      description,
      slug: hub.slug,
    });

    return {
      metaTitle: String(metadata.title ?? hub.title),
      metaDescription: description,
    };
  }

  return null;
}

/** Returns title/meta improvement candidates without modifying metadata. */
export function getTitleMetaCandidates(): TitleMetaCandidate[] {
  const overlapBySlug = getOverlapIssuesBySlug();
  const candidates: TitleMetaCandidate[] = [];

  for (const page of getAllGrowthClassifications()) {
    if (page.pageType === "homepage") {
      continue;
    }

    if (page.growthTier === "P3") {
      continue;
    }

    const metadata = getPageMetadata(page);
    if (!metadata) {
      continue;
    }

    const reasons: string[] = [];
    const slug = page.path.slice(1);

    if (page.growthTier === "P0" || page.growthTier === "P1") {
      reasons.push("High growth priority page");
    }

    if (isGenericMetaTitle(metadata.metaTitle, page.title)) {
      reasons.push("Meta title uses a generic FriendRank template");
    }

    if (isGenericMetaDescription(metadata.metaDescription)) {
      reasons.push("Meta description is short or uses generic opening copy");
    }

    if (page.topicHubId && COMPETITIVE_HUB_IDS.has(page.topicHubId)) {
      reasons.push("Page belongs to a competitive topic hub");
    }

    if (page.pageType === "topic-hub") {
      reasons.push("Hub-level page shapes category query snippets");
    }

    const overlapIssues = overlapBySlug.get(slug) ?? [];
    if (overlapIssues.length > 0) {
      reasons.push("Overlap audit warning present for this slug");
    }

    if (reasons.length === 0) {
      continue;
    }

    candidates.push({
      url: page.url,
      path: page.path,
      pageType: page.pageType,
      priorityTier: page.growthTier,
      hub: page.topicHubSlug,
      reasons,
      metaTitle: metadata.metaTitle,
      metaDescription: metadata.metaDescription,
    });
  }

  return candidates.sort((pageA, pageB) => {
    const tierScore = (tier: GrowthTier) =>
      tier === "P0" ? 4 : tier === "P1" ? 3 : tier === "P2" ? 2 : 1;
    const tierDelta = tierScore(pageB.priorityTier) - tierScore(pageA.priorityTier);
    if (tierDelta !== 0) {
      return tierDelta;
    }

    return pageA.path.localeCompare(pageB.path);
  });
}

/** Triage overlap audit warnings into ignore, monitor, or fix-later buckets. */
export function getOverlapTriageSummary(): OverlapTriageItem[] {
  const overlap = validateSearchOverlap();
  const triaged: OverlapTriageItem[] = [];

  for (const entry of overlap.issues) {
    const slug = entry.context ?? "unknown";
    const relatedSlug = extractRelatedSlug(entry.message);

    if (entry.code === "overlap.similar_slug") {
      triaged.push({
        code: entry.code,
        slug,
        relatedSlug,
        triage: "ignore-for-now",
        reason:
          "Intentional singular/plural or variant slug pair with different user intent.",
      });
      continue;
    }

    if (entry.code === "overlap.similar_title") {
      const leftIntent = getIntentBySlug(slug);
      const rightIntent = relatedSlug ? getIntentBySlug(relatedSlug) : undefined;
      const sameAudience =
        leftIntent &&
        rightIntent &&
        normalizeText(leftIntent.audience) === normalizeText(rightIntent.audience);
      const sameSearchIntent =
        leftIntent &&
        rightIntent &&
        normalizeText(leftIntent.searchIntent) ===
          normalizeText(rightIntent.searchIntent);

      triaged.push({
        code: entry.code,
        slug,
        relatedSlug,
        triage:
          sameAudience && sameSearchIntent ? "fix-later" : "monitor",
        reason:
          sameAudience && sameSearchIntent
            ? "Same search intent and target audience — differentiate titles before scaling traffic."
            : "Similar titles inside the same topic cluster — watch for CTR split.",
      });
      continue;
    }

    if (entry.code === "overlap.similar_description") {
      triaged.push({
        code: entry.code,
        slug,
        relatedSlug,
        triage: "fix-later",
        reason:
          "Near-duplicate meta description — update later so snippets differentiate intent.",
      });
      continue;
    }

    if (entry.code === "overlap.shared_primary_keyword") {
      triaged.push({
        code: entry.code,
        slug,
        relatedSlug,
        triage: "monitor",
        reason:
          "Shared primary keyword phrasing — confirm both pages target distinct queries.",
      });
      continue;
    }

    triaged.push({
      code: entry.code,
      slug,
      relatedSlug,
      triage: "monitor",
      reason: entry.message,
    });
  }

  return triaged;
}

/** Guidance for interpreting audit:all and audit:index warnings. */
export function getAuditWarningTriageGuide(): AuditWarningTriage[] {
  return [
    {
      codePrefix: "overlap.similar_slug",
      disposition: "safe",
      guidance:
        "Usually intentional singular/plural pairs (for example game vs games). Ignore unless both URLs rank for the same query.",
    },
    {
      codePrefix: "content.missing_enhanced_intro",
      disposition: "safe",
      guidance:
        "Expected after the content experience layer removes duplicate hero/intro copy. No action unless bounce rate is high in GA4.",
    },
    {
      codePrefix: "overlap.similar_title",
      disposition: "monitor",
      guidance:
        "Review in Search Console after impressions appear. Fix later if both pages rank for the same query with low CTR.",
    },
    {
      codePrefix: "overlap.similar_description",
      disposition: "fix-when-capacity",
      guidance:
        "Not blocking indexing. Schedule a metadata differentiation pass when editing those pages.",
    },
    {
      codePrefix: "overlap.shared_primary_keyword",
      disposition: "monitor",
      guidance:
        "Watch query overlap weekly. Keep both pages if intents differ; adjust titles if Google maps them to the same query.",
    },
    {
      codePrefix: "metadata.duplicate_hub",
      disposition: "monitor",
      guidance:
        "Hub metadata similarity warning. Fix when refreshing hub copy, not urgent for launch.",
    },
    {
      codePrefix: "experience.",
      disposition: "safe",
      guidance:
        "Content experience audit errors should be fixed in code. Warnings are usually safe if audit:all passes.",
    },
    {
      codePrefix: "topic_hub.",
      disposition: "safe",
      guidance:
        "Topic hub experience checks — fix in code if errors appear. No Search Console action needed when passing.",
    },
  ];
}

/** Recommended manual indexing batches. */
export function buildIndexingQueue(): IndexingBatch[] {
  const allPages = getAllGrowthClassifications();
  const homepage = allPages.find((page) => page.pageType === "homepage");
  const hubs = allPages.filter((page) => page.pageType === "topic-hub");
  const landingPages = allPages
    .filter((page) => page.pageType === "landing-page")
    .sort((pageA, pageB) => pageB.estimatedPriority - pageA.estimatedPriority);

  const batch1Landing = landingPages.slice(0, 10);
  const batch2Landing = landingPages.slice(10, 30);
  const batch3Landing = landingPages.filter(
    (page) => page.growthTier === "P1" || page.growthTier === "P2",
  );
  const batch3Paths = new Set([
    ...batch1Landing.map((page) => page.path),
    ...batch2Landing.map((page) => page.path),
  ]);
  const batch3 = batch3Landing.filter((page) => !batch3Paths.has(page.path));
  const batch4 = landingPages.filter((page) => page.growthTier === "P3");

  return [
    {
      id: "batch-1",
      label: "Batch 1 — Launch indexing",
      description:
        "Homepage, all topic hubs, and top 10 landing pages. Request indexing once after sitemap submission.",
      urls: [
        ...(homepage ? [homepage.url] : []),
        ...hubs.map((hub) => hub.url),
        ...batch1Landing.map((page) => page.url),
      ],
    },
    {
      id: "batch-2",
      label: "Batch 2 — Priority landing pages",
      description:
        "Next 20 highest-priority landing pages. Spread requests over several days.",
      urls: batch2Landing.map((page) => page.url),
    },
    {
      id: "batch-3",
      label: "Batch 3 — Remaining P1/P2 pages",
      description:
        "Remaining strong and long-tail authority pages after Batches 1–2 are indexed.",
      urls: batch3.map((page) => page.url),
    },
    {
      id: "batch-4",
      label: "Batch 4 — Support pages",
      description:
        "Lower-priority long-tail pages. Request indexing only if crawled but not indexed after 30 days.",
      urls: batch4.map((page) => page.url),
    },
  ];
}

/** Weekly Search Console review checklist items. */
export function getWeeklySearchConsoleChecklist(): string[] {
  return [
    "Open Search Console → Pages and note Indexed, Crawled – currently not indexed, and Discovered – currently not indexed counts.",
    "Confirm sitemap status is Submitted and Processed without errors.",
    "Run URL Inspection for any Batch 1 URL that lost index coverage.",
    "Review Performance → Queries with impressions but CTR below 2%.",
    "Filter Performance → Pages with average position 8–30 and note top 5 opportunities.",
    "Identify pages with impressions but zero clicks — candidate for title/meta review.",
    "Cross-check GA4 for pages with clicks but low cta_clicked or game_created rates.",
    "Record top 10 queries and top 10 pages for the week.",
    "Run npm run growth:search-console-plan and update next-week actions.",
    "Run npm run audit:all — only fix new errors; triage warnings using the audit guide.",
  ];
}

/** Full prioritized Search Console action plan for all indexable pages. */
export function getSearchConsoleActionPlan(): SearchConsoleActionPlanItem[] {
  const indexingBatchByUrl = getIndexingBatchMap();
  const overlapBySlug = getOverlapIssuesBySlug();
  const titleMetaPaths = new Set(
    getTitleMetaCandidates().map((candidate) => candidate.path),
  );

  return getAllGrowthClassifications().map((page) => {
    const slug = page.path === "/" ? null : page.path.slice(1);
    const overlapIssues = slug ? (overlapBySlug.get(slug) ?? []) : [];
    const indexingBatch = indexingBatchByUrl.get(page.url) ?? null;
    const titleMetaCandidate = titleMetaPaths.has(page.path);
    const suggestedAction = resolvePrimaryAction(
      page,
      indexingBatch,
      overlapIssues,
      titleMetaCandidate,
    );

    return {
      url: page.url,
      path: page.path,
      pageType: page.pageType,
      hub: page.topicHubSlug,
      category: page.categoryGroup,
      priorityTier: page.growthTier,
      suggestedAction,
      reason: resolveActionReason(page, suggestedAction, indexingBatch),
      monitoringFrequency:
        page.pageType === "homepage" ? "daily" : resolveMonitoringFrequency(page.growthTier),
      expectedSignal: resolveExpectedSignal(suggestedAction),
    };
  });
}

/** Top URLs to inspect first in Search Console. */
export function getTopInspectUrls(limit = 15): SearchConsoleActionPlanItem[] {
  const plan = getSearchConsoleActionPlan();

  return plan
    .filter(
      (item) =>
        item.suggestedAction === "inspect-url" ||
        item.suggestedAction === "request-indexing" ||
        item.priorityTier === "P0" ||
        item.priorityTier === "P1",
    )
    .slice(0, limit);
}

export function formatSearchConsoleActionPlanReport(): string {
  const batches = buildIndexingQueue();
  const inspectUrls = getTopInspectUrls();
  const checklist = getWeeklySearchConsoleChecklist();
  const titleMetaCandidates = getTitleMetaCandidates().slice(0, 15);
  const overlapTriage = getOverlapTriageSummary();
  const auditGuide = getAuditWarningTriageGuide();

  const overlapCounts = overlapTriage.reduce(
    (counts, item) => {
      counts[item.triage] += 1;
      return counts;
    },
    { "ignore-for-now": 0, monitor: 0, "fix-later": 0 },
  );

  const lines: string[] = [
    "FriendRank Search Console action plan",
    "",
    "Action categories",
  ];

  for (const tier of ["P0", "P1", "P2", "P3"] as GrowthTier[]) {
    const category = ACTION_CATEGORY_DESCRIPTIONS[tier];
    lines.push(`- ${tier} (${category.label}): ${category.description}`);
  }

  lines.push("", INDEXING_QUEUE_NOTE, "", "Priority indexing queue");

  for (const batch of batches) {
    lines.push("", `${batch.label} (${batch.urls.length} URLs)`);
    lines.push(batch.description);
    for (const url of batch.urls) {
      lines.push(`  - ${url}`);
    }
  }

  lines.push("", "Top URLs to inspect first");

  for (const item of inspectUrls) {
    lines.push(
      `- ${item.path} | ${item.pageType} | tier ${item.priorityTier} | ${item.suggestedAction}`,
    );
    lines.push(`  reason: ${item.reason}`);
    lines.push(
      `  monitor: ${item.monitoringFrequency} | signal: ${item.expectedSignal}`,
    );
  }

  lines.push("", "Weekly Search Console checklist");
  for (const step of checklist) {
    lines.push(`- ${step}`);
  }

  lines.push(
    "",
    `Title/meta improvement candidates (${titleMetaCandidates.length} shown)`,
  );

  for (const candidate of titleMetaCandidates) {
    lines.push(
      `- ${candidate.path} | tier ${candidate.priorityTier} | hub ${candidate.hub ?? "—"}`,
    );
    for (const reason of candidate.reasons) {
      lines.push(`  - ${reason}`);
    }
  }

  lines.push(
    "",
    "Overlap triage summary",
    `- Ignore for now: ${overlapCounts["ignore-for-now"]}`,
    `- Monitor: ${overlapCounts.monitor}`,
    `- Fix later: ${overlapCounts["fix-later"]}`,
  );

  for (const item of overlapTriage.slice(0, 12)) {
    lines.push(
      `- [${item.triage}] ${item.slug}${item.relatedSlug ? ` ↔ ${item.relatedSlug}` : ""} (${item.code})`,
    );
    lines.push(`  ${item.reason}`);
  }

  if (overlapTriage.length > 12) {
    lines.push(`  … and ${overlapTriage.length - 12} more overlap warnings`);
  }

  lines.push("", "Audit warning triage (safe vs worth fixing)");

  for (const entry of auditGuide) {
    lines.push(`- [${entry.disposition}] ${entry.codePrefix}: ${entry.guidance}`);
  }

  return lines.join("\n").trimEnd();
}

/** Convenience helper for scripts — top landing page inspect targets. */
export function getSearchConsoleLandingInspectTargets(): GrowthPageClassification[] {
  return getSearchConsoleLandingPageTargets();
}
