import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { getCategoryHubPath } from "@/lib/discovery/category-registry";
import type { CategoryHubViewModel } from "@/lib/discovery/types";
import {
  buildBreadcrumbListStructuredData,
  buildHomeBreadcrumbItem,
} from "@/lib/seo/breadcrumbs";

function buildCategoryHubBreadcrumbItems(model: CategoryHubViewModel) {
  const pillar = model.related.relatedPillar;

  const items = [buildHomeBreadcrumbItem()];

  if (pillar) {
    items.push({
      name: pillar.title,
      path: pillar.href,
      position: 2,
    });
  }

  items.push({
    name: model.category.title,
    path: getCategoryHubPath(model.category.slug),
    position: items.length + 1,
  });

  return items;
}

export function buildCategoryHubStructuredData(model: CategoryHubViewModel) {
  const canonicalUrl = `${PRODUCTION_APP_URL}${getCategoryHubPath(model.category.slug)}`;
  const pageId = `${canonicalUrl}/#webpage`;
  const description =
    model.content.schemaDescription ??
    model.content.metaDescription ??
    model.category.description;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": pageId,
      url: canonicalUrl,
      name: model.content.metaTitle ?? `${model.category.title} Games | FriendRank`,
      description,
      inLanguage: "en-US",
      isPartOf: {
        "@id": `${PRODUCTION_APP_URL}/#website`,
      },
      breadcrumb: {
        "@id": `${canonicalUrl}/#breadcrumb`,
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#category-hub-heading", "#category-hub-lead"],
      },
    },
    buildBreadcrumbListStructuredData(
      buildCategoryHubBreadcrumbItems(model),
      canonicalUrl,
    ),
  ];

  if (model.content.faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      mainEntity: model.content.faq.map((item) => ({
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
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
