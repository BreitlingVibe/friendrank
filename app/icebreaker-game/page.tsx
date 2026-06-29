import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { icebreakerGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: icebreakerGamePage.metaTitle,
  metaDescription: icebreakerGamePage.metaDescription,
  canonicalUrl: icebreakerGamePage.canonicalUrl,
});

export default function IcebreakerGamePage() {
  return <IntentLandingPage page={icebreakerGamePage} />;
}
