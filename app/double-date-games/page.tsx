import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { doubleDateGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: doubleDateGamesPage.metaTitle,
  metaDescription: doubleDateGamesPage.metaDescription,
  canonicalUrl: doubleDateGamesPage.canonicalUrl,
});

export default function DoubleDateGamesPage() {
  return <IntentLandingPage page={doubleDateGamesPage} />;
}
