import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { collegePartyGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: collegePartyGamePage.metaTitle,
  metaDescription: collegePartyGamePage.metaDescription,
  canonicalUrl: collegePartyGamePage.canonicalUrl,
});

export default function CollegePartyGamePage() {
  return <IntentLandingPage page={collegePartyGamePage} />;
}
