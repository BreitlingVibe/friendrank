import type { MetadataRoute } from "next";
import { PRODUCTION_APP_URL } from "@/lib/app-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/game/"],
    },
    sitemap: `${PRODUCTION_APP_URL}/sitemap.xml`,
    host: PRODUCTION_APP_URL,
  };
}
