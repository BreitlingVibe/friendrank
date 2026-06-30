type LinkLabelStyle = "play" | "create" | "view" | "browse" | "popular";

const PLAY_VERBS = ["Play", "Start", "Try"] as const;
const CREATE_VERBS = ["Create", "Make", "Launch"] as const;
const VIEW_VERBS = ["Browse", "Explore", "View"] as const;
const POPULAR_VERBS = ["Play", "Create", "Start"] as const;
const HUB_VERBS = ["Explore", "Browse", "Discover"] as const;

function hashSlug(slug: string): number {
  return slug.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

/** Deterministic descriptive anchor from page title and slug. */
export function getLandingPageLinkLabel(
  title: string,
  slug: string,
  style: LinkLabelStyle = "play",
): string {
  const hash = hashSlug(slug);
  const verbs =
    style === "create"
      ? CREATE_VERBS
      : style === "view"
        ? VIEW_VERBS
        : style === "popular"
          ? POPULAR_VERBS
          : PLAY_VERBS;

  return `${verbs[hash % verbs.length]} ${title}`;
}

/** Anchor text for Topic Hub pill links. */
export function getHubBrowseLabel(title: string, slug: string): string {
  const verb = HUB_VERBS[hashSlug(slug) % HUB_VERBS.length];
  return `${verb} ${title}`;
}
