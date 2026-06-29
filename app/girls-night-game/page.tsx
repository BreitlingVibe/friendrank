import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { girlsNightGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: girlsNightGamePage.metaTitle,
  metaDescription: girlsNightGamePage.metaDescription,
  canonicalUrl: girlsNightGamePage.canonicalUrl,
});

export default function GirlsNightGamePage() {
  return <IntentLandingPage page={girlsNightGamePage} />;
}
