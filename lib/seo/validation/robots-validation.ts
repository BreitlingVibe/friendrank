import fs from "node:fs";
import path from "node:path";
import robots from "@/app/robots";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { getFilesystemRouteSlugs } from "@/lib/seo/validation/route-validation";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const ROBOTS_PATH = path.join(process.cwd(), "app", "robots.ts");
const EXPECTED_SITEMAP = `${PRODUCTION_APP_URL}/sitemap.xml`;

/** Validates robots.txt readiness for public indexing. */
export function validateRobotsReadiness(): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!fs.existsSync(ROBOTS_PATH)) {
    issues.push(
      issue(
        "robots.missing_file",
        "error",
        "app/robots.ts is missing.",
      ),
    );
    return createValidationResult(issues);
  }

  const config = robots();
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
  const sitemap = Array.isArray(config.sitemap)
    ? config.sitemap
    : config.sitemap
      ? [config.sitemap]
      : [];

  if (!sitemap.includes(EXPECTED_SITEMAP)) {
    issues.push(
      issue(
        "robots.missing_sitemap_reference",
        "error",
        `robots.txt must reference ${EXPECTED_SITEMAP}.`,
      ),
    );
  }

  for (const rule of rules) {
    if (!rule) {
      continue;
    }

    const disallow = Array.isArray(rule.disallow)
      ? rule.disallow
      : rule.disallow
        ? [rule.disallow]
        : [];

    if (disallow.includes("/")) {
      issues.push(
        issue(
          "robots.blocks_entire_site",
          "error",
          "robots.txt disallows the entire site.",
        ),
      );
    }

    for (const pattern of disallow) {
      if (pattern === "/game" || pattern === "/game/") {
        continue;
      }

      for (const slug of getFilesystemRouteSlugs()) {
        if (pattern === `/${slug}` || pattern === `/${slug}/`) {
          issues.push(
            issue(
              "robots.blocks_public_route",
              "error",
              `robots.txt disallows public route "/${slug}".`,
              slug,
            ),
          );
        }
      }
    }

    const allow = Array.isArray(rule.allow)
      ? rule.allow
      : rule.allow
        ? [rule.allow]
        : [];

    if (allow.length === 0) {
      issues.push(
        issue(
          "robots.no_allow_rule",
          "warning",
          "robots.txt has no explicit allow rule for public pages.",
        ),
      );
    }
  }

  return createValidationResult(issues);
}
