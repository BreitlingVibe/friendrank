import {
  captureShareCardPngBlob,
  downloadShareCardBlob,
  SHARE_CARD_PNG_FILENAME,
} from "@/lib/share/export-share-card-png";

export const SHARE_RESULTS_TITLE = "FriendRank Results";

export const NATIVE_SHARE_UNAVAILABLE_MESSAGE =
  "Native sharing isn't available in this browser. We downloaded your share card and copied the share text.";

export type ShareFriendRankProgress = "preparing" | "sharing";

export type ShareFriendRankResultsInput = {
  exportElement: HTMLElement;
  shareText: string;
  title?: string;
  onProgress?: (phase: ShareFriendRankProgress) => void;
};

export type ShareFriendRankResultsResult =
  | { status: "shared" }
  | { status: "fallback"; message: string }
  | { status: "cancelled" }
  | { status: "failed" };

export function canNativeShareFiles(): boolean {
  if (typeof navigator === "undefined" || typeof navigator.share !== "function") {
    return false;
  }

  if (typeof navigator.canShare !== "function") {
    return false;
  }

  try {
    const probeFile = new File(["probe"], SHARE_CARD_PNG_FILENAME, {
      type: "image/png",
    });

    return navigator.canShare({ files: [probeFile] });
  } catch {
    return false;
  }
}

async function copyShareText(shareText: string): Promise<void> {
  await navigator.clipboard.writeText(shareText);
}

async function shareWithNativeSheet(input: {
  blob: Blob;
  shareText: string;
  title: string;
}): Promise<void> {
  const file = new File([input.blob], SHARE_CARD_PNG_FILENAME, {
    type: "image/png",
  });

  await navigator.share({
    files: [file],
    title: input.title,
    text: input.shareText,
  });
}

async function fallbackShare(input: {
  blob: Blob;
  shareText: string;
}): Promise<void> {
  downloadShareCardBlob(input.blob);
  await copyShareText(input.shareText);
}

function isShareCancelled(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

/**
 * Generates a share-card PNG and opens the native share sheet when supported.
 * Falls back to download + clipboard copy without prompting the user.
 */
export async function shareFriendRankResults(
  input: ShareFriendRankResultsInput,
): Promise<ShareFriendRankResultsResult> {
  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    input.onProgress?.("preparing");
    const pngBlob = await captureShareCardPngBlob(input.exportElement);

    if (canNativeShareFiles()) {
      input.onProgress?.("sharing");

      try {
        await shareWithNativeSheet({
          blob: pngBlob,
          shareText: input.shareText,
          title: input.title ?? SHARE_RESULTS_TITLE,
        });

        return { status: "shared" };
      } catch (error) {
        if (isShareCancelled(error)) {
          return { status: "cancelled" };
        }

        throw error;
      }
    }

    await fallbackShare({
      blob: pngBlob,
      shareText: input.shareText,
    });

    return {
      status: "fallback",
      message: NATIVE_SHARE_UNAVAILABLE_MESSAGE,
    };
  } catch {
    return { status: "failed" };
  }
}

/**
 * Download-only helper for the secondary share-card action.
 */
export async function downloadFriendRankShareCard(
  exportElement: HTMLElement,
): Promise<boolean> {
  try {
    if (document.fonts?.ready) {
      await document.fonts.ready;
    }

    const pngBlob = await captureShareCardPngBlob(exportElement);
    downloadShareCardBlob(pngBlob);
    return true;
  } catch {
    return false;
  }
}
