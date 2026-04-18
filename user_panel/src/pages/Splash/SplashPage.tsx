import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MiniAppShell } from '../../layout/MiniAppShell';
import { getTelegramStartParam } from '../../telegram/initTelegram';

export function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      const sp = getTelegramStartParam();
      if (sp === 'cart') {
        navigate('/cart', { replace: true });
        return;
      }
      if (sp === 'profile') {
        navigate('/profile', { replace: true });
        return;
      }
      navigate('/cafes', { replace: true });
    }, 1300);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <MiniAppShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo placeholder */}
        <div className="w-32 h-32 rounded-full bg-white shadow-md flex items-center justify-center mb-6 border border-slate-200">
          <span className="text-2xl font-bold text-slate-800">KULCHA</span>
        </div>

        {/* Welcome text */}
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Добро пожаловать!
        </h1>

        {/* Subtitle */}
        <p className="text-sm text-slate-500 text-center mb-6">
          KULCHA — платформа для ваших любимых кафе
        </p>

        {/* Loading indicator */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </MiniAppShell>
  );
}

