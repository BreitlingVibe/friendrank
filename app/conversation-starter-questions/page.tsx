import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { conversationStarterQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: conversationStarterQuestionsPage.metaTitle,
  metaDescription: conversationStarterQuestionsPage.metaDescription,
  canonicalUrl: conversationStarterQuestionsPage.canonicalUrl,
});

export default function ConversationStarterQuestionsPage() {
  return <IntentLandingPage page={conversationStarterQuestionsPage} />;
}
