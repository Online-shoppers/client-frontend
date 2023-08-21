import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AccessoryRoutes from 'app/accessory/routes';
import BeerRoutes from 'app/beer/routes';
import CartRoutes from 'app/cart/routes';
import HomeRoutes from 'app/home-pages/routes';
import OrderRoutes from 'app/order/routes';
import SnackRoutes from 'app/snack/routes';

const AuthRoutes = React.lazy(() => import('app/auth/routes'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/home/*" element={<HomeRoutes />} />
      <Route path="/beer/*" element={<BeerRoutes />} />
      <Route path="/snacks/*" element={<SnackRoutes />} />
      <Route path="/accessories/*" element={<AccessoryRoutes />} />

      <Route path="/cart/*" element={<CartRoutes />} />
      <Route path="/order/*" element={<OrderRoutes />} />

      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
