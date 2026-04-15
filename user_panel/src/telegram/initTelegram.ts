declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        expand?: () => void;
        initData?: string;
        version?: string;
        platform?: string;
        colorScheme?: 'light' | 'dark';
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

/**
 * Raw initData string for X-Telegram-Init-Data (signed by the user bot).
 * Some clients/ngrok flows fill `initData` late; others pass `tgWebAppData` in the URL hash.
 */
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

/**
 * Telegram sometimes fills initData shortly after load; wait before treating session as absent.
 */
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
 * The bot puts ?tg_auth=... in the mini-app URL so auth works in any browser.
 */
export function getBotAuthToken(): string | null {
  try {
    const sp = new URLSearchParams(window.location.search);
    const t = sp.get('tg_auth');
    if (t) return t;
    // Also check hash (Telegram appends tgWebAppData to hash alongside bot's params)
    const hp = new URLSearchParams(window.location.hash.slice(1));
    const ht = hp.get('tg_auth');
    if (ht) return ht;
  } catch {
    /* ignore */
  }
  return null;
}

export function buildUserApiJsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const init = getTelegramInitData();
  if (init) {
    headers['X-Telegram-Init-Data'] = init;
    // Alias used by many Mini App backends (e.g. kickoff X-Init-Data)
    headers['X-Init-Data'] = init;
  }
  return headers;
}

export function initTelegramWebApp(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;

    webApp.ready();
    try {
      if (typeof webApp.expand === 'function') webApp.expand();
    } catch {
      /* ignore */
    }
    
    // Set theme-related CSS variables if themeParams are available
    if (webApp.themeParams) {
      const theme = webApp.themeParams;
      
      if (theme.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color);
      }
      
      if (theme.text_color) {
        document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color);
      }
      
      if (theme.hint_color) {
        document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color);
      }
      
      if (theme.link_color) {
        document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color);
      }
      
      if (theme.button_color) {
        document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color);
      }
      
      if (theme.button_text_color) {
        document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color);
      }
    }
  }
}

