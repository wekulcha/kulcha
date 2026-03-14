import React from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { useAuth } from "../../context/AuthContext";

export const AdminProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserId, setCurrentUserId } = useAuth();

  return (
    <>
      <AdminHeader
        title="Профиль"
        showBack={false}
        onBurgerClick={() => navigate("/")}
        showSearch={false}
      />

      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 bg-gradient-to-b from-slate-50 to-slate-100 space-y-4">
        <section className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-2">
          <div className="text-sm font-semibold text-slate-900">
            Сессия администратора
          </div>
          <div className="text-xs text-slate-500">
            Текущий пользователь (ID) используется для отображения «Мои рестораны».
          </div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Текущий User ID</span>
              <span className="font-mono text-slate-800">
                {currentUserId ?? "—"}
              </span>
            </div>
            {currentUserId != null && (
              <button
                type="button"
                className="text-xs text-slate-600 underline"
                onClick={() => setCurrentUserId(null)}
              >
                Выйти (очистить сессию)
              </button>
            )}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-1">
          <button
            type="button"
            className="w-full flex items-center justify-between py-2 text-sm text-slate-800"
            onClick={() => alert("Политика конфиденциальности (заглушка)")}
          >
            <span>Политика конфиденциальности</span>
            <span className="text-slate-400 text-xs">›</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-between py-2 text-sm text-slate-800"
            onClick={() => alert("Пользовательское соглашение (заглушка)")}
          >
            <span>Пользовательское соглашение</span>
            <span className="text-slate-400 text-xs">›</span>
          </button>
        </section>
      </main>
    </>
  );
};

