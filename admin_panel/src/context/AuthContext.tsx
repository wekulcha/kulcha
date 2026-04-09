import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { BASE_URL } from "../api/baseUrl";
import {
  buildAdminApiJsonHeaders,
  waitForTelegramInitData,
} from "../telegram/initTelegram";
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

type LoadResult =
  | { ok: true; user: AdminUser; restaurants: AdminRestaurant[] }
  | {
      ok: false;
      reason: "no_telegram_context" | "no_access" | "network";
    };

async function loadSession(): Promise<LoadResult> {
  const init = await waitForTelegramInitData();
  if (!init) {
    return { ok: false, reason: "no_telegram_context" };
  }
  try {
    const resp = await fetch(`${BASE_URL}/auth/webapp-admin`, {
      method: "POST",
      headers: buildAdminApiJsonHeaders(),
      body: JSON.stringify({}),
    });
    if (!resp.ok) {
      return { ok: false, reason: "no_access" };
    }
    const data = (await resp.json()) as SessionResponse;
    return {
      ok: true,
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
  } catch {
    return { ok: false, reason: "network" };
  }
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
      .then((result) => {
        if (result.ok) {
          setUser(result.user);
          setRestaurants(result.restaurants);
          setAuthError(null);
          return;
        }
        setUser(null);
        setRestaurants([]);
        if (result.reason === "no_telegram_context") {
          setAuthError(
            "Откройте панель из Telegram-бота администратора (кнопка «Открыть панель» или меню «ПАНЕЛЬ»)."
          );
        } else if (result.reason === "no_access") {
          setAuthError(
            "Нет доступа. Убедитесь, что вы добавлены как сотрудник ресторана, и откройте панель из бота."
          );
        } else {
          setAuthError("Не удалось подключиться к серверу.");
        }
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
