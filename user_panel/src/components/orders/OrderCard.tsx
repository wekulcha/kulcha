import type { OrderStatus, UserOrder } from '../../types/order';

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

export function OrderCard({ order }: { order: UserOrder }) {
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
