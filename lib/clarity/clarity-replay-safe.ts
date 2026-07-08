type ClarityWindow = Window & {
  __CLARITY_REPLAY__?: boolean;
  clarity?: {
    playback?: boolean;
    replay?: boolean;
  };
};

/**
 * Best-effort detection of Microsoft Clarity session replay environments.
 * Normal recording is unaffected; this is used to disable unstable polling
 * and timed reveal animations during dashboard playback only.
 */
export function isClarityReplayEnvironment(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const win = window as ClarityWindow;

  if (win.__CLARITY_REPLAY__ === true) {
    return true;
  }

  if (win.clarity?.playback === true || win.clarity?.replay === true) {
    return true;
  }

  if (document.documentElement.dataset.clarityReplay === "true") {
    return true;
  }

  const searchParams = new URLSearchParams(window.location.search);
  if (
    searchParams.has("clarityReplay") ||
    searchParams.get("clarity") === "replay"
  ) {
    return true;
  }

  if (window.self !== window.top) {
    if (document.referrer.includes("clarity.ms")) {
      return true;
    }

    try {
      if (window.parent.location.hostname.includes("clarity.ms")) {
        return true;
      }
    } catch {
      // Cross-origin Clarity iframe replay shells often block parent access.
      if (document.referrer.includes("clarity.ms")) {
        return true;
      }
    }
  }

  return false;
}
