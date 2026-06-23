export function getGameSharePath(shareCode: string): string {
  return `/game/${shareCode}`;
}

export function getGameShareUrl(shareCode: string, origin: string): string {
  return `${origin.replace(/\/$/, "")}${getGameSharePath(shareCode)}`;
}

export function getInviteLinkText(shareCode: string, origin: string): string {
  return `I made a FriendRank game for our group 😂 Vote here: ${getGameShareUrl(shareCode, origin)}`;
}
