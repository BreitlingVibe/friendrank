import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { relationshipQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: relationshipQuizPage.metaTitle,
  metaDescription: relationshipQuizPage.metaDescription,
  canonicalUrl: relationshipQuizPage.canonicalUrl,
});

export default function RelationshipQuizPage() {
  return <IntentLandingPage page={relationshipQuizPage} />;
}
