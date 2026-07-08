"use client";

import { useEffect, useState } from "react";
import { isClarityReplayEnvironment } from "@/lib/clarity/clarity-replay-safe";

export function useClarityReplaySafeMode(): boolean {
  const [isReplayEnvironment, setIsReplayEnvironment] = useState(false);

  useEffect(() => {
    setIsReplayEnvironment(isClarityReplayEnvironment());
  }, []);

  return isReplayEnvironment;
}
