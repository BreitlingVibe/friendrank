import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  ENTITY_TYPES,
  type EntityType,
} from "@/lib/entities/entity-registry";
import { getEntityNavigationForHub } from "@/lib/entities/entity-navigation";
import {
  getEntity,
  getSharedEntityIds,
  resolveLandingPageEntities,
  type LandingPageEntityRef,
} from "@/lib/entities/entity-utils";
import { getHubDefinition } from "@/lib/topic-hubs/hub-registry";

export type EntityAuthorityBullet = {
  text: string;
};

export type EntityAuthorityPanel = {
  title: string;
  bullets: EntityAuthorityBullet[];
};

export type RelatedSectionExplanations = {
  relatedPages?: string;
  playersAlsoEnjoy?: string;
  youMayAlsoLike?: string;
  popularSearches?: string;
};

const TOPIC_ENTITY_TYPES: EntityType[] = [
  ENTITY_TYPES.PARTY,
  ENTITY_TYPES.ICEBREAKER,
  ENTITY_TYPES.RELATIONSHIP,
  ENTITY_TYPES.WORK,
  ENTITY_TYPES.EDUCATION,
  ENTITY_TYPES.FAMILY,
  ENTITY_TYPES.HOLIDAY,
];

const UNIVERSAL_AUTHORITY_BULLETS = [
  "Easy to play from any phone",
  "Uses anonymous voting",
  "Easy to share with one link",
] as const;

const MIN_BULLETS = 3;
const MAX_BULLETS = 5;

function joinNaturalList(items: string[]): string {
  if (items.length === 0) {
    return "";
  }

  if (items.length === 1) {
    return items[0];
  }

  if (items.length === 2) {
    return `${items[0]} and ${items[1]}`;
  }

  return `${items.slice(0, -1).join(", ")}, and ${items.at(-1)}`;
}

function lowercaseNames(entities: LandingPageEntityRef[], limit: number): string[] {
  return entities.slice(0, limit).map((entity) => entity.name.toLowerCase());
}

function resolveAuthorityTitle(entities: LandingPageEntityRef[]): string {
  const hasGroupSignal = entities.some(
    (entity) =>
      entity.entityType === ENTITY_TYPES.AUDIENCE ||
      entity.entityType === ENTITY_TYPES.OCCASION ||
      entity.entityType === ENTITY_TYPES.WORK ||
      entity.id === "teams",
  );

  return hasGroupSignal ? "Why this fits" : "Why this game works for this group";
}

function buildLandingAuthorityBullets(
  entities: LandingPageEntityRef[],
): EntityAuthorityBullet[] {
  const bullets: string[] = [];
  const audiences = entities.filter(
    (entity) => entity.entityType === ENTITY_TYPES.AUDIENCE,
  );
  const occasions = entities.filter(
    (entity) => entity.entityType === ENTITY_TYPES.OCCASION,
  );
  const formats = entities.filter(
    (entity) => entity.entityType === ENTITY_TYPES.GAME_FORMAT,
  );
  const topics = entities.filter((entity) =>
    TOPIC_ENTITY_TYPES.includes(entity.entityType),
  );

  if (audiences.length === 1) {
    bullets.push(`Built for ${audiences[0].name.toLowerCase()}`);
  } else if (audiences.length > 1) {
    bullets.push(`Works with ${joinNaturalList(lowercaseNames(audiences, 3))}`);
  }

  for (const occasion of occasions.slice(0, 1)) {
    bullets.push(`Works well for ${occasion.name.toLowerCase()}`);
  }

  if (formats.length === 1) {
    bullets.push(`Includes ${formats[0].name.toLowerCase()} gameplay`);
  } else if (formats.length > 1) {
    bullets.push(
      `Includes ${joinNaturalList(lowercaseNames(formats, 2))} gameplay`,
    );
  }

  if (topics.some((entity) => entity.id === "work" || entity.id === "teams")) {
    bullets.push("Good for icebreakers and team bonding");
  }

  if (topics.some((entity) => entity.id === "party")) {
    bullets.push("Great for parties and casual hangouts");
  }

  if (topics.some((entity) => entity.id === "icebreaker")) {
    bullets.push("Helpful for icebreakers and new groups");
  }

  if (topics.some((entity) => entity.id === "relationship" || entity.id === "couples")) {
    bullets.push("Works well for couples and close pairs");
  }

  for (const universalBullet of UNIVERSAL_AUTHORITY_BULLETS) {
    if (bullets.length >= MAX_BULLETS) {
      break;
    }

    if (!bullets.includes(universalBullet)) {
      bullets.push(universalBullet);
    }
  }

  while (bullets.length < MIN_BULLETS) {
    const fallback = UNIVERSAL_AUTHORITY_BULLETS.find(
      (bullet) => !bullets.includes(bullet),
    );
    if (!fallback) {
      break;
    }
    bullets.push(fallback);
  }

  return bullets.slice(0, MAX_BULLETS).map((text) => ({ text }));
}

/** Compact authority panel for a landing page slug. */
export function getLandingPageAuthorityPanel(slug: string): EntityAuthorityPanel {
  const pageEntities = resolveLandingPageEntities(slug);
  const entities = [
    ...pageEntities.primaryEntities,
    ...pageEntities.secondaryEntities,
  ];

  return {
    title: resolveAuthorityTitle(entities),
    bullets: buildLandingAuthorityBullets(entities),
  };
}

/** Natural-language entity summary for a landing page. */
export function buildLandingPageEntitySummary(slug: string): string | null {
  const pageEntities = resolveLandingPageEntities(slug);
  const entities = [
    ...pageEntities.primaryEntities,
    ...pageEntities.secondaryEntities,
  ];

  if (entities.length === 0) {
    return null;
  }

  const ecosystemNames = new Set<string>();

  for (const entity of entities) {
    const registryEntity = getEntity(entity.id);
    for (const hubId of registryEntity?.relatedTopicHubs ?? []) {
      const hub = getHubDefinition(hubId);
      if (hub) {
        ecosystemNames.add(hub.title.toLowerCase());
      }
    }

    if (entity.entityType === ENTITY_TYPES.GAME_FORMAT) {
      ecosystemNames.add(entity.name.toLowerCase());
    }
  }

  const audiences = entities.filter(
    (entity) => entity.entityType === ENTITY_TYPES.AUDIENCE,
  );
  const occasions = entities.filter(
    (entity) => entity.entityType === ENTITY_TYPES.OCCASION,
  );
  const targetGroups = [
    ...lowercaseNames(audiences, 3),
    ...lowercaseNames(occasions, 2),
  ];

  const ecosystemPhrase =
    ecosystemNames.size > 0
      ? `This page is part of ${SITE_NAME}'s ${joinNaturalList([...ecosystemNames].slice(0, 2))} ecosystem.`
      : null;

  const audiencePhrase =
    targetGroups.length > 0
      ? `It is designed for ${joinNaturalList(targetGroups)} that want fast anonymous voting games in the browser.`
      : "It is designed for groups that want fast anonymous voting games in the browser.";

  return ecosystemPhrase ? `${ecosystemPhrase} ${audiencePhrase}` : audiencePhrase;
}

/** Compact authority panel for a topic hub from dominant hub entities. */
export function getHubAuthorityPanel(hubId: string): EntityAuthorityPanel {
  const navigation = getEntityNavigationForHub(hubId);
  const bullets: string[] = [];

  const audiences =
    navigation.groups.find((group) => group.groupKey === "audiences")?.chips ??
    [];
  const formats =
    navigation.groups.find((group) => group.groupKey === "formats")?.chips ?? [];
  const occasions =
    navigation.groups.find((group) => group.groupKey === "occasions")?.chips ??
    [];

  if (audiences.length >= 2) {
    bullets.push(
      `Popular with ${joinNaturalList(audiences.slice(0, 4).map((chip) => chip.name.toLowerCase()))}`,
    );
  } else if (audiences.length === 1) {
    bullets.push(`Popular with ${audiences[0].name.toLowerCase()}`);
  }

  if (formats.length >= 2) {
    bullets.push(
      `Includes ${joinNaturalList(formats.slice(0, 3).map((chip) => chip.name.toLowerCase()))}`,
    );
  } else if (formats.length === 1) {
    bullets.push(`Includes ${formats[0].name.toLowerCase()} games`);
  }

  if (occasions.length >= 2) {
    bullets.push(
      `Works for ${joinNaturalList(occasions.slice(0, 3).map((chip) => chip.name.toLowerCase()))}`,
    );
  } else if (occasions.length === 1) {
    bullets.push(`Works for ${occasions[0].name.toLowerCase()}`);
  }

  const topics =
    navigation.groups.find((group) => group.groupKey === "topics")?.chips ?? [];
  if (topics.some((chip) => chip.id === "party")) {
    bullets.push("Works for group chats, parties, and casual hangouts");
  } else if (topics.some((chip) => chip.id === "work")) {
    bullets.push("Works for meetings, onboarding, and team check-ins");
  }

  bullets.push("Works in the browser with no app download");

  return {
    title: "Why these games fit",
    bullets: bullets.slice(0, MAX_BULLETS).map((text) => ({ text })),
  };
}

function rankSharedEntityNames(
  sourceSlug: string,
  candidateSlugs: string[],
): string[] {
  const entityCounts = new Map<string, { name: string; count: number }>();

  for (const candidateSlug of candidateSlugs) {
    for (const entityId of getSharedEntityIds(sourceSlug, candidateSlug)) {
      const entity = getEntity(entityId);
      if (!entity) {
        continue;
      }

      const existing = entityCounts.get(entityId);
      entityCounts.set(entityId, {
        name: entity.name,
        count: (existing?.count ?? 0) + 1,
      });
    }
  }

  return [...entityCounts.values()]
    .filter((entry) => entry.count > 0)
    .sort((entryA, entryB) => entryB.count - entryA.count)
    .map((entry) => entry.name);
}

/** Short explanation for why a related section appears. */
export function buildRelatedTopicsExplanation(
  sourceSlug: string,
  candidateSlugs: string[],
): string | null {
  if (candidateSlugs.length === 0) {
    return null;
  }

  const rankedNames = rankSharedEntityNames(sourceSlug, candidateSlugs);

  if (rankedNames.length === 0) {
    return null;
  }

  if (rankedNames.length === 1) {
    return `Related because these games share the ${rankedNames[0]} topic.`;
  }

  if (rankedNames.length === 2) {
    return `Related because these games share the ${rankedNames[0]} and ${rankedNames[1]} topics.`;
  }

  const leading = rankedNames.slice(0, -1).join(", ");
  const last = rankedNames.at(-1);
  return `Related because this page connects ${leading}, and ${last}.`;
}

/** Builds relationship explanations for landing page recommendation sections. */
export function buildRelatedSectionExplanations(
  sourceSlug: string,
  sections: {
    relatedPages: string[];
    playersAlsoEnjoy: string[];
    youMayAlsoLike: string[];
    popularSearches: string[];
  },
): RelatedSectionExplanations {
  return {
    relatedPages: buildRelatedTopicsExplanation(
      sourceSlug,
      sections.relatedPages,
    ) ?? undefined,
    playersAlsoEnjoy: buildRelatedTopicsExplanation(
      sourceSlug,
      sections.playersAlsoEnjoy,
    ) ?? undefined,
    youMayAlsoLike: buildRelatedTopicsExplanation(
      sourceSlug,
      sections.youMayAlsoLike,
    ) ?? undefined,
    popularSearches: buildRelatedTopicsExplanation(
      sourceSlug,
      sections.popularSearches.filter((slug) => slug.length > 0),
    ) ?? undefined,
  };
}

/** Lightweight authority alignment boost for recommendation ranking. */
export function scoreEntityAuthorityAlignment(
  sourceSlug: string,
  candidateSlug: string,
): number {
  const sourceEntities = resolveLandingPageEntities(sourceSlug);
  const candidateEntities = resolveLandingPageEntities(candidateSlug);

  const sourcePrimaryIds = new Set(
    sourceEntities.primaryEntities.map((entity) => entity.id),
  );
  const sourceSecondaryIds = new Set(
    sourceEntities.secondaryEntities.map((entity) => entity.id),
  );

  let score = 0;

  for (const entity of candidateEntities.primaryEntities) {
    if (sourcePrimaryIds.has(entity.id)) {
      score += 6;
    } else if (sourceSecondaryIds.has(entity.id)) {
      score += 4;
    }
  }

  for (const entity of candidateEntities.secondaryEntities) {
    if (sourcePrimaryIds.has(entity.id)) {
      score += 3;
    } else if (sourceSecondaryIds.has(entity.id)) {
      score += 2;
    }
  }

  return Math.min(score, 10);
}
