import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { babyShowerGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: babyShowerGamesPage.metaTitle,
  metaDescription: babyShowerGamesPage.metaDescription,
  canonicalUrl: babyShowerGamesPage.canonicalUrl,
});

export default function BabyShowerGamesPage() {
  return <IntentLandingPage page={babyShowerGamesPage} />;
}
