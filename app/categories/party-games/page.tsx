import type { Metadata } from "next";
import {
  buildCategoryHubMetadata,
  CategoryHubPage,
} from "@/lib/discovery/category-hub-page";

const SLUG = "party-games";

export const metadata: Metadata = buildCategoryHubMetadata(SLUG);

export default function PartyGamesCategoryHubPage() {
  return <CategoryHubPage slug={SLUG} />;
}
