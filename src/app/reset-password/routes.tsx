import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import { getIsAuthenticated } from 'app/auth/store/auth.selectors';

const ResetPasswordPage = React.lazy(() => import('./reset-password.page'));
const NewPasswordPage = React.lazy(() => import('./new-password.page'));

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(getIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated]);

  return <React.Fragment>{children}</React.Fragment>;
};

const ResetPasswordRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <AuthRoute>
            <Outlet />
          </AuthRoute>
        }
      >
        <Route path="/:resetToken" element={<NewPasswordPage />} />
        <Route path="/" element={<ResetPasswordPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default ResetPasswordRoutes;
