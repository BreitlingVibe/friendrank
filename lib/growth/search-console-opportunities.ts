import type { SearchConsoleOpportunityRecord } from "@/lib/growth/snippet-optimization/types";

/**
 * Manual Search Console query-to-page evidence.
 * Add rows here after reviewing Search Console → Performance → Pages + Queries.
 * Do not invent impressions, clicks, CTR, position, or date ranges.
 */
export const SEARCH_CONSOLE_OPPORTUNITIES: readonly SearchConsoleOpportunityRecord[] =
  [
    {
      targetQuery: "voting game online",
      targetSlug: "group-voting-game",
      relatedQueries: ["group voting game", "online voting game", "friends voting game"],
      impressions: 19,
      clicks: 1,
      ctr: 0.053,
      averagePosition: null,
      observationStartDate: null,
      observationEndDate: null,
      source: "manual-search-console",
      evidenceStatus: "verified",
      competingUrls: [
        {
          slug: "anonymous-voting-game",
          impressions: 6,
          clicks: 1,
          averagePosition: null,
        },
        {
          slug: "anonymous-voting-games",
          impressions: 2,
          clicks: 0,
          averagePosition: null,
        },
      ],
      notes:
        "Primary target for Phase 25 Sprint 1 controlled experiment. Observation date range not yet recorded — fill when exporting from Search Console.",
    },
  ];

export function getSearchConsoleOpportunities(): readonly SearchConsoleOpportunityRecord[] {
  return SEARCH_CONSOLE_OPPORTUNITIES;
}

export function getSearchConsoleOpportunityBySlug(
  slug: string,
): SearchConsoleOpportunityRecord | undefined {
  return SEARCH_CONSOLE_OPPORTUNITIES.find((entry) => entry.targetSlug === slug);
}

export function getSearchConsoleOpportunityByQuery(
  query: string,
): SearchConsoleOpportunityRecord | undefined {
  const normalized = query.trim().toLowerCase();
  return SEARCH_CONSOLE_OPPORTUNITIES.find(
    (entry) => entry.targetQuery.toLowerCase() === normalized,
  );
}

export function computeCtr(clicks: number, impressions: number): number | undefined {
  if (impressions <= 0) {
    return undefined;
  }
  return clicks / impressions;
}

export function formatCtr(value: number | undefined): string {
  if (value == null) {
    return "—";
  }
  return `${(value * 100).toFixed(1)}%`;
}

export function formatSearchConsoleEvidence(
  record: SearchConsoleOpportunityRecord,
): string {
  const ctr = record.ctr ?? computeCtr(record.clicks, record.impressions);
  const ctrText = ctr != null ? `, CTR ${formatCtr(ctr)}` : "";
  const positionText =
    record.averagePosition != null
      ? `, avg position ${record.averagePosition.toFixed(1)}`
      : "";
  return `${record.impressions} impressions, ${record.clicks} click${record.clicks === 1 ? "" : "s"}${ctrText}${positionText}`;
}
