"use client";

import { useCallback, useEffect, useState } from "react";
import { getVoteProgressAction } from "@/app/actions/votes";
import type { VoteProgress } from "@/lib/votes/types";

const POLL_INTERVAL_MS = 5000;

export function useLiveVoteProgress(
  shareCode: string | null,
  initialProgress?: VoteProgress | null,
) {
  const [progress, setProgress] = useState<VoteProgress | null>(
    initialProgress ?? null,
  );

  const refresh = useCallback(async () => {
    if (!shareCode) {
      return;
    }

    const result = await getVoteProgressAction({ shareCode });
    if (result.ok) {
      setProgress(result.progress);
    }
  }, [shareCode]);

  useEffect(() => {
    if (!initialProgress) {
      return;
    }

    setProgress((current) => {
      if (
        current &&
        current.voteCount === initialProgress.voteCount &&
        current.votesRequired === initialProgress.votesRequired &&
        current.isUnlocked === initialProgress.isUnlocked &&
        current.hasVoted === initialProgress.hasVoted
      ) {
        return current;
      }

      return initialProgress;
    });
  }, [initialProgress]);

  useEffect(() => {
    if (!shareCode) {
      return;
    }

    void refresh();
    const intervalId = window.setInterval(() => {
      void refresh();
    }, POLL_INTERVAL_MS);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [shareCode, refresh]);

  return { progress, refresh };
}
