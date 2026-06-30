import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { coupleConversationStartersPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: coupleConversationStartersPage.metaTitle,
  metaDescription: coupleConversationStartersPage.metaDescription,
  canonicalUrl: coupleConversationStartersPage.canonicalUrl,
});

export default function CoupleConversationStartersPage() {
  return <IntentLandingPage page={coupleConversationStartersPage} />;
}
