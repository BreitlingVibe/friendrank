import type { MetadataRoute } from "next";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

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
