import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  createRestaurant,
  deleteAdminRestaurant,
  fetchAdminRestaurants,
  setRestaurantActive,
} from "../api/admin";
import { ApiError } from "../api/client";
import type { AdminRestaurantOverview, CreateRestaurantRequest } from "../types/admin";

function formatApiFailure(err: unknown): string {
  if (err instanceof ApiError) {
    try {
      const j = JSON.parse(err.body) as { detail?: unknown };
      const d = j.detail;
      if (typeof d === "string") return d;
      if (Array.isArray(d)) {
        return d
          .map((x) => (typeof x === "object" && x && "msg" in x ? String((x as { msg: string }).msg) : String(x)))
          .join("; ");
      }
    } catch {
      /* not JSON */
    }
    if (err.body) return err.body;
    return `Ошибка ${err.status}`;
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

export function RestaurantsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [detail, setDetail] = useState<AdminRestaurantOverview | null>(null);
  const [form, setForm] = useState<CreateRestaurantRequest>({
    name: "",
    address: "",
    ownerUserId: 0,
  });

  const { data: restaurants = [], isLoading, error } = useQuery({
    queryKey: ["admin", "restaurants"],
    queryFn: fetchAdminRestaurants,
  });

  const createMutation = useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "restaurants"] });
      setShowForm(false);
      setForm({ name: "", address: "", ownerUserId: 0 });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) => setRestaurantActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "restaurants"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "restaurants"] });
      setDetail(null);
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Рестораны</h1>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-sm font-medium hover:bg-slate-800"
        >
          + Создать ресторан
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900">Новый ресторан</h2>
          <input
            type="text"
            placeholder="Название"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            type="text"
            placeholder="Адрес"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={form.address}
            onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Telegram ID владельца (users.id)"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
            value={form.ownerUserId || ""}
            onChange={(e) => setForm((p) => ({ ...p, ownerUserId: Number(e.target.value) || 0 }))}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => createMutation.mutate(form)}
              disabled={!form.name || !form.address || !form.ownerUserId || createMutation.isPending}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm disabled:opacity-50"
            >
              {createMutation.isPending ? "Создание…" : "Создать"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm"
            >
              Отмена
            </button>
          </div>
          {createMutation.isError && (
            <p className="text-xs text-red-600 whitespace-pre-wrap break-words" role="alert">
              {formatApiFailure(createMutation.error)}
            </p>
          )}
        </div>
      )}

      {isLoading && <p className="text-sm text-slate-500">Загрузка…</p>}
      {error && (
        <p className="text-sm text-red-600 whitespace-pre-wrap break-words" role="alert">
          {formatApiFailure(error)}
        </p>
      )}

      <div className="grid gap-2">
        {restaurants.map((r) => {
          const active = r.isActive !== false;
          return (
            <div
              key={r.id}
              className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <button
                type="button"
                onClick={() => setDetail(r)}
                className="text-left flex-1 min-w-0 hover:opacity-90"
              >
                <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{r.address}</div>
                <div className="text-[10px] text-slate-500 mt-1">
                  <span className={active ? "text-emerald-700" : "text-slate-400"}>
                    {active ? "активен" : "выключен"}
                  </span>
                  {" · "}
                  Сотрудников: {r.staff?.length ?? 0} · блюд: {r.meals?.length ?? 0} · заказов:{" "}
                  {r.orderHistory?.length ?? 0}
                </div>
              </button>
              <div className="flex flex-wrap gap-1 shrink-0">
                <button
                  type="button"
                  disabled={toggleMutation.isPending || deleteMutation.isPending}
                  onClick={() => toggleMutation.mutate({ id: r.id, active: !active })}
                  className="rounded-xl bg-slate-200 px-3 py-1.5 text-[11px] font-medium text-slate-800 disabled:opacity-50"
                >
                  {active ? "Отключить" : "Включить"}
                </button>
                <button
                  type="button"
                  disabled={toggleMutation.isPending || deleteMutation.isPending}
                  onClick={() => {
                    if (
                      !window.confirm(
                        `Удалить ресторан «${r.name}» безвозвратно? Только если нет заказов по нему.`
                      )
                    )
                      return;
                    deleteMutation.mutate(r.id);
                  }}
                  className="rounded-xl bg-red-50 px-3 py-1.5 text-[11px] font-medium text-red-700 disabled:opacity-50"
                >
                  Удалить
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {(toggleMutation.isError || deleteMutation.isError) && (
        <p className="text-xs text-red-600" role="alert">
          {formatApiFailure(toggleMutation.error ?? deleteMutation.error)}
        </p>
      )}

      {detail && (
        <div
          className="fixed inset-0 z-50 bg-black/40 flex items-end sm:items-center justify-center p-4"
          onClick={() => setDetail(null)}
        >
          <div
            className="bg-white rounded-3xl p-4 w-full max-w-sm max-h-[85vh] overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start gap-2 mb-2">
              <div>
                <div className="text-sm font-semibold text-slate-900">{detail.name}</div>
                <div className="text-xs text-slate-500 mt-1">{detail.address}</div>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
                onClick={() => setDetail(null)}
              >
                ×
              </button>
            </div>
            <div className="text-[11px] text-slate-600 space-y-2">
              <div>
                <span className="font-semibold">ID:</span> {detail.id}
              </div>
              <div>
                <span className="font-semibold">Сотрудники ({detail.staff?.length ?? 0}):</span>
                <ul className="mt-1 list-disc pl-4 max-h-24 overflow-y-auto">
                  {(detail.staff ?? []).slice(0, 20).map((s) => (
                    <li key={s.id}>
                      user {s.userId} · {s.permission}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="font-semibold">Блюд в меню:</span> {detail.meals?.length ?? 0}
              </div>
              <div>
                <span className="font-semibold">Заказов в истории:</span> {detail.orderHistory?.length ?? 0}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
