import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { useAuth } from "../../context/AuthContext";
import { AdminRestaurant } from "../../types/adminRestaurant";
import { hasFullRestaurantAccess } from "../../types/staffAccess";

export const AdminCafeListPage: React.FC = () => {
  const navigate = useNavigate();
  const { restaurants, authError, authReady } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const normalizedSearch = searchQuery.toLowerCase().trim();
  const visibleRestaurants: AdminRestaurant[] = normalizedSearch
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
        showBack
        onBackClick={() => navigate(-1)}
        onBurgerClick={() => navigate("/profile")}
        onSearchClick={() => setIsSearchOpen((prev) => !prev)}
      />

      <main className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pt-3 md:pt-4 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
        {!authReady && (
          <div className="text-sm text-slate-500">Проверка доступа...</div>
        )}

        {authReady && authError && (
          <div className="mb-4 p-3 bg-amber-50 rounded-2xl border border-amber-100 text-sm text-amber-900">
            {authError}
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

        {authReady && !authError && visibleRestaurants.length === 0 && (
          <div className="text-sm text-slate-500 mt-6 text-center">
            Рестораны не найдены.
          </div>
        )}

        <div className="grid justify-start gap-3 [grid-template-columns:repeat(auto-fit,minmax(280px,320px))]">
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
                <div className="text-sm font-semibold text-slate-900">{r.name}</div>
                <div
                  className={
                    "text-[10px] px-2 py-1 rounded-full font-semibold " +
                    (hasFullRestaurantAccess(r.permissions)
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-600")
                  }
                >
                  {hasFullRestaurantAccess(r.permissions) ? "Полный доступ" : "Ограниченный доступ"}
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
