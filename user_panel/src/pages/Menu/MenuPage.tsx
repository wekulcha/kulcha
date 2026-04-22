import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { Header } from '../../layout/Header';
import { BottomBarCart } from '../../layout/BottomBarCart';
import { useAppContext } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { fetchMealsByRestaurant } from '../../api/meals';
import { MenuItemCard } from '../../components/menu/MenuItemCard';
import type { Meal } from '../../types/meal';
import { mealCategoryLabel, mealCategoryRank } from '../../utils/mealCategoryLabels';
import { formatLocationShort } from '../../utils/locationFormat';

export function MenuPage() {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { serviceType, setServiceType, selectedRestaurant } = useAppContext();
  const { currentUser } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isCategoryKey = (value: string | null): value is string => Boolean(value);
  const deliveryAddressLabel = formatLocationShort(currentUser?.address ?? null);

  useEffect(() => {
    if (!restaurantId) {
      setError('Restaurant ID is missing');
      setLoading(false);
      return;
    }

    const loadMeals = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMealsByRestaurant(Number(restaurantId));
        setMeals(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, [restaurantId]);

  // Apply search filter
  const normalizedSearch = searchQuery.toLowerCase().trim();
  const mealsAfterSearch = normalizedSearch
    ? meals.filter((m) =>
        m.name.toLowerCase().includes(normalizedSearch) ||
        (m.description ?? '').toLowerCase().includes(normalizedSearch)
      )
    : meals;

  // Compute categories from filtered meals
  const categories = Array.from(
    new Set(mealsAfterSearch.map((m) => m.category).filter(isCategoryKey))
  ).sort((a, b) => {
    const rankDiff = mealCategoryRank(a) - mealCategoryRank(b);
    if (rankDiff !== 0) return rankDiff;
    return a.localeCompare(b, 'ru');
  });

  // Group meals by category
  type CategoryKey = string;
  const groupedMeals: Record<CategoryKey, Meal[]> = {};
  for (const meal of mealsAfterSearch) {
    const cat = meal.category || 'OTHER';
    if (!groupedMeals[cat]) {
      groupedMeals[cat] = [];
    }
    groupedMeals[cat].push(meal);
  }

  // Set default selected category
  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  // Auto-update active category on scroll (only when not searching)
  useEffect(() => {
    if (categories.length === 0) return;
    if (searchQuery.trim() !== '') return; // Disable auto-switching when searching

    const observer = new IntersectionObserver(
      (entries) => {
        const visible: { cat: string; top: number }[] = [];

        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cat = entry.target.getAttribute('data-category');
            if (cat) {
              visible.push({ cat, top: entry.boundingClientRect.top });
            }
          }
        }

        if (visible.length > 0) {
          // Choose the section closest to the top (smallest top)
          visible.sort((a, b) => a.top - b.top);
          const newActive = visible[0].cat;
          setSelectedCategory((prev) => (prev === newActive ? prev : newActive));
        }
      },
      {
        root: null,
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    for (const cat of categories) {
      const el = categoryRefs.current[cat];
      if (el) {
        el.setAttribute('data-category', cat);
        observer.observe(el);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [categories, searchQuery]);

  const handleRetry = () => {
    if (!restaurantId) return;
    setError(null);
    setLoading(true);
    fetchMealsByRestaurant(Number(restaurantId))
      .then((data) => {
        setMeals(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        setLoading(false);
      });
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const el = categoryRefs.current[cat];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <MiniAppShell>
      <div className="space-y-4 pb-24">
        <Header
          title={selectedRestaurant?.name ?? 'Меню'}
          showBack
          onBackClick={() => navigate('/cafes')}
          onProfileClick={() => navigate('/profile')}
          onSearchClick={() => setIsSearchOpen((prev) => !prev)}
        />

        {/* Search input */}
        {isSearchOpen && (
          <div className="mt-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по блюдам"
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

        {/* Service type hint */}
        {serviceType === 'DINE_IN' && selectedRestaurant && (
          <div className="flex items-center justify-between bg-slate-100 rounded-full px-4 py-2">
            <span className="text-sm text-slate-700">
              В зале: {selectedRestaurant.name}
            </span>
            <button
              onClick={() => navigate('/cafes')}
              className="text-xs text-slate-600 underline hover:text-slate-900"
            >
              Выбрать другой ресторан
            </button>
          </div>
        )}

        {serviceType === 'DELIVERY' && (
          <div className="bg-slate-100 rounded-full px-4 py-2">
            <span className="text-sm text-slate-700">
              Доставка: {deliveryAddressLabel || 'адрес не указан'}
            </span>
          </div>
        )}

        {/* Sticky category tabs */}
        {!loading && !error && categories.length > 0 && (
          <div className="sticky top-14 z-20 -mx-4 px-4 py-2 bg-neutral-50/95 backdrop-blur-sm border-b border-slate-200">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryClick(cat)}
                    className={
                      'whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium border transition-colors ' +
                      (isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200')
                    }
                  >
                    {mealCategoryLabel(cat)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm p-3 flex gap-3 animate-pulse"
              >
                <div className="w-20 h-20 bg-slate-100 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <p className="text-sm text-slate-600 text-center mb-4">
              Не удалось загрузить меню. Попробуйте позже.
            </p>
            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-slate-900 text-white rounded-2xl text-sm font-medium hover:bg-slate-800 transition-colors"
            >
              Попробовать снова
            </button>
          </div>
        )}

        {/* Meals list grouped by category */}
        {!loading && !error && (
          <div className="mt-3 space-y-4 pb-28">
            {categories.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                {searchQuery.trim()
                  ? 'Ничего не найдено. Попробуйте изменить запрос.'
                  : 'Нет доступных блюд'}
              </div>
            ) : (
              categories.map((cat) => {
                const mealsInCat = groupedMeals[cat] ?? [];
                if (mealsInCat.length === 0) return null;

                return (
                  <div
                    key={cat}
                    ref={(el) => {
                      categoryRefs.current[cat] = el;
                    }}
                    data-category={cat}
                    className="space-y-2"
                  >
                    <div className="text-sm font-semibold text-slate-800 px-1">
                      {mealCategoryLabel(cat)}
                    </div>
                    <div className="space-y-3">
                      {mealsInCat.map((meal) => (
                        <MenuItemCard key={meal.id} meal={meal} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Bottom cart bar */}
      <BottomBarCart />
    </MiniAppShell>
  );
}
