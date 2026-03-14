import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { useAuth } from "../../context/AuthContext";
import { fetchMyRestaurants } from "../../api/adminRestaurants";
import { AdminRestaurant } from "../../types/adminRestaurant";

export const AdminCafeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserId, setCurrentUserId } = useAuth();
  const [restaurants, setRestaurants] = useState<AdminRestaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [devId, setDevId] = useState("");

  useEffect(() => {
    if (currentUserId == null) {
      setRestaurants([]);
      setLoading(false);
      return;
    }
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMyRestaurants(currentUserId);
        setRestaurants(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить рестораны. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [currentUserId]);

  const normalizedSearch = searchQuery.toLowerCase().trim();
  const visibleRestaurants = normalizedSearch
    ? restaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(normalizedSearch) ||
          r.address.toLowerCase().includes(normalizedSearch)
      )
    : restaurants;

  const handleDevSetUser = () => {
    const n = parseInt(devId.trim(), 10);
    if (Number.isFinite(n) && n > 0) {
      setCurrentUserId(n);
    }
  };

  return (
    <>
      <AdminHeader
        title="Мои рестораны"
        showBack={false}
        onBurgerClick={() => navigate("/profile")}
        onSearchClick={() => setIsSearchOpen((prev) => !prev)}
      />

      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
        {currentUserId == null && (
          <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="text-sm font-semibold text-amber-900 mb-1">
              Укажите пользователя (сотрудника)
            </div>
            <div className="text-xs text-amber-700 mb-2">
              Для разработки: введите ID пользователя из БД, у которого есть привязка к ресторанам.
            </div>
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
                Войти
              </button>
            </div>
          </div>
        )}

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

        {!loading && !error && currentUserId != null && visibleRestaurants.length === 0 && (
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
                  Управление
                </div>
              </div>

              <div className="text-xs text-slate-500">{r.address}</div>

              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                Активен
              </div>
            </button>
          ))}
        </div>
      </main>
    </>
  );
};
