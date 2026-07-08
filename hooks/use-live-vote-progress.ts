"use client";

import { useCallback, useEffect, useState } from "react";
import { isClarityReplayEnvironment } from "@/lib/clarity/clarity-replay-safe";
import { getVoteProgressAction } from "@/app/actions/votes";
import {
  mergeVoteProgressIfChanged,
} from "@/lib/votes/progress-equality";
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
    if (!shareCode || isClarityReplayEnvironment()) {
      return;
    }

    const result = await getVoteProgressAction({ shareCode });
    if (result.ok) {
      setProgress((current) =>
        mergeVoteProgressIfChanged(current, result.progress),
      );
    }
  }, [shareCode]);

  useEffect(() => {
    if (!initialProgress) {
      return;
    }

    setProgress((current) =>
      mergeVoteProgressIfChanged(current, initialProgress),
    );
  }, [
    initialProgress?.hasVoted,
    initialProgress?.isUnlocked,
    initialProgress?.voteCount,
    initialProgress?.votesRequired,
  ]);

  useEffect(() => {
    if (!shareCode || isClarityReplayEnvironment()) {
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
