import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { reunionGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: reunionGamesPage.metaTitle,
  metaDescription: reunionGamesPage.metaDescription,
  canonicalUrl: reunionGamesPage.canonicalUrl,
});

export default function ReunionGamesPage() {
  return <IntentLandingPage page={reunionGamesPage} />;
}
