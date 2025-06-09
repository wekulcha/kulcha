// Конфигурация для API с более надежной логикой определения URL
(function() {
  // Определяем базовый URL API на основе текущего окружения
  const determineApiUrl = () => {
    // Получаем текущий хост и origin
    const currentOrigin = window.location.origin;
    const currentHostname = window.location.hostname;
    
    console.log('Current environment:', {
      hostname: currentHostname,
      origin: currentOrigin
    });
    
    // Приоритет 1: Использовать явно указанную переменную окружения или localStorage
    const configuredApiUrl = process.env.REACT_APP_API_URL || localStorage.getItem('API_BASE_URL');
    if (configuredApiUrl) {
      console.log('Using configured API URL:', configuredApiUrl);
      return configuredApiUrl;
    }
    
    // Приоритет 2: Если это localhost, используем порт 8000
    if (currentHostname === 'localhost' || currentHostname === '127.0.0.1') {
      const apiUrl = `${currentOrigin.replace(/:\d+$/, '')}:8000/api`;
      console.log('Using local development API URL:', apiUrl);
      return apiUrl;
    }
    
    // Приоритет 3: Если это туннель, используем относительный путь
    if (currentHostname.includes('lhr.life') || 
        currentHostname.includes('serveo.net') || 
        currentHostname.includes('localhost.run')) {
      // Используем относительный путь для API того же домена
      const tunnelApiUrl = `${currentOrigin}/api`;
      console.log('Using tunnel API URL:', tunnelApiUrl);
      return tunnelApiUrl;
    }
    
    // Приоритет 4: Для всех остальных случаев - относительный путь в том же домене
    const defaultApiUrl = '/api';
    console.log('Using default relative API URL:', defaultApiUrl);
    return defaultApiUrl;
  };
  
  // Устанавливаем конфигурацию
  window.API_CONFIG = {
    API_BASE_URL: determineApiUrl()
  };
  
  // Функция для обновления URL API в случае необходимости
  window.updateApiBaseUrl = (newUrl) => {
    if (newUrl && typeof newUrl === 'string') {
      window.API_CONFIG.API_BASE_URL = newUrl;
      localStorage.setItem('API_BASE_URL', newUrl);
      console.log('API base URL updated to:', newUrl);
      return true;
    }
    return false;
  };
  
  console.log('API Config initialized with URL:', window.API_CONFIG.API_BASE_URL);
})(); 
