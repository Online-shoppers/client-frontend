import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const CartPage = React.lazy(() => import('./cart.page'));

const CartRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route path="/" element={<CartPage />} />

        <Route path="*" element={<Navigate to="./" replace />} />
      </Route>
    </Routes>
  );
};

export default CartRoutes;
