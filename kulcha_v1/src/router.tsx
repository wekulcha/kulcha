import { createBrowserRouter } from 'react-router-dom';
import { SplashPage } from './pages/Splash/SplashPage';
import { CafeListPage } from './pages/CafeList/CafeListPage';
import { MenuPage } from './pages/Menu/MenuPage';
import { CartPage } from './pages/Cart/CartPage';
import { CheckoutPage } from './pages/Checkout/CheckoutPage';
import { ProfilePage } from './pages/Profile/ProfilePage';

export const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/cafes', element: <CafeListPage /> },
  { path: '/cafes/:restaurantId/menu', element: <MenuPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/profile', element: <ProfilePage /> },
]);

