/** Разделитель частей локации на рынке (этаж · линия · павильон). */
export const LOCATION_PARTS_SEP = ' · ';

export function parseLocationParts(address: string | null | undefined): {
  floor: string;
  line: string;
  pavilion: string;
} {
  const raw = address?.trim() ?? '';
  if (!raw) return { floor: '', line: '', pavilion: '' };
  const parts = raw.split(LOCATION_PARTS_SEP).map((s) => s.trim());
  if (parts.length >= 3) {
    return { floor: parts[0] ?? '', line: parts[1] ?? '', pavilion: parts[2] ?? '' };
  }
  return { floor: raw, line: '', pavilion: '' };
}

export function formatLocationParts(floor: string, line: string, pavilion: string): string {
  return [floor, line, pavilion]
    .map((s) => s.trim())
    .filter(Boolean)
    .join(LOCATION_PARTS_SEP);
}

export function formatLocationShort(address: string | null | undefined): string {
  const { floor, line, pavilion } = parseLocationParts(address);
  return [floor, line, pavilion]
    .map((value) => value.trim())
    .filter(Boolean)
    .join('-');
}
