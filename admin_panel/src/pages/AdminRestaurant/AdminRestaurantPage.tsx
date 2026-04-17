import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { AdminOrdersTab } from "./AdminOrdersTab";
import { AdminMenuTab } from "./AdminMenuTab";
import { AdminAnalyticsTab } from "./AdminAnalyticsTab";
import { AdminStaffTab } from "./AdminStaffTab";
import { AdminRestaurantSettingsTab } from "./AdminRestaurantSettingsTab";
import { fetchRestaurant, type RestaurantDetail } from "../../api/adminRestaurant";

type MainView = "orders" | "hub";
type HubTab = "about" | "menu" | "team" | "analytics";

interface LocationState {
  restaurantName?: string;
}

export const AdminRestaurantPage: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const state = location.state as LocationState | null;

  const restaurantId = useMemo(
    () => (params.id ? Number(params.id) : NaN),
    [params.id]
  );

  const [mainView, setMainView] = useState<MainView>("orders");
  const [hubTab, setHubTab] = useState<HubTab>("about");
  const [detail, setDetail] = useState<RestaurantDetail | null>(null);
  const restaurantName =
    detail?.name ??
    state?.restaurantName ??
    (restaurantId ? `Ресторан №${restaurantId}` : "Ресторан");

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;
    let cancelled = false;
    void fetchRestaurant(restaurantId)
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  const hubButton = (
    <button
      type="button"
      onClick={() => {
        setMainView("hub");
        setHubTab("about");
      }}
      className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-300"
      title="Ресторан"
      aria-label="Настройки ресторана"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
      </svg>
    </button>
  );

  if (mainView === "hub") {
    return (
      <>
        <AdminHeader
          title="Ресторан"
          showBack
          onBackClick={() => setMainView("orders")}
          showSearch={false}
        />
        <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
          <p className="text-sm font-semibold text-slate-900 mb-1">{restaurantName}</p>
          <p className="text-xs text-slate-500 mb-3 line-clamp-2">{detail?.address ?? "—"}</p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            <HubChip label="Карточка" active={hubTab === "about"} onClick={() => setHubTab("about")} />
            <HubChip label="Меню" active={hubTab === "menu"} onClick={() => setHubTab("menu")} />
            <HubChip label="Команда" active={hubTab === "team"} onClick={() => setHubTab("team")} />
            <HubChip label="Аналитика" active={hubTab === "analytics"} onClick={() => setHubTab("analytics")} />
          </div>
          <div className="space-y-3">
            {hubTab === "about" && <AdminRestaurantSettingsTab restaurantId={restaurantId} />}
            {hubTab === "menu" && <AdminMenuTab restaurantId={restaurantId} />}
            {hubTab === "team" && <AdminStaffTab restaurantId={restaurantId} />}
            {hubTab === "analytics" && <AdminAnalyticsTab restaurantId={restaurantId} />}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <AdminHeader
        title={restaurantName}
        showBack
        onBackClick={() => navigate(-1)}
        onBurgerClick={() => navigate("/profile")}
        showSearch={false}
        rightSlot={hubButton}
      />

      <main className="flex-1 overflow-y-auto px-4 pt-2 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
        <AdminOrdersTab restaurantId={restaurantId} hideTitle />
      </main>
    </>
  );
};

function HubChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "rounded-full px-3 py-1.5 text-xs font-medium border transition-colors " +
        (active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")
      }
    >
      {label}
    </button>
  );
}
