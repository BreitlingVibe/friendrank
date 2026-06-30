import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { drinkingGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: drinkingGamePage.metaTitle,
  metaDescription: drinkingGamePage.metaDescription,
  canonicalUrl: drinkingGamePage.canonicalUrl,
});

export default function DrinkingGamePage() {
  return <IntentLandingPage page={drinkingGamePage} />;
}
