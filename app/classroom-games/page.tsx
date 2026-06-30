import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { classroomGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: classroomGamesPage.metaTitle,
  metaDescription: classroomGamesPage.metaDescription,
  canonicalUrl: classroomGamesPage.canonicalUrl,
});

export default function ClassroomGamesPage() {
  return <IntentLandingPage page={classroomGamesPage} />;
}
