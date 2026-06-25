"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { HeroMomentStage } from "@/components/friend-rank-hero-moment";

export const CASCADE_BASE_OFFSET_MS = 120;
export const CASCADE_STAGGER_MS = 80;
export const CASCADE_DURATION_MS = 240;

type ResultsCascadeContextValue = {
  enabled: boolean;
  stage: HeroMomentStage;
  sectionCount: number;
  setSectionCount: (count: number) => void;
};

const ResultsCascadeContext = createContext<ResultsCascadeContextValue>({
  enabled: false,
  stage: "done",
  sectionCount: 0,
  setSectionCount: () => {},
});

export function ResultsCascadeProvider({
  enabled,
  stage,
  children,
}: {
  enabled: boolean;
  stage: HeroMomentStage;
  children: ReactNode;
}) {
  const [sectionCount, setSectionCount] = useState(0);

  const value = useMemo(
    () => ({
      enabled,
      stage,
      sectionCount,
      setSectionCount,
    }),
    [enabled, sectionCount, stage],
  );

  return (
    <ResultsCascadeContext.Provider value={value}>
      {children}
    </ResultsCascadeContext.Provider>
  );
}

export function useResultsCascade(): ResultsCascadeContextValue {
  return useContext(ResultsCascadeContext);
}

export function getCascadeCompletionMs(sectionCount: number): number {
  if (sectionCount <= 0) {
    return CASCADE_DURATION_MS;
  }

  return (
    Math.max(0, sectionCount - 1) * CASCADE_STAGGER_MS + CASCADE_DURATION_MS
  );
}

type ResultsCascadeSectionProps = {
  index: number;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a major results section for staggered post-hero reveal.
 */
export function ResultsCascadeSection({
  index,
  children,
  className,
}: ResultsCascadeSectionProps) {
  const { enabled, stage } = useResultsCascade();
  const active = !enabled || stage === "rest" || stage === "done";

  if (!enabled) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <div
      className={`friendrank-cascade-section${active ? " friendrank-cascade-section--active" : ""}${className ? ` ${className}` : ""}`}
      style={
        {
          "--cascade-delay": `${index * CASCADE_STAGGER_MS}ms`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
