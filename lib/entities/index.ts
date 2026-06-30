export {
  ENTITY_REGISTRY,
  ENTITY_TYPES,
  ENTITY_SIGNAL_PATTERNS,
  CLUSTER_FORMAT_ENTITY_MAP,
  INTENT_CATEGORY_ENTITY_MAP,
  HUB_ENTITY_BOOSTS,
  type EntityDefinition,
  type EntityType,
} from "@/lib/entities/entity-registry";

export {
  isValidNavigationTarget,
  resolveEntityNavigationTarget,
  type EntityLinkKind,
  type EntityNavigationTarget,
} from "@/lib/entities/entity-targets";

export {
  getEntity,
  getEntityBySlug,
  getAllEntities,
  getRelatedEntities,
  getEntityKeywords,
  getEntityAliases,
  resolveLandingPageEntities,
  getEntityChipsForSlug,
  getEntityIdsForSlug,
  sharesEntity,
  getSharedEntityIds,
  type LandingPageEntityRef,
  type LandingPageEntities,
} from "@/lib/entities/entity-utils";

export {
  getRelatedTopics,
  getRelatedAudiences,
  getRelatedOccasions,
  getSiblingEntities,
  buildEntitySummary,
} from "@/lib/entities/entity-graph";

export {
  groupEntitiesByType,
  getEntityNavigationChips,
  getEntityNavigationForLandingPage,
  getEntityNavigationForHub,
  flattenEntityNavigation,
  buildHubEntitySemanticLine,
  scoreEntityRelationship,
  type EntityNavigationChip,
  type EntityNavigationGroup,
  type EntityNavigationGroupKey,
  type EntityNavigation,
} from "@/lib/entities/entity-navigation";
