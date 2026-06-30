import {
  ENTITY_TYPES,
  type EntityDefinition,
  type EntityType,
} from "@/lib/entities/entity-registry";
import {
  getRelatedAudiences,
  getRelatedOccasions,
  getRelatedTopics,
  getSiblingEntities,
} from "@/lib/entities/entity-graph";
import {
  resolveEntityNavigationTarget,
  type EntityLinkKind,
} from "@/lib/entities/entity-targets";
import {
  getEntity,
  getEntityIdsForSlug,
  resolveLandingPageEntities,
} from "@/lib/entities/entity-utils";
import { getHubLandingPages } from "@/lib/topic-hubs/hub-engine";

export type EntityNavigationChip = {
  id: string;
  slug: string;
  name: string;
  entityType: EntityType;
  description: string;
  href: string | null;
  clickable: boolean;
  linkKind: EntityLinkKind | null;
};

export type EntityNavigationGroupKey =
  | "audiences"
  | "occasions"
  | "formats"
  | "topics";

export type EntityNavigationGroup = {
  label: string;
  groupKey: EntityNavigationGroupKey;
  chips: EntityNavigationChip[];
};

export type EntityNavigation = {
  title: string;
  groups: EntityNavigationGroup[];
};

const GROUP_LABELS: Record<EntityNavigationGroupKey, string> = {
  audiences: "Related audiences",
  occasions: "Related occasions",
  formats: "Related game formats",
  topics: "Related topics",
};

const MAX_CHIPS_PER_GROUP = 5;
const MAX_HUB_CHIPS_PER_GROUP = 6;

const TOPIC_ENTITY_TYPES: EntityType[] = [
  ENTITY_TYPES.PARTY,
  ENTITY_TYPES.ICEBREAKER,
  ENTITY_TYPES.RELATIONSHIP,
  ENTITY_TYPES.WORK,
  ENTITY_TYPES.EDUCATION,
  ENTITY_TYPES.FAMILY,
  ENTITY_TYPES.HOLIDAY,
];

function uniqueEntityIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const id of ids) {
    if (seen.has(id)) {
      continue;
    }

    seen.add(id);
    result.push(id);
  }

  return result;
}

function getEntityGroupKey(entityType: EntityType): EntityNavigationGroupKey {
  if (entityType === ENTITY_TYPES.AUDIENCE) {
    return "audiences";
  }

  if (entityType === ENTITY_TYPES.OCCASION) {
    return "occasions";
  }

  if (entityType === ENTITY_TYPES.GAME_FORMAT) {
    return "formats";
  }

  return "topics";
}

/** Maps entities into explorer groups by entity type. */
export function groupEntitiesByType(
  entities: EntityDefinition[],
): Record<EntityNavigationGroupKey, EntityDefinition[]> {
  const groups: Record<EntityNavigationGroupKey, EntityDefinition[]> = {
    audiences: [],
    occasions: [],
    formats: [],
    topics: [],
  };

  const seen = new Set<string>();

  for (const entity of entities) {
    if (seen.has(entity.id)) {
      continue;
    }

    seen.add(entity.id);
    groups[getEntityGroupKey(entity.entityType)].push(entity);
  }

  return groups;
}

/** Builds navigation chips with safe link targets. */
export function getEntityNavigationChips(
  entities: EntityDefinition[],
): EntityNavigationChip[] {
  return entities.map((entity) => {
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
  });
}

function buildNavigationGroups(
  scoredIds: Map<string, number>,
  maxPerGroup: number,
): EntityNavigationGroup[] {
  const groupedScores = new Map<EntityNavigationGroupKey, string[]>([
    ["audiences", []],
    ["occasions", []],
    ["formats", []],
    ["topics", []],
  ]);

  for (const [entityId, score] of [...scoredIds.entries()].sort(
    (entryA, entryB) => entryB[1] - entryA[1],
  )) {
    const entity = getEntity(entityId);
    if (!entity) {
      continue;
    }

    const groupKey = getEntityGroupKey(entity.entityType);
    const bucket = groupedScores.get(groupKey) ?? [];
    bucket.push(entityId);
    groupedScores.set(groupKey, bucket);
  }

  const groups: EntityNavigationGroup[] = [];

  for (const groupKey of [
    "audiences",
    "occasions",
    "formats",
    "topics",
  ] as EntityNavigationGroupKey[]) {
    const entityIds = (groupedScores.get(groupKey) ?? []).slice(0, maxPerGroup);
    const entities = entityIds
      .map((entityId) => getEntity(entityId))
      .filter((entity): entity is EntityDefinition => entity !== undefined);

    if (entities.length === 0) {
      continue;
    }

    groups.push({
      label: GROUP_LABELS[groupKey],
      groupKey,
      chips: getEntityNavigationChips(entities),
    });
  }

  return groups;
}

function expandEntityPool(
  seedIds: string[],
  seedScores: Map<string, number>,
): Map<string, number> {
  const scores = new Map(seedScores);

  for (const entityId of seedIds) {
    for (const related of getRelatedAudiences(entityId)) {
      scores.set(related.id, (scores.get(related.id) ?? 0) + 15);
    }

    for (const related of getRelatedOccasions(entityId)) {
      scores.set(related.id, (scores.get(related.id) ?? 0) + 15);
    }

    for (const related of getRelatedTopics(entityId)) {
      scores.set(related.id, (scores.get(related.id) ?? 0) + 12);
    }

    for (const sibling of getSiblingEntities(entityId)) {
      scores.set(sibling.id, (scores.get(sibling.id) ?? 0) + 8);
    }
  }

  return scores;
}

/** Entity explorer navigation for a landing page slug. */
export function getEntityNavigationForLandingPage(slug: string): EntityNavigation {
  const pageEntities = resolveLandingPageEntities(slug);
  const scores = new Map<string, number>();

  pageEntities.primaryEntities.forEach((entity, index) => {
    scores.set(entity.id, 100 - index);
  });
  pageEntities.secondaryEntities.forEach((entity, index) => {
    scores.set(entity.id, (scores.get(entity.id) ?? 0) + 70 - index);
  });
  pageEntities.relatedEntities.forEach((entity, index) => {
    scores.set(entity.id, (scores.get(entity.id) ?? 0) + 50 - index);
  });

  const seedIds = uniqueEntityIds([
    ...pageEntities.primaryEntities.map((entity) => entity.id),
    ...pageEntities.secondaryEntities.map((entity) => entity.id),
  ]);

  const expandedScores = expandEntityPool(seedIds, scores);

  return {
    title: "Explore related topics",
    groups: buildNavigationGroups(expandedScores, MAX_CHIPS_PER_GROUP),
  };
}

/** Entity-aware navigation for a topic hub from its live landing pages. */
export function getEntityNavigationForHub(hubId: string): EntityNavigation {
  const livePages = getHubLandingPages(hubId);
  const scores = new Map<string, number>();

  for (const page of livePages) {
    const pageEntityIds = getEntityIdsForSlug(page.slug);

    pageEntityIds.forEach((entityId, index) => {
      scores.set(entityId, (scores.get(entityId) ?? 0) + 40 - index);
    });
  }

  const seedIds = [...scores.keys()];
  const expandedScores = expandEntityPool(seedIds, scores);

  return {
    title: "Explore by topic",
    groups: buildNavigationGroups(expandedScores, MAX_HUB_CHIPS_PER_GROUP),
  };
}

/** Flat list of explorer chips for structured data. */
export function flattenEntityNavigation(
  navigation: EntityNavigation,
): EntityNavigationChip[] {
  const chips: EntityNavigationChip[] = [];
  const seen = new Set<string>();

  for (const group of navigation.groups) {
    for (const chip of group.chips) {
      if (seen.has(chip.id)) {
        continue;
      }

      seen.add(chip.id);
      chips.push(chip);
    }
  }

  return chips;
}

/** Short hub copy line generated from entity navigation groups. */
export function buildHubEntitySemanticLine(
  hubTitle: string,
  hubId: string,
): string | null {
  const navigation = getEntityNavigationForHub(hubId);
  const chipNames = flattenEntityNavigation(navigation)
    .slice(0, 4)
    .map((chip) => chip.name.toLowerCase());

  if (chipNames.length >= 3) {
    return `Find ${hubTitle.toLowerCase()} for ${chipNames.join(", ")}.`;
  }

  const activeGroups = navigation.groups.filter((group) => group.chips.length > 0);
  if (activeGroups.length === 0) {
    return null;
  }

  const facets = activeGroups
    .map((group) => group.label.replace(/^Related /i, "").toLowerCase())
    .join(", ");

  return `Explore ${hubTitle.toLowerCase()} by ${facets}.`;
}

/** Entity relationship score used by recommendation ranking. */
export function scoreEntityRelationship(
  sourceSlug: string,
  candidateSlug: string,
): number {
  const sourceEntities = resolveLandingPageEntities(sourceSlug);
  const candidateEntities = resolveLandingPageEntities(candidateSlug);

  const sourcePrimary = new Set(sourceEntities.primaryEntities.map((e) => e.id));
  const sourceSecondary = new Set(
    sourceEntities.secondaryEntities.map((e) => e.id),
  );
  const sourceRelated = new Set(sourceEntities.relatedEntities.map((e) => e.id));
  const sourceAll = new Set([
    ...sourcePrimary,
    ...sourceSecondary,
    ...sourceRelated,
  ]);

  let score = 0;

  for (const entity of candidateEntities.primaryEntities) {
    if (sourcePrimary.has(entity.id)) {
      score += 15;
    } else if (sourceSecondary.has(entity.id)) {
      score += 10;
    } else if (sourceRelated.has(entity.id)) {
      score += 8;
    }
  }

  for (const entity of candidateEntities.secondaryEntities) {
    if (sourcePrimary.has(entity.id)) {
      score += 10;
    } else if (sourceSecondary.has(entity.id)) {
      score += 8;
    } else if (sourceRelated.has(entity.id)) {
      score += 6;
    }
  }

  for (const primaryId of sourcePrimary) {
    for (const sibling of getSiblingEntities(primaryId)) {
      if (
        candidateEntities.primaryEntities.some((entity) => entity.id === sibling.id) ||
        candidateEntities.secondaryEntities.some((entity) => entity.id === sibling.id)
      ) {
        score += 6;
      }
    }
  }

  for (const entity of [
    ...candidateEntities.primaryEntities,
    ...candidateEntities.secondaryEntities,
  ]) {
    const registryEntity = getEntity(entity.id);
    if (!registryEntity) {
      continue;
    }

    const hasSameType = [...sourceAll].some((sourceId) => {
      const sourceEntity = getEntity(sourceId);
      return (
        sourceEntity &&
        sourceEntity.entityType === registryEntity.entityType &&
        sourceEntity.id !== registryEntity.id
      );
    });

    if (hasSameType) {
      score += 4;
      break;
    }
  }

  return score;
}
