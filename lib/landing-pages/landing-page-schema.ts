import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  buildBreadcrumbListStructuredData,
  buildLandingPageBreadcrumbItems,
} from "@/lib/seo/breadcrumbs";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

export function buildLandingPageStructuredData(page: LandingPageData) {
  const pageId = `${page.canonicalUrl}/#webpage`;
  const breadcrumbItems = buildLandingPageBreadcrumbItems(page.slug, page.title);

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
        breadcrumb: {
          "@id": `${page.canonicalUrl}/#breadcrumb`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#landing-hero-heading", "#landing-intent-heading"],
        },
      },
      buildBreadcrumbListStructuredData(breadcrumbItems, page.canonicalUrl),
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
        publisher: {
          "@id": `${PRODUCTION_APP_URL}/#organization`,
        },
      },
    ],
  };
}
