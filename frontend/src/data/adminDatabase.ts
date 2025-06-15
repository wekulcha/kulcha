import { fetchWithCSRF } from "../services/api";
import axios from "axios";

// Интерфейсы для типов данных (оставляем для совместимости с существующим кодом)

// Тип доставки
export type DeliveryMethod = "delivery" | "pickup";

// Интерфейс для владельца ресторана
export interface RestaurantOwner {
  id: number;
  email: string;
  password: string;
  name: string;
  restaurantId: number;
}

// Интерфейс для данных ресторана в админке
export interface RestaurantAdminData {
  id: number;
  name: string;
  address: string;
  city: string;
  description: string;
  coverImage: string;
  rating: number;
  totalOrders: number;
  totalRevenue: number;
  netProfit: number;
  averageOrderValue: number;
}

// Интерфейс пользовательского адреса
export interface UserAddress {
  id?: number;
  name: string;
  phone: string;
  address: string;
  city: string;
}

// Интерфейс для корзины товаров
export interface CartItem extends MenuItem {
  quantity: number;
}

// Интерфейс для заказа пользователя
export interface Order {
  id: number;
  items: CartItem[];
  totalAmount: number;
  deliveryMethod: DeliveryMethod;
  date: string;
  status:
    | "new"
    | "confirmed"
    | "preparing"
    | "ready"
    | "delivered"
    | "rejected";
  restaurantId: number;
  userAddress?: UserAddress;
}

// Интерфейс для заказа в системе администратора
export interface AdminOrder {
  id: number;
  restaurantId: number;
  customer: string;
  date: string;
  amount: number;
  status: string;
}

// Интерфейс для пункта меню ресторана
export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  available?: boolean;
}

// Интерфейс для статистики ресторана
export interface RestaurantStatistics {
  statistics: {
    totalSales: number;
    orderCount: number;
    averageOrderValue: number;
    popularItems: MenuItem[];
  };
  recentOrders: Order[];
}

// API URL
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000/api";

// Функция для получения CSRF токена из cookie
function getCookie(name: string): string | null {
  const cookieValue = document.cookie.match(
    "(^|;)\\s*" + name + "\\s*=\\s*([^;]+)"
  );
  return cookieValue ? cookieValue.pop()! : null;
}

// Функция для получения CSRF токена
export const getCSRFToken = async (): Promise<string | null> => {
  try {
    // Запрос к эндпоинту, который возвращает CSRF токен в куки
    const response = await axios.get(`${API_BASE_URL}/auth/csrf/`, {
      withCredentials: true,
    });

    // Добавляем небольшую задержку, чтобы убедиться, что куки установился
    await new Promise((resolve) => setTimeout(resolve, 300));

    const token = getCookie("csrftoken");
    console.log(
      "CSRF token fetched successfully:",
      token ? `${token.substring(0, 6)}...` : "null"
    );
    return token;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return null;
  }
};

// Функция для обработки ошибок с улучшенным логированием
const handleError = (error: any, fallback: any = null) => {
  if (error.message) {
    console.error("API Error:", error.message);
  }

  if (error.response) {
    console.error("API Response Status:", error.response.status);
    console.error("API Response Data:", error.response.data);
  }

  console.error("Full Error:", error);
  return fallback;
};

// Утилита для получения конфигурации запроса с CSRF токеном для axios
const getAxiosConfig = async (
  contentType: boolean = true,
  needsCSRF: boolean = false
): Promise<{ headers: Record<string, string>; withCredentials: boolean }> => {
  const headers: Record<string, string> = {};

  if (contentType) {
    headers["Content-Type"] = "application/json";
  }
  headers["Accept"] = "application/json";

  // Для небезопасных методов (POST, PUT, DELETE, PATCH) получаем CSRF токен
  if (needsCSRF) {
    const csrfToken = await getCSRFToken();
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    } else {
      console.warn("No CSRF token available for API request");
    }
  }

  return {
    headers,
    withCredentials: true, // Всегда отправляем куки
  };
};

// Инициализация админ базы данных больше не требуется - данные будут загружаться с API
export const initializeAdminDatabase = async () => {
  console.log("Real database is now used from the backend API");
};

// Получение элементов меню по ID ресторана
export const getMenuItems = async (
  restaurantId: number
): Promise<MenuItem[]> => {
  try {
    console.log(`Fetching menu items for restaurant ID: ${restaurantId}`);

    const config = await getAxiosConfig();
    const response = await axios.get(
      `${API_BASE_URL}/menu-items/?cafe=${restaurantId}`,
      config
    );

    console.log("Menu items data:", response.data);

    // Check if the data is paginated and has a results array
    const menuItemsList = response.data.results
      ? response.data.results
      : response.data;

    // Преобразуем данные в формат, используемый на фронтенде
    return menuItemsList.map((item: any) => {
      // Construct proper image URL for locally uploaded images
      let imageUrl = "";
      if (item.image) {
        // Check if it's a relative path (locally uploaded) or already a full URL
        imageUrl = item.image.startsWith("http")
          ? item.image
          : `${API_BASE_URL}${item.image}`;
      } else if (item.image_url) {
        imageUrl = item.image_url;
      }

      return {
        id: item.id,
        restaurantId: item.cafe,
        name: item.name,
        description: item.description || "",
        price: item.price,
        category: item.category,
        imageUrl: imageUrl,
        available: item.available,
      };
    });
  } catch (error) {
    console.error("Error in getMenuItems:", error);
    return handleError(error, []);
  }
};

// Получение статистики по ресторану
export const getRestaurantStatistics = async (
  restaurantId: number
): Promise<RestaurantStatistics> => {
  try {
    console.log(`Fetching statistics for restaurant ID: ${restaurantId}`);

    const config = await getAxiosConfig();

    // Получаем статистику ресторана
    const response = await axios.get(
      `${API_BASE_URL}/cafes/${restaurantId}/statistics/`,
      config
    );
    const data = response.data;
    console.log("Restaurant statistics data:", data);

    // Получаем последние заказы для ресторана
    const ordersResponse = await axios.get(
      `${API_BASE_URL}/orders/?cafe=${restaurantId}`,
      config
    );
    const ordersData = ordersResponse.data;
    console.log("Restaurant orders data:", ordersData);

    // Упрощаем процесс получения данных заказа для улучшения производительности
    const transformedOrders = ordersData.map((order: any) => {
      return {
        id: order.id,
        items: order.items || [],
        totalAmount: order.total_price,
        deliveryMethod: order.order_type === "delivery" ? "delivery" : "pickup",
        date: order.created_at,
        status: order.status,
        restaurantId: order.cafe,
        userAddress: order.delivery_address || "",
      };
    });

    return {
      statistics: {
        totalSales: data.total_revenue || 0,
        orderCount: data.total_orders || 0,
        averageOrderValue: data.average_order_value || 0,
        popularItems:
          data.popular_items?.map((item: any) => ({
            id: item.id,
            restaurantId: item.cafe,
            name: item.name,
            description: item.description || "",
            price: item.price,
            category: item.category,
            imageUrl: item.image_url || "",
            available: item.available,
          })) || [],
      },
      recentOrders: transformedOrders.slice(0, 5), // Берем только 5 последних заказов
    };
  } catch (error) {
    console.error("Error in getRestaurantStatistics:", error);
    return handleError(error, {
      statistics: {
        totalSales: 0,
        orderCount: 0,
        averageOrderValue: 0,
        popularItems: [],
      },
      recentOrders: [],
    });
  }
};

// Аутентификация владельца ресторана
export const authenticateOwner = async (
  email: string,
  password: string
): Promise<RestaurantOwner | null> => {
  try {
    console.log("Authenticating owner with API:", email);

    // 1. Получаем CSRF токен через новую функцию
    await getCSRFToken();

    // 2. Получаем конфигурацию для axios с CSRF токеном
    const config = await getAxiosConfig(true, true);

    // 3. Делаем запрос к API для аутентификации
    console.log("Making authentication request with config:", config);
    const response = await axios.post(
      `${API_BASE_URL}/auth/login/`,
      { email, password },
      config
    );

    // 4. Логируем ответ для отладки
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const data = response.data;
    console.log("Authentication successful:", data);

    // Проверяем, что пользователь имеет необходимую роль
    if (data.role !== "owner" && !data.cafe_id) {
      console.error("User is not a restaurant owner");
      return null;
    }

    return {
      id: data.id,
      email: data.email,
      password: "", // Пароль не храним на клиенте
      name: data.name,
      restaurantId: data.cafe_id,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
};

// Получение данных ресторана
export const getRestaurantData = async (
  restaurantId: number
): Promise<RestaurantAdminData | null> => {
  try {
    console.log(`Fetching restaurant data for ID: ${restaurantId}`);

    const config = await getAxiosConfig();
    const response = await axios.get(
      `${API_BASE_URL}/cafes/${restaurantId}/`,
      config
    );

    const data = response.data;
    console.log("Restaurant data received:", data);

    // Получаем статистику ресторана для дополнительных данных
    console.log(`Fetching restaurant statistics for ID: ${restaurantId}`);

    let stats = {
      total_orders: 0,
      total_revenue: 0,
      average_order_value: 0,
    };

    try {
      const statsResponse = await axios.get(
        `${API_BASE_URL}/cafes/${restaurantId}/statistics/`,
        config
      );
      stats = statsResponse.data;
      console.log("Restaurant statistics received:", stats);
    } catch (statError) {
      console.warn(
        `Warning: Could not fetch restaurant statistics:`,
        statError
      );
    }

    // Process coverImage for local uploads
    const coverImage = data.cover_image || "";
    const processedCoverImage = coverImage.startsWith("http")
      ? coverImage
      : coverImage
      ? `${API_BASE_URL}${coverImage}`
      : "";

    const restaurantData = {
      id: data.id,
      name: data.name,
      address: data.address,
      city: data.city?.name || "",
      description: data.description || "",
      coverImage: processedCoverImage,
      rating: data.rating || 0,
      totalOrders: stats.total_orders || 0,
      totalRevenue: stats.total_revenue || 0,
      netProfit: stats.total_revenue * 0.3 || 0, // Примерная прибыль 30% от выручки
      averageOrderValue: stats.average_order_value || 0,
    };

    console.log("Transformed restaurant data:", restaurantData);
    return restaurantData;
  } catch (error) {
    console.error("Error in getRestaurantData:", error);
    return handleError(error, null);
  }
};

// Получение всех ресторанов
export const getAllRestaurants = async (): Promise<RestaurantAdminData[]> => {
  try {
    const config = await getAxiosConfig();
    const response = await axios.get(`${API_BASE_URL}/cafes/`, config);

    const data = response.data;

    // Преобразуем данные в формат, используемый на фронтенде
    return Promise.all(
      data.map(async (cafe: any) => {
        // Для каждого ресторана получаем дополнительные данные
        let stats = {
          total_orders: 0,
          total_revenue: 0,
          average_order_value: 0,
        };

        try {
          const statsResponse = await axios.get(
            `${API_BASE_URL}/cafes/${cafe.id}/statistics/`,
            config
          );
          stats = statsResponse.data;
        } catch (error) {
          console.warn(
            `Could not fetch statistics for cafe ${cafe.id}:`,
            error
          );
        }

        // Process coverImage for local uploads
        const coverImage = cafe.cover_image || "";
        const processedCoverImage = coverImage.startsWith("http")
          ? coverImage
          : coverImage
          ? `${API_BASE_URL}${coverImage}`
          : "";

        return {
          id: cafe.id,
          name: cafe.name,
          address: cafe.address,
          city: cafe.city?.name || "",
          description: cafe.description || "",
          coverImage: processedCoverImage,
          rating: cafe.rating || 0,
          totalOrders: stats.total_orders || 0,
          totalRevenue: stats.total_revenue || 0,
          netProfit: stats.total_revenue * 0.3 || 0, // Примерная прибыль 30% от выручки
          averageOrderValue: stats.average_order_value || 0,
        };
      })
    );
  } catch (error) {
    return handleError(error, []);
  }
};

// Получение заказов для ресторана
export const getRestaurantOrders = async (
  restaurantId: number
): Promise<AdminOrder[]> => {
  try {
    console.log(`Fetching orders for restaurant ID: ${restaurantId}`);

    // Получаем заказы для конкретного ресторана
    const config = await getAxiosConfig();
    const response = await axios.get(
      `${API_BASE_URL}/orders/?cafe=${restaurantId}`,
      config
    );

    const data = response.data;
    console.log("Restaurant orders data:", data);

    // Check if the data is paginated and has a results array
    const ordersList = data.results ? data.results : data;

    // Преобразуем данные в формат, используемый на фронтенде
    return ordersList.map((order: any) => ({
      id: order.id,
      restaurantId: order.cafe,
      customer: order.user || "Неизвестный клиент",
      date: order.created_at,
      amount: order.total_price,
      status: order.status,
    }));
  } catch (error) {
    console.error("Error in getRestaurantOrders:", error);
    return handleError(error, []);
  }
};

// Получение меню ресторана
export const getRestaurantMenu = async (
  restaurantId: number
): Promise<MenuItem[]> => {
  try {
    const config = await getAxiosConfig();
    const response = await axios.get(
      `${API_BASE_URL}/menu-items/?cafe=${restaurantId}`,
      config
    );

    const data = response.data;

    // Check if the data is paginated and has a results array
    const menuItemsList = data.results ? data.results : data;

    // Преобразуем данные в формат, используемый на фронтенде
    return menuItemsList.map((item: any) => {
      // Construct proper image URL for locally uploaded images
      let imageUrl = "";
      if (item.image) {
        // Check if it's a relative path (locally uploaded) or already a full URL
        imageUrl = item.image.startsWith("http")
          ? item.image
          : `${API_BASE_URL}${item.image}`;
      } else if (item.image_url) {
        imageUrl = item.image_url;
      }

      return {
        id: item.id,
        restaurantId: item.cafe,
        name: item.name,
        description: item.description || "",
        price: item.price,
        category: item.category,
        imageUrl: imageUrl,
        available: item.available,
      };
    });
  } catch (error) {
    return handleError(error, []);
  }
};

// Обновление данных ресторана
export const updateRestaurantData = async (
  restaurantId: number,
  data: Partial<RestaurantAdminData>
): Promise<RestaurantAdminData | null> => {
  try {
    // Преобразуем данные в формат API
    const apiData = {
      name: data.name,
      address: data.address,
      description: data.description,
      cover_image: data.coverImage,
      rating: data.rating,
    };

    const config = await getAxiosConfig(true, true);
    await axios.patch(
      `${API_BASE_URL}/cafes/${restaurantId}/`,
      apiData,
      config
    );

    // Получаем обновленные данные
    return getRestaurantData(restaurantId);
  } catch (error) {
    return handleError(error, null);
  }
};

// Обновление пункта меню
export const updateMenuItem = async (menuItem: MenuItem): Promise<MenuItem> => {
  try {
    // Преобразуем данные в формат API
    const apiData = {
      cafe: menuItem.restaurantId,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      image_url: menuItem.imageUrl,
      available: menuItem.available,
    };

    console.log("Updating menu item:", menuItem.id, apiData);

    // Получаем конфигурацию для axios с CSRF токеном
    const config = await getAxiosConfig(true, true);

    const response = await axios.put(
      `${API_BASE_URL}/menu-items/${menuItem.id}/`,
      apiData,
      config
    );

    const data = response.data;
    console.log("Menu item updated successfully:", data);

    // Возвращаем обновленный пункт меню в формате, используемом на фронтенде
    let imageUrl = "";
    if (data.image) {
      // Check if it's a relative path (locally uploaded) or already a full URL
      imageUrl = data.image.startsWith("http")
        ? data.image
        : `${API_BASE_URL}${data.image}`;
    } else if (data.image_url) {
      imageUrl = data.image_url;
    }

    return {
      id: data.id,
      restaurantId: data.cafe,
      name: data.name,
      description: data.description || "",
      price: data.price,
      category: data.category,
      imageUrl: imageUrl,
      available: data.available,
    };
  } catch (error) {
    return handleError(error, menuItem);
  }
};

// Создание нового пункта меню
export const createMenuItem = async (menuItem: MenuItem): Promise<MenuItem> => {
  try {
    // Преобразуем данные в формат API
    const apiData = {
      cafe: menuItem.restaurantId,
      name: menuItem.name,
      description: menuItem.description,
      price: menuItem.price,
      category: menuItem.category,
      image_url: menuItem.imageUrl,
      available: menuItem.available !== undefined ? menuItem.available : true,
    };

    console.log("Creating new menu item:", apiData);

    // Получаем конфигурацию для axios с CSRF токеном
    const config = await getAxiosConfig(true, true);

    const response = await axios.post(
      `${API_BASE_URL}/menu-items/`,
      apiData,
      config
    );

    const data = response.data;
    console.log("Menu item created successfully:", data);

    // Возвращаем новый пункт меню в формате, используемом на фронтенде
    // Construct proper image URL for locally uploaded images
    let imageUrl = "";
    if (data.image) {
      // Check if it's a relative path (locally uploaded) or already a full URL
      imageUrl = data.image.startsWith("http")
        ? data.image
        : `${API_BASE_URL}${data.image}`;
    } else if (data.image_url) {
      imageUrl = data.image_url;
    }

    return {
      id: data.id,
      restaurantId: data.cafe,
      name: data.name,
      description: data.description || "",
      price: data.price,
      category: data.category,
      imageUrl: imageUrl,
      available: data.available,
    };
  } catch (error) {
    return handleError(error, { ...menuItem, id: -1 });
  }
};

// Удаление пункта меню
export const deleteMenuItem = async (itemId: number): Promise<boolean> => {
  try {
    console.log(`Deleting menu item with ID: ${itemId}`);

    // Получаем конфигурацию для axios с CSRF токеном
    const config = await getAxiosConfig(false, true);

    await axios.delete(`${API_BASE_URL}/menu-items/${itemId}/`, config);

    console.log(`Menu item ${itemId} deleted successfully`);
    return true;
  } catch (error) {
    console.error("Error in deleteMenuItem:", error);
    return handleError(error, false);
  }
};

// Обновление статуса заказа
export const updateOrderStatus = async (
  orderId: number,
  status: AdminOrder["status"]
): Promise<boolean> => {
  try {
    // Получаем конфигурацию для axios с CSRF токеном
    const config = await getAxiosConfig(true, true);

    await axios.post(
      `${API_BASE_URL}/orders/${orderId}/update_status/`,
      { status },
      config
    );

    return true;
  } catch (error) {
    return handleError(error, false);
  }
};

// Store processed order IDs to prevent duplicates
const processedOrderIds = new Set<string>();
// Track orders being processed to prevent concurrent duplicates
const pendingOrders = new Set<string>();

// Добавление нового заказа
export const addOrder = async (
  order: Omit<AdminOrder, "id">
): Promise<AdminOrder | null> => {
  try {
    // Create a unique ID based on order properties to detect duplicates
    const orderKey = `${order.restaurantId}_${order.date}_${
      order.amount
    }_${Math.round(order.amount * 100)}`;
    const shortKey = `${order.restaurantId}_${Math.round(order.amount)}`;

    // Check if this exact order has already been globally processed
    const globalOrderExists = localStorage.getItem(
      `global_order_created_${shortKey}`
    );
    if (globalOrderExists) {
      console.log(
        "Order already exists globally, skipping submission:",
        shortKey
      );
      // Return cached successful response from localStorage if available
      const cachedOrder = localStorage.getItem(`order_response_${shortKey}`);
      if (cachedOrder) {
        return JSON.parse(cachedOrder);
      }
      return null;
    }

    // Check if we've already processed this order
    if (processedOrderIds.has(orderKey)) {
      console.log("Duplicate order detected, skipping submission:", orderKey);
      // Return cached successful response from localStorage if available
      const cachedOrder = localStorage.getItem(`order_response_${orderKey}`);
      if (cachedOrder) {
        return JSON.parse(cachedOrder);
      }
      return null;
    }

    // If order with similar properties is currently being processed, wait and return to prevent duplicates
    if (pendingOrders.has(shortKey)) {
      console.log("Order is already being processed:", shortKey);
      // Wait for the pending order to complete, checking every 100ms
      for (let i = 0; i < 20; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        const cachedOrder = localStorage.getItem(`order_response_${shortKey}`);
        if (cachedOrder) {
          console.log("Found completed order from concurrent request");
          return JSON.parse(cachedOrder);
        }
      }
      return null;
    }

    // Mark this order as being processed
    pendingOrders.add(shortKey);
    console.log("Processing new order request:", shortKey);

    try {
      // Преобразуем данные в формат API
      const apiData = {
        cafe: order.restaurantId,
        order_type: "in_place", // Значение по умолчанию
        status: order.status,
        total_price: order.amount,
      };

      // Получаем конфигурацию для axios с CSRF токеном
      const config = await getAxiosConfig(true, true);
      console.log("Config for order:", config);

      const response = await axios.post(
        `${API_BASE_URL}/orders/`,
        apiData,
        config
      );
      const data = response.data;

      // Возвращаем новый заказ в формате, используемом на фронтенде
      const resultOrder = {
        id: data.id,
        restaurantId: data.cafe,
        customer: data.user || "Неизвестный клиент",
        date: data.created_at,
        amount: data.total_price,
        status: data.status,
      };

      // Mark the order as processed to prevent future duplications
      processedOrderIds.add(orderKey);

      // Cache the successful response
      localStorage.setItem(
        `order_response_${shortKey}`,
        JSON.stringify(resultOrder)
      );
      localStorage.setItem(
        `order_response_${orderKey}`,
        JSON.stringify(resultOrder)
      );

      // Set a global flag this order has been created
      localStorage.setItem(`global_order_created_${shortKey}`, "true");

      // Remove from pending orders
      pendingOrders.delete(shortKey);
      console.log(
        "Order processed successfully:",
        shortKey,
        "with backend ID:",
        data.id
      );

      return resultOrder;
    } catch (error) {
      // Make sure to remove from pending orders in case of error
      pendingOrders.delete(shortKey);
      throw error;
    }
  } catch (error) {
    return handleError(error, null);
  }
};
