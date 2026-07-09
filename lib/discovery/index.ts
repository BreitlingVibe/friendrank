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
} from "@/lib/discovery/related-content";

export type {
  CategoryDefinition,
  CategoryHubContent,
  CategoryHubFaqItem,
  CategoryHubStatus,
  CategoryHubViewModel,
  DiscoveryLink,
  DiscoveryLinkKind,
  DiscoveryPageContext,
  PillarDefinition,
  RelatedContent,
} from "@/lib/discovery/types";
