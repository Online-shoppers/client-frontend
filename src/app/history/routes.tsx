import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { PrivateRoute } from 'app.routes';

import PageLayout from 'components/page-layout.component';

const OrderHistoryPage = React.lazy(() => import('./order-history.page'));

const HistoryRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderHistoryPage />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="./orders" replace />} />
      </Route>
    </Routes>
  );
};

export default HistoryRoutes;
