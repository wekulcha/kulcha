import React, { useEffect, useState, useRef } from "react";
import type {
  AdminOrder,
  AdminOrderStatusCode,
} from "../../types/adminOrder";
import {
  fetchAdminOrders,
  updateAdminOrderStatus,
  fetchOrderPositions,
  fetchUser,
  AdminOrderFilterStatus,
} from "../../api/adminOrders";

const STATUS_FLOW: AdminOrderStatusCode[] = [
  "CREATED",
  "ACCEPTED",
  "COOKING",
  "DELIVERY",
  "DONE",
];

const STATUS_LABEL: Record<AdminOrderStatusCode, string> = {
  CREATED: "В обработке",
  ACCEPTED: "Принят",
  COOKING: "Готовим",
  DELIVERY: "Отправлен",
  DONE: "Завершён",
  CANCELLED: "Отменён",
};

const STATUS_COLOR_CLASSES: Record<AdminOrderStatusCode, string> = {
  CREATED: "bg-amber-50 text-amber-800 border-amber-200",
  ACCEPTED: "bg-sky-50 text-sky-800 border-sky-200",
  COOKING: "bg-sky-50 text-sky-800 border-sky-200",
  DELIVERY: "bg-violet-50 text-violet-800 border-violet-200",
  DONE: "bg-emerald-50 text-emerald-800 border-emerald-200",
  CANCELLED: "bg-rose-50 text-rose-800 border-rose-200",
};

interface AdminOrdersTabProps {
  restaurantId: number;
  /** Главный экран ресторана — без заголовка «Управление заказами». */
  hideTitle?: boolean;
}

function getNextStatus(
  current: AdminOrderStatusCode
): AdminOrderStatusCode | null {
  const idx = STATUS_FLOW.indexOf(current);
  if (idx === -1 || idx === STATUS_FLOW.length - 1) return null;
  return STATUS_FLOW[idx + 1];
}

function formatTime(iso: string): string {
  const dt = new Date(iso);
  const hh = dt.getHours().toString().padStart(2, "0");
  const mm = dt.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

function formatDateTime(iso: string): string {
  const dt = new Date(iso);
  const day = dt.getDate().toString().padStart(2, "0");
  const month = (dt.getMonth() + 1).toString().padStart(2, "0");
  const year = dt.getFullYear();
  const hh = dt.getHours().toString().padStart(2, "0");
  const mm = dt.getMinutes().toString().padStart(2, "0");
  return `${day}.${month}.${year} ${hh}:${mm}`;
}

function statusPillClass(status: AdminOrderStatusCode): string {
  return (
    "inline-flex items-center gap-1 px-2 py-1 rounded-full border text-[9px] font-semibold " +
    STATUS_COLOR_CLASSES[status]
  );
}

function statusLabel(status: AdminOrderStatusCode): string {
  return STATUS_LABEL[status];
}

function nextStatusLabel(status: AdminOrderStatusCode): string {
  const next = getNextStatus(status);
  return next ? STATUS_LABEL[next] : STATUS_LABEL[status];
}

interface OrderCardProps {
  order: AdminOrder;
  isUpdating: boolean;
  onChangeStatus: (newStatus: AdminOrderStatusCode) => Promise<void> | void;
  onOpenDetails: (order: AdminOrder) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  isUpdating,
  onChangeStatus,
  onOpenDetails,
}) => {
  const [statusPickerOpen, setStatusPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const nextStatus = getNextStatus(order.status);

  const placeLabel =
    order.orderType === "DINE_IN"
      ? "В зале"
      : order.deliveryAddress || "Без адреса";

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setStatusPickerOpen(false);
      }
    };

    if (statusPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [statusPickerOpen]);

  return (
    <div
      className="bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col gap-2 cursor-pointer"
      onClick={() => onOpenDetails(order)}
    >
      {/* Row 1: Order number only */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold text-slate-900">№{order.id}</div>
        <div className="flex flex-col items-end gap-0.5">
          <span className="text-[10px] text-slate-500">
            {formatTime(order.createdAt)}
          </span>
          <span className="text-sm font-bold text-slate-900">
            {Math.round(order.total)} ₽
          </span>
        </div>
      </div>

      {/* Row 2: status pill under order number */}
      <div className="flex items-center justify-between">
        <span className={statusPillClass(order.status)}>
          <span className="w-1.5 h-1.5 rounded-full bg-current" />
          {statusLabel(order.status)}
        </span>
        <div className="text-[11px] text-slate-600 text-right">
          {placeLabel}
        </div>
      </div>

      {/* Third row: status controls */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          className="flex-1 rounded-xl px-2 py-1.5 text-[11px] font-medium bg-slate-900 text-white"
          onClick={(e) => {
            e.stopPropagation();
            if (nextStatus) {
              onChangeStatus(nextStatus);
            }
          }}
          disabled={!nextStatus || isUpdating}
        >
          {nextStatusLabel(order.status)}
        </button>

        <div className="relative" ref={pickerRef}>
          <button
            type="button"
            className="rounded-xl px-2 py-1.5 text-[11px] font-medium border border-slate-200 bg-slate-50"
            onClick={(e) => {
              e.stopPropagation();
              setStatusPickerOpen((prev) => !prev);
            }}
            disabled={isUpdating}
          >
            ⇅
          </button>
          {statusPickerOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-2xl shadow-lg border border-slate-100 z-20">
              {(Object.keys(STATUS_LABEL) as AdminOrderStatusCode[]).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    className={
                      "w-full text-left px-3 py-1.5 text-[10px] hover:bg-slate-50 " +
                      (order.status === s
                        ? "font-semibold text-slate-900"
                        : "text-slate-700")
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      setStatusPickerOpen(false);
                      if (s !== order.status) {
                        onChangeStatus(s);
                      }
                    }}
                  >
                    {STATUS_LABEL[s]}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface OrderDetailsModalProps {
  order: AdminOrder;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
}) => {
  const [items, setItems] = useState<{ meal_id: number; name: string; quantity: number }[]>([]);
  const [userInfo, setUserInfo] = useState<{ username: string; phone: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const [positions, user] = await Promise.all([
          fetchOrderPositions(order.id),
          fetchUser(order.userId),
        ]);
        if (!cancelled) {
          setItems(positions);
          setUserInfo(user);
        }
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [order.id, order.userId]);

  const placeLabel =
    order.orderType === "DINE_IN"
      ? "В зале"
      : order.deliveryAddress || "Без адреса";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-4 w-full max-w-sm shadow-lg space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-xs text-slate-500">Заказ</div>
            <div className="text-sm font-bold text-slate-900">№{order.id}</div>
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 text-lg leading-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className={statusPillClass(order.status)}>
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            {statusLabel(order.status)}
          </span>
          <span className="text-[11px] text-slate-500">
            {formatDateTime(order.createdAt)}
          </span>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3 flex items-center justify-between">
          <div className="text-[11px] text-slate-500">Итог</div>
          <div className="text-base font-bold text-slate-900">
            {Math.round(order.total)} ₽
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-700">Место</div>
          <div className="text-[11px] text-slate-600">{placeLabel}</div>
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-700">Клиент</div>
          {loading ? (
            <div className="text-[11px] text-slate-500">Загрузка...</div>
          ) : (
            <>
              <div className="text-[11px] text-slate-600">
                {userInfo?.username ? `@${userInfo.username}` : "Без username"}
              </div>
              <div className="text-[11px] text-slate-600">{userInfo?.phone ?? "—"}</div>
            </>
          )}
        </div>

        <div className="space-y-1">
          <div className="text-[11px] font-semibold text-slate-700">
            Позиции
          </div>
          <div className="space-y-1 max-h-40 overflow-auto pr-1">
            {loading ? (
              <div className="text-[11px] text-slate-500">Загрузка...</div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.meal_id}-${item.quantity}`}
                  className="flex items-center justify-between text-xs text-slate-700"
                >
                  <span className="truncate">{item.name}</span>
                  <span className="ml-2 text-slate-500">×{item.quantity}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  restaurantId,
  hideTitle = false,
}) => {
  const [activeFilter, setActiveFilter] =
    useState<AdminOrderFilterStatus>("ALL");
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminOrders(restaurantId, activeFilter);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить заказы. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [restaurantId, activeFilter]);

  const handleOpenDetails = (order: AdminOrder) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    setSelectedOrder(null);
  };

  const filters: { key: AdminOrderFilterStatus; label: string }[] = [
    { key: "ALL", label: "Все" },
    { key: "CREATED", label: "В обработке" },
    { key: "ACCEPTED", label: "Принят" },
    { key: "COOKING", label: "Готовим" },
    { key: "DELIVERY", label: "Отправлен" },
    { key: "DONE", label: "Завершён" },
    { key: "CANCELLED", label: "Отменён" },
  ];

  return (
    <div
      className={
        hideTitle
          ? "space-y-3"
          : "bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-3"
      }
    >
      {!hideTitle && (
        <div className="text-sm font-semibold text-slate-900">Управление заказами</div>
      )}

      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
        {filters.map((f) => {
          const isActive = activeFilter === f.key;
          return (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={
                "px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors whitespace-nowrap " +
                (isActive
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200")
              }
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="text-xs text-slate-500">Загрузка заказов...</div>
      )}

      {error && !loading && (
        <div className="text-xs text-red-500">{error}</div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-xs text-slate-500">
          Пока нет заказов по текущему фильтру.
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            isUpdating={updatingId === order.id}
            onChangeStatus={async (newStatus) => {
              try {
                setUpdatingId(order.id);
                const updated = await updateAdminOrderStatus(
                  order.id,
                  newStatus,
                  order
                );
                setOrders((prev) =>
                  prev.map((o) => (o.id === updated.id ? updated : o))
                );
              } catch (err) {
                console.error(err);
                alert("Не удалось обновить статус заказа");
              } finally {
                setUpdatingId(null);
              }
            }}
            onOpenDetails={handleOpenDetails}
          />
        ))}
      </div>

      {isDetailsOpen && selectedOrder && (
        <OrderDetailsModal order={selectedOrder} onClose={handleCloseDetails} />
      )}
    </div>
  );
};
