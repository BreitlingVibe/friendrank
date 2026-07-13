import type { SnippetExperimentRecord } from "@/lib/growth/snippet-optimization/types";

/**
 * Repository-based experiment registry.
 * Keep in sync with /docs/GROWTH_EXPERIMENTS.md when experiments change.
 */
export const SNIPPET_EXPERIMENT_REGISTRY: readonly SnippetExperimentRecord[] = [
  {
    id: "voting-game-online-ctr-test",
    name: "Voting Game Online CTR Test",
    status: "pending_measurement",
    targetSlug: "group-voting-game",
    targetQuery: "voting game online",
    deploymentDate: null,
    measurementDate: null,
    measurementWindowDays: [7, 14],
    beforeTitle: "Group Voting Game | Create a Friend Vote Online | FriendRank",
    afterTitle: "Online Voting Game for Groups | FriendRank",
    beforeDescription:
      "Create a group voting game for friends. Invite your group, vote on funny roles, unlock results together, and share the story.",
    afterDescription:
      "Start a free online voting game for groups and friends. Share one link, vote privately from any phone, reveal results together — no app download.",
    notes:
      "Metadata and visible copy deployed in Phase 25 Sprint 1. Do not change again until measurement window completes.",
  },
];

const BLOCKED_STATUSES = new Set<SnippetExperimentRecord["status"]>([
  "approved",
  "active",
  "pending_measurement",
]);

export function getSnippetExperiments(): readonly SnippetExperimentRecord[] {
  return SNIPPET_EXPERIMENT_REGISTRY;
}

export function getExperimentForSlug(slug: string): SnippetExperimentRecord | undefined {
  return SNIPPET_EXPERIMENT_REGISTRY.find((experiment) => experiment.targetSlug === slug);
}

export function isSnippetExperimentBlocked(slug: string): boolean {
  const experiment = getExperimentForSlug(slug);
  return experiment != null && BLOCKED_STATUSES.has(experiment.status);
}

export function getActiveSnippetExperiments(): SnippetExperimentRecord[] {
  return SNIPPET_EXPERIMENT_REGISTRY.filter((experiment) =>
    BLOCKED_STATUSES.has(experiment.status),
  );
}

export function formatMeasurementWindow(
  experiment: SnippetExperimentRecord,
): string {
  const [minDays, maxDays] = experiment.measurementWindowDays;
  return `${minDays}–${maxDays} days after Google recrawls the page`;
}
