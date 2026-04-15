import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { BASE_URL } from '../api/baseUrl';
import { buildUserApiJsonHeaders, getBotAuthToken, waitForTelegramInitData } from '../telegram/initTelegram';

interface AuthContextValue {
  currentUserId: number | null;
  authReady: boolean;
  authError: string | null;
  reloadAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface UserDto {
  id: number;
}

type ResolveResult =
  | { ok: true; userId: number }
  | { ok: false; reason: 'no_telegram_context' | 'not_registered' | 'network' };

const FETCH_TIMEOUT_MS = 12_000;

async function fetchWithTimeout(
  input: string,
  init: RequestInit,
  timeoutMs = FETCH_TIMEOUT_MS
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = window.setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: ctrl.signal });
  } finally {
    window.clearTimeout(timer);
  }
}

async function resolveSession(): Promise<ResolveResult> {
  // 1. Bot-generated HMAC token в URL — работает в любом браузере (Desktop, mobile, web)
  const botToken = getBotAuthToken();
  if (botToken) {
    try {
      const resp = await fetchWithTimeout(`${BASE_URL}/auth/verify-user-bot-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: botToken }),
      });
      if (resp.ok) {
        const data = (await resp.json()) as UserDto;
        if (data.id != null) return { ok: true, userId: data.id };
      } else if (resp.status === 404) {
        return { ok: false, reason: 'not_registered' };
      }
      // 401/other: token invalid/expired — fall through to initData
    } catch {
      // network error — fall through
    }
  }

  // 2. Telegram WebApp initData (работает в Telegram WebView)
  // Короткие окна ожидания: раньше суммарно до ~20 с опроса — из-за этого «Проверяем вход…» висел долго.
  let init = await waitForTelegramInitData(4500, 50);
  if (!init) {
    await new Promise((r) => setTimeout(r, 250));
    init = await waitForTelegramInitData(3500, 50);
  }
  if (!init) {
    return { ok: false, reason: 'no_telegram_context' };
  }
  try {
    const resp = await fetchWithTimeout(`${BASE_URL}/auth/webapp-user`, {
      method: 'POST',
      headers: buildUserApiJsonHeaders(),
      body: JSON.stringify({}),
    });
    if (!resp.ok) {
      return { ok: false, reason: 'not_registered' };
    }
    const data = (await resp.json()) as UserDto;
    if (data.id == null) {
      return { ok: false, reason: 'not_registered' };
    }
    return { ok: true, userId: data.id };
  } catch {
    return { ok: false, reason: 'network' };
  }
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const reloadAuth = useCallback(() => {
    setAuthReady(false);
    setAuthError(null);
    void resolveSession()
      .then((result) => {
        if (result.ok) {
          setCurrentUserId(result.userId);
          setAuthError(null);
          return;
        }
        setCurrentUserId(null);
        if (result.reason === 'no_telegram_context') {
          setAuthError(
            'Откройте мини-приложение из бота KULCHA (кнопка в меню или клавиатуре).'
          );
        } else if (result.reason === 'not_registered') {
          setAuthError(
            'Сначала зарегистрируйтесь: откройте бота KULCHA и нажмите /start, поделитесь номером телефона.'
          );
        } else {
          setAuthError('Не удалось подключиться к серверу. Попробуйте позже.');
        }
      })
      .catch(() => {
        setAuthError('Не удалось подключиться к серверу. Попробуйте позже.');
        setCurrentUserId(null);
      })
      .finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    reloadAuth();
  }, [reloadAuth]);

  return (
    <AuthContext.Provider value={{ currentUserId, authReady, authError, reloadAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthContextProvider');
  return ctx;
}
