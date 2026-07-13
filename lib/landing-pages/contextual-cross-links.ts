export type ContextualCrossLink = {
  prefix: string;
  href: string;
  label: string;
};

/** Page-specific cross-links that clarify nearby voting URL intent. */
export const CONTEXTUAL_CROSS_LINKS: Record<string, ContextualCrossLink> = {
  "group-voting-game": {
    prefix: "Prefer a privacy-first explanation?",
    href: "/anonymous-voting-games",
    label: "Explore anonymous voting games",
  },
  "anonymous-voting-game": {
    prefix: "Looking for a broader group format?",
    href: "/group-voting-game",
    label: "Try the group voting game",
  },
};

export function getContextualCrossLink(
  slug: string,
): ContextualCrossLink | undefined {
  return CONTEXTUAL_CROSS_LINKS[slug];
}
