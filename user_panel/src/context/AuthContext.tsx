import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { BASE_URL } from '../api/baseUrl';
import { buildUserApiJsonHeaders, getTelegramInitData } from '../telegram/initTelegram';

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

async function resolveSession(): Promise<number | null> {
  const init = getTelegramInitData();
  if (!init) return null;
  const resp = await fetch(`${BASE_URL}/auth/webapp-user`, {
    method: 'POST',
    headers: buildUserApiJsonHeaders(),
    body: JSON.stringify({}),
  });
  if (!resp.ok) return null;
  const data = (await resp.json()) as UserDto;
  return data.id ?? null;
}

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const reloadAuth = useCallback(() => {
    setAuthReady(false);
    setAuthError(null);
    void resolveSession()
      .then((id) => {
        setCurrentUserId(id);
        if (!getTelegramInitData()) {
          setAuthError('Откройте мини-приложение из бота KULCHA (кнопка в меню).');
        } else if (id == null) {
          setAuthError(
            'Сначала зарегистрируйтесь: откройте бота KULCHA и нажмите /start, поделитесь номером телефона.'
          );
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
