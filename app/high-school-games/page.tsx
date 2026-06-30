import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { highSchoolGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: highSchoolGamesPage.metaTitle,
  metaDescription: highSchoolGamesPage.metaDescription,
  canonicalUrl: highSchoolGamesPage.canonicalUrl,
});

export default function HighSchoolGamesPage() {
  return <IntentLandingPage page={highSchoolGamesPage} />;
}
