import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import PageLayout from 'components/page-layout.component';
import SignIn from 'components/sign-in.component';
import SignUp from 'components/sign-up.component';

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
      <Route path="/sign-in" element={<PublicRoute element={<SignIn />} />} />
      <Route path="/sign-up" element={<PublicRoute element={<SignUp />} />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
