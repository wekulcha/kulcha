import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminAppShell } from "./layout/AdminAppShell";
import { AdminCafeListPage } from "./pages/AdminCafeList/AdminCafeListPage";
import { AdminRestaurantPage } from "./pages/AdminRestaurant/AdminRestaurantPage";
import { AdminProfilePage } from "./pages/AdminProfile/AdminProfilePage";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminAppShell>
        <Routes>
          <Route path="/" element={<AdminCafeListPage />} />
          <Route path="/restaurants/:id" element={<AdminRestaurantPage />} />
          <Route path="/profile" element={<AdminProfilePage />} />
        </Routes>
      </AdminAppShell>
    </BrowserRouter>
  );
};

