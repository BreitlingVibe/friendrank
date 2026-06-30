import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { thanksgivingGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: thanksgivingGamesPage.metaTitle,
  metaDescription: thanksgivingGamesPage.metaDescription,
  canonicalUrl: thanksgivingGamesPage.canonicalUrl,
});

export default function ThanksgivingGamesPage() {
  return <IntentLandingPage page={thanksgivingGamesPage} />;
}
