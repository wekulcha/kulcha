import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { deleteAdminUser, fetchAdminUsers, setUserActive } from "../api/admin";
import { ApiError } from "../api/client";
import type { AdminUserOverview } from "../types/admin";

function formatApiFailure(err: unknown): string {
  if (err instanceof ApiError) {
    try {
      const j = JSON.parse(err.body) as { detail?: unknown };
      const d = j.detail;
      if (typeof d === "string") return d;
      if (Array.isArray(d)) {
        return d
          .map((x) => (typeof x === "object" && x && "msg" in x ? String((x as { msg: string }).msg) : String(x)))
          .join("; ");
      }
    } catch {
      /* not JSON */
    }
    if (err.body) return err.body;
    return `Ошибка ${err.status}`;
  }
  if (err instanceof Error) return err.message;
  return String(err);
}

export function UsersPage() {
  const [q, setQ] = useState("");
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, error, isError } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
    retry: 1,
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, active }: { id: number; active: boolean }) => setUserActive(id, active),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteAdminUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
  });

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return users;
    return users.filter((u) => {
      const hay = [String(u.id), u.username ?? "", u.phone ?? "", u.email ?? ""].join(" ").toLowerCase();
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
        <p className="text-xs text-red-600 whitespace-pre-wrap break-words" role="alert">
          Не удалось загрузить список. {formatApiFailure(error)}
        </p>
      )}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-2 py-2 font-medium">ID</th>
              <th className="px-2 py-2 font-medium">Ник</th>
              <th className="px-2 py-2 font-medium">Телефон</th>
              <th className="px-2 py-2 font-medium">Статус</th>
              <th className="px-2 py-2 font-medium">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <UserRow
                key={u.id}
                u={u}
                onToggle={(active) => toggleMutation.mutate({ id: u.id, active })}
                onDelete={() => {
                  if (!window.confirm(`Удалить пользователя ${u.id} безвозвратно? Только если нет заказов.`)) return;
                  deleteMutation.mutate(u.id);
                }}
                busy={toggleMutation.isPending || deleteMutation.isPending}
              />
            ))}
          </tbody>
        </table>
        {!isLoading && filtered.length === 0 && (
          <div className="px-3 py-3 text-xs text-slate-500">Ничего не найдено.</div>
        )}
      </div>
      {(toggleMutation.isError || deleteMutation.isError) && (
        <p className="text-xs text-red-600" role="alert">
          {formatApiFailure(toggleMutation.error ?? deleteMutation.error)}
        </p>
      )}
    </div>
  );
}

function UserRow({
  u,
  onToggle,
  onDelete,
  busy,
}: {
  u: AdminUserOverview;
  onToggle: (active: boolean) => void;
  onDelete: () => void;
  busy: boolean;
}) {
  const active = u.isActive !== false;
  return (
    <tr className="border-t border-slate-100 hover:bg-slate-50/80">
      <td className="px-2 py-1.5 font-mono text-[11px]">{u.id}</td>
      <td className="px-2 py-1.5 max-w-[100px] truncate" title={u.username ?? ""}>
        {u.username || "—"}
      </td>
      <td className="px-2 py-1.5 max-w-[90px] truncate" title={u.phone ?? ""}>
        {u.phone || "—"}
      </td>
      <td className="px-2 py-1.5">
        <span className={active ? "text-emerald-700" : "text-slate-400"}>{active ? "активен" : "выкл."}</span>
      </td>
      <td className="px-2 py-1.5">
        <div className="flex flex-wrap gap-1">
          <button
            type="button"
            disabled={busy}
            onClick={() => onToggle(!active)}
            className="rounded-lg bg-slate-200 px-2 py-0.5 text-[10px] font-medium text-slate-800 disabled:opacity-50"
          >
            {active ? "Отключить" : "Включить"}
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={onDelete}
            className="rounded-lg bg-red-50 px-2 py-0.5 text-[10px] font-medium text-red-700 disabled:opacity-50"
          >
            Удалить
          </button>
        </div>
      </td>
    </tr>
  );
}
