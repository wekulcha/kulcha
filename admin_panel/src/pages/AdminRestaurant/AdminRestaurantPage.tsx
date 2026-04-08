import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { AdminOrdersTab } from "./AdminOrdersTab";
import { AdminMenuTab } from "./AdminMenuTab";
import { AdminAnalyticsTab } from "./AdminAnalyticsTab";
import { AdminStaffTab } from "./AdminStaffTab";

type TabKey = "orders" | "menu" | "team" | "analytics";

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

  const [activeTab, setActiveTab] = useState<TabKey>("orders");

  const restaurantName =
    state?.restaurantName ??
    (restaurantId ? `Ресторан №${restaurantId}` : "Ресторан");

  return (
    <>
      <AdminHeader
        title={restaurantName}
        showBack
        onBackClick={() => navigate(-1)}
        onBurgerClick={() => navigate("/profile")}
        showSearch={false}
      />

      <main className="flex-1 overflow-y-auto px-4 pt-3 pb-6 bg-gradient-to-b from-slate-50 to-slate-100">
        {/* Restaurant info card */}
        <section className="mb-3">
          <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100">
            <div className="text-sm font-semibold text-slate-900 mb-1">
              {restaurantName}
            </div>
            <div className="text-xs text-slate-500">
              Управление заказами, меню и аналитикой этого ресторана.
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mb-4">
          <div className="grid grid-cols-2 gap-2">
            <TabButton
              label="Заказы"
              active={activeTab === "orders"}
              color="emerald"
              onClick={() => setActiveTab("orders")}
            />
            <TabButton
              label="Меню"
              active={activeTab === "menu"}
              color="sky"
              onClick={() => setActiveTab("menu")}
            />
            <TabButton
              label="Команда"
              active={activeTab === "team"}
              color="amber"
              onClick={() => setActiveTab("team")}
            />
            <TabButton
              label="Аналитика"
              active={activeTab === "analytics"}
              color="violet"
              onClick={() => setActiveTab("analytics")}
            />
          </div>
        </section>

        {/* Tab content */}
        <section className="space-y-3">
          {activeTab === "orders" && (
            <AdminOrdersTab restaurantId={restaurantId} />
          )}
          {activeTab === "menu" && (
            <AdminMenuTab restaurantId={restaurantId} />
          )}
          {activeTab === "team" && (
            <AdminStaffTab restaurantId={restaurantId} />
          )}
          {activeTab === "analytics" && (
            <AdminAnalyticsTab restaurantId={restaurantId} />
          )}
        </section>
      </main>
    </>
  );
};

interface TabButtonProps {
  label: string;
  active: boolean;
  color: "emerald" | "sky" | "violet" | "amber";
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  label,
  active,
  color,
  onClick,
}) => {
  const baseColors: Record<string, { active: string; inactive: string }> = {
    emerald: {
      active: "from-emerald-500 to-emerald-600 text-white",
      inactive: "bg-emerald-50 text-emerald-700",
    },
    sky: {
      active: "from-sky-500 to-sky-600 text-white",
      inactive: "bg-sky-50 text-sky-700",
    },
    violet: {
      active: "from-violet-500 to-violet-600 text-white",
      inactive: "bg-violet-50 text-violet-700",
    },
    amber: {
      active: "from-amber-500 to-amber-600 text-white",
      inactive: "bg-amber-50 text-amber-800",
    },
  };

  const colors = baseColors[color];

  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "w-full rounded-2xl px-3 py-3 text-xs font-semibold shadow-sm transition-transform active:scale-[0.98] " +
        (active
          ? `bg-gradient-to-br ${colors.active}`
          : `${colors.inactive} border border-transparent`)
      }
    >
      {label}
    </button>
  );
};

