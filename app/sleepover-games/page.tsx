import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { sleepoverGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: sleepoverGamesPage.metaTitle,
  metaDescription: sleepoverGamesPage.metaDescription,
  canonicalUrl: sleepoverGamesPage.canonicalUrl,
});

export default function SleepoverGamesPage() {
  return <IntentLandingPage page={sleepoverGamesPage} />;
}
