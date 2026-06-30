import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { studentOrientationGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: studentOrientationGamesPage.metaTitle,
  metaDescription: studentOrientationGamesPage.metaDescription,
  canonicalUrl: studentOrientationGamesPage.canonicalUrl,
});

export default function StudentOrientationGamesPage() {
  return <IntentLandingPage page={studentOrientationGamesPage} />;
}
