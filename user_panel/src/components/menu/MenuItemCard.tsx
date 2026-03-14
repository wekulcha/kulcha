import { useCart } from '../../context/CartContext';
import type { Meal } from '../../types/meal';

interface MenuItemCardProps {
  meal: Meal;
}

export function MenuItemCard({ meal }: MenuItemCardProps) {
  const { getItemQuantity, addItem, increment, decrement } = useCart();
  const quantity = getItemQuantity(meal.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-3 flex gap-3">
      {/* Image */}
      <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
        {meal.image_link ? (
          <img
            src={meal.image_link}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-slate-100"></div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Name */}
        <h3 className="text-sm font-semibold text-slate-900 mb-1">{meal.name}</h3>

        {/* Description */}
        {meal.description && (
          <p className="text-xs text-slate-500 mb-1 line-clamp-2">{meal.description}</p>
        )}

        {/* Weight */}
        {meal.weight && (
          <p className="text-xs text-slate-400 mb-2">{meal.weight} г</p>
        )}

        {/* Price and controls */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-semibold text-slate-900">{meal.price} ₽</span>

          {/* Add/Quantity controls */}
          {quantity === 0 ? (
            <button
              onClick={() => addItem(meal)}
              className="bg-slate-900 text-white text-xs font-medium py-1.5 px-4 rounded-full hover:bg-slate-800 transition-colors"
            >
              + Добавить
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-slate-900 text-white rounded-full px-3 py-1">
              <button
                onClick={() => decrement(meal.id)}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                -
              </button>
              <span className="text-sm min-w-[1.5rem] text-center">{quantity}</span>
              <button
                onClick={() => increment(meal.id)}
                className="text-sm font-medium hover:opacity-80 transition-opacity"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

