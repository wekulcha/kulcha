import { useState } from 'react';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';

const mockUser = {
  id: 123456789,
  username: '@kulcha_user',
  phone: '+7 900 000-00-00',
};

export function ProfilePage() {
  const [phone, setPhone] = useState<string>(mockUser.phone);

  return (
    <MiniAppShell>
      <Header title="Профиль" showSearch={false} />
      <main className="mt-4 space-y-4 pb-20">
        {/* User info card */}
        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">Ваши данные</div>
          <div className="text-xs text-slate-500">
            Эти данные будут использоваться для оформления заказов.
          </div>
          <div className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">ID</span>
              <span className="font-mono text-slate-800">{mockUser.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Username</span>
              <span className="text-slate-800">{mockUser.username}</span>
            </div>
            <div>
              <div className="text-slate-500 text-xs mb-1">Телефон</div>
              <input
                type="tel"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Current order (placeholder) */}
        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">Текущий заказ</div>
          <div className="text-xs text-slate-500">
            Здесь в будущем будет отображаться ваш активный заказ.
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Пока что функциональность в разработке.
          </div>
        </section>

        {/* Order history (placeholder) */}
        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">История заказов</div>
          <div className="text-xs text-slate-500">
            В финальной версии тут появится список ваших прошлых заказов.
          </div>
          <div className="text-sm text-slate-600 mt-1">
            Сейчас история заказов недоступна.
          </div>
        </section>

        {/* Legal links */}
        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-1">
          <button
            type="button"
            className="w-full flex items-center justify-between py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg px-2 transition-colors"
            onClick={() => alert('Политика конфиденциальности: заглушка')}
          >
            <span>Политика конфиденциальности</span>
            <span className="text-slate-400 text-xs">›</span>
          </button>
          <button
            type="button"
            className="w-full flex items-center justify-between py-2 text-sm text-slate-800 hover:bg-slate-50 rounded-lg px-2 transition-colors"
            onClick={() => alert('Пользовательское соглашение: заглушка')}
          >
            <span>Пользовательское соглашение</span>
            <span className="text-slate-400 text-xs">›</span>
          </button>
        </section>
      </main>
    </MiniAppShell>
  );
}

