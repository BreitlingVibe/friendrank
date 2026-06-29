import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { sleepoverGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: sleepoverGamePage.metaTitle,
  metaDescription: sleepoverGamePage.metaDescription,
  canonicalUrl: sleepoverGamePage.canonicalUrl,
});

export default function SleepoverGamePage() {
  return <IntentLandingPage page={sleepoverGamePage} />;
}
