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

/** Wait until initData is available (Telegram can populate it shortly after load). */
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

export function buildAdminApiJsonHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const init = getTelegramInitData();
  if (init) headers['X-Telegram-Init-Data'] = init;
  return headers;
}
