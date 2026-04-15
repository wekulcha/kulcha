import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';
import { useAuth } from '../../context/AuthContext';
import { fetchUser } from '../../api/users';
import type { User } from '../../types/user';

export function ProfilePage() {
  const navigate = useNavigate();
  const { currentUserId, authError, authReady } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    return () => {
      cancelled = true;
    };
  }, [currentUserId]);

  return (
    <MiniAppShell>
      <Header
        title="Профиль"
        showSearch={false}
        showBack
        onBackClick={() => navigate(-1)}
        onHomeClick={() => navigate('/cafes')}
      />
      <main className="mt-4 space-y-4 pb-20">
        {!authReady && (
          <section className="bg-slate-50 rounded-2xl p-3 shadow-sm border border-slate-100">
            <div className="text-sm text-slate-600">Проверяем вход в Telegram…</div>
          </section>
        )}

        {authReady && (authError != null || currentUserId == null) && (
          <section className="bg-amber-50 rounded-2xl p-3 shadow-sm border border-amber-100 space-y-2">
            <div className="text-sm font-semibold text-amber-900">Вход в аккаунт</div>
            <div className="text-xs text-amber-700">
              {authError ??
                'Откройте бота KULCHA и нажмите /start, чтобы зарегистрироваться. После этого заказы будут привязаны к вашему аккаунту.'}
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
              Эти данные сохранены при регистрации в боте и используются для заказов.
            </div>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-slate-500 shrink-0">Telegram ID</span>
                <span className="font-mono text-slate-800 text-right">{user.telegram_id ?? '—'}</span>
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
          </section>
        )}

        {currentUserId != null && !loading && !user && (
          <section className="bg-white rounded-2xl p-3 shadow-sm">
            <div className="text-sm text-slate-600">Не удалось загрузить профиль.</div>
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
