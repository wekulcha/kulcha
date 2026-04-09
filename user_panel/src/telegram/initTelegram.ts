declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
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

/** Raw initData string for X-Telegram-Init-Data (signed by the user bot). */
export function getTelegramInitData(): string {
  if (typeof window === 'undefined') return '';
  return window.Telegram?.WebApp?.initData ?? '';
}

/**
 * Telegram sometimes fills initData shortly after load; wait before treating session as absent.
 */
export async function waitForTelegramInitData(
  maxWaitMs = 2500,
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

export function buildUserApiJsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const init = getTelegramInitData();
  if (init) headers['X-Telegram-Init-Data'] = init;
  return headers;
}

export function initTelegramWebApp(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    
    // Initialize the WebApp
    webApp.ready();
    
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

