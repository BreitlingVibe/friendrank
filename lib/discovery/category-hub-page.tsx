import type { Metadata } from "next";
import { CategoryHubTemplate } from "@/components/discovery/category-hub-template";
import {
  getCategoryBySlug,
  getCategoryHubPath,
  isCategoryHubLive,
} from "@/lib/discovery/category-registry";
import { getCategoryHubContent } from "@/lib/discovery/category-hub-content";
import { getRelatedContentForCategory } from "@/lib/discovery/related-content";
import type { CategoryHubViewModel } from "@/lib/discovery/types";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";
import { notFound } from "next/navigation";

export function buildCategoryHubViewModel(slug: string): CategoryHubViewModel | null {
  const category = getCategoryBySlug(slug);
  if (!category || !isCategoryHubLive(slug)) {
    return null;
  }

  const related = getRelatedContentForCategory(slug);
  if (!related) {
    return null;
  }

  return {
    category,
    content: getCategoryHubContent(slug),
    related,
  };
}

export function buildCategoryHubMetadata(slug: string): Metadata {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return buildLandingPageMetadata({
    metaTitle: `${category.title} Games | FriendRank`,
    metaDescription: category.description,
    canonicalUrl: `${PRODUCTION_APP_URL}${getCategoryHubPath(slug)}`,
  });
}

type CategoryHubPageProps = {
  slug: string;
};

export function CategoryHubPage({ slug }: CategoryHubPageProps) {
  const model = buildCategoryHubViewModel(slug);

  if (!model) {
    notFound();
  }

  return <CategoryHubTemplate model={model} />;
}
