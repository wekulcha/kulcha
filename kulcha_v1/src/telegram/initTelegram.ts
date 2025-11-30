declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        ready: () => void;
        version?: string;
        platform?: string;
        colorScheme?: 'light' | 'dark';
        themeParams?: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
        };
      };
    };
  }
}

export function initTelegramWebApp(): void {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const webApp = window.Telegram.WebApp;
    
    // Initialize the WebApp
    webApp.ready();
    
    // Set theme-related CSS variables if themeParams are available
    if (webApp.themeParams) {
      const theme = webApp.themeParams;
      
      if (theme.bg_color) {
        document.documentElement.style.setProperty('--tg-theme-bg-color', theme.bg_color);
      }
      
      if (theme.text_color) {
        document.documentElement.style.setProperty('--tg-theme-text-color', theme.text_color);
      }
      
      if (theme.hint_color) {
        document.documentElement.style.setProperty('--tg-theme-hint-color', theme.hint_color);
      }
      
      if (theme.link_color) {
        document.documentElement.style.setProperty('--tg-theme-link-color', theme.link_color);
      }
      
      if (theme.button_color) {
        document.documentElement.style.setProperty('--tg-theme-button-color', theme.button_color);
      }
      
      if (theme.button_text_color) {
        document.documentElement.style.setProperty('--tg-theme-button-text-color', theme.button_text_color);
      }
    }
  }
}

