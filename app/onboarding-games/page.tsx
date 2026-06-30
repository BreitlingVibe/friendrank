import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { onboardingGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: onboardingGamesPage.metaTitle,
  metaDescription: onboardingGamesPage.metaDescription,
  canonicalUrl: onboardingGamesPage.canonicalUrl,
});

export default function OnboardingGamesPage() {
  return <IntentLandingPage page={onboardingGamesPage} />;
}
