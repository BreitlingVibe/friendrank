import {
  ENTITY_TYPES,
  type EntityDefinition,
  type EntityType,
} from "@/lib/entities/entity-registry";
import {
  getEntity,
  getRelatedEntities,
  type LandingPageEntityRef,
} from "@/lib/entities/entity-utils";

const TOPIC_ENTITY_TYPES: EntityType[] = [
  ENTITY_TYPES.GAME_FORMAT,
  ENTITY_TYPES.PARTY,
  ENTITY_TYPES.ICEBREAKER,
  ENTITY_TYPES.RELATIONSHIP,
  ENTITY_TYPES.WORK,
  ENTITY_TYPES.EDUCATION,
  ENTITY_TYPES.FAMILY,
  ENTITY_TYPES.HOLIDAY,
];

const AUDIENCE_ENTITY_TYPE = ENTITY_TYPES.AUDIENCE;
const OCCASION_ENTITY_TYPE = ENTITY_TYPES.OCCASION;

function uniqueEntities(entities: EntityDefinition[]): EntityDefinition[] {
  const seen = new Set<string>();
  const result: EntityDefinition[] = [];

  for (const entity of entities) {
    if (seen.has(entity.id)) {
      continue;
    }

    seen.add(entity.id);
    result.push(entity);
  }

  return result;
}

function collectRelatedByType(
  sourceEntityId: string,
  entityType: EntityType,
): EntityDefinition[] {
  const source = getEntity(sourceEntityId);
  if (!source) {
    return [];
  }

  const matches = getRelatedEntities(sourceEntityId).filter(
    (entity) => entity.entityType === entityType,
  );

  if (TOPIC_ENTITY_TYPES.includes(entityType) && source.entityType === entityType) {
    matches.unshift(source);
  }

  if (source.entityType === entityType && !matches.some((item) => item.id === source.id)) {
    matches.unshift(source);
  }

  return uniqueEntities(matches);
}

/** Related topic/format entities from registry relationships. */
export function getRelatedTopics(entityId: string): EntityDefinition[] {
  const source = getEntity(entityId);
  if (!source) {
    return [];
  }

  const topics = getRelatedEntities(entityId).filter((entity) =>
    TOPIC_ENTITY_TYPES.includes(entity.entityType),
  );

  if (TOPIC_ENTITY_TYPES.includes(source.entityType)) {
    topics.unshift(source);
  }

  return uniqueEntities(topics);
}

/** Related audience entities from registry relationships. */
export function getRelatedAudiences(entityId: string): EntityDefinition[] {
  return collectRelatedByType(entityId, AUDIENCE_ENTITY_TYPE);
}

/** Related occasion entities from registry relationships. */
export function getRelatedOccasions(entityId: string): EntityDefinition[] {
  return collectRelatedByType(entityId, OCCASION_ENTITY_TYPE);
}

/** Sibling entities that share a related entity or hub with the source. */
export function getSiblingEntities(entityId: string): EntityDefinition[] {
  const source = getEntity(entityId);
  if (!source) {
    return [];
  }

  const siblings: EntityDefinition[] = [];
  const seen = new Set<string>([entityId]);

  for (const related of getRelatedEntities(entityId)) {
    for (const sibling of getRelatedEntities(related.id)) {
      if (seen.has(sibling.id)) {
        continue;
      }

      seen.add(sibling.id);
      siblings.push(sibling);
    }
  }

  if (source.relatedTopicHubs?.length) {
    for (const entity of getRelatedEntities(entityId)) {
      const sharedHub = entity.relatedTopicHubs?.some((hubId) =>
        source.relatedTopicHubs?.includes(hubId),
      );

      if (sharedHub && !seen.has(entity.id)) {
        seen.add(entity.id);
        siblings.push(entity);
      }
    }
  }

  return siblings;
}

function audiencePhrase(entity: EntityDefinition | LandingPageEntityRef): string {
  if (entity.entityType === ENTITY_TYPES.AUDIENCE) {
    return entity.name.toLowerCase();
  }

  return "groups who want a quick social game";
}

function occasionPhrase(entity: EntityDefinition | LandingPageEntityRef): string | null {
  if (entity.entityType === ENTITY_TYPES.OCCASION) {
    return entity.name.toLowerCase();
  }

  return null;
}

/** Concise 2–3 sentence summary for AI retrieval and structured data reuse. */
export function buildEntitySummary(
  entity: EntityDefinition | LandingPageEntityRef,
): string {
  const what = `${entity.name} is ${entity.description.charAt(0).toLowerCase()}${entity.description.slice(1)}`;
  const who = `It is designed for ${audiencePhrase(entity)}.`;
  const occasion = occasionPhrase(entity);
  const when = occasion
    ? `Use it for ${occasion} when you want a fast phone game with anonymous voting.`
    : "Use it when you want a fast phone game with anonymous voting and shared results.";

  return `${what} ${who} ${when}`;
}
