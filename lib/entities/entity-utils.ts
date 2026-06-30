import {
  CLUSTER_FORMAT_ENTITY_MAP,
  ENTITY_REGISTRY,
  ENTITY_SIGNAL_PATTERNS,
  HUB_ENTITY_BOOSTS,
  INTENT_CATEGORY_ENTITY_MAP,
  type EntityDefinition,
  type EntityType,
} from "@/lib/entities/entity-registry";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import {
  resolveEntityNavigationTarget,
  type EntityLinkKind,
} from "@/lib/entities/entity-targets";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { collectHubMemberSlugs } from "@/lib/topic-hubs/hub-utils";

export type LandingPageEntityRef = {
  id: string;
  slug: string;
  name: string;
  entityType: EntityType;
  description: string;
  href: string | null;
  clickable: boolean;
  linkKind: EntityLinkKind | null;
};

export type LandingPageEntities = {
  primaryEntities: LandingPageEntityRef[];
  secondaryEntities: LandingPageEntityRef[];
  relatedEntities: LandingPageEntityRef[];
};

const entityById = new Map(ENTITY_REGISTRY.map((entity) => [entity.id, entity]));
const entityBySlug = new Map(
  ENTITY_REGISTRY.map((entity) => [entity.slug, entity]),
);

let slugToHubIdsCache: Map<string, string[]> | null = null;

function getTopicHubIdsForSlug(slug: string): string[] {
  if (!slugToHubIdsCache) {
    slugToHubIdsCache = new Map<string, string[]>();

    for (const hub of getAllHubDefinitions()) {
      for (const memberSlug of collectHubMemberSlugs(hub)) {
        const existing = slugToHubIdsCache.get(memberSlug) ?? [];
        if (!existing.includes(hub.id)) {
          existing.push(hub.id);
        }
        slugToHubIdsCache.set(memberSlug, existing);
      }
    }
  }

  return slugToHubIdsCache.get(slug) ?? [];
}

const MAX_PRIMARY = 3;
const MAX_SECONDARY = 4;
const MAX_CHIP_ENTITIES = 7;

function toEntityRef(entity: EntityDefinition): LandingPageEntityRef {
  const target = resolveEntityNavigationTarget(entity);

  return {
    id: entity.id,
    slug: entity.slug,
    name: entity.name,
    entityType: entity.entityType,
    description: entity.description,
    href: target.href,
    clickable: target.clickable,
    linkKind: target.linkKind,
  };
}

/** Returns an entity by id from the registry. */
export function getEntity(id: string): EntityDefinition | undefined {
  return entityById.get(id);
}

/** Returns an entity by slug from the registry. */
export function getEntityBySlug(slug: string): EntityDefinition | undefined {
  return entityBySlug.get(slug);
}

/** Returns all entities in the registry. */
export function getAllEntities(): EntityDefinition[] {
  return ENTITY_REGISTRY;
}

/** Returns related entities declared on an entity definition. */
export function getRelatedEntities(entityId: string): EntityDefinition[] {
  const entity = getEntity(entityId);
  if (!entity?.relatedEntities?.length) {
    return [];
  }

  return entity.relatedEntities
    .map((relatedId) => getEntity(relatedId))
    .filter((item): item is EntityDefinition => item !== undefined);
}

/** Returns keywords for an entity. */
export function getEntityKeywords(entityId: string): string[] {
  return getEntity(entityId)?.keywords ?? [];
}

/** Returns aliases for an entity. */
export function getEntityAliases(entityId: string): string[] {
  return getEntity(entityId)?.aliases ?? [];
}

function scoreEntitiesForSlug(slug: string): Map<string, number> {
  const scores = new Map<string, number>();
  const intent = getIntentBySlug(slug);

  if (!intent) {
    return scores;
  }

  const combined = `${intent.audience} ${intent.searchIntent} ${intent.title} ${slug}`;

  const boost = (entityId: string, weight: number) => {
    if (getEntity(entityId)) {
      scores.set(entityId, (scores.get(entityId) ?? 0) + weight);
    }
  };

  for (const entityId of INTENT_CATEGORY_ENTITY_MAP[intent.intentCategory] ?? []) {
    boost(entityId, 12);
  }

  for (const cluster of getClustersBySlug(slug)) {
    for (const entityId of CLUSTER_FORMAT_ENTITY_MAP[cluster.id] ?? []) {
      boost(entityId, 14);
    }
  }

  for (const hubId of getTopicHubIdsForSlug(slug)) {
    for (const entityId of HUB_ENTITY_BOOSTS[hubId] ?? []) {
      boost(entityId, 8);
    }
  }

  for (const signal of ENTITY_SIGNAL_PATTERNS) {
    if (signal.patterns.some((pattern) => pattern.test(combined))) {
      boost(signal.entityId, signal.weight);
    }
  }

  return scores;
}

function rankedEntityIds(slug: string): string[] {
  return [...scoreEntitiesForSlug(slug).entries()]
    .filter(([, score]) => score > 0)
    .sort((entryA, entryB) => entryB[1] - entryA[1])
    .map(([entityId]) => entityId);
}

/** Resolves primary, secondary, and related entities for a landing page slug. */
export function resolveLandingPageEntities(slug: string): LandingPageEntities {
  const ranked = rankedEntityIds(slug);
  const primaryIds = ranked.slice(0, MAX_PRIMARY);
  const secondaryIds = ranked.slice(MAX_PRIMARY, MAX_PRIMARY + MAX_SECONDARY);

  const primaryEntities = primaryIds
    .map((entityId) => getEntity(entityId))
    .filter((entity): entity is EntityDefinition => entity !== undefined)
    .map(toEntityRef);

  const secondaryEntities = secondaryIds
    .map((entityId) => getEntity(entityId))
    .filter((entity): entity is EntityDefinition => entity !== undefined)
    .map(toEntityRef);

  const seen = new Set([...primaryIds, ...secondaryIds]);
  const relatedIds: string[] = [];

  for (const entityId of [...primaryIds, ...secondaryIds]) {
    for (const related of getRelatedEntities(entityId)) {
      if (!seen.has(related.id) && !relatedIds.includes(related.id)) {
        relatedIds.push(related.id);
      }
    }
  }

  const relatedEntities = relatedIds
    .map((entityId) => getEntity(entityId))
    .filter((entity): entity is EntityDefinition => entity !== undefined)
    .map(toEntityRef);

  return {
    primaryEntities,
    secondaryEntities,
    relatedEntities,
  };
}

/** Entity chips shown below the hero (primary + secondary, deduped). */
export function getEntityChipsForSlug(slug: string): LandingPageEntityRef[] {
  const { primaryEntities, secondaryEntities } = resolveLandingPageEntities(slug);
  const chips: LandingPageEntityRef[] = [];
  const seen = new Set<string>();

  for (const entity of [...primaryEntities, ...secondaryEntities]) {
    if (seen.has(entity.id)) {
      continue;
    }

    seen.add(entity.id);
    chips.push(entity);

    if (chips.length >= MAX_CHIP_ENTITIES) {
      break;
    }
  }

  return chips;
}

/** Returns entity ids associated with a landing page slug. */
export function getEntityIdsForSlug(slug: string): string[] {
  const { primaryEntities, secondaryEntities } = resolveLandingPageEntities(slug);
  return [...primaryEntities, ...secondaryEntities].map((entity) => entity.id);
}

/** True when two slugs share at least one resolved entity. */
export function sharesEntity(slugA: string, slugB: string): boolean {
  const idsA = new Set(getEntityIdsForSlug(slugA));
  return getEntityIdsForSlug(slugB).some((entityId) => idsA.has(entityId));
}

/** Shared entity ids between two landing page slugs. */
export function getSharedEntityIds(slugA: string, slugB: string): string[] {
  const idsA = new Set(getEntityIdsForSlug(slugA));
  return getEntityIdsForSlug(slugB).filter((entityId) => idsA.has(entityId));
}
