import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../api/admin";

export function OrdersPage() {
  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ["admin", "orders"],
    queryFn: fetchOrders,
  });

  const list = orders as { id: number; status: string; total: number; createdAt: string; orderType?: string }[];

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">Заказы</h1>
      {isLoading && <p className="text-sm text-slate-500">Загрузка…</p>}
      {error && <p className="text-sm text-red-600">{String(error)}</p>}
      <div className="grid gap-3">
        {list.map((o) => (
          <div
            key={o.id}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex justify-between items-center"
          >
            <div>
              <span className="font-semibold text-slate-900">№{o.id}</span>
              <span className="ml-2 text-xs text-slate-500">{o.status}</span>
            </div>
            <div className="text-sm font-semibold text-slate-900">{Number(o.total).toFixed(0)} ₽</div>
          </div>
        ))}
      </div>
    </div>
  );
}
