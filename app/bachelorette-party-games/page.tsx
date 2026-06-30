import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { bachelorettePartyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: bachelorettePartyGamesPage.metaTitle,
  metaDescription: bachelorettePartyGamesPage.metaDescription,
  canonicalUrl: bachelorettePartyGamesPage.canonicalUrl,
});

export default function BachelorettePartyGamesPage() {
  return <IntentLandingPage page={bachelorettePartyGamesPage} />;
}
