import { headers } from "next/headers";
import { PRODUCTION_APP_URL } from "@/lib/app-url";
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

  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  return PRODUCTION_APP_URL;
}

export async function getGameShareUrlForRequest(
  shareCode: string,
): Promise<string> {
  const origin = await getRequestOrigin();
  return getGameShareUrl(shareCode, origin);
}
