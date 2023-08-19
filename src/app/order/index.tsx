import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const CreateOrderPage = React.lazy(() => import('./pages/create-order.page'));

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
        <Route path="/:id" element={<div>Speciefic order</div>} />

        <Route path="*" element={<Navigate to="./" replace />} />
      </Route>
    </Routes>
  );
};

export default OrderRoutes;
