import { PRODUCTION_APP_URL } from "@/lib/app-url";
import {
  getCategoryHubPath,
  getLiveCategories,
} from "@/lib/discovery/category-registry";
import { getCategoryHubContent } from "@/lib/discovery/category-hub-content";
import { getAllEvergreenHubPages } from "@/lib/evergreen-hubs/registry";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { INTENT_CATEGORIES } from "@/lib/landing-pages/planning/intent-categories";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import type { SnippetPageSnapshot, SnippetPageType } from "@/lib/growth/snippet-optimization/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TITLE } from "@/lib/seo/site-metadata";
import { buildTopicHubMetadata } from "@/lib/seo/page-metadata";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";

function normalizeSlug(slug: string): string {
  return slug.replace(/^\//, "");
}

function deriveAllowedClaims(input: {
  slug: string;
  pageType: SnippetPageType;
  searchIntent: string;
}): string[] {
  const claims = new Set<string>(["free browser game", "no signup required"]);

  if (input.pageType === "homepage") {
    claims.add("create a free game");
    claims.add("group voting");
    return [...claims];
  }

  const intent = getIntentBySlug(input.slug);
  const text = `${input.searchIntent} ${intent?.intentCategory ?? ""} ${input.slug}`.toLowerCase();

  if (text.includes("vot")) {
    claims.add("anonymous voting");
    claims.add("one shared link");
  }

  if (
    intent?.intentCategory === INTENT_CATEGORIES.SOCIAL_VOTING ||
    input.slug.includes("voting")
  ) {
    claims.add("vote from any phone");
    claims.add("shared results reveal");
  }

  if (input.pageType === "evergreen-hub" || input.slug.endsWith("-games")) {
    claims.add("informational guide");
  } else {
    claims.add("playable in browser");
    claims.add("no app download");
  }

  return [...claims];
}

export function resolveSnippetPageSnapshot(slug: string): SnippetPageSnapshot | null {
  const normalized = normalizeSlug(slug);

  const landing = LANDING_PAGES.find((page) => page.slug === normalized);
  if (landing) {
    const intent = getIntentBySlug(normalized);
    return {
      slug: normalized,
      pageUrl: `${PRODUCTION_APP_URL}/${normalized}`,
      pageType: "landing-page",
      currentTitle: landing.metaTitle,
      currentDescription: landing.metaDescription,
      currentH1: landing.h1,
      canonical: landing.canonicalUrl,
      primaryIntent: intent?.searchIntent ?? landing.intentSummary,
      audience: intent?.audience ?? "groups and friends",
      searchIntent: intent?.searchIntent ?? landing.intentSummary,
      allowedClaims: deriveAllowedClaims({
        slug: normalized,
        pageType: "landing-page",
        searchIntent: intent?.searchIntent ?? landing.intentSummary,
      }),
    };
  }

  const evergreen = getAllEvergreenHubPages().find((page) => page.slug === normalized);
  if (evergreen) {
    return {
      slug: normalized,
      pageUrl: evergreen.canonicalUrl,
      pageType: "evergreen-hub",
      currentTitle: evergreen.metaTitle,
      currentDescription: evergreen.metaDescription,
      currentH1: evergreen.title,
      canonical: evergreen.canonicalUrl,
      primaryIntent: evergreen.schemaDescription,
      audience: evergreen.geoFoundation?.audience ?? "groups and friends",
      searchIntent: evergreen.heroLead,
      allowedClaims: deriveAllowedClaims({
        slug: normalized,
        pageType: "evergreen-hub",
        searchIntent: evergreen.heroLead,
      }),
    };
  }

  const category = getLiveCategories().find((entry) => entry.slug === normalized);
  if (category) {
    const content = getCategoryHubContent(normalized);
    const path = getCategoryHubPath(normalized);
    return {
      slug: normalized,
      pageUrl: `${PRODUCTION_APP_URL}${path}`,
      pageType: "category-hub",
      currentTitle: content.metaTitle ?? `${category.title} Games | ${SITE_NAME}`,
      currentDescription: content.metaDescription ?? category.description,
      currentH1: category.title,
      canonical: `${PRODUCTION_APP_URL}${path}`,
      primaryIntent: category.description,
      audience: category.primaryKeywords.join(", "),
      searchIntent: category.description,
      allowedClaims: deriveAllowedClaims({
        slug: normalized,
        pageType: "category-hub",
        searchIntent: category.description,
      }),
    };
  }

  const hub = getAllHubDefinitions().find((entry) => entry.slug === normalized);
  if (hub) {
    const metaDescription = getHubPageContent(hub.id)?.metaDescription ?? hub.description;
    const metadata = buildTopicHubMetadata({
      title: hub.title,
      description: metaDescription,
      slug: hub.slug,
    });
    const resolvedTitle =
      typeof metadata.title === "string"
        ? metadata.title
        : metadata.title &&
            typeof metadata.title === "object" &&
            "absolute" in metadata.title
          ? String(metadata.title.absolute)
          : `${hub.title} | ${SITE_NAME}`;

    return {
      slug: normalized,
      pageUrl: `${PRODUCTION_APP_URL}/${normalized}`,
      pageType: "topic-hub",
      currentTitle: resolvedTitle,
      currentDescription: metaDescription,
      currentH1: hub.title,
      canonical: `${PRODUCTION_APP_URL}/${normalized}`,
      primaryIntent: hub.hero,
      audience: hub.primaryKeyword,
      searchIntent: hub.hero,
      allowedClaims: deriveAllowedClaims({
        slug: normalized,
        pageType: "topic-hub",
        searchIntent: hub.hero,
      }),
    };
  }

  return null;
}

export function getHomepageSnippetSnapshot(): SnippetPageSnapshot {
  return {
    slug: "",
    pageUrl: PRODUCTION_APP_URL,
    pageType: "homepage",
    currentTitle: SITE_TITLE,
    currentDescription: SITE_DESCRIPTION,
    currentH1: SITE_NAME,
    canonical: PRODUCTION_APP_URL,
    primaryIntent: "Create free browser group voting games online.",
    audience: "Friend groups, parties, and teams",
    searchIntent: "Create a free FriendRank voting game and share one link.",
    allowedClaims: deriveAllowedClaims({
      slug: "",
      pageType: "homepage",
      searchIntent: "Create a free FriendRank voting game and share one link.",
    }),
  };
}

export function getAllSnippetPageSnapshots(): SnippetPageSnapshot[] {
  const snapshots: SnippetPageSnapshot[] = [getHomepageSnippetSnapshot()];

  for (const page of LANDING_PAGES) {
    const snapshot = resolveSnippetPageSnapshot(page.slug);
    if (snapshot) {
      snapshots.push(snapshot);
    }
  }

  for (const page of getAllEvergreenHubPages()) {
    const snapshot = resolveSnippetPageSnapshot(page.slug);
    if (snapshot) {
      snapshots.push(snapshot);
    }
  }

  for (const category of getLiveCategories()) {
    const snapshot = resolveSnippetPageSnapshot(category.slug);
    if (snapshot) {
      snapshots.push(snapshot);
    }
  }

  for (const hub of getAllHubDefinitions()) {
    const snapshot = resolveSnippetPageSnapshot(hub.slug);
    if (snapshot) {
      snapshots.push(snapshot);
    }
  }

  return snapshots;
}

export function getRelatedPageSnapshots(slug: string, limit = 12): SnippetPageSnapshot[] {
  const all = getAllSnippetPageSnapshots();
  const current = all.find((page) => page.slug === slug);
  if (!current) {
    return [];
  }

  const tokens = new Set(
    `${current.slug} ${current.currentTitle} ${current.primaryIntent}`
      .toLowerCase()
      .split(/[^\w]+/)
      .filter((token) => token.length > 3),
  );

  return all
    .filter((page) => page.slug !== slug)
    .map((page) => {
      const pageTokens = `${page.slug} ${page.currentTitle}`.toLowerCase().split(/[^\w]+/);
      const overlap = pageTokens.filter((token) => tokens.has(token)).length;
      return { page, overlap };
    })
    .filter((entry) => entry.overlap > 0)
    .sort((left, right) => right.overlap - left.overlap)
    .slice(0, limit)
    .map((entry) => entry.page);
}
