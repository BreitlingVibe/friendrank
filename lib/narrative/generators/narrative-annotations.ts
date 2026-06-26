import {
  NARRATIVE_ANNOTATION_PROFILES,
  resolveAnnotationProfile,
  type ResultsNarrativeAnnotations,
} from "@/lib/narrative/templates/narrative-annotation-profiles";
import { pickSectionLabelTheme } from "@/lib/narrative/generators/section-labels";
import type { NarrativeContext } from "@/lib/narrative/types";

export function generateNarrativeAnnotations(
  context: NarrativeContext,
): ResultsNarrativeAnnotations {
  const theme = pickSectionLabelTheme(context);
  const profile = NARRATIVE_ANNOTATION_PROFILES[theme];

  return resolveAnnotationProfile(profile, context.seed);
}
