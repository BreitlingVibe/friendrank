import { getCategoryHubPath } from "@/lib/discovery/category-registry";
import type { CategoryHubViewModel } from "@/lib/discovery/types";
import { buildHomeBreadcrumbItem, type BreadcrumbItem } from "@/lib/seo/breadcrumbs";

/** Breadcrumb trail shared by visible nav and JSON-LD BreadcrumbList. */
export function buildCategoryHubBreadcrumbItems(
  model: CategoryHubViewModel,
): BreadcrumbItem[] {
  const pillar = model.related.relatedPillar;
  const items: BreadcrumbItem[] = [buildHomeBreadcrumbItem()];

  if (pillar) {
    items.push({
      name: pillar.title,
      path: pillar.href,
      position: 2,
    });
  }

  items.push({
    name: model.content.breadcrumbTitle ?? model.category.title,
    path: getCategoryHubPath(model.category.slug),
    position: items.length + 1,
  });

  return items;
}
