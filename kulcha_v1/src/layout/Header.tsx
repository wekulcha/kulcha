interface HeaderProps {
  title?: string;
  onBurgerClick?: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
}

export function Header({ 
  title = 'KULCHA', 
  onBurgerClick,
  onSearchClick,
  showSearch = true 
}: HeaderProps) {
  const handleBurgerClick = () => {
    if (onBurgerClick) {
      onBurgerClick();
    } else {
      console.log('Burger clicked');
    }
  };

  const handleSearchClick = () => {
    if (onSearchClick) {
      onSearchClick();
    } else {
      console.log('Search clicked');
    }
  };

  return (
    <header className="h-14 flex items-center justify-between px-2 border-b border-slate-200 bg-white rounded-t-lg">
      {/* Burger menu button */}
      <button 
        onClick={handleBurgerClick}
        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
      >
        <svg
          className="w-6 h-6 text-slate-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Title */}
      <h1 className="text-base font-semibold text-slate-900">{title}</h1>

      {/* Search button */}
      {showSearch ? (
        <button 
          onClick={handleSearchClick}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg
            className="w-6 h-6 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      ) : (
        <div className="w-10" /> // Spacer to keep title centered
      )}
    </header>
  );
}

