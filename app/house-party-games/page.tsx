import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { housePartyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: housePartyGamesPage.metaTitle,
  metaDescription: housePartyGamesPage.metaDescription,
  canonicalUrl: housePartyGamesPage.canonicalUrl,
});

export default function HousePartyGamesPage() {
  return <IntentLandingPage page={housePartyGamesPage} />;
}
