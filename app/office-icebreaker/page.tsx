import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { officeIcebreakerPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: officeIcebreakerPage.metaTitle,
  metaDescription: officeIcebreakerPage.metaDescription,
  canonicalUrl: officeIcebreakerPage.canonicalUrl,
});

export default function OfficeIcebreakerPage() {
  return <IntentLandingPage page={officeIcebreakerPage} />;
}
