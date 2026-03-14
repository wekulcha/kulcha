import { Outlet, Link } from "react-router-dom";

export function SuperadminShell() {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav className="bg-white border-b border-slate-200 px-4 py-3 flex gap-4">
        <Link to="/" className="text-sm font-semibold text-slate-800 hover:text-slate-900">
          Рестораны
        </Link>
        <Link to="/users" className="text-sm font-semibold text-slate-800 hover:text-slate-900">
          Пользователи
        </Link>
        <Link to="/orders" className="text-sm font-semibold text-slate-800 hover:text-slate-900">
          Заказы
        </Link>
        <Link to="/analytics" className="text-sm font-semibold text-slate-800 hover:text-slate-900">
          Аналитика
        </Link>
        <Link to="/tools" className="text-sm font-semibold text-slate-800 hover:text-slate-900">
          Инструменты
        </Link>
      </nav>
      <main className="p-4 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
