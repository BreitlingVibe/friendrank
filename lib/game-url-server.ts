import { headers } from "next/headers";
import { getGameShareUrl } from "@/lib/game-url";

async function getRequestOrigin(): Promise<string> {
  const configuredOrigin = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
  if (configuredOrigin) {
    return configuredOrigin;
  }

  const headersList = await headers();
  const host =
    headersList.get("x-forwarded-host") ?? headersList.get("host");

  if (host) {
    const forwardedProto = headersList.get("x-forwarded-proto");
    const protocol =
      forwardedProto ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1")
        ? "http"
        : "https");
    return `${protocol}://${host}`;
  }

  const vercelUrl = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}

export async function getGameShareUrlForRequest(
  shareCode: string,
): Promise<string> {
  const origin = await getRequestOrigin();
  return getGameShareUrl(shareCode, origin);
}
