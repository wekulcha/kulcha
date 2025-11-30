import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppContextProvider } from './context/AppContext';
import { CartContextProvider } from './context/CartContext';

function App() {
  return (
    <AppContextProvider>
      <CartContextProvider>
        <RouterProvider router={router} />
      </CartContextProvider>
    </AppContextProvider>
  );
}

export default App;
