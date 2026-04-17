import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchAdminUsers } from "../api/admin";
import type { AdminUserOverview } from "../types/admin";

export function UsersPage() {
  const [q, setQ] = useState("");
  const { data: users = [], isLoading, error, isError } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
    retry: 1,
  });

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return users;
    return users.filter((u) => {
      const hay = [
        String(u.id),
        u.username ?? "",
        u.phone ?? "",
        u.email ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(n);
    });
  }, [users, q]);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-lg font-semibold text-slate-900">Пользователи</h1>
        <input
          type="search"
          placeholder="Поиск по ID, username, телефону…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full sm:max-w-xs rounded-xl border border-slate-200 px-3 py-1.5 text-sm"
        />
      </div>
      {isLoading && <p className="text-xs text-slate-500">Загрузка…</p>}
      {isError && (
        <p className="text-xs text-red-600">
          Не удалось загрузить список. {String(error)}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-2 py-2 font-medium">ID</th>
              <th className="px-2 py-2 font-medium">Ник</th>
              <th className="px-2 py-2 font-medium">Телефон</th>
              <th className="px-2 py-2 font-medium">Рестораны</th>
              <th className="px-2 py-2 font-medium">Заказы</th>
              <th className="px-2 py-2 font-medium">Курьер</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <UserRow key={u.id} u={u} />
            ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <div className="px-3 py-3 text-xs text-slate-500">Ничего не найдено.</div>
        )}
      </div>
    </div>
  );
}

function UserRow({ u }: { u: AdminUserOverview }) {
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50/80">
      <td className="px-2 py-1.5 font-mono text-[11px]">{u.id}</td>
      <td className="px-2 py-1.5 max-w-[120px] truncate" title={u.username ?? ""}>
        {u.username || "—"}
      </td>
      <td className="px-2 py-1.5 max-w-[100px] truncate" title={u.phone ?? ""}>
        {u.phone || "—"}
      </td>
      <td className="px-2 py-1.5">{u.staffAssignments?.length ?? 0}</td>
      <td className="px-2 py-1.5">{u.orderHistory?.length ?? 0}</td>
      <td className="px-2 py-1.5">{u.courier ? "да" : "—"}</td>
    </tr>
  );
}
