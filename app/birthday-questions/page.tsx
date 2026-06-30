import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { birthdayQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: birthdayQuestionsPage.metaTitle,
  metaDescription: birthdayQuestionsPage.metaDescription,
  canonicalUrl: birthdayQuestionsPage.canonicalUrl,
});

export default function BirthdayQuestionsPage() {
  return <IntentLandingPage page={birthdayQuestionsPage} />;
}
