import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { newEmployeeGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: newEmployeeGamesPage.metaTitle,
  metaDescription: newEmployeeGamesPage.metaDescription,
  canonicalUrl: newEmployeeGamesPage.canonicalUrl,
});

export default function NewEmployeeGamesPage() {
  return <IntentLandingPage page={newEmployeeGamesPage} />;
}
