import { useState, useEffect } from 'react';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';
import { useAuth } from '../../context/AuthContext';
import { fetchUser } from '../../api/users';
import type { User } from '../../types/user';

export function ProfilePage() {
  const { currentUserId, setCurrentUserId } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [devId, setDevId] = useState('');

  useEffect(() => {
    if (currentUserId == null) {
      setUser(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchUser(currentUserId)
      .then((u) => {
        if (!cancelled) setUser(u);
      })
      .catch(() => {
        if (!cancelled) setUser(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [currentUserId]);

  const handleDevSetUser = () => {
    const n = parseInt(devId.trim(), 10);
    if (Number.isFinite(n) && n > 0) {
      setCurrentUserId(n);
    }
  };

  return (
    <MiniAppShell>
      <Header title="Профиль" showSearch={false} />
      <main className="mt-4 space-y-4 pb-20">
        {currentUserId == null && (
          <section className="bg-amber-50 rounded-2xl p-3 shadow-sm border border-amber-100 space-y-2">
            <div className="text-sm font-semibold text-amber-900">Нет пользователя</div>
            <div className="text-xs text-amber-700">
              Откройте бота KULCHA и нажмите /start, чтобы зарегистрироваться. После этого заказы будут привязаны к вашему аккаунту.
            </div>
            <div className="pt-2 border-t border-amber-200">
              <div className="text-xs text-amber-700 mb-1">Для разработки: укажите ID пользователя из БД</div>
              <div className="flex gap-2">
                <input
                  type="number"
                  className="flex-1 rounded-xl border border-amber-200 px-3 py-2 text-sm"
                  placeholder="User ID"
                  value={devId}
                  onChange={(e) => setDevId(e.target.value)}
                />
                <button
                  type="button"
                  className="px-3 py-2 bg-amber-600 text-white rounded-xl text-sm font-medium"
                  onClick={handleDevSetUser}
                >
                  Использовать
                </button>
              </div>
            </div>
          </section>
        )}

        {currentUserId != null && loading && (
          <div className="text-sm text-slate-500">Загрузка профиля...</div>
        )}

        {currentUserId != null && !loading && user && (
          <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
            <div className="text-sm font-semibold text-slate-900">Ваши данные</div>
            <div className="text-xs text-slate-500">
              Эти данные будут использоваться для оформления заказов.
            </div>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">ID</span>
                <span className="font-mono text-slate-800">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Username</span>
                <span className="text-slate-800">{user.username || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Телефон</span>
                <span className="text-slate-800">{user.phone || '—'}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                className="text-xs text-slate-500 underline"
                onClick={() => setCurrentUserId(null)}
              >
                Выйти (очистить сессию)
              </button>
            </div>
          </section>
        )}

        {currentUserId != null && !loading && !user && (
          <section className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-sm text-slate-600">Пользователь с ID {currentUserId} не найден.</div>
            <button
              type="button"
              className="mt-2 text-xs text-slate-500 underline"
              onClick={() => setCurrentUserId(null)}
            >
              Очистить сессию
            </button>
          </section>
        )}

        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">Текущий заказ</div>
          <div className="text-xs text-slate-500">
            Здесь в будущем будет отображаться ваш активный заказ.
          </div>
        </section>

        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">История заказов</div>
          <div className="text-xs text-slate-500">
            В финальной версии тут появится список ваших прошлых заказов.
          </div>
        </section>

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
