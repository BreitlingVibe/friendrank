import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { getCategoryHubPath } from "@/lib/discovery/category-registry";
import { buildCategoryHubBreadcrumbItems } from "@/lib/discovery/category-hub-breadcrumbs";
import type { CategoryHubViewModel } from "@/lib/discovery/types";
import { buildBreadcrumbListStructuredData } from "@/lib/seo/breadcrumbs";

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
