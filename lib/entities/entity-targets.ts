import {
  ENTITY_TYPES,
  type EntityDefinition,
  type EntityType,
} from "@/lib/entities/entity-registry";
import { getAllEvergreenHubs } from "@/lib/evergreen-hubs/registry";
import { getLiveIntents } from "@/lib/landing-pages/planning/intent-registry";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";

export type EntityLinkKind = "hub" | "landing";

export type EntityNavigationTarget = {
  href: string | null;
  clickable: boolean;
  linkKind: EntityLinkKind | null;
};

const BROAD_TOPIC_TYPES: EntityType[] = [
  ENTITY_TYPES.PARTY,
  ENTITY_TYPES.WORK,
  ENTITY_TYPES.ICEBREAKER,
  ENTITY_TYPES.RELATIONSHIP,
  ENTITY_TYPES.EDUCATION,
  ENTITY_TYPES.FAMILY,
  ENTITY_TYPES.HOLIDAY,
];

let liveLandingSlugSet: Set<string> | null = null;
let hubSlugSet: Set<string> | null = null;
let evergreenHubSlugSet: Set<string> | null = null;

function getLiveLandingSlugSet(): Set<string> {
  if (!liveLandingSlugSet) {
    liveLandingSlugSet = new Set(
      getLiveIntents().map((intent) => intent.slug),
    );
  }

  return liveLandingSlugSet;
}

function getEvergreenHubSlugSet(): Set<string> {
  if (!evergreenHubSlugSet) {
    evergreenHubSlugSet = new Set(
      getAllEvergreenHubs().map((hub) => hub.slug),
    );
  }

  return evergreenHubSlugSet;
}

function isEvergreenHubSlug(slug: string): boolean {
  return getEvergreenHubSlugSet().has(slug);
}

function getHubSlugSet(): Set<string> {
  if (!hubSlugSet) {
    hubSlugSet = new Set(getAllHubDefinitions().map((hub) => hub.slug));
  }

  return hubSlugSet;
}

function isLiveLandingSlug(slug: string): boolean {
  return getLiveLandingSlugSet().has(slug);
}

function isHubSlug(slug: string): boolean {
  return getHubSlugSet().has(slug);
}

/** True when href points to a live landing page, topic hub, or evergreen hub route. */
export function isValidNavigationTarget(href: string | null): boolean {
  if (!href || !href.startsWith("/") || href.startsWith("//")) {
    return false;
  }

  const slug = href.replace(/^\//, "").split("/")[0];
  if (!slug) {
    return false;
  }

  return isLiveLandingSlug(slug) || isHubSlug(slug) || isEvergreenHubSlug(slug);
}

function resolveHubHref(hubSlug: string): EntityNavigationTarget | null {
  if (!isHubSlug(hubSlug) && !isEvergreenHubSlug(hubSlug)) {
    return null;
  }

  return {
    href: `/${hubSlug}`,
    clickable: true,
    linkKind: "hub",
  };
}

function resolveLandingHref(landingSlug: string): EntityNavigationTarget | null {
  if (!isLiveLandingSlug(landingSlug)) {
    return null;
  }

  return {
    href: `/${landingSlug}`,
    clickable: true,
    linkKind: "landing",
  };
}

/** Resolves a safe navigation target for an entity. */
export function resolveEntityNavigationTarget(
  entity: EntityDefinition,
): EntityNavigationTarget {
  const preferHub = BROAD_TOPIC_TYPES.includes(entity.entityType);

  if (preferHub) {
    for (const hubSlug of entity.relatedTopicHubs ?? []) {
      const target = resolveHubHref(hubSlug);
      if (target) {
        return target;
      }
    }
  }

  for (const landingSlug of entity.relatedLandingPages ?? []) {
    const target = resolveLandingHref(landingSlug);
    if (target) {
      return target;
    }
  }

  if (!preferHub) {
    for (const hubSlug of entity.relatedTopicHubs ?? []) {
      const target = resolveHubHref(hubSlug);
      if (target) {
        return target;
      }
    }
  }

  return {
    href: null,
    clickable: false,
    linkKind: null,
  };
}
