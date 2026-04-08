interface HeaderProps {
  title?: string;
  onBurgerClick?: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
  showBack?: boolean;
  onBackClick?: () => void;
}

export function Header({
  title = 'KULCHA',
  onBurgerClick,
  onSearchClick,
  showSearch = true,
  showBack = false,
  onBackClick,
}: HeaderProps) {
  const handleLeftClick = () => {
    if (showBack && onBackClick) {
      onBackClick();
    } else if (onBurgerClick) {
      onBurgerClick();
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-2 border-b border-slate-200 bg-white rounded-t-lg">
      <button
        type="button"
        onClick={handleLeftClick}
        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        aria-label={showBack ? 'Назад' : 'Меню'}
      >
        {showBack ? (
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      <h1 className="text-base font-semibold text-slate-900">{title}</h1>

      {showSearch ? (
        <button
          type="button"
          onClick={handleSearchClick}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Поиск"
        >
          <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      ) : (
        <div className="w-10" />
      )}
    </header>
  );
}
