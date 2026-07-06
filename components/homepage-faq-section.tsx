import { LandingPageFaq } from "@/components/landing-pages/landing-page-faq";
import {
  HOMEPAGE_FAQ_ITEMS,
  HOMEPAGE_FAQ_TITLE,
} from "@/lib/seo/homepage-faq";

export function HomepageFaqSection() {
  return (
    <LandingPageFaq
      title={HOMEPAGE_FAQ_TITLE}
      items={HOMEPAGE_FAQ_ITEMS.map((item) => ({
        question: item.question,
        answer: item.answer,
      }))}
    />
  );
}
