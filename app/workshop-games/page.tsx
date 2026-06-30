import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { workshopGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: workshopGamesPage.metaTitle,
  metaDescription: workshopGamesPage.metaDescription,
  canonicalUrl: workshopGamesPage.canonicalUrl,
});

export default function WorkshopGamesPage() {
  return <IntentLandingPage page={workshopGamesPage} />;
}
