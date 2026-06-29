import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

export function buildLandingPageStructuredData(page: LandingPageData) {
  const pageId = `${page.canonicalUrl}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: page.canonicalUrl,
        name: page.metaTitle,
        description: page.schemaDescription,
        inLanguage: "en-US",
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
        about: {
          "@id": `${page.canonicalUrl}/#webapp`,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${page.canonicalUrl}/#faq`,
        mainEntity: page.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
        isPartOf: {
          "@id": pageId,
        },
      },
      {
        "@type": "WebApplication",
        "@id": `${page.canonicalUrl}/#webapp`,
        name: `${SITE_NAME} – ${page.title}`,
        url: PRODUCTION_APP_URL,
        description: page.schemaDescription,
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
      },
    ],
  };
}
