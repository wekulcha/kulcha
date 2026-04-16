import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../../api/orders';
import { fetchCurrentUser } from '../../api/users';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../layout/Header';
import { MiniAppShell } from '../../layout/MiniAppShell';
import type { OrderStatus, UserOrder } from '../../types/order';
import type { User } from '../../types/user';

const ACTIVE_STATUSES = new Set<OrderStatus>(['CREATED', 'ACCEPTED', 'COOKING', 'DELIVERY']);

const STATUS_LABELS: Record<OrderStatus, string> = {
  CREATED: 'Создан',
  ACCEPTED: 'Принят',
  COOKING: 'Готовится',
  DELIVERY: 'В доставке',
  DONE: 'Завершен',
  CANCELLED: 'Отменен',
};

const ORDER_TYPE_LABELS = {
  DELIVERY: 'Доставка',
  DINE_IN: 'В зале',
} as const;

function formatDate(value: string | null): string {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
}

function formatMoney(value: number | null): string {
  if (value == null) return '—';
  return `${value.toFixed(0)} ₽`;
}

function displayPhone(phone: string | null): string {
  if (!phone || phone.startsWith('tg-')) return '—';
  return phone;
}

function OrderCard({ order }: { order: UserOrder }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-3 space-y-1">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-semibold text-slate-900">Заказ №{order.id}</div>
        <div className="text-xs text-slate-500">{STATUS_LABELS[order.status]}</div>
      </div>
      <div className="text-xs text-slate-500">{formatDate(order.created_at)}</div>
      <div className="flex items-center justify-between gap-3 text-sm text-slate-700">
        <span>{order.order_type ? ORDER_TYPE_LABELS[order.order_type] : '—'}</span>
        <span className="font-semibold text-slate-900">{formatMoney(order.total)}</span>
      </div>
      {order.delivery_address && (
        <div className="text-xs text-slate-500">Адрес: {order.delivery_address}</div>
      )}
    </div>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, authError, authReady, reloadAuth } = useAuth();
  const [user, setUser] = useState<User | null>(currentUser);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  useEffect(() => {
    if (!authReady) {
      return;
    }

    if (!currentUser) {
      setUser(null);
      setOrders([]);
      setProfileError(null);
      setOrdersError(null);
      setLoadingProfile(false);
      setLoadingOrders(false);
      return;
    }

    let cancelled = false;
    setUser(currentUser);
    setLoadingProfile(true);
    setLoadingOrders(true);
    setProfileError(null);
    setOrdersError(null);

    void Promise.allSettled([fetchCurrentUser(), fetchMyOrders()])
      .then(([userResult, ordersResult]) => {
        if (cancelled) return;

        if (userResult.status === 'fulfilled') {
          setUser(userResult.value);
        } else {
          setProfileError('Не удалось обновить данные профиля.');
        }

        if (ordersResult.status === 'fulfilled') {
          setOrders(ordersResult.value);
        } else {
          setOrders([]);
          setOrdersError('Не удалось загрузить историю заказов.');
        }
      })
      .finally(() => {
        if (cancelled) return;
        setLoadingProfile(false);
        setLoadingOrders(false);
      });

    return () => {
      cancelled = true;
    };
  }, [authReady, currentUser]);

  const activeOrders = useMemo(
    () => orders.filter((order) => ACTIVE_STATUSES.has(order.status)),
    [orders]
  );
  const pastOrders = useMemo(
    () => orders.filter((order) => !ACTIVE_STATUSES.has(order.status)),
    [orders]
  );

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

        {authReady && !currentUser && (
          <section className="bg-amber-50 rounded-2xl p-3 shadow-sm border border-amber-100 space-y-3">
            <div className="text-sm font-semibold text-amber-900">Вход в аккаунт</div>
            <div className="text-xs text-amber-700">
              {authError ?? 'Откройте мини-приложение из Telegram через кнопку в боте KULCHA.'}
            </div>
            <button
              type="button"
              onClick={reloadAuth}
              className="rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
            >
              Повторить вход
            </button>
          </section>
        )}

        {currentUser && (
          <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
            <div className="text-sm font-semibold text-slate-900">Ваши данные</div>
            <div className="text-xs text-slate-500">
              Профиль загружается из серверной сессии mini app и используется для ваших заказов.
            </div>
            {loadingProfile && <div className="text-xs text-slate-500">Обновляем профиль...</div>}
            {profileError && <div className="text-xs text-amber-600">{profileError}</div>}
            {user && (
              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500 shrink-0">Telegram ID</span>
                  <span className="font-mono text-slate-800 text-right">{user.telegram_id ?? '—'}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Username</span>
                  <span className="text-slate-800 text-right">{user.username || '—'}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Телефон</span>
                  <span className="text-slate-800 text-right">{displayPhone(user.phone)}</span>
                </div>
              </div>
            )}
          </section>
        )}

        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">Текущий заказ</div>
          {!currentUser && (
            <div className="text-xs text-slate-500">После авторизации здесь появится активный заказ.</div>
          )}
          {currentUser && loadingOrders && (
            <div className="text-xs text-slate-500">Загружаем текущий заказ...</div>
          )}
          {currentUser && !loadingOrders && activeOrders.length === 0 && (
            <div className="text-xs text-slate-500">Сейчас активных заказов нет.</div>
          )}
          {currentUser && !loadingOrders && activeOrders.length > 0 && (
            <OrderCard order={activeOrders[0]} />
          )}
        </section>

        <section className="bg-white rounded-2xl p-3 shadow-sm space-y-2">
          <div className="text-sm font-semibold text-slate-900">История заказов</div>
          {ordersError && <div className="text-xs text-amber-600">{ordersError}</div>}
          {!currentUser && (
            <div className="text-xs text-slate-500">История появится после входа в аккаунт.</div>
          )}
          {currentUser && loadingOrders && (
            <div className="text-xs text-slate-500">Загружаем историю заказов...</div>
          )}
          {currentUser && !loadingOrders && pastOrders.length === 0 && !ordersError && (
            <div className="text-xs text-slate-500">Пока завершенных заказов нет.</div>
          )}
          {currentUser && !loadingOrders && pastOrders.length > 0 && (
            <div className="space-y-2">
              {pastOrders.slice(0, 5).map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
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
