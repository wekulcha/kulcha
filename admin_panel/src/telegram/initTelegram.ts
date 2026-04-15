declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand?: () => void;
        initData?: string;
        themeParams?: Record<string, string | undefined>;
      };
    };
  }
}

export function initTelegramWebApp(): void {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) return;
  const webApp = window.Telegram.WebApp;
  webApp.ready();
  try {
    if (typeof webApp.expand === 'function') webApp.expand();
  } catch {
    /* ignore */
  }
}

export function getTelegramInitData(): string {
  if (typeof window === 'undefined') return '';
  const api = window.Telegram?.WebApp?.initData;
  if (api && api.length > 0) return api;
  try {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const qp = new URLSearchParams(hash);
      const fromHash = qp.get('tgWebAppData');
      if (fromHash) return decodeURIComponent(fromHash);
    }
    const sp = new URLSearchParams(window.location.search);
    const fromSearch = sp.get('tgWebAppData');
    if (fromSearch) return decodeURIComponent(fromSearch);
  } catch {
    /* ignore */
  }
  return '';
}

/** Wait until initData is available (Telegram can populate it shortly after load). */
export async function waitForTelegramInitData(
  maxWaitMs = 12000,
  stepMs = 50
): Promise<string> {
  const deadline = Date.now() + maxWaitMs;
  while (Date.now() < deadline) {
    const d = getTelegramInitData();
    if (d) return d;
    await new Promise((r) => setTimeout(r, stepMs));
  }
  return getTelegramInitData();
}

/**
 * Reads the bot-generated HMAC auth token from the URL.
 * The admin bot puts ?tg_auth=... in the mini-app URL so auth works in any browser.
 */
export function getBotAuthToken(): string | null {
  try {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get('tg_auth');
    if (t) return t;
    const hp = new URLSearchParams(window.location.hash.slice(1));
    const ht = hp.get('tg_auth');
    if (ht) return ht;
  } catch {
    /* ignore */
  }
  return null;
}

export function buildAdminApiJsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const init = getTelegramInitData();
  if (init) {
    headers['X-Telegram-Init-Data'] = init;
    headers['X-Init-Data'] = init;
  }
  return headers;
}
