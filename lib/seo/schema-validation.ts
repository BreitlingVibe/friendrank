import { PRODUCTION_APP_URL } from "@/lib/app-url";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

type JsonLdNode = Record<string, unknown>;

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value == null) {
    return [];
  }

  return Array.isArray(value) ? (value as T[]) : [value];
}

function collectGraphNodes(data: unknown): JsonLdNode[] {
  if (!data || typeof data !== "object") {
    return [];
  }

  const record = data as Record<string, unknown>;
  const graph = record["@graph"];

  if (Array.isArray(graph)) {
    return graph.filter(
      (node): node is JsonLdNode =>
        node != null && typeof node === "object" && !Array.isArray(node),
    );
  }

  return [record];
}

function indexNodesById(nodes: JsonLdNode[]): Map<string, JsonLdNode> {
  const map = new Map<string, JsonLdNode>();

  for (const node of nodes) {
    const id = node["@id"];
    if (typeof id === "string") {
      map.set(id, node);
    }
  }

  return map;
}

function isAllowedExternalAboutRef(id: string): boolean {
  return (
    id.startsWith(`${PRODUCTION_APP_URL}/#`) ||
    id.endsWith("/#webapp") ||
    id.endsWith("/#website") ||
    id.endsWith("/#organization")
  );
}

function validateDuplicateIds(nodes: JsonLdNode[], issues: ValidationIssue[]): void {
  const counts = new Map<string, number>();

  for (const node of nodes) {
    const id = node["@id"];
    if (typeof id !== "string") {
      continue;
    }

    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  for (const [id, count] of counts.entries()) {
    if (count > 1) {
      issues.push(
        issue(
          "schema.duplicate_id",
          "error",
          `Duplicate @id "${id}" appears ${count} times in the same graph.`,
          id,
        ),
      );
    }
  }
}

function validateWebPageNode(
  node: JsonLdNode,
  nodesById: Map<string, JsonLdNode>,
  issues: ValidationIssue[],
): void {
  for (const aboutRef of asArray<{ "@id"?: string }>(
    node.about as { "@id"?: string } | { "@id"?: string }[] | undefined,
  )) {
    const refId = aboutRef?.["@id"];
    if (!refId) {
      continue;
    }

    if (!nodesById.has(refId) && !isAllowedExternalAboutRef(refId)) {
      issues.push(
        issue(
          "schema.invalid_about_ref",
          "error",
          `WebPage.about references missing graph node "${refId}".`,
          refId,
        ),
      );
    }
  }

  for (const mentionRef of asArray<{ "@id"?: string }>(
    node.mentions as { "@id"?: string } | { "@id"?: string }[] | undefined,
  )) {
    const refId = mentionRef?.["@id"];
    if (!refId) {
      continue;
    }

    if (!nodesById.has(refId)) {
      issues.push(
        issue(
          "schema.invalid_mentions_ref",
          "error",
          `WebPage.mentions references missing graph node "${refId}".`,
          refId,
        ),
      );
    }
  }
}

function validateFaqNode(node: JsonLdNode, issues: ValidationIssue[]): void {
  for (const entry of asArray<JsonLdNode>(
    node.mainEntity as JsonLdNode | JsonLdNode[] | undefined,
  )) {
    const question = entry.name;
    const answer = (entry.acceptedAnswer as JsonLdNode | undefined)?.text;

    if (typeof question !== "string" || !question.trim()) {
      issues.push(
        issue(
          "schema.invalid_faq_question",
          "error",
          "FAQPage contains a question without a name.",
        ),
      );
    }

    if (typeof answer !== "string" || !answer.trim()) {
      issues.push(
        issue(
          "schema.invalid_faq_answer",
          "error",
          "FAQPage contains a question without answer text.",
        ),
      );
    }
  }
}

function validateItemListNode(node: JsonLdNode, issues: ValidationIssue[]): void {
  for (const listItem of asArray<JsonLdNode>(
    node.itemListElement as JsonLdNode | JsonLdNode[] | undefined,
  )) {
    const name = listItem.name;
    const url = listItem.url;

    if (typeof name !== "string" || !name.trim()) {
      issues.push(
        issue(
          "schema.invalid_itemlist_name",
          "error",
          "ItemList contains a list item without a name.",
        ),
      );
    }

    if (url != null) {
      if (typeof url !== "string" || !url.startsWith(`${PRODUCTION_APP_URL}/`)) {
        issues.push(
          issue(
            "schema.invalid_itemlist_url",
            "error",
            `ItemList item url "${String(url)}" is invalid.`,
          ),
        );
      }
    }
  }
}

function validateEntityNode(
  node: JsonLdNode,
  nodeType: string,
  issues: ValidationIssue[],
): void {
  const name = node.name;
  const description = node.description;

  if (typeof name !== "string" || !name.trim()) {
    issues.push(
      issue(
        "schema.missing_entity_name",
        "error",
        `${nodeType} node is missing a name.`,
        typeof node["@id"] === "string" ? node["@id"] : undefined,
      ),
    );
  }

  if (typeof description !== "string" || !description.trim()) {
    issues.push(
      issue(
        "schema.missing_entity_description",
        "error",
        `${nodeType} node is missing a description.`,
        typeof node["@id"] === "string" ? node["@id"] : undefined,
      ),
    );
  }
}

function validateBreadcrumbNode(node: JsonLdNode, issues: ValidationIssue[]): void {
  for (const listItem of asArray<JsonLdNode>(
    node.itemListElement as JsonLdNode | JsonLdNode[] | undefined,
  )) {
    const name = listItem.name;
    const item = listItem.item as string | undefined;

    if (typeof name !== "string" || !name.trim()) {
      issues.push(
        issue(
          "schema.invalid_breadcrumb_name",
          "error",
          "BreadcrumbList contains an item without a name.",
        ),
      );
    }

    if (item != null && (typeof item !== "string" || !item.startsWith("http"))) {
      issues.push(
        issue(
          "schema.invalid_breadcrumb_item",
          "error",
          `BreadcrumbList item url "${String(item)}" is invalid.`,
        ),
      );
    }
  }
}

/** Validates a JSON-LD document or @graph for common FriendRank SEO issues. */
export function validateStructuredDataGraph(
  data: unknown,
  context?: string,
): ValidationResult {
  const issues: ValidationIssue[] = [];
  const nodes = collectGraphNodes(data);
  const nodesById = indexNodesById(nodes);

  validateDuplicateIds(nodes, issues);

  for (const node of nodes) {
    const nodeType = node["@type"];

    if (nodeType === "WebPage") {
      validateWebPageNode(node, nodesById, issues);
    }

    if (nodeType === "FAQPage") {
      validateFaqNode(node, issues);
    }

    if (nodeType === "ItemList") {
      validateItemListNode(node, issues);
    }

    if (nodeType === "BreadcrumbList") {
      validateBreadcrumbNode(node, issues);
    }

    if (nodeType === "DefinedTerm" || nodeType === "Thing") {
      validateEntityNode(node, String(nodeType), issues);
    }
  }

  if (context) {
    for (const entry of issues) {
      entry.context = entry.context ?? context;
    }
  }

  return createValidationResult(issues);
}
