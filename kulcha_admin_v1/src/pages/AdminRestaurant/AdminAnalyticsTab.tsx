import React, { useEffect, useMemo, useState } from "react";
import {
  AnalyticsPeriod,
  AdminAnalyticsSummary,
  AdminAnalyticsDailySeries,
} from "../../types/adminAnalytics";
import {
  fetchAnalyticsSummary,
  fetchAnalyticsDaily,
} from "../../api/adminAnalytics";

interface AdminAnalyticsTabProps {
  restaurantId: number;
}

function formatCurrency(value: number): string {
  if (!Number.isFinite(value)) return "0 ₽";
  return `${Math.round(value)} ₽`;
}

function formatDateLabel(iso: string): string {
  const d = new Date(iso);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  return `${day}.${month}`;
}

interface AnalyticsSummaryCardsProps {
  summary: AdminAnalyticsSummary;
}

const AnalyticsSummaryCards: React.FC<AnalyticsSummaryCardsProps> = ({
  summary,
}) => {
  const {
    revenue,
    orders_count,
    avg_check,
    delivery_orders,
    dine_in_orders,
  } = summary;

  const totalOrders = orders_count || 1;
  const deliveryShare = Math.round((delivery_orders / totalOrders) * 100);
  const dineInShare = Math.round((dine_in_orders / totalOrders) * 100);

  return (
    <div className="grid grid-cols-2 gap-2">
      {/* Revenue */}
      <div className="bg-emerald-50 rounded-2xl p-3 border border-emerald-100 shadow-sm flex flex-col gap-1">
        <div className="text-[10px] text-emerald-700 uppercase font-semibold">
          Выручка
        </div>
        <div className="text-sm font-bold text-emerald-900">
          {formatCurrency(revenue)}
        </div>
        <div className="text-[10px] text-emerald-700">
          за выбранный период
        </div>
      </div>

      {/* Orders */}
      <div className="bg-sky-50 rounded-2xl p-3 border border-sky-100 shadow-sm flex flex-col gap-1">
        <div className="text-[10px] text-sky-700 uppercase font-semibold">
          Заказы
        </div>
        <div className="text-sm font-bold text-sky-900">{orders_count}</div>
        <div className="text-[10px] text-sky-700">всего заказов</div>
      </div>

      {/* Average check */}
      <div className="bg-violet-50 rounded-2xl p-3 border border-violet-100 shadow-sm flex flex-col gap-1">
        <div className="text-[10px] text-violet-700 uppercase font-semibold">
          Средний чек
        </div>
        <div className="text-sm font-bold text-violet-900">
          {formatCurrency(avg_check)}
        </div>
        <div className="text-[10px] text-violet-700">выручка / заказы</div>
      </div>

      {/* Delivery vs Dine-in */}
      <div className="bg-amber-50 rounded-2xl p-3 border border-amber-100 shadow-sm flex flex-col gap-1">
        <div className="text-[10px] text-amber-700 uppercase font-semibold">
          Формат
        </div>
        <div className="flex items-center justify-between text-[10px] text-amber-800">
          <div>
            Доставка:{" "}
            <span className="font-semibold">
              {delivery_orders} ({deliveryShare}%)
            </span>
          </div>
          <div>
            В зале:{" "}
            <span className="font-semibold">
              {dine_in_orders} ({dineInShare}%)
            </span>
          </div>
        </div>
        <div className="h-2 rounded-full bg-amber-100 overflow-hidden mt-1">
          <div
            className="h-full bg-amber-400"
            style={{ width: `${deliveryShare}%` }}
          />
        </div>
      </div>
    </div>
  );
};

interface AnalyticsDailyChartProps {
  daily: AdminAnalyticsDailySeries | null;
  maxRevenue: number;
}

const AnalyticsDailyChart: React.FC<AnalyticsDailyChartProps> = ({
  daily,
  maxRevenue,
}) => {
  const points = daily?.points ?? [];
  if (!points.length) {
    return (
      <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm text-xs text-slate-500">
        Пока нет данных для графика.
      </div>
    );
  }

  const safeMax = maxRevenue > 0 ? maxRevenue : 1;

  return (
    <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm space-y-2">
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-semibold text-slate-900">
          Динамика выручки
        </div>
        <div className="text-[10px] text-slate-500">по дням</div>
      </div>

      <div className="flex items-end gap-1 h-28">
        {points.map((p) => {
          const heightPercent = Math.max(
            8,
            Math.round((p.revenue / safeMax) * 100)
          );
          return (
            <div
              key={p.date}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div className="flex-1 flex items-end w-full">
                <div
                  className="w-full rounded-full bg-slate-100 overflow-hidden"
                  style={{ height: "100%" }}
                >
                  <div
                    className="w-full rounded-full bg-slate-900"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>
              </div>
              <div className="text-[9px] text-slate-500">
                {formatDateLabel(p.date)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
        <span>Минимум: {formatCurrency(0)}</span>
        <span>Максимум: {formatCurrency(safeMax)}</span>
      </div>
    </div>
  );
};

export const AdminAnalyticsTab: React.FC<AdminAnalyticsTabProps> = ({
  restaurantId,
}) => {
  const [period, setPeriod] = useState<AnalyticsPeriod>("today");
  const [summary, setSummary] = useState<AdminAnalyticsSummary | null>(null);
  const [daily, setDaily] = useState<AdminAnalyticsDailySeries | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const [s, d] = await Promise.all([
          fetchAnalyticsSummary(restaurantId, period),
          fetchAnalyticsDaily(restaurantId, period),
        ]);
        setSummary(s);
        setDaily(d);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить аналитику. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [restaurantId, period]);

  const chartPoints = daily?.points ?? [];
  const maxRevenue = useMemo(() => {
    if (!chartPoints.length) return 0;
    return Math.max(...chartPoints.map((p) => p.revenue));
  }, [chartPoints]);

  const periodOptions: { key: AnalyticsPeriod; label: string }[] = [
    { key: "today", label: "Сегодня" },
    { key: "7d", label: "7 дней" },
    { key: "30d", label: "30 дней" },
  ];

  return (
    <div className="space-y-3">
      {/* Header & period switch */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Аналитика заказов
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
        {periodOptions.map((p) => {
          const isActive = period === p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setPeriod(p.key)}
              className={
                "px-3 py-1.5 rounded-full text-[11px] font-medium border transition-colors whitespace-nowrap " +
                (isActive
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-50 text-slate-700 border-slate-200")
              }
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* Loading / Error */}
      {loading && (
        <div className="text-xs text-slate-500">Загрузка аналитики…</div>
      )}

      {error && !loading && (
        <div className="text-xs text-red-500">{error}</div>
      )}

      {/* Content */}
      {!loading && !error && summary && (
        <>
          <AnalyticsSummaryCards summary={summary} />
          <AnalyticsDailyChart daily={daily} maxRevenue={maxRevenue} />
        </>
      )}
    </div>
  );
};
