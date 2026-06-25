export function pickIndex(seed: number, offset: number, length: number): number {
  if (length === 0) return 0;
  return Math.abs(seed + offset * 17) % length;
}
