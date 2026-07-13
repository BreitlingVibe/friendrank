/** Reusable presentation copy and helpers for category hub templates. */

export function buildCategoryHubParentSectionTitle(pillarTitle: string): string {
  return `Explore more ${pillarTitle}`;
}

export const CATEGORY_HUB_UI = {
  introTitle: "About this category",
  faqTitle: "Frequently asked questions",
  ctaTitle: "Ready to play?",
  ctaSubtitle:
    "Create a free game, share one link, and play together from any phone.",
  exploreGamesExplanation: "Games and guides you can play in this category.",
  additionalPagesExplanation: "More pages worth exploring in this category.",
  relatedCategoriesTitle: "Explore related categories",
} as const;
