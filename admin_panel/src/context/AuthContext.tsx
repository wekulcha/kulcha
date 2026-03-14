import React, { createContext, useContext, useState, useCallback } from "react";

const STORAGE_KEY = "kulcha_admin_user_id";

interface AuthContextValue {
  currentUserId: number | null;
  setCurrentUserId: (id: number | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStored(): number | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw == null) return null;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUserId, setState] = useState<number | null>(readStored);

  const setCurrentUserId = useCallback((id: number | null) => {
    setState(id);
    if (id != null) {
      localStorage.setItem(STORAGE_KEY, String(id));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
}
