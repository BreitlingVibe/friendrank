import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { employeeEngagementGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: employeeEngagementGamePage.metaTitle,
  metaDescription: employeeEngagementGamePage.metaDescription,
  canonicalUrl: employeeEngagementGamePage.canonicalUrl,
});

export default function EmployeeEngagementGamePage() {
  return <IntentLandingPage page={employeeEngagementGamePage} />;
}
