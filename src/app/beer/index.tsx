import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const IdPage = React.lazy(() => import('./pages/id.page'));
const ListPage = React.lazy(() => import('./pages/list.page'));

const BeerRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route path="/" element={<ListPage />} />
        <Route path="/:id" element={<IdPage />} />

        <Route path="*" element={<Navigate to="./" replace />} />
      </Route>
    </Routes>
  );
};

export default BeerRoutes;
