import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const SignIn = React.lazy(() => import('./pages/sign-in.page'));
const SignUp = React.lazy(() => import('./pages/sign-up.page'));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="*" element={<Navigate to="./sign-in" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
