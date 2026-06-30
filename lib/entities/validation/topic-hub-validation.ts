import { getHubAuthorityPanel } from "@/lib/entities/entity-authority";
import { getEntityNavigationForHub } from "@/lib/entities/entity-navigation";
import { getEntity } from "@/lib/entities/entity-utils";
import { isValidNavigationTarget } from "@/lib/entities/entity-targets";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

/** Validates entity navigation and authority for one topic hub. */
export function validateTopicHubEntities(hubId: string): ValidationResult {
  const issues: ValidationIssue[] = [];
  const hub = getAllHubDefinitions().find((entry) => entry.id === hubId);

  if (!hub) {
    return createValidationResult([
      issue(
        "hub.unknown_hub",
        "error",
        `Unknown hub id "${hubId}".`,
        hubId,
      ),
    ]);
  }

  const navigation = getEntityNavigationForHub(hubId);
  const authorityPanel = getHubAuthorityPanel(hubId);

  if (navigation.groups.length === 0) {
    issues.push(
      issue(
        "hub.empty_entity_navigation",
        "warning",
        "Topic hub entity navigation has no groups.",
        hubId,
      ),
    );
  }

  for (const group of navigation.groups) {
    if (group.chips.length === 0) {
      issues.push(
        issue(
          "hub.empty_navigation_group",
          "warning",
          `Entity navigation group "${group.groupKey}" is empty.`,
          hubId,
        ),
      );
    }

    const seen = new Set<string>();

    for (const chip of group.chips) {
      if (!getEntity(chip.id)) {
        issues.push(
          issue(
            "hub.invalid_entity_reference",
            "error",
            `Entity navigation chip references unknown entity "${chip.id}".`,
            hubId,
          ),
        );
      }

      if (seen.has(chip.id)) {
        issues.push(
          issue(
            "hub.duplicate_chip",
            "error",
            `Duplicate entity chip "${chip.id}" in group "${group.groupKey}".`,
            hubId,
          ),
        );
      }

      seen.add(chip.id);

      if (chip.clickable && chip.href && !isValidNavigationTarget(chip.href)) {
        issues.push(
          issue(
            "hub.broken_chip_href",
            "error",
            `Entity chip "${chip.id}" links to invalid route "${chip.href}".`,
            hubId,
          ),
        );
      }
    }
  }

  if (authorityPanel.bullets.length === 0) {
    issues.push(
      issue(
        "hub.empty_authority_panel",
        "warning",
        "Hub authority panel has no bullets.",
        hubId,
      ),
    );
  }

  return createValidationResult(issues);
}

/** Validates entity navigation for all topic hubs. */
export function validateAllTopicHubEntities(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const hub of getAllHubDefinitions()) {
    issues.push(...validateTopicHubEntities(hub.id).issues);
  }

  return createValidationResult(issues);
}
