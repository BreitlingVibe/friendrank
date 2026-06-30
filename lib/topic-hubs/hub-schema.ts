import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  buildBreadcrumbListStructuredData,
  buildTopicHubBreadcrumbItems,
} from "@/lib/seo/breadcrumbs";
import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";

export function buildTopicHubStructuredData(input: {
  title: string;
  slug: string;
  schemaDescription: string;
  faq: HubFaqItem[];
}) {
  const canonicalUrl = `${PRODUCTION_APP_URL}/${input.slug}`;
  const pageId = `${canonicalUrl}/#webpage`;
  const breadcrumbItems = buildTopicHubBreadcrumbItems(input.slug, input.title);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: canonicalUrl,
        name: `${input.title} | ${SITE_NAME}`,
        description: input.schemaDescription,
        inLanguage: "en-US",
        isPartOf: {
          "@id": `${PRODUCTION_APP_URL}/#website`,
        },
        about: {
          "@type": "Thing",
          name: input.title,
          description: input.schemaDescription,
        },
        breadcrumb: {
          "@id": `${canonicalUrl}/#breadcrumb`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#topic-hub-hero-heading", "#topic-hub-hero-lead"],
        },
      },
      buildBreadcrumbListStructuredData(breadcrumbItems, canonicalUrl),
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}/#faq`,
        mainEntity: input.faq.map((item) => ({
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
    ],
  };
}
