import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";
import { getLandingPageLinkLabel } from "@/lib/landing-pages/link-labels";
import {
  getRecommendationTier,
  sharesTopicHub,
} from "@/lib/landing-pages/recommendation-utils";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";

export type FormatComparison = {
  title: string;
  body: string;
  currentSlug: string;
  currentLabel: string;
  siblingSlug: string;
  siblingLabel: string;
};

function buildComparisonBody(
  source: IntentDefinition,
  sibling: IntentDefinition,
): string {
  const sourceFocus = source.searchIntent.split(".")[0]?.trim() ?? source.title;
  const siblingFocus =
    sibling.searchIntent.split(".")[0]?.trim() ?? sibling.title;

  return `${source.title} is built for ${sourceFocus.toLowerCase()}. ${sibling.title} fits better when ${siblingFocus.toLowerCase()}. Both use the same FriendRank flow: create a game, share one link, vote anonymously, and reveal results together.`;
}

/** Builds a short sibling comparison from automatic related-page data when safe. */
export function resolveFormatComparison(
  slug: string,
  relatedPages: LandingPageRelatedPage[],
): FormatComparison | null {
  const source = getIntentBySlug(slug);
  if (!source) {
    return null;
  }

  const siblingPage = relatedPages.find(
    (page) =>
      page.available &&
      page.slug !== slug &&
      getIntentBySlug(page.slug)?.status === "live",
  );

  if (!siblingPage) {
    return null;
  }

  const sibling = getIntentBySlug(siblingPage.slug);
  if (!sibling) {
    return null;
  }

  const tier = getRecommendationTier(slug, sibling.slug);
  const sameCategory = source.intentCategory === sibling.intentCategory;
  const sharedHub = sharesTopicHub(slug, sibling.slug);
  const sharedCluster = getClustersBySlug(slug).some((cluster) =>
    cluster.memberSlugs.includes(sibling.slug),
  );

  if (!sameCategory && tier !== "cluster" && !sharedHub && !sharedCluster) {
    return null;
  }

  return {
    title: `${source.title} vs ${sibling.title}`,
    body: buildComparisonBody(source, sibling),
    currentSlug: slug,
    currentLabel: getLandingPageLinkLabel(source.title, slug, "create"),
    siblingSlug: sibling.slug,
    siblingLabel: getLandingPageLinkLabel(sibling.title, sibling.slug, "play"),
  };
}
