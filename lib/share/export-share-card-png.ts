import { toPng } from "html-to-image";
import { SHARE_CARD_DIMENSIONS } from "@/lib/share/share-card-presentation";

export const SHARE_CARD_PNG_FILENAME = "friendrank-share-card.png";

const STORY_CARD = SHARE_CARD_DIMENSIONS.story;

const SHARE_CARD_CAPTURE_OPTIONS = {
  width: STORY_CARD.width,
  height: STORY_CARD.height,
  pixelRatio: 1,
  cacheBust: true,
  skipAutoScale: true,
} as const;

export async function captureShareCardPngBlob(
  element: HTMLElement,
): Promise<Blob> {
  const dataUrl = await toPng(element, SHARE_CARD_CAPTURE_OPTIONS);
  const response = await fetch(dataUrl);
  return response.blob();
}

export function downloadShareCardBlob(blob: Blob): void {
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = SHARE_CARD_PNG_FILENAME;
  link.href = objectUrl;
  link.click();
  URL.revokeObjectURL(objectUrl);
}

export async function exportShareCardElement(
  element: HTMLElement,
): Promise<void> {
  const dataUrl = await toPng(element, SHARE_CARD_CAPTURE_OPTIONS);

  const link = document.createElement("a");
  link.download = SHARE_CARD_PNG_FILENAME;
  link.href = dataUrl;
  link.click();
}
