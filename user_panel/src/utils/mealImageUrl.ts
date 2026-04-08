import { BASE_URL } from '../api/baseUrl';

/** Turn stored image_link into a browser URL (supports data URLs, absolute URLs, and /api/v1/... paths). */
export function mealImageUrl(link: string | null | undefined): string {
  if (link == null || link === '') return '';
  if (link.startsWith('http://') || link.startsWith('https://') || link.startsWith('data:')) {
    return link;
  }
  if (link.startsWith('/')) {
    try {
      return new URL(BASE_URL).origin + link;
    } catch {
      return link;
    }
  }
  return link;
}
