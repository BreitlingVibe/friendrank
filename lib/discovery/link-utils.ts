import type { DiscoveryLink } from "@/lib/discovery/types";

export function getDiscoveryLinkKey(link: DiscoveryLink): string {
  return `${link.kind}:${link.slug}`;
}

export function dedupeDiscoveryLinks(
  links: DiscoveryLink[],
  seen: Set<string> = new Set(),
): DiscoveryLink[] {
  const results: DiscoveryLink[] = [];

  for (const link of links) {
    const key = getDiscoveryLinkKey(link);
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    results.push(link);
  }

  return results;
}

export function excludeDiscoverySlug(
  links: DiscoveryLink[],
  slug: string,
): DiscoveryLink[] {
  return links.filter((link) => link.slug !== slug);
}

export function excludeDiscoverySlugs(
  links: DiscoveryLink[],
  slugs: readonly string[],
): DiscoveryLink[] {
  const blocked = new Set(slugs);
  return links.filter((link) => !blocked.has(link.slug));
}
