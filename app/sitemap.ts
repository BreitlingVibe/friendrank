import type { MetadataRoute } from "next";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { getAllHubs } from "@/lib/topic-hubs";

/** Public indexable routes only. Individual game URLs are intentionally excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PRODUCTION_APP_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...LANDING_PAGES.map((page) => ({
      url: page.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...getAllHubs().map((hub) => ({
      url: `${PRODUCTION_APP_URL}/${hub.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
