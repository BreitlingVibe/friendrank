import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  buildBreadcrumbListStructuredData,
  buildTopicHubBreadcrumbItems,
} from "@/lib/seo/breadcrumbs";
import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";
import { flattenEntityNavigation } from "@/lib/entities/entity-navigation";

export function buildTopicHubStructuredData(input: {
  title: string;
  slug: string;
  schemaDescription: string;
  faq: HubFaqItem[];
  entityNavigation?: EntityNavigation;
}) {
  const canonicalUrl = `${PRODUCTION_APP_URL}/${input.slug}`;
  const pageId = `${canonicalUrl}/#webpage`;
  const breadcrumbItems = buildTopicHubBreadcrumbItems(input.slug, input.title);
  const explorerChips = input.entityNavigation
    ? flattenEntityNavigation(input.entityNavigation).filter(
        (chip) => chip.clickable && chip.href,
      )
    : [];

  const graph: Record<string, unknown>[] = [
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
  ];

  if (explorerChips.length > 0) {
    graph.push({
      "@type": "ItemList",
      "@id": `${canonicalUrl}#entity-explorer`,
      name: input.entityNavigation?.title ?? "Explore by topic",
      itemListElement: explorerChips.map((chip, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: chip.name,
        url: `${PRODUCTION_APP_URL}${chip.href}`,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
