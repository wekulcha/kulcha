import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { BASE_URL } from '../api/baseUrl';
import { buildUserApiJsonHeaders, waitForTelegramInitData } from '../telegram/initTelegram';

interface AuthContextValue {
  currentUserId: number | null;
  authReady: boolean;
  authError: string | null;
  reloadAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface UserDto {
  id: number;
  telegramId?: number | null;
}

type ResolveResult =
  | { ok: true; userId: number }
  | { ok: false; reason: 'no_telegram_context' | 'not_registered' | 'network' };

async function resolveSession(): Promise<ResolveResult> {
  const init = await waitForTelegramInitData();
  if (!init) {
    return { ok: false, reason: 'no_telegram_context' };
  }
  try {
    const resp = await fetch(`${BASE_URL}/auth/webapp-user`, {
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
