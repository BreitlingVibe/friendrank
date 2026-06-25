"use client";

import { createContext, useContext } from "react";

export type HeroMomentStage = "waiting" | "hero" | "rest" | "done";

type HeroMomentContextValue = {
  enabled: boolean;
  stage: HeroMomentStage;
};

const HeroMomentContext = createContext<HeroMomentContextValue>({
  enabled: false,
  stage: "done",
});

export function HeroMomentProvider({
  enabled,
  stage,
  children,
}: {
  enabled: boolean;
  stage: HeroMomentStage;
  children: React.ReactNode;
}) {
  return (
    <HeroMomentContext.Provider value={{ enabled, stage }}>
      {children}
    </HeroMomentContext.Provider>
  );
}

export function useHeroMoment(): HeroMomentContextValue {
  return useContext(HeroMomentContext);
}

export const HERO_MOMENT_DELAY_MS = 150;
export const HERO_REST_OFFSET_MS = 120;
