"use client";

import { useEffect, useState } from "react";
import { buildRevealSteps } from "@/lib/reveal/sequence";
import type {
  RevealSequenceConfig,
  RevealStepTone,
} from "@/lib/reveal/types";

type UseRevealSequenceResult = {
  displayText: string;
  animateDots: boolean;
  tone: RevealStepTone;
  isVisible: boolean;
  isComplete: boolean;
};

function getStepTone(
  step: { tone?: RevealStepTone },
  index: number,
): RevealStepTone {
  if (step.tone) {
    return step.tone;
  }

  return index === 0 ? "title" : "status";
}

export function useRevealSequence(
  config: RevealSequenceConfig,
  active: boolean,
): UseRevealSequenceResult {
  const firstStep = config.steps[0];

  const [isVisible, setIsVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(!active);
  const [displayText, setDisplayText] = useState(firstStep?.text ?? "");
  const [animateDots, setAnimateDots] = useState(
    firstStep?.animateDots ?? false,
  );
  const [tone, setTone] = useState<RevealStepTone>(
    firstStep ? getStepTone(firstStep, 0) : "title",
  );

  useEffect(() => {
    if (!active) {
      setIsComplete(true);
      return;
    }

    const steps = buildRevealSteps(config);
    const initialStep = steps[0];

    setDisplayText(initialStep?.text ?? "");
    setAnimateDots(initialStep?.animateDots ?? false);
    setTone(initialStep ? getStepTone(initialStep, 0) : "title");
    setIsVisible(true);
    setIsComplete(false);

    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    for (let index = 0; index < steps.length; index += 1) {
      const step = steps[index];

      timeouts.push(
        setTimeout(() => {
          setDisplayText(step.text);
          setAnimateDots(step.animateDots ?? false);
          setTone(getStepTone(step, index));
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
    animateDots,
    tone,
    isVisible,
    isComplete,
  };
}
