import {
  getCluster,
  getClusterBySlug,
  getClustersBySlug,
  type KeywordCluster,
} from "@/lib/landing-pages/planning/keyword-clusters";

/** Returns true when two slugs share at least one keyword cluster. */
export function isSameCluster(slugA: string, slugB: string): boolean {
  if (slugA === slugB) {
    return true;
  }

  const clustersA = getClustersBySlug(slugA);
  const clustersB = getClustersBySlug(slugB);

  if (clustersA.length === 0 || clustersB.length === 0) {
    return false;
  }

  const clusterIdsB = new Set(clustersB.map((cluster) => cluster.id));

  return clustersA.some((cluster) => clusterIdsB.has(cluster.id));
}

/**
 * Sorts slugs by their position in a cluster's memberSlugs list.
 * Slugs not in the cluster are placed at the end in original order.
 */
export function sortByCluster(slugs: string[], clusterId: string): string[] {
  const cluster = getCluster(clusterId);
  if (!cluster) {
    return [...slugs];
  }

  const order = new Map(
    cluster.memberSlugs.map((slug, index) => [slug, index]),
  );

  return [...slugs].sort((slugA, slugB) => {
    const indexA = order.get(slugA) ?? Number.MAX_SAFE_INTEGER;
    const indexB = order.get(slugB) ?? Number.MAX_SAFE_INTEGER;
    return indexA - indexB;
  });
}

/** Keeps only slugs that belong to the given cluster. */
export function filterClusterMembers(
  slugs: string[],
  clusterId: string,
): string[] {
  const cluster = getCluster(clusterId);
  if (!cluster) {
    return [];
  }

  const members = new Set(cluster.memberSlugs);
  return slugs.filter((slug) => members.has(slug));
}

/** Groups slugs by cluster id. Slugs with no cluster are omitted. */
export function groupSlugsByCluster(
  slugs: string[],
): Map<string, string[]> {
  const grouped = new Map<string, string[]>();

  for (const slug of slugs) {
    const cluster = getClusterBySlug(slug);
    if (!cluster) {
      continue;
    }

    const existing = grouped.get(cluster.id) ?? [];
    existing.push(slug);
    grouped.set(cluster.id, existing);
  }

  return grouped;
}

export function getClusterNamesForSlug(slug: string): string[] {
  return getClustersBySlug(slug).map((cluster: KeywordCluster) => cluster.name);
}
