import React, { useEffect, useState } from "react";
import {
  addRestaurantStaff,
  fetchRestaurantStaff,
  removeRestaurantStaff,
  type StaffMember,
  type StaffPermission,
} from "../../api/staff";

interface AdminStaffTabProps {
  restaurantId: number;
}

const PERM_LABEL: Record<StaffPermission, string> = {
  CAN_EDIT_MENU: "Редактирование меню",
  CAN_LOOK_ORDERS: "Просмотр заказов",
};

export const AdminStaffTab: React.FC<AdminStaffTabProps> = ({ restaurantId }) => {
  const [list, setList] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tgInput, setTgInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [addMode, setAddMode] = useState<"id" | "phone">("id");
  const [perm, setPerm] = useState<StaffPermission>("CAN_LOOK_ORDERS");
  const [adding, setAdding] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchRestaurantStaff(restaurantId);
      setList(data);
    } catch {
      setError("Не удалось загрузить сотрудников.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;
    void load();
  }, [restaurantId]);

  const handleAdd = async () => {
    try {
      setAdding(true);
      setError(null);
      if (addMode === "id") {
        const tid = parseInt(tgInput.trim(), 10);
        if (!Number.isFinite(tid) || tid <= 0) {
          setError("Введите числовой Telegram ID.");
          return;
        }
        const created = await addRestaurantStaff(restaurantId, perm, { telegramId: tid });
        setList((prev) => [...prev, created]);
        setTgInput("");
      } else {
        const p = phoneInput.replace(/\D/g, "");
        if (p.length !== 10) {
          setError("Введите 10 цифр номера (как в профиле, с 9…).");
          return;
        }
        const created = await addRestaurantStaff(restaurantId, perm, { phone: `7${p}` });
        setList((prev) => [...prev, created]);
        setPhoneInput("");
      }
    } catch {
      setError(
        "Не удалось добавить. Пользователь должен сначала нажать /start в боте KULCHA и не должен дублировать роль."
      );
    } finally {
      setAdding(false);
    }
  };

  const handleRemove = async (m: StaffMember) => {
    if (!confirm(`Убрать ${m.username} из ресторана?`)) return;
    try {
      await removeRestaurantStaff(restaurantId, m.staffId);
      setList((prev) => prev.filter((x) => x.staffId !== m.staffId));
    } catch {
      setError("Не удалось удалить сотрудника.");
    }
  };

  return (
    <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-3">
      <div className="text-sm font-semibold text-slate-900">Команда ресторана</div>
      <p className="text-[11px] text-slate-500">
        Добавьте Telegram ID сотрудника (число из профиля Telegram). Сначала пусть
        зарегистрируется в боте KULCHA через /start.
      </p>

      {error && <div className="text-[11px] text-red-500">{error}</div>}

      <div className="space-y-2 rounded-2xl border border-slate-100 p-2 bg-slate-50/80">
        <div className="flex gap-1">
          <button
            type="button"
            className={
              "flex-1 rounded-xl py-1.5 text-[10px] font-medium border " +
              (addMode === "id" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200")
            }
            onClick={() => setAddMode("id")}
          >
            По Telegram ID
          </button>
          <button
            type="button"
            className={
              "flex-1 rounded-xl py-1.5 text-[10px] font-medium border " +
              (addMode === "phone" ? "bg-slate-900 text-white border-slate-900" : "bg-white border-slate-200")
            }
            onClick={() => setAddMode("phone")}
          >
            По телефону
          </button>
        </div>
        {addMode === "id" ? (
          <>
            <label className="text-[11px] text-slate-600">Telegram ID</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
              placeholder="например 123456789"
              value={tgInput}
              onChange={(e) => setTgInput(e.target.value)}
            />
          </>
        ) : (
          <>
            <label className="text-[11px] text-slate-600">Телефон (как в профиле, без +7)</label>
            <input
              type="tel"
              inputMode="numeric"
              className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
              placeholder="9001234567"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </>
        )}
        <label className="text-[11px] text-slate-600">Права</label>
        <select
          className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px] bg-white"
          value={perm}
          onChange={(e) => setPerm(e.target.value as StaffPermission)}
        >
          <option value="CAN_LOOK_ORDERS">{PERM_LABEL.CAN_LOOK_ORDERS}</option>
          <option value="CAN_EDIT_MENU">{PERM_LABEL.CAN_EDIT_MENU}</option>
        </select>
        <button
          type="button"
          disabled={adding}
          onClick={() => void handleAdd()}
          className="w-full rounded-2xl bg-emerald-600 text-white text-xs font-semibold py-2 disabled:opacity-60"
        >
          {adding ? "Добавляем..." : "Добавить сотрудника"}
        </button>
      </div>

      {loading && <div className="text-xs text-slate-500">Загрузка...</div>}

      {!loading && list.length === 0 && (
        <div className="text-xs text-slate-500">Пока только вы в команде.</div>
      )}

      <ul className="space-y-2">
        {list.map((m) => (
          <li
            key={m.staffId}
            className="flex items-start justify-between gap-2 rounded-2xl border border-slate-100 px-3 py-2"
          >
            <div>
              <div className="text-xs font-semibold text-slate-900">{m.username}</div>
              <div className="text-[10px] text-slate-500">
                TG: {m.userId} · {m.phone}
              </div>
              <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
                {PERM_LABEL[m.permission]}
              </div>
            </div>
            <button
              type="button"
              className="text-[10px] text-red-600 font-semibold shrink-0"
              onClick={() => void handleRemove(m)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
