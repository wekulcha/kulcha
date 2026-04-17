import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../../api/orders';
import { OrderCard } from '../../components/orders/OrderCard';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../../layout/Header';
import { MiniAppShell } from '../../layout/MiniAppShell';
import type { OrderStatus, UserOrder } from '../../types/order';

const ACTIVE_STATUSES = new Set<OrderStatus>(['CREATED', 'ACCEPTED', 'COOKING', 'DELIVERY']);

export function OrderHistoryPage() {
  const navigate = useNavigate();
  const { currentUser, authReady } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authReady || !currentUser) {
      setOrders([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    void fetchMyOrders()
      .then((list) => {
        if (!cancelled) setOrders(list);
      })
      .catch(() => {
        if (!cancelled) {
          setOrders([]);
          setError('Не удалось загрузить историю заказов.');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [authReady, currentUser]);

  const pastOrders = useMemo(
    () => orders.filter((order) => !ACTIVE_STATUSES.has(order.status)),
    [orders]
  );

  return (
    <MiniAppShell>
      <Header
        title="История заказов"
        showSearch={false}
        showBack
        onBackClick={() => navigate(-1)}
        onHomeClick={() => navigate('/cafes')}
      />
      <main className="mt-4 space-y-3 pb-20">
        {!authReady && (
          <div className="text-sm text-slate-600">Проверяем вход в Telegram…</div>
        )}
        {authReady && !currentUser && (
          <div className="text-sm text-amber-800 bg-amber-50 rounded-xl p-3">
            Войдите в аккаунт, чтобы видеть историю.
          </div>
        )}
        {currentUser && loading && (
          <div className="text-xs text-slate-500">Загрузка…</div>
        )}
        {error && <div className="text-xs text-amber-600">{error}</div>}
        {currentUser && !loading && pastOrders.length === 0 && !error && (
          <div className="text-sm text-slate-500">Пока завершённых заказов нет.</div>
        )}
        {pastOrders.length > 0 && (
          <div className="space-y-2">
            {pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </main>
    </MiniAppShell>
  );
}
