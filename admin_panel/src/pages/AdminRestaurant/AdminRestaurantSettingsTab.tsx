import React, { useEffect, useState } from "react";
import {
  fetchRestaurant,
  patchRestaurant,
  uploadRestaurantCover,
  type RestaurantDetail,
} from "../../api/adminRestaurant";
import { BASE_URL } from "../../api/baseUrl";

interface Props {
  restaurantId: number;
}

function coverPreview(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  try {
    return new URL(BASE_URL, window.location.href).origin + (path.startsWith("/") ? path : `/${path}`);
  } catch {
    return path;
  }
}

export const AdminRestaurantSettingsTab: React.FC<Props> = ({ restaurantId }) => {
  const [detail, setDetail] = useState<RestaurantDetail | null>(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;
    let cancelled = false;
    setLoading(true);
    void fetchRestaurant(restaurantId)
      .then((d) => {
        if (cancelled) return;
        setDetail(d);
        setName(d.name);
        setAddress(d.address);
      })
      .catch(() => setErr("Не удалось загрузить данные ресторана."))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [restaurantId]);

  const save = async () => {
    if (!restaurantId) return;
    setSaving(true);
    setErr(null);
    try {
      const next = await patchRestaurant(restaurantId, {
        name: name.trim(),
        address: address.trim(),
      });
      setDetail(next);
    } catch {
      setErr("Не удалось сохранить.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-3">
      <div className="text-sm font-semibold text-slate-900">О ресторане</div>
      <p className="text-[11px] text-slate-500">
        Название и адрес в списке кафе, обложка — в карточке приложения для гостей.
      </p>
      {loading && <div className="text-xs text-slate-500">Загрузка…</div>}
      {err && <div className="text-[11px] text-red-500">{err}</div>}

      {!loading && (
        <>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600">Название</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600">Адрес / как найти</label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-24 h-24 rounded-2xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
              {detail?.imageLink ? (
                <img src={coverPreview(detail.imageLink)} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400 p-1 text-center">
                  нет обложки
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <label className="text-[11px] text-slate-600">Обложка (JPG, PNG)</label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                disabled={uploading}
                className="text-[11px] w-full"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file || !restaurantId) return;
                  setErr(null);
                  setUploading(true);
                  try {
                    const path = await uploadRestaurantCover(restaurantId, file);
                    const next = await patchRestaurant(restaurantId, { imageLink: path });
                    setDetail(next);
                  } catch {
                    setErr("Не удалось загрузить фото.");
                  } finally {
                    setUploading(false);
                    e.target.value = "";
                  }
                }}
              />
              {uploading && <span className="text-[10px] text-slate-500">Загрузка…</span>}
            </div>
          </div>

          <button
            type="button"
            disabled={saving || !name.trim() || !address.trim()}
            onClick={() => void save()}
            className="w-full rounded-2xl bg-slate-900 text-white text-xs font-semibold py-2.5 disabled:opacity-50"
          >
            {saving ? "Сохранение…" : "Сохранить название и адрес"}
          </button>
        </>
      )}
    </div>
  );
};
