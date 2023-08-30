import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const CreateOrderPage = React.lazy(() => import('./create-order.page'));

const OrderRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route path="/" element={<CreateOrderPage />} />

        <Route path="*" element={<Navigate to="./" replace />} />
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
