import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AdminHeader } from "../../layout/AdminHeader";
import { AdminOrdersTab } from "./AdminOrdersTab";
import { AdminMenuTab } from "./AdminMenuTab";
import { AdminAnalyticsTab } from "./AdminAnalyticsTab";
import { AdminStaffTab } from "./AdminStaffTab";
import {
  fetchRestaurant,
  patchRestaurant,
  uploadRestaurantCover,
  type RestaurantDetail,
} from "../../api/adminRestaurant";
import { BASE_URL } from "../../api/baseUrl";

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
  const [detail, setDetail] = useState<RestaurantDetail | null>(null);
  const [coverUploading, setCoverUploading] = useState(false);
  const [coverErr, setCoverErr] = useState<string | null>(null);

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

  const coverPreview = (path: string | null | undefined) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    try {
      return new URL(BASE_URL, window.location.href).origin + (path.startsWith("/") ? path : `/${path}`);
    } catch {
      return path;
    }
  };

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
          <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-2">
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0">
                {detail?.imageLink ? (
                  <img
                    src={coverPreview(detail.imageLink)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-slate-900 mb-1">
                  {restaurantName}
                </div>
                <div className="text-xs text-slate-500 line-clamp-3">
                  {detail?.address ?? "Загрузка…"}
                </div>
              </div>
            </div>
            <div className="text-[11px] text-slate-500">
              Обложка для списка кафе в приложении пользователя (JPG, PNG).
            </div>
            <input
              type="file"
              accept="image/jpeg,image/png,image/jpg"
              disabled={coverUploading}
              className="text-[11px] w-full"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file || !restaurantId) return;
                setCoverErr(null);
                setCoverUploading(true);
                try {
                  const path = await uploadRestaurantCover(restaurantId, file);
                  const next = await patchRestaurant(restaurantId, { imageLink: path });
                  setDetail(next);
                } catch {
                  setCoverErr("Не удалось загрузить фото.");
                } finally {
                  setCoverUploading(false);
                  e.target.value = "";
                }
              }}
            />
            {coverErr && <div className="text-[11px] text-red-500">{coverErr}</div>}
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

