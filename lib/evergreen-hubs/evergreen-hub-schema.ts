import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  buildBreadcrumbListStructuredData,
  buildHomeBreadcrumbItem,
} from "@/lib/seo/breadcrumbs";
import { buildGeoStructuredDataFields } from "@/lib/seo/geo-structured-data";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

function buildEvergreenHubBreadcrumbItems(
  slug: string,
  title: string,
) {
  return [
    buildHomeBreadcrumbItem(),
    {
      name: title,
      path: `/${slug}`,
      position: 2,
    },
  ];
}

export function buildEvergreenHubStructuredData(page: EvergreenHubPageData) {
  const pageId = `${page.canonicalUrl}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["WebPage", "Article"],
        "@id": pageId,
        url: page.canonicalUrl,
        name: page.metaTitle,
        headline: page.title,
        description: page.schemaDescription,
        inLanguage: "en-US",
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
        about: {
          "@type": "Thing",
          name: "Browser party games",
          description: page.schemaDescription,
        },
        breadcrumb: {
          "@id": `${page.canonicalUrl}/#breadcrumb`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#evergreen-hero-heading", "#evergreen-hero-lead"],
        },
        ...buildGeoStructuredDataFields({
          geoFoundation: page.geoFoundation,
          aiCitation: page.aiCitation,
        }),
      },
      buildBreadcrumbListStructuredData(
        buildEvergreenHubBreadcrumbItems(page.slug, page.title),
        page.canonicalUrl,
      ),
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
        name: `${SITE_NAME} – Browser party games`,
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
