import { ENTITY_REGISTRY } from "@/lib/entities/entity-registry";
import { getEntityNavigationChips } from "@/lib/entities/entity-navigation";
import { isValidNavigationTarget } from "@/lib/entities/entity-targets";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { getHubDefinition, getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const entityIds = new Set(ENTITY_REGISTRY.map((entity) => entity.id));
const entitySlugs = new Set(ENTITY_REGISTRY.map((entity) => entity.slug));

const hubSlugs = new Set(
  getAllHubDefinitions().flatMap((hub) => [hub.id, hub.slug]),
);

/** Development-time validation for the entity registry. */
export function validateEntityRegistry(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const seenIds = new Map<string, number>();
  const seenSlugs = new Map<string, number>();

  for (const entity of ENTITY_REGISTRY) {
    seenIds.set(entity.id, (seenIds.get(entity.id) ?? 0) + 1);
    seenSlugs.set(entity.slug, (seenSlugs.get(entity.slug) ?? 0) + 1);

    if (!entity.name.trim()) {
      issues.push(
        issue(
          "entity.missing_name",
          "error",
          "Entity is missing a name.",
          entity.id,
        ),
      );
    }

    if (!entity.description.trim()) {
      issues.push(
        issue(
          "entity.missing_description",
          "error",
          "Entity is missing a description.",
          entity.id,
        ),
      );
    }

    for (const relatedId of entity.relatedEntities ?? []) {
      if (!entityIds.has(relatedId)) {
        issues.push(
          issue(
            "entity.invalid_related_entity",
            "error",
            `relatedEntities references unknown entity "${relatedId}".`,
            entity.id,
          ),
        );
      }
    }

    for (const hubRef of entity.relatedTopicHubs ?? []) {
      if (!getHubDefinition(hubRef)) {
        issues.push(
          issue(
            "entity.invalid_related_hub",
            "error",
            `relatedTopicHubs references unknown hub "${hubRef}".`,
            entity.id,
          ),
        );
      }
    }

    for (const landingSlug of entity.relatedLandingPages ?? []) {
      if (hubSlugs.has(landingSlug)) {
        issues.push(
          issue(
            "entity.hub_slug_in_landing_pages",
            "error",
            `relatedLandingPages must use landing page slugs, not hub slug "${landingSlug}". Use relatedTopicHubs instead.`,
            entity.id,
          ),
        );
        continue;
      }

      const intent = getIntentBySlug(landingSlug);
      if (!intent) {
        issues.push(
          issue(
            "entity.invalid_related_landing_page",
            "error",
            `relatedLandingPages references unknown slug "${landingSlug}".`,
            entity.id,
          ),
        );
      } else if (intent.status !== "live") {
        issues.push(
          issue(
            "entity.planned_related_landing_page",
            "warning",
            `relatedLandingPages references planned slug "${landingSlug}".`,
            entity.id,
          ),
        );
      }
    }

    for (const alias of entity.aliases ?? []) {
      if (entitySlugs.has(alias) && alias !== entity.slug) {
        issues.push(
          issue(
            "entity.alias_slug_conflict",
            "warning",
            `Alias "${alias}" conflicts with another entity slug.`,
            entity.id,
          ),
        );
      }
    }

    const chips = getEntityNavigationChips([entity]);
    const navigationChip = chips[0];

    if (navigationChip.clickable && navigationChip.href) {
      if (!isValidNavigationTarget(navigationChip.href)) {
        issues.push(
          issue(
            "entity.broken_chip_href",
            "error",
            `Resolved chip href "${navigationChip.href}" is not a live route.`,
            entity.id,
          ),
        );
      }
    } else if (
      (entity.relatedLandingPages?.length ?? 0) > 0 ||
      (entity.relatedTopicHubs?.length ?? 0) > 0
    ) {
      issues.push(
        issue(
          "entity.unresolved_chip_target",
          "warning",
          "Entity has related routes configured but no clickable chip target.",
          entity.id,
        ),
      );
    }
  }

  for (const [id, count] of seenIds.entries()) {
    if (count > 1) {
      issues.push(
        issue(
          "entity.duplicate_id",
          "error",
          `Duplicate entity id "${id}" appears ${count} times.`,
          id,
        ),
      );
    }
  }

  for (const [slug, count] of seenSlugs.entries()) {
    if (count > 1) {
      issues.push(
        issue(
          "entity.duplicate_slug",
          "error",
          `Duplicate entity slug "${slug}" appears ${count} times.`,
          slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
