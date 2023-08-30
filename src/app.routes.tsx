import dayjs from 'dayjs';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

import AccessoryRoutes from 'app/accessory/routes';
import AuthRoutes from 'app/auth/routes';
import { getIsAuthenticated } from 'app/auth/store/auth.selectors';
import BeerRoutes from 'app/beer/routes';
import CartRoutes from 'app/cart/routes';
import HistoryRoutes from 'app/history/routes';
import OrderRoutes from 'app/order/routes';
import SnackRoutes from 'app/snack/routes';

const HomePage = React.lazy(() => import('./app/home/home.page'));

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  return isAuthenticated ? <React.Fragment>{children}</React.Fragment> : <Navigate to="/" />;
};

const AppRoutes = () => {
  const { i18n } = useTranslation();

  dayjs.locale(i18n.language);

  return (
    <Routes>
      <Route path="/auth/*" element={<AuthRoutes />} />

      <Route path="/" element={<HomePage />} />
      <Route path="/beer/*" element={<BeerRoutes />} />
      <Route path="/snacks/*" element={<SnackRoutes />} />
      <Route path="/accessories/*" element={<AccessoryRoutes />} />
      <Route path="/history/*" element={<HistoryRoutes />} />

      <Route
        path="/cart/*"
        element={
          <PrivateRoute>
            <CartRoutes />
          </PrivateRoute>
        }
      />
      <Route
        path="/order/*"
        element={
          <PrivateRoute>
            <OrderRoutes />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/home" replace />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
