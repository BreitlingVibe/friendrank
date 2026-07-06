import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { HOMEPAGE_FAQ_ITEMS } from "@/lib/seo/homepage-faq";

export function buildHomepageFaqStructuredData() {
  const faqId = `${PRODUCTION_APP_URL}/#faq`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": faqId,
        url: PRODUCTION_APP_URL,
        inLanguage: "en-US",
        mainEntity: HOMEPAGE_FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
      },
    ],
  };
}
