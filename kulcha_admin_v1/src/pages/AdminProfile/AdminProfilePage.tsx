import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";

const mockAdmin = {
  id: 999999,
  name: "Admin User",
  username: "@kulcha_admin",
  phone: "+7 900 000-00-00",
};

export const AdminProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string>(mockAdmin.phone);

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
            Данные администратора
          </div>
          <div className="text-xs text-slate-500">
            Эти данные используются для управления ресторанами и связи с
            поддержкой.
          </div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">ID</span>
              <span className="font-mono text-slate-800">{mockAdmin.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Имя</span>
              <span className="text-slate-800">{mockAdmin.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Username</span>
              <span className="text-slate-800">{mockAdmin.username}</span>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1">Телефон</div>
              <input
                type="tel"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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

