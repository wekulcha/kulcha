declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        initData?: string;
        themeParams?: Record<string, string | undefined>;
      };
    };
  }
}

export function initTelegramWebApp(): void {
  if (typeof window === 'undefined' || !window.Telegram?.WebApp) return;
  window.Telegram.WebApp.ready();
}

export function getTelegramInitData(): string {
  if (typeof window === 'undefined') return '';
  return window.Telegram?.WebApp?.initData ?? '';
}

export function buildAdminApiJsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const init = getTelegramInitData();
  if (init) headers['X-Telegram-Init-Data'] = init;
  return headers;
}
