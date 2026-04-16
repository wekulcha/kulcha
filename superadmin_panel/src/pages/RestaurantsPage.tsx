import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { fetchAdminRestaurants, createRestaurant } from "../api/admin";
import type { CreateRestaurantRequest } from "../types/admin";

export function RestaurantsPage() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
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
              disabled={
                !form.name ||
                !form.address ||
                !form.ownerUserId ||
                createMutation.isPending
              }
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
            <p className="text-xs text-red-600">{String(createMutation.error)}</p>
          )}
        </div>
      )}

      {isLoading && <p className="text-sm text-slate-500">Загрузка…</p>}
      {error && <p className="text-sm text-red-600">{String(error)}</p>}

      <div className="grid gap-3">
        {restaurants.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100"
          >
            <div className="font-semibold text-slate-900">{r.name}</div>
            <div className="text-xs text-slate-500 mt-1">{r.address}</div>
            <div className="text-xs text-slate-600 mt-2">
              Сотрудников: {r.staff?.length ?? 0}, блюд: {r.meals?.length ?? 0}, заказов: {r.orderHistory?.length ?? 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
