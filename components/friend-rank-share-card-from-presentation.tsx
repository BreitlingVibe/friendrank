import type { ResultsPresentation } from "@/lib/results/presentation";
import {
  FriendRankShareCard,
  type FriendRankShareCardProps,
} from "@/components/friend-rank-share-card";
import { buildShareCardPresentation } from "@/lib/share/share-card-presentation";

export type FriendRankShareCardFromPresentationProps = Omit<
  FriendRankShareCardProps,
  "data"
> & {
  presentation: ResultsPresentation;
};

/**
 * Convenience wrapper: narrative presentation → share card model → card UI.
 */
export function FriendRankShareCardFromPresentation({
  presentation,
  ...props
}: FriendRankShareCardFromPresentationProps) {
  const data = buildShareCardPresentation(presentation);

  return <FriendRankShareCard data={data} {...props} />;
}
