"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/reveal/use-prefers-reduced-motion";

export const COPY_SHARE_BUTTON_LABEL = "📋 Copy Share Text";

export const COPY_CELEBRATION_MESSAGES = [
  "✨ Shared-worthy. Copied.",
  "📋 Copied to clipboard.",
  "🔥 Group chat ready.",
  "✅ Copied. Send it.",
] as const;

export const COPY_FAILED_LABEL = "Copy failed — try again";

const COPY_FEEDBACK_MS = 1800;
const COPY_CELEBRATION_ANIMATION_MS = 180;

export function pickCopyCelebrationMessage(seed: number): string {
  const index = Math.abs(seed) % COPY_CELEBRATION_MESSAGES.length;
  return COPY_CELEBRATION_MESSAGES[index];
}

type CopyButtonState = "idle" | "success" | "error";

type FriendRankCopyShareButtonProps = {
  shareText: string;
  celebrationSeed: number;
};

export function FriendRankCopyShareButton({
  shareText,
  celebrationSeed,
}: FriendRankCopyShareButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<CopyButtonState>("idle");
  const [isAnimating, setIsAnimating] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);
  const animationTimeoutRef = useRef<number | null>(null);

  const celebrationMessage = useMemo(
    () => pickCopyCelebrationMessage(celebrationSeed),
    [celebrationSeed],
  );

  function clearTimers() {
    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }

    if (animationTimeoutRef.current !== null) {
      window.clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }
  }

  useEffect(() => () => clearTimers(), []);

  async function handleClick() {
    clearTimers();
    setIsAnimating(false);

    try {
      await navigator.clipboard.writeText(shareText);
      setState("success");

      if (!prefersReducedMotion) {
        setIsAnimating(true);
        animationTimeoutRef.current = window.setTimeout(() => {
          setIsAnimating(false);
        }, COPY_CELEBRATION_ANIMATION_MS);
      }

      resetTimeoutRef.current = window.setTimeout(() => {
        setState("idle");
      }, COPY_FEEDBACK_MS);
    } catch {
      setState("error");
      resetTimeoutRef.current = window.setTimeout(() => {
        setState("idle");
      }, COPY_FEEDBACK_MS);
    }
  }

  const label =
    state === "success"
      ? celebrationMessage
      : state === "error"
        ? COPY_FAILED_LABEL
        : COPY_SHARE_BUTTON_LABEL;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10${
        isAnimating ? " friendrank-copy-celebrate" : ""
      }`}
    >
      {label}
    </button>
  );
}
