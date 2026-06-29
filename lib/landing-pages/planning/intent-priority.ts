/** Static priority tier derived from estimated opportunity scores. */
export type IntentPriorityTier = "High" | "Medium" | "Low";

/** Minimum score (inclusive) for High priority. */
export const HIGH_PRIORITY_THRESHOLD = 70;

/** Minimum score (inclusive) for Medium priority. */
export const MEDIUM_PRIORITY_THRESHOLD = 40;

/**
 * Maps a numeric estimatedPriority score to a priority tier.
 * Scores are static planning values, not connected to any external API.
 */
export function getPriorityTier(estimatedPriority: number): IntentPriorityTier {
  if (estimatedPriority >= HIGH_PRIORITY_THRESHOLD) {
    return "High";
  }

  if (estimatedPriority >= MEDIUM_PRIORITY_THRESHOLD) {
    return "Medium";
  }

  return "Low";
}

export function isHighPriority(estimatedPriority: number): boolean {
  return getPriorityTier(estimatedPriority) === "High";
}

export function isMediumPriority(estimatedPriority: number): boolean {
  return getPriorityTier(estimatedPriority) === "Medium";
}

export function isLowPriority(estimatedPriority: number): boolean {
  return getPriorityTier(estimatedPriority) === "Low";
}

/** Returns registry entries matching a priority tier, sorted by score descending. */
export function filterByPriorityTier<
  T extends { estimatedPriority: number },
>(entries: T[], tier: IntentPriorityTier): T[] {
  return entries
    .filter((entry) => getPriorityTier(entry.estimatedPriority) === tier)
    .sort((a, b) => b.estimatedPriority - a.estimatedPriority);
}

/** Returns registry entries sorted by estimatedPriority descending. */
export function sortByPriority<T extends { estimatedPriority: number }>(
  entries: T[],
): T[] {
  return [...entries].sort(
    (a, b) => b.estimatedPriority - a.estimatedPriority,
  );
}
