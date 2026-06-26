"use client";

import { useEffect, useRef, useState } from "react";
import { FriendRankCopyShareButton } from "@/components/friend-rank-copy-share-button";
import { FriendRankShareCardFromPresentation } from "@/components/friend-rank-share-card-from-presentation";
import {
  downloadFriendRankShareCard,
  shareFriendRankResults,
} from "@/lib/share/native-share";
import type { ResultsPresentation } from "@/lib/results/presentation";
import { SHARE_CARD_DIMENSIONS } from "@/lib/share/share-card-presentation";

type FriendRankResultsShareSectionProps = {
  presentation: ResultsPresentation;
  shareText: string;
};

type ShareState =
  | "idle"
  | "preparing"
  | "sharing"
  | "shared"
  | "fallback"
  | "failed";

type DownloadState = "idle" | "preparing" | "downloaded" | "failed";

const STORY_CARD = SHARE_CARD_DIMENSIONS.story;
const FEEDBACK_MS = 1800;

const SHARE_BUTTON_LABEL: Record<ShareState, string> = {
  idle: "📤 Share Results",
  preparing: "Preparing...",
  sharing: "Opening Share Sheet...",
  shared: "Shared!",
  fallback: "Downloaded instead",
  failed: "Share failed",
};

const DOWNLOAD_BUTTON_LABEL: Record<DownloadState, string> = {
  idle: "📥 Download Share Card",
  preparing: "Preparing...",
  downloaded: "Downloaded",
  failed: "Export failed",
};

export function FriendRankResultsShareSection({
  presentation,
  shareText,
}: FriendRankResultsShareSectionProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [shareState, setShareState] = useState<ShareState>("idle");
  const [downloadState, setDownloadState] = useState<DownloadState>("idle");
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);
  const [scale, setScale] = useState(0.3);

  const viewportRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const shareResetTimeoutRef = useRef<number | null>(null);
  const downloadResetTimeoutRef = useRef<number | null>(null);
  const fallbackResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!previewOpen) {
      return;
    }

    function updateScale() {
      const viewport = viewportRef.current;
      if (!viewport) {
        return;
      }

      const padding = 16;
      const availableWidth = viewport.clientWidth - padding;
      const availableHeight = Math.min(window.innerHeight * 0.72, 820);

      const nextScale = Math.min(
        availableWidth / STORY_CARD.width,
        availableHeight / STORY_CARD.height,
        1,
      );

      setScale(Math.max(nextScale, 0.16));
    }

    updateScale();
    window.addEventListener("resize", updateScale);

    return () => window.removeEventListener("resize", updateScale);
  }, [previewOpen]);

  useEffect(
    () => () => {
      if (shareResetTimeoutRef.current !== null) {
        window.clearTimeout(shareResetTimeoutRef.current);
      }

      if (downloadResetTimeoutRef.current !== null) {
        window.clearTimeout(downloadResetTimeoutRef.current);
      }

      if (fallbackResetTimeoutRef.current !== null) {
        window.clearTimeout(fallbackResetTimeoutRef.current);
      }
    },
    [],
  );

  function scheduleShareReset(nextState: ShareState) {
    if (shareResetTimeoutRef.current !== null) {
      window.clearTimeout(shareResetTimeoutRef.current);
    }

    shareResetTimeoutRef.current = window.setTimeout(() => {
      setShareState("idle");
      shareResetTimeoutRef.current = null;
    }, FEEDBACK_MS);

    setShareState(nextState);
  }

  function scheduleDownloadReset(nextState: DownloadState) {
    if (downloadResetTimeoutRef.current !== null) {
      window.clearTimeout(downloadResetTimeoutRef.current);
    }

    downloadResetTimeoutRef.current = window.setTimeout(() => {
      setDownloadState("idle");
      downloadResetTimeoutRef.current = null;
    }, FEEDBACK_MS);

    setDownloadState(nextState);
  }

  function showFallbackMessage(message: string) {
    setFallbackMessage(message);

    if (fallbackResetTimeoutRef.current !== null) {
      window.clearTimeout(fallbackResetTimeoutRef.current);
    }

    fallbackResetTimeoutRef.current = window.setTimeout(() => {
      setFallbackMessage(null);
      fallbackResetTimeoutRef.current = null;
    }, FEEDBACK_MS);
  }

  async function handleShare() {
    const exportNode = exportRef.current;
    if (
      !exportNode ||
      shareState === "preparing" ||
      shareState === "sharing"
    ) {
      return;
    }

    setShareState("preparing");
    setFallbackMessage(null);

    const result = await shareFriendRankResults({
      exportElement: exportNode,
      shareText,
      onProgress: (phase) => {
        setShareState(phase === "preparing" ? "preparing" : "sharing");
      },
    });

    if (result.status === "shared") {
      scheduleShareReset("shared");
      return;
    }

    if (result.status === "fallback") {
      showFallbackMessage(result.message);
      scheduleShareReset("fallback");
      return;
    }

    if (result.status === "cancelled") {
      setShareState("idle");
      return;
    }

    scheduleShareReset("failed");
  }

  async function handleDownload() {
    const exportNode = exportRef.current;
    if (!exportNode || downloadState === "preparing") {
      return;
    }

    setDownloadState("preparing");

    const success = await downloadFriendRankShareCard(exportNode);
    scheduleDownloadReset(success ? "downloaded" : "failed");
  }

  const scaledWidth = STORY_CARD.width * scale;
  const scaledHeight = STORY_CARD.height * scale;
  const shareBusy = shareState === "preparing" || shareState === "sharing";

  return (
    <>
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleShare}
          disabled={shareBusy}
          className="w-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 py-4 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:from-violet-500 hover:to-cyan-500 disabled:cursor-wait disabled:opacity-85"
        >
          {SHARE_BUTTON_LABEL[shareState]}
        </button>

        {fallbackMessage && (
          <p className="px-1 text-center text-xs leading-relaxed text-slate-400">
            {fallbackMessage}
          </p>
        )}

        {!previewOpen ? (
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="w-full rounded-full border border-violet-400/25 bg-violet-500/10 py-3.5 text-sm font-semibold text-violet-100 transition hover:border-violet-400/40 hover:bg-violet-500/15"
          >
            👀 Preview Share Card
          </button>
        ) : (
          <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm leading-relaxed text-violet-200/90">
                Preview of the image-style card you&apos;ll be able to share.
              </p>
              <button
                type="button"
                onClick={() => setPreviewOpen(false)}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <div
              ref={viewportRef}
              className="mt-4 flex justify-center overflow-hidden rounded-xl border border-white/10 bg-black/30 p-2"
            >
              <div
                className="relative overflow-hidden rounded-lg shadow-2xl shadow-violet-500/20"
                style={{ width: scaledWidth, height: scaledHeight }}
              >
                <div
                  style={{
                    width: STORY_CARD.width,
                    height: STORY_CARD.height,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                  }}
                >
                  <FriendRankShareCardFromPresentation
                    presentation={presentation}
                    format="story"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        <button
          type="button"
          onClick={handleDownload}
          disabled={downloadState === "preparing"}
          className="w-full rounded-full border border-cyan-400/25 bg-cyan-500/10 py-3.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 disabled:cursor-wait disabled:opacity-80"
        >
          {DOWNLOAD_BUTTON_LABEL[downloadState]}
        </button>

        <FriendRankCopyShareButton
          shareText={shareText}
          celebrationSeed={presentation.seed}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0 opacity-0"
      >
        <div ref={exportRef}>
          <FriendRankShareCardFromPresentation
            presentation={presentation}
            format="story"
          />
        </div>
      </div>
    </>
  );
}
