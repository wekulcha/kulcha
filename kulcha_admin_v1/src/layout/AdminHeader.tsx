import React from "react";

interface AdminHeaderProps {
  title?: string;
  showBack?: boolean;
  onBackClick?: () => void;
  onBurgerClick?: () => void;
  onSearchClick?: () => void;
  showSearch?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  title = "KULCHA Admin",
  showBack = false,
  onBackClick,
  onBurgerClick,
  onSearchClick,
  showSearch = true,
}) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
      <button
        type="button"
        onClick={showBack ? onBackClick : onBurgerClick}
        className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"
      >
        {showBack ? (
          <span className="text-xs font-bold text-slate-700">‹</span>
        ) : (
          <div className="space-y-0.5">
            <span className="block w-3 h-[2px] bg-slate-700 rounded-full" />
            <span className="block w-3 h-[2px] bg-slate-700 rounded-full" />
            <span className="block w-3 h-[2px] bg-slate-700 rounded-full" />
          </div>
        )}
      </button>

      <div className="text-sm font-semibold text-slate-900 truncate">
        {title}
      </div>

      {showSearch ? (
        <button
          type="button"
          onClick={onSearchClick}
          className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center"
        >
          <div className="w-3 h-3 border border-slate-700 rounded-full relative">
            <span className="block w-[6px] h-[2px] bg-slate-700 absolute -right-[2px] bottom-0 rotate-45 rounded-full" />
          </div>
        </button>
      ) : (
        <div className="w-8 h-8" />
      )}
    </header>
  );
};

