import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Meal } from '../types/meal';
import type { CartItem } from '../types/cart';

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  addItem: (meal: Meal) => void;
  increment: (mealId: number) => void;
  decrement: (mealId: number) => void;
  getItemQuantity: (mealId: number) => number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const getItemQuantity = (mealId: number): number => {
    const item = items.find((it) => it.meal.id === mealId);
    return item ? item.quantity : 0;
  };

  const addItem = (meal: Meal) => {
    setItems((prev) => {
      const existing = prev.find((it) => it.meal.id === meal.id);
      if (!existing) {
        return [...prev, { meal, quantity: 1 }];
      }
      return prev.map((it) =>
        it.meal.id === meal.id ? { ...it, quantity: it.quantity + 1 } : it
      );
    });
  };

  const increment = (mealId: number) => {
    setItems((prev) =>
      prev.map((it) =>
        it.meal.id === mealId ? { ...it, quantity: it.quantity + 1 } : it
      )
    );
  };

  const decrement = (mealId: number) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.meal.id === mealId ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0)
    );
  };

  const totalItems = items.reduce((sum, it) => sum + it.quantity, 0);

  const value: CartContextValue = {
    items,
    totalItems,
    addItem,
    increment,
    decrement,
    getItemQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartContextProvider');
  }
  return ctx;
}

