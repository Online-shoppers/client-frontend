import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AccessoryRoutes from 'app/accessory/routes';
import AuthRoutes from 'app/auth/routes';
import BeerRoutes from 'app/beer/routes';
import CartRoutes from 'app/cart/routes';
import OrderRoutes from 'app/order/routes';
import SnackRoutes from 'app/snack/routes';

const HomePage = React.lazy(() => import('./app/home/home.page'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/" element={<HomePage />} />
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
