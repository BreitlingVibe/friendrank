import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { whoKnowsMeBestPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: whoKnowsMeBestPage.metaTitle,
  metaDescription: whoKnowsMeBestPage.metaDescription,
  canonicalUrl: whoKnowsMeBestPage.canonicalUrl,
});

export default function WhoKnowsMeBestPage() {
  return <IntentLandingPage page={whoKnowsMeBestPage} />;
}
