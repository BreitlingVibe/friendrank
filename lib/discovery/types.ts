export type CategoryHubStatus = "seed" | "planned" | "live";

export type DiscoveryLinkKind =
  | "pillar"
  | "category"
  | "evergreen"
  | "game-creation"
  | "profile";

export type DiscoveryLink = {
  slug: string;
  title: string;
  href: string;
  description?: string;
  available: boolean;
  kind: DiscoveryLinkKind;
};

export type CategoryDefinition = {
  slug: string;
  title: string;
  description: string;
  /** Evergreen pillar slug, e.g. friend-games */
  parentPillar: string;
  primaryKeywords: readonly string[];
  relatedCategorySlugs: readonly string[];
  relatedEvergreenSlugs: readonly string[];
  status: CategoryHubStatus;
};

export type PillarDefinition = {
  slug: string;
  title: string;
  description: string;
};

export type DiscoveryPageContext =
  | { type: "category"; slug: string }
  | { type: "evergreen"; slug: string }
  | { type: "pillar"; slug: string };

export type RelatedContent = {
  context: DiscoveryPageContext;
  relatedPillar: DiscoveryLink | null;
  relatedCategories: DiscoveryLink[];
  relatedEvergreenPages: DiscoveryLink[];
  recommendedNextPages: DiscoveryLink[];
  gameEntryPoint: DiscoveryLink;
};

/** Ordered groups for connected discovery UI and utilities. */
export type OrderedDiscoveryRecommendations = {
  /** Same-cluster or registry sibling evergreen pages (excludes current page). */
  siblingPages: DiscoveryLink[];
  parentPillar: DiscoveryLink | null;
  relatedCategories: DiscoveryLink[];
  relatedGames: DiscoveryLink[];
  gameEntryPoint: DiscoveryLink;
};

export type CategoryHubFaqItem = {
  question: string;
  answer: string;
};

export type CategoryHubContentItem = {
  title: string;
  description: string;
};

export type CategoryHubContentSection = {
  title: string;
  items: readonly CategoryHubContentItem[];
};

export type CategoryHubContent = {
  /** Short opening copy — typically 120–180 words across a few paragraphs. */
  introduction: readonly string[];
  useCases?: CategoryHubContentSection;
  benefits?: CategoryHubContentSection;
  faq: readonly CategoryHubFaqItem[];
  ctaLabel?: string;
  ctaAriaLabel?: string;
  metaTitle?: string;
  metaDescription?: string;
  schemaDescription?: string;
  /** Primary discovery section heading when games and articles are merged. */
  exploreGamesTitle?: string;
  /** Secondary discovery section heading when distinct pages remain. */
  additionalPagesTitle?: string;
  /** Optional H1 override; defaults to category.title when omitted. */
  heroTitle?: string;
};

export type CategoryHubViewModel = {
  category: CategoryDefinition;
  content: CategoryHubContent;
  related: RelatedContent;
};
