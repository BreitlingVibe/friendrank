import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { vacationGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: vacationGamesPage.metaTitle,
  metaDescription: vacationGamesPage.metaDescription,
  canonicalUrl: vacationGamesPage.canonicalUrl,
});

export default function VacationGamesPage() {
  return <IntentLandingPage page={vacationGamesPage} />;
}
