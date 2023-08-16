import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';

interface PublicRouteProps {
  element: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => (
  <Suspense fallback={<div />}>{element}</Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoute element={<PageLayout>hello</PageLayout>} />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
