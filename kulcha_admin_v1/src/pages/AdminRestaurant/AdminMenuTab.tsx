import React, { useState, useEffect } from "react";
import { AdminMealCreate, Meal } from "../../types/adminMeal";
import {
  createAdminMeal,
  fetchAdminMeals,
  updateMealAvailability,
} from "../../api/adminMeals";

interface AdminMenuTabProps {
  restaurantId: number;
}

const CATEGORY_OPTIONS = [
  { value: "FIRST", label: "Первое" },
  { value: "SECOND", label: "Второе" },
  { value: "SALAD", label: "Салаты" },
  { value: "DESSERT", label: "Десерты" },
  { value: "DRINK", label: "Напитки" },
  { value: "SNACK", label: "Закуски" },
];

interface CreateMealModalProps {
  onCancel: () => void;
  onSave: (data: AdminMealCreate) => void;
  loading: boolean;
  error: string | null;
}

const CreateMealModal: React.FC<CreateMealModalProps> = ({
  onCancel,
  onSave,
  loading,
  error,
}) => {
  const [form, setForm] = useState<AdminMealCreate>({
    name: "",
    description: "",
    weight: undefined,
    calorie: undefined,
    image_link: "",
    category: "",
    price: 0,
    is_available: true,
  });

  const handleChange = (field: keyof AdminMealCreate, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.image_link || !form.price) {
      return;
    }
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      onClick={onCancel}
    >
      <form
        className="bg-white rounded-3xl p-4 w-full max-w-sm space-y-3 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="text-sm font-semibold text-slate-900">
            Новое блюдо
          </div>
          <button
            type="button"
            className="text-slate-400 hover:text-slate-700 text-lg leading-none"
            onClick={onCancel}
          >
            ×
          </button>
        </div>

        {error && <div className="text-[11px] text-red-500">{error}</div>}

        {/* Name */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-600">Название *</label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-600">Категория *</label>
          <select
            className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px] bg-white"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            required
          >
            <option value="" disabled>
              Выберите категорию
            </option>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-600">Цена *</label>
          <input
            type="number"
            className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
            value={form.price || ""}
            onChange={(e) =>
              handleChange("price", parseFloat(e.target.value) || 0)
            }
            required
            min="0"
            step="0.01"
          />
        </div>

        {/* Image upload */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-600">
            Изображение блюда *
          </label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-[11px]"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = () => {
                const result = reader.result;
                if (typeof result === "string") {
                  // For dev: store Data URL as image_link
                  handleChange("image_link", result);
                }
              };
              reader.readAsDataURL(file);
            }}
            required
          />
          <p className="text-[10px] text-slate-500">
            Для теста изображение сохраняется как Data URL в поле image_link.
          </p>
        </div>

        {/* Optional fields: description, weight, calorie */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-600">Описание</label>
          <textarea
            className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px] min-h-[60px]"
            value={form.description ?? ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600">Вес, г</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
              value={form.weight ?? ""}
              onChange={(e) =>
                handleChange(
                  "weight",
                  e.target.value ? parseInt(e.target.value, 10) : undefined
                )
              }
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-slate-600">Ккал</label>
            <input
              type="number"
              className="w-full rounded-xl border border-slate-200 px-2 py-1.5 text-[11px]"
              value={form.calorie ?? ""}
              onChange={(e) =>
                handleChange(
                  "calorie",
                  e.target.value ? parseInt(e.target.value, 10) : undefined
                )
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-slate-900 text-white text-xs font-semibold py-2 mt-1 disabled:opacity-60"
        >
          {loading ? "Сохраняем..." : "Создать блюдо"}
        </button>
      </form>
    </div>
  );
};

export const AdminMenuTab: React.FC<AdminMenuTabProps> = ({
  restaurantId,
}) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [editMeal, setEditMeal] = useState<Meal | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!restaurantId || Number.isNaN(restaurantId)) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchAdminMeals(restaurantId);
        setMeals(data);
      } catch (err) {
        console.error(err);
        setError("Не удалось загрузить меню. Попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [restaurantId]);

  const handleCreateMeal = async (form: AdminMealCreate) => {
    try {
      setCreateLoading(true);
      setCreateError(null);
      const created = await createAdminMeal(restaurantId, {
        ...form,
        is_available: form.is_available ?? true,
      });
      setMeals((prev) => [...prev, created]);
      setIsCreateOpen(false);
    } catch (err) {
      console.error(err);
      setCreateError("Не удалось создать блюдо. Попробуйте ещё раз.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleToggleAvailability = async (
    mealId: number,
    isAvailable: boolean
  ) => {
    try {
      const updated = await updateMealAvailability(mealId, isAvailable);
      setMeals((prev) =>
        prev.map((m) => (m.id === mealId ? updated : m))
      );
    } catch (err) {
      console.error(err);
      alert("Не удалось изменить доступность блюда");
    }
  };

  const openEditModal = (meal: Meal) => {
    setEditMeal(meal);
    setIsEditOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-900">
          Меню ресторана
        </div>
        <button
          type="button"
          className="text-xs px-3 py-1 rounded-full bg-emerald-500 text-white font-semibold shadow-sm"
          onClick={() => {
            setCreateError(null);
            setIsCreateOpen(true);
          }}
        >
          + Добавить блюдо
        </button>
      </div>

      {loading && (
        <div className="text-xs text-slate-500">Загрузка меню...</div>
      )}

      {error && !loading && (
        <div className="text-xs text-red-500">{error}</div>
      )}

      {!loading && !error && meals.length === 0 && (
        <div className="text-xs text-slate-500">
          Пока нет блюд в меню. Добавьте первое блюдо!
        </div>
      )}

      {!loading && !error && meals.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className={
                "bg-white rounded-2xl p-3 border border-slate-100 shadow-sm flex flex-col gap-2 " +
                (meal.is_available ? "" : "opacity-60")
              }
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="text-xs font-semibold text-slate-900 truncate">
                    {meal.name}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {meal.category} • {Math.round(meal.price)} ₽
                  </div>
                </div>

                {/* Edit pencil */}
                <button
                  type="button"
                  className="text-slate-400 hover:text-slate-700 text-sm"
                  onClick={() => openEditModal(meal)}
                >
                  ✏️
                </button>
              </div>

              {/* Availability toggle */}
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={meal.is_available}
                    onChange={async (e) => {
                      const newVal = e.target.checked;
                      await handleToggleAvailability(meal.id, newVal);
                    }}
                    className="h-3 w-3 rounded border-slate-300"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-[10px] text-slate-600">
                    В наличии
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCreateOpen && (
        <CreateMealModal
          onCancel={() => setIsCreateOpen(false)}
          onSave={handleCreateMeal}
          loading={createLoading}
          error={createError}
        />
      )}

      {isEditOpen && editMeal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white rounded-3xl p-4 w-full max-w-sm shadow-lg">
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="text-sm font-semibold text-slate-900">
                Редактирование блюда
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 text-lg leading-none"
                onClick={() => {
                  setIsEditOpen(false);
                  setEditMeal(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="text-xs text-slate-500">
              Редактирование блюда будет реализовано в следующем шаге.
            </div>
            <div className="text-xs font-semibold text-slate-900 mt-2">
              {editMeal.name}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">
              {editMeal.category} • {Math.round(editMeal.price)} ₽
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
