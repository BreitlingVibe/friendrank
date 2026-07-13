export {
  CATEGORY_HUB_ROUTE_PREFIX,
  CATEGORY_REGISTRY,
  PILLAR_REGISTRY,
  getAllCategories,
  getAllPillars,
  getCategoriesByPillar,
  getCategoryBySlug,
  getCategoryHubPath,
  getLiveCategories,
  getPillarBySlug,
  isCategoryHubLive,
} from "@/lib/discovery/category-registry";

export { getCategoryHubContent, CATEGORY_HUB_CONTENT } from "@/lib/discovery/category-hub-content";

export {
  buildCategoryHubMetadata,
  buildCategoryHubViewModel,
  CategoryHubPage,
} from "@/lib/discovery/category-hub-page";

export {
  findCategoriesForEvergreenPage,
  findCategoriesForPillar,
  getGameEntryPoint,
  getParentPillar,
  getRecommendedNextPage,
  getRelatedCategories,
  getRelatedPages,
  getSiblingCategories,
} from "@/lib/discovery/discovery-utils";

export {
  getRelatedContent,
  getRelatedContentForCategory,
  getRelatedContentForSlug,
  EVERGREEN_HUB_PARENT_PILLAR,
} from "@/lib/discovery/related-content";

export {
  getOrderedRecommendations,
  getOrderedRecommendationsForSlug,
  getLiveCategoriesForPillar,
  isPillarSlug,
} from "@/lib/discovery/ordered-recommendations";

export { validateCategoryRegistry } from "@/lib/discovery/validate-category-registry";

export {
  dedupeDiscoveryLinks,
  excludeDiscoverySlug,
  excludeDiscoverySlugs,
  getDiscoveryLinkKey,
} from "@/lib/discovery/link-utils";

export type {
  CategoryDefinition,
  CategoryHubContent,
  CategoryHubContentItem,
  CategoryHubContentSection,
  CategoryHubFaqItem,
  CategoryHubStatus,
  CategoryHubViewModel,
  DiscoveryLink,
  DiscoveryLinkKind,
  DiscoveryPageContext,
  OrderedDiscoveryRecommendations,
  PillarDefinition,
  RelatedContent,
} from "@/lib/discovery/types";
