import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";
import {
  HOMEPAGE_FAQ_ITEMS,
  HOMEPAGE_FAQ_QUESTIONS,
} from "@/lib/seo/homepage-faq";
import { buildHomepageFaqStructuredData } from "@/lib/seo/homepage-faq-schema";
import { validateStructuredDataGraph } from "@/lib/seo/schema-validation";

const REQUIRED_HOMEPAGE_FAQ_QUESTIONS = [
  "What is FriendRank?",
  "How does FriendRank work?",
  "Is FriendRank free?",
  "Do players need to download an app?",
  "Is voting anonymous?",
  "Who is FriendRank for?",
  "Can FriendRank be used for parties?",
  "Can FriendRank be used for team building?",
  "How long does a FriendRank game take?",
  "What kind of results does FriendRank reveal?",
] as const;

/** Validates homepage FAQ answer layer completeness and FAQPage schema. */
export function validateHomepageFaqLayer(): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (HOMEPAGE_FAQ_ITEMS.length !== REQUIRED_HOMEPAGE_FAQ_QUESTIONS.length) {
    issues.push(
      issue(
        "homepage_faq.incomplete_item_count",
        "error",
        `Homepage FAQ must include ${REQUIRED_HOMEPAGE_FAQ_QUESTIONS.length} questions.`,
      ),
    );
  }

  for (const question of REQUIRED_HOMEPAGE_FAQ_QUESTIONS) {
    if (!HOMEPAGE_FAQ_QUESTIONS.includes(question)) {
      issues.push(
        issue(
          "homepage_faq.missing_question",
          "error",
          `Homepage FAQ is missing required question "${question}".`,
          question,
        ),
      );
    }
  }

  for (const item of HOMEPAGE_FAQ_ITEMS) {
    if (!item.question.trim() || !item.answer.trim()) {
      issues.push(
        issue(
          "homepage_faq.empty_entry",
          "error",
          "Homepage FAQ entries must include both question and answer.",
          item.question || "unknown",
        ),
      );
    }

    if (item.answer.length > 320) {
      issues.push(
        issue(
          "homepage_faq.answer_too_long",
          "warning",
          `Homepage FAQ answer for "${item.question}" exceeds 320 characters.`,
          item.question,
        ),
      );
    }
  }

  issues.push(
    ...validateStructuredDataGraph(
      buildHomepageFaqStructuredData(),
      "homepage-faq",
    ).issues,
  );

  return createValidationResult(issues);
}
