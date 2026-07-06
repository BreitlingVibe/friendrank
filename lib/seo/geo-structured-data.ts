import type { AiCitationLayer } from "@/lib/geo/ai-citation";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";

function uniqueNonEmpty(values: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const value of values) {
    const trimmed = value.trim();
    if (!trimmed) {
      continue;
    }

    const key = trimmed.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

/** Adds machine-readable GEO fields to JSON-LD WebPage nodes without changing visible UI. */
export function buildGeoStructuredDataFields(input: {
  geoFoundation: GeoFoundation;
  aiCitation: AiCitationLayer;
}) {
  const keywords = uniqueNonEmpty([
    ...input.geoFoundation.contentSignals.primaryTopics,
    ...input.geoFoundation.contentSignals.secondaryTopics,
    ...input.geoFoundation.contentSignals.relatedConcepts,
  ]).join(", ");

  return {
    ...(keywords ? { keywords } : {}),
    disambiguatingDescription: input.aiCitation.citationSummary,
    abstract: input.geoFoundation.summary,
  };
}
