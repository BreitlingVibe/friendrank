import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { newlywedGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: newlywedGamePage.metaTitle,
  metaDescription: newlywedGamePage.metaDescription,
  canonicalUrl: newlywedGamePage.canonicalUrl,
});

export default function NewlywedGamePage() {
  return <IntentLandingPage page={newlywedGamePage} />;
}
