import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForCollegeStudentsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForCollegeStudentsPage.metaTitle,
  metaDescription: gamesForCollegeStudentsPage.metaDescription,
  canonicalUrl: gamesForCollegeStudentsPage.canonicalUrl,
});

export default function GamesForCollegeStudentsPage() {
  return <IntentLandingPage page={gamesForCollegeStudentsPage} />;
}
