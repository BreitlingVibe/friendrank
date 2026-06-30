import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { familyReunionGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: familyReunionGamesPage.metaTitle,
  metaDescription: familyReunionGamesPage.metaDescription,
  canonicalUrl: familyReunionGamesPage.canonicalUrl,
});

export default function FamilyReunionGamesPage() {
  return <IntentLandingPage page={familyReunionGamesPage} />;
}
