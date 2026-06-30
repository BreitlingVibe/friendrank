import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { pregameGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: pregameGamesPage.metaTitle,
  metaDescription: pregameGamesPage.metaDescription,
  canonicalUrl: pregameGamesPage.canonicalUrl,
});

export default function PregameGamesPage() {
  return <IntentLandingPage page={pregameGamesPage} />;
}
