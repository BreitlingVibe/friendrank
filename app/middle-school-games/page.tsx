import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { middleSchoolGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: middleSchoolGamesPage.metaTitle,
  metaDescription: middleSchoolGamesPage.metaDescription,
  canonicalUrl: middleSchoolGamesPage.canonicalUrl,
});

export default function MiddleSchoolGamesPage() {
  return <IntentLandingPage page={middleSchoolGamesPage} />;
}
