const VOTER_TOKEN_PREFIX = "friendrank:voter:";

export function getVoterTokenStorageKey(shareCode: string): string {
  return `${VOTER_TOKEN_PREFIX}${shareCode}`;
}

export function getOrCreateVoterToken(shareCode: string): string {
  if (typeof window === "undefined") {
    return "";
  }

  const key = getVoterTokenStorageKey(shareCode);
  const existing = window.localStorage.getItem(key);
  if (existing) {
    return existing;
  }

  const token = crypto.randomUUID();
  window.localStorage.setItem(key, token);
  return token;
}
