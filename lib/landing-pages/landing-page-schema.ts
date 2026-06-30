import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { SITE_NAME } from "@/lib/seo/site-metadata";
import {
  buildBreadcrumbListStructuredData,
  buildLandingPageBreadcrumbItems,
} from "@/lib/seo/breadcrumbs";
import { buildEntitySummary } from "@/lib/entities/entity-graph";
import {
  flattenEntityNavigation,
  type EntityNavigation,
} from "@/lib/entities/entity-navigation";
import { getEntity } from "@/lib/entities/entity-utils";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import type { LandingPageEntityRef } from "@/lib/entities/entity-utils";

function buildTextItemList(
  pageUrl: string,
  listId: string,
  name: string,
  items: string[],
) {
  if (items.length === 0) {
    return null;
  }

  return {
    "@type": "ItemList",
    "@id": `${pageUrl}${listId}`,
    name,
    itemListElement: items.map((itemName, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: itemName,
    })),
  };
}

function buildRelatedItemList(
  pageUrl: string,
  listId: string,
  name: string,
  pages: LandingPageData["playersAlsoEnjoy"],
) {
  if (pages.length === 0) {
    return null;
  }

  return {
    "@type": "ItemList",
    "@id": `${pageUrl}${listId}`,
    name,
    itemListElement: pages
      .filter((page) => page.available)
      .map((relatedPage, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: relatedPage.linkLabel ?? relatedPage.title,
        url: `${PRODUCTION_APP_URL}/${relatedPage.slug}`,
      })),
  };
}

function buildEntityStructuredNodes(
  pageUrl: string,
  entities: LandingPageEntityRef[],
) {
  return entities.map((entity) => {
    const registryEntity = getEntity(entity.id);
    const description =
      registryEntity != null
        ? buildEntitySummary(registryEntity)
        : entity.description;

    return {
      "@type": "DefinedTerm",
      "@id": `${pageUrl}/#entity-${entity.id}`,
      name: entity.name,
      description,
      termCode: entity.slug,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        "@id": `${PRODUCTION_APP_URL}/#entity-vocabulary`,
        name: `${SITE_NAME} Game Entities`,
      },
    };
  });
}

function buildMentionNodes(pageUrl: string, entities: LandingPageEntityRef[]) {
  return entities.map((entity) => {
    const registryEntity = getEntity(entity.id);
    const description =
      registryEntity != null
        ? buildEntitySummary(registryEntity)
        : entity.description;

    return {
      "@type": "Thing",
      "@id": `${pageUrl}/#entity-${entity.id}`,
      name: entity.name,
      description,
    };
  });
}

function buildEntityExplorerItemList(
  pageUrl: string,
  navigation: EntityNavigation,
) {
  const chips = flattenEntityNavigation(navigation).filter(
    (chip) => chip.clickable && chip.href,
  );

  if (chips.length === 0) {
    return null;
  }

  return {
    "@type": "ItemList",
    "@id": `${pageUrl}#entity-explorer`,
    name: navigation.title,
    itemListElement: chips.map((chip, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: chip.name,
      url: `${PRODUCTION_APP_URL}${chip.href}`,
    })),
  };
}

export function buildLandingPageStructuredData(page: LandingPageData) {
  const pageId = `${page.canonicalUrl}/#webpage`;
  const breadcrumbItems = buildLandingPageBreadcrumbItems(page.slug, page.title);

  const exampleQuestionsList = buildTextItemList(
    page.canonicalUrl,
    "#example-questions",
    page.exampleQuestionsTitle,
    page.exampleQuestions.map((question) => question.text),
  );

  const playersAlsoEnjoyList = buildRelatedItemList(
    page.canonicalUrl,
    "#players-also-enjoy",
    page.playersAlsoEnjoyTitle,
    page.playersAlsoEnjoy,
  );

  const entityExplorerList = buildEntityExplorerItemList(
    page.canonicalUrl,
    page.entityNavigation,
  );

  const primaryEntityNodes = buildEntityStructuredNodes(
    page.canonicalUrl,
    page.primaryEntities,
  );
  const secondaryMentionNodes = buildMentionNodes(
    page.canonicalUrl,
    [...page.secondaryEntities, ...page.relatedEntities],
  );
  const aboutNodes = [
    { "@id": `${page.canonicalUrl}/#webapp` },
    ...primaryEntityNodes.map((node) => ({ "@id": node["@id"] })),
  ];

  const graph: Record<string, unknown>[] = [
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
      about: aboutNodes,
      mentions:
        secondaryMentionNodes.length > 0
          ? secondaryMentionNodes.map((node) => ({ "@id": node["@id"] }))
          : undefined,
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
  ];

  if (exampleQuestionsList) {
    graph.push(exampleQuestionsList);
  }

  if (playersAlsoEnjoyList) {
    graph.push(playersAlsoEnjoyList);
  }

  if (entityExplorerList) {
    graph.push(entityExplorerList);
  }

  for (const entityNode of primaryEntityNodes) {
    graph.push(entityNode);
  }

  for (const mentionNode of secondaryMentionNodes) {
    if (!primaryEntityNodes.some((node) => node["@id"] === mentionNode["@id"])) {
      graph.push(mentionNode);
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
