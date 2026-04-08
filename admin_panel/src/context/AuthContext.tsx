import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL } from "../api/baseUrl";
import { buildAdminApiJsonHeaders, getTelegramInitData } from "../telegram/initTelegram";
import type { AdminRestaurant } from "../types/adminRestaurant";

interface AdminUser {
  id: number;
  username: string;
  phone: string;
  telegram_id: number | null;
}

interface AuthContextValue {
  currentUserId: number | null;
  user: AdminUser | null;
  restaurants: AdminRestaurant[];
  authReady: boolean;
  authError: string | null;
  reloadAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface SessionResponse {
  user: {
    id: number;
    username: string;
    phone: string;
    telegramId?: number | null;
  };
  restaurants: {
    id: number;
    name: string;
    address: string;
    permissions: string[];
  }[];
}

async function loadSession(): Promise<{
  user: AdminUser;
  restaurants: AdminRestaurant[];
} | null> {
  const init = getTelegramInitData();
  if (!init) return null;
  const resp = await fetch(`${BASE_URL}/auth/webapp-admin`, {
    method: "POST",
    headers: buildAdminApiJsonHeaders(),
    body: JSON.stringify({}),
  });
  if (!resp.ok) return null;
  const data = (await resp.json()) as SessionResponse;
  return {
    user: {
      id: data.user.id,
      username: data.user.username,
      phone: data.user.phone,
      telegram_id: data.user.telegramId ?? null,
    },
    restaurants: (data.restaurants ?? []).map((r) => ({
      id: r.id,
      name: r.name,
      address: r.address,
      permissions: r.permissions ?? [],
    })),
  };
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const reloadAuth = useCallback(() => {
    setAuthReady(false);
    setAuthError(null);
    void loadSession()
      .then((session) => {
        if (!getTelegramInitData()) {
          setUser(null);
          setRestaurants([]);
          setAuthError(
            "Откройте панель из Telegram-бота администратора (кнопка «Открыть панель»)."
          );
          return;
        }
        if (session == null) {
          setUser(null);
          setRestaurants([]);
          setAuthError(
            "Нет доступа. Убедитесь, что вы добавлены как сотрудник ресторана, и откройте панель из бота."
          );
          return;
        }
        setUser(session.user);
        setRestaurants(session.restaurants);
      })
      .catch(() => {
        setAuthError("Не удалось подключиться к серверу.");
        setUser(null);
        setRestaurants([]);
      })
      .finally(() => setAuthReady(true));
  }, []);

  useEffect(() => {
    reloadAuth();
  }, [reloadAuth]);

  const currentUserId = user?.id ?? null;

  return (
    <AuthContext.Provider
      value={{
        currentUserId,
        user,
        restaurants,
        authReady,
        authError,
        reloadAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
}
