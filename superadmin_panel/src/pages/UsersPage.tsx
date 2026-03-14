import { useQuery } from "@tanstack/react-query";
import { fetchAdminUsers } from "../api/admin";

export function UsersPage() {
  const { data: users = [], isLoading, error, isError } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchAdminUsers,
    retry: 1,
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Пользователи</h1>
      {isLoading && <p className="text-sm text-slate-500">Загрузка…</p>}
      {isError && (
        <p className="text-sm text-red-600">
          Не удалось загрузить список. Проверьте, что бэкенд запущен (порт 8080) и CORS разрешён. Ошибка: {String(error)}
        </p>
      )}
      <div className="grid gap-3">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between">
              <div className="font-semibold text-slate-900">{u.username}</div>
              {u.courier && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700">
                  Курьер
                </span>
              )}
            </div>
            <div className="text-xs text-slate-500 mt-1">ID: {u.id}, {u.phone}</div>
            <div className="text-xs text-slate-600 mt-2">
              Ресторанов: {u.staffAssignments?.length ?? 0}, заказов: {u.orderHistory?.length ?? 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
