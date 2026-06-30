import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { getPrimaryTopicHubIdForSlug } from "@/lib/landing-pages/recommendation-utils";
import { getHubDefinition } from "@/lib/topic-hubs/hub-registry";

export type BreadcrumbItem = {
  name: string;
  /** Site-relative path for in-app navigation. */
  path: string;
  position: number;
};

function toAbsoluteUrl(path: string): string {
  if (path === "/") {
    return PRODUCTION_APP_URL;
  }

  return `${PRODUCTION_APP_URL}${path}`;
}

export function buildHomeBreadcrumbItem(): BreadcrumbItem {
  return {
    name: "Home",
    path: "/",
    position: 1,
  };
}

export function buildTopicHubBreadcrumbItems(
  hubSlug: string,
  hubTitle: string,
): BreadcrumbItem[] {
  return [
    buildHomeBreadcrumbItem(),
    {
      name: hubTitle,
      path: `/${hubSlug}`,
      position: 2,
    },
  ];
}

export function buildLandingPageBreadcrumbItems(
  slug: string,
  title: string,
): BreadcrumbItem[] {
  const home = buildHomeBreadcrumbItem();
  const hubId = getPrimaryTopicHubIdForSlug(slug);
  const hub = hubId ? getHubDefinition(hubId) : undefined;

  if (!hub) {
    return [
      home,
      {
        name: title,
        path: `/${slug}`,
        position: 2,
      },
    ];
  }

  return [
    home,
    {
      name: hub.title,
      path: `/${hub.slug}`,
      position: 2,
    },
    {
      name: title,
      path: `/${slug}`,
      position: 3,
    },
  ];
}

export function buildBreadcrumbListStructuredData(
  items: BreadcrumbItem[],
  pageUrl: string,
) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}/#breadcrumb`,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}
