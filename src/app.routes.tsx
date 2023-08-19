import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import AccessoryRoutes from 'app/accessory';
import BeerRoutes from 'app/beer';
import CartRoutes from 'app/cart';
import SnackRoutes from 'app/snack';

const AuthRoutes = React.lazy(() => import('app/auth'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/beer/*" element={<BeerRoutes />} />
      <Route path="/snacks/*" element={<SnackRoutes />} />
      <Route path="/accessories/*" element={<AccessoryRoutes />} />

      <Route path="/cart/*" element={<CartRoutes />} />

      <Route path="/" element={<Navigate to="/beer" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
