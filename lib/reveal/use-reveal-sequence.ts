"use client";

import { useEffect, useState } from "react";
import { buildRevealSteps } from "@/lib/reveal/sequence";
import type { RevealSequenceConfig } from "@/lib/reveal/types";

type UseRevealSequenceResult = {
  displayText: string;
  isVisible: boolean;
  isComplete: boolean;
};

export function useRevealSequence(
  config: RevealSequenceConfig,
  active: boolean,
): UseRevealSequenceResult {
  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(!active);
  const [displayText, setDisplayText] = useState(config.title);

  useEffect(() => {
    if (!active) {
      setIsComplete(true);
      return;
    }

    const steps = buildRevealSteps(config);

    setDisplayText(steps[0]?.text ?? config.title);
    setIsVisible(true);
    setIsComplete(false);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    for (let index = 0; index < steps.length; index += 1) {
      const step = steps[index];
      timeouts.push(
        setTimeout(() => {
          setDisplayText(step.text);
          setIsVisible(true);
        }, delay),
      );

      const fadeOutAt = delay + step.durationMs - config.fadeDurationMs;
      timeouts.push(
        setTimeout(() => {
          setIsVisible(false);
        }, fadeOutAt),
      );

      delay += step.durationMs;
    }

    timeouts.push(
      setTimeout(() => {
        setIsComplete(true);
      }, delay),
    );

    return () => {
      for (const timeout of timeouts) {
        clearTimeout(timeout);
      }
    };
  }, [active, config]);

  return {
    displayText,
    isVisible,
    isComplete,
  };
}
