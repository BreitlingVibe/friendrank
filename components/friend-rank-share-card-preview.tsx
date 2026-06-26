"use client";

import { useEffect, useRef, useState } from "react";
import { FriendRankShareCardFromPresentation } from "@/components/friend-rank-share-card-from-presentation";
import { exportShareCardElement } from "@/lib/share/export-share-card-png";
import type { ResultsPresentation } from "@/lib/results/presentation";
import { SHARE_CARD_DIMENSIONS } from "@/lib/share/share-card-presentation";

type FriendRankShareCardPreviewProps = {
  presentation: ResultsPresentation;
};

type ExportState = "idle" | "preparing" | "downloaded" | "failed";

const STORY_CARD = SHARE_CARD_DIMENSIONS.story;
const EXPORT_FEEDBACK_MS = 1800;

const EXPORT_BUTTON_LABEL: Record<ExportState, string> = {
  idle: "Download Share Card",
  preparing: "Preparing...",
  downloaded: "Downloaded",
  failed: "Export failed",
};

export function FriendRankShareCardPreview({
  presentation,
}: FriendRankShareCardPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(0.3);
  const [exportState, setExportState] = useState<ExportState>("idle");
  const viewportRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const exportResetTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
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
  }, [isOpen]);

  useEffect(
    () => () => {
      if (exportResetTimeoutRef.current !== null) {
        window.clearTimeout(exportResetTimeoutRef.current);
      }
    },
    [],
  );

  function scheduleExportReset() {
    if (exportResetTimeoutRef.current !== null) {
      window.clearTimeout(exportResetTimeoutRef.current);
    }

    exportResetTimeoutRef.current = window.setTimeout(() => {
      setExportState("idle");
      exportResetTimeoutRef.current = null;
    }, EXPORT_FEEDBACK_MS);
  }

  async function handleDownload() {
    const exportNode = exportRef.current;
    if (!exportNode || exportState === "preparing") {
      return;
    }

    setExportState("preparing");

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      await exportShareCardElement(exportNode);
      setExportState("downloaded");
      scheduleExportReset();
    } catch {
      setExportState("failed");
      scheduleExportReset();
    }
  }

  const previewButton = !isOpen ? (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="w-full rounded-full border border-violet-400/25 bg-violet-500/10 py-3.5 text-sm font-semibold text-violet-100 transition hover:border-violet-400/40 hover:bg-violet-500/15"
    >
      Preview Share Card
    </button>
  ) : null;

  const downloadButton = (
    <button
      type="button"
      onClick={handleDownload}
      disabled={exportState === "preparing"}
      className="w-full rounded-full border border-cyan-400/25 bg-cyan-500/10 py-3.5 text-sm font-semibold text-cyan-100 transition hover:border-cyan-400/40 hover:bg-cyan-500/15 disabled:cursor-wait disabled:opacity-80"
    >
      {EXPORT_BUTTON_LABEL[exportState]}
    </button>
  );

  const scaledWidth = STORY_CARD.width * scale;
  const scaledHeight = STORY_CARD.height * scale;

  return (
    <>
      {!isOpen ? (
        <div className="flex flex-col gap-2 pt-1">
          {previewButton}
          {downloadButton}
        </div>
      ) : (
        <section className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm leading-relaxed text-violet-200/90">
              Preview of the image-style card you&apos;ll be able to share.
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
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

          <div className="mt-3">{downloadButton}</div>
        </section>
      )}

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
