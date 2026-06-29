import type { MetadataRoute } from "next";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

/** Public indexable routes only. Individual game URLs are intentionally excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: PRODUCTION_APP_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
