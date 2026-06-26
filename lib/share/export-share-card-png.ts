import { toPng } from "html-to-image";
import { SHARE_CARD_DIMENSIONS } from "@/lib/share/share-card-presentation";

export const SHARE_CARD_PNG_FILENAME = "friendrank-share-card.png";

const STORY_CARD = SHARE_CARD_DIMENSIONS.story;

export async function exportShareCardElement(
  element: HTMLElement,
): Promise<void> {
  const dataUrl = await toPng(element, {
    width: STORY_CARD.width,
    height: STORY_CARD.height,
    pixelRatio: 1,
    cacheBust: true,
    skipAutoScale: true,
  });

  const link = document.createElement("a");
  link.download = SHARE_CARD_PNG_FILENAME;
  link.href = dataUrl;
  link.click();
}
