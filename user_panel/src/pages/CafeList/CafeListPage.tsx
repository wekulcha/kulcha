import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';
import { useAppContext } from '../../context/AppContext';
import { fetchRestaurants } from '../../api/restaurants';
import type { Restaurant } from '../../types/restaurant';

export function CafeListPage() {
  const navigate = useNavigate();
  const { serviceType, setServiceType, setSelectedRestaurant } = useAppContext();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: restaurants = [], isLoading: loading, error: queryError, refetch } = useQuery({
    queryKey: ['restaurants'],
    queryFn: fetchRestaurants,
  });
  const error = queryError ? (queryError instanceof Error ? queryError.message : 'Неизвестная ошибка') : null;

  const handleRetry = () => refetch();

  const handleSelectRestaurant = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    navigate(`/cafes/${restaurant.id}/menu`);
  };

  const normalizedSearch = searchQuery.toLowerCase().trim();
  const visibleRestaurants = normalizedSearch
    ? restaurants.filter((r) =>
        r.name.toLowerCase().includes(normalizedSearch) ||
        r.address.toLowerCase().includes(normalizedSearch)
      )
    : restaurants;

  return (
    <MiniAppShell>
      <div className="space-y-4 pb-6">
        <Header
          title="Выбор кафе"
          showBack
          onBackClick={() => navigate(-1)}
          onBurgerClick={() => navigate('/profile')}
          onSearchClick={() => setIsSearchOpen((prev) => !prev)}
        />

        {/* Search input */}
        {isSearchOpen && (
          <div className="mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию или адресу"
              className="w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        )}

        {/* Service type toggle */}
        <div className="flex bg-slate-100 p-1 rounded-full">
          <button
            onClick={() => setServiceType('DELIVERY')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              serviceType === 'DELIVERY'
                ? 'bg-white shadow-sm text-slate-900'
                : 'text-slate-500'
            }`}
          >
            Доставка
          </button>
          <button
            onClick={() => setServiceType('DINE_IN')}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
              serviceType === 'DINE_IN'
                ? 'bg-white shadow-sm text-slate-900'
                : 'text-slate-500'
            }`}
          >
            В зале
          </button>
        </div>

        {/* Section title */}
        <h2 className="text-lg font-semibold text-slate-900 px-2">
          Выберите ваш ресторан
        </h2>

        {/* Restaurant grid */}
        {loading && (
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-3 animate-pulse"
              >
                <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-2"></div>
                <div className="h-4 bg-slate-200 rounded mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-sm text-slate-600 text-center mb-4">
              Не удалось загрузить рестораны. Попробуйте позже.
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {!loading && !error && visibleRestaurants.length === 0 && searchQuery.trim() && (
          <div className="text-center text-sm text-slate-500 mt-8">
            Ничего не найдено. Попробуйте изменить запрос.
          </div>
        )}

        {!loading && !error && visibleRestaurants.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {visibleRestaurants.map((restaurant) => (
              <button
                key={restaurant.id}
                onClick={() => handleSelectRestaurant(restaurant)}
                className="bg-white rounded-2xl shadow-sm p-3 text-left hover:shadow-md transition-shadow"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-slate-100 rounded-xl mb-2"></div>
                
                {/* Cafe name */}
                <h3 className="text-sm font-semibold text-slate-900 mb-1 line-clamp-2">
                  {restaurant.name}
                </h3>
                
                {/* Address */}
                <p className="text-xs text-slate-500 truncate">
                  {restaurant.address}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </MiniAppShell>
  );
}

