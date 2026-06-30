import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { holidayFamilyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: holidayFamilyGamesPage.metaTitle,
  metaDescription: holidayFamilyGamesPage.metaDescription,
  canonicalUrl: holidayFamilyGamesPage.canonicalUrl,
});

export default function HolidayFamilyGamesPage() {
  return <IntentLandingPage page={holidayFamilyGamesPage} />;
}
