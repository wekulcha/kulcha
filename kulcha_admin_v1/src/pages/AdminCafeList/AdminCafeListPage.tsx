import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { fetchAdminRestaurants } from "../../api/adminRestaurants";
import { AdminRestaurant } from "../../types/adminRestaurant";

export const AdminCafeListPage: React.FC = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchAdminRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить рестораны. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const normalizedSearch = searchQuery.toLowerCase().trim();
  const visibleRestaurants = normalizedSearch
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(normalizedSearch) ||
          r.address.toLowerCase().includes(normalizedSearch)
      )
    : restaurants;

  return (
    <>
      <AdminHeader
        title="Мои рестораны"
        showBack={false}
        onBurgerClick={() => navigate("/profile")}
        onSearchClick={() => setIsSearchOpen((prev) => !prev)}
      />

      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
        {isSearchOpen && (
          <div className="mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или адресу"
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm"
            />
          </div>
        )}

        {loading && (
          <div className="text-sm text-slate-500">Загрузка ресторанов...</div>
        )}

        {error && !loading && (
          <div className="text-sm text-red-500 mb-3">{error}</div>
        )}

        {!loading && !error && visibleRestaurants.length === 0 && (
          <div className="text-sm text-slate-500 mt-6 text-center">
            Рестораны не найдены.
          </div>
        )}

        <div className="space-y-3">
          {visibleRestaurants.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() =>
                navigate(`/restaurants/${r.id}`, {
                  state: { restaurantName: r.name },
                })
              }
              className="w-full text-left bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-900">
                  {r.name}
                </div>
                <div className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                  Сегодня: {r.today_orders} заказов
                </div>
              </div>

              <div className="text-xs text-slate-500">{r.address}</div>

              <div className="flex items-center justify-between mt-1 text-xs">
                <div className="flex flex-col">
                  <span className="text-slate-500">Выручка сегодня</span>
                  <span className="font-semibold text-slate-900">
                    {Math.round(r.today_revenue)} ₽
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                  Активен
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};

