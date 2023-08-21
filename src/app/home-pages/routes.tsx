import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

const HomePage = React.lazy(() => import('./home-page.'));

const HomeRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PageLayout>
            <Outlet />
          </PageLayout>
        }
      >
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<Navigate to="./" replace />} />
      </Route>
    </Routes>
  );
};

export default HomeRoutes;
