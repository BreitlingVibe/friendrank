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

export type CategoryHubFaqItem = {
  question: string;
  answer: string;
};

export type CategoryHubContent = {
  introduction: readonly string[];
  faq: readonly CategoryHubFaqItem[];
  ctaLabel?: string;
  ctaAriaLabel?: string;
};

export type CategoryHubViewModel = {
  category: CategoryDefinition;
  content: CategoryHubContent;
  related: RelatedContent;
};
