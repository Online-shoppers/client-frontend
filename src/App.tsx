import { CssBaseline, GlobalStyles } from '@mui/material';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import jwt_decode from 'jwt-decode';
import { Suspense, useCallback, useEffect, useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { refreshTokens } from 'app/auth/api/refresh-tokens.api';
import { ACCESS_TOKEN_KEY, EXPIRATION_DATE_KEY, REFRESH_TOKEN_KEY } from 'app/auth/constants';
import { UserSessionSchema } from 'app/auth/schemas/user-session.schema';

import LoadingIndicator from 'components/loading-indicator.component';

import storage from 'storage/client';

import { theme } from 'theme';

import AppRoutes from './app.routes';
import ErrorBoundary from './components/error-boundary.component';

// in miliseconds
const FIVE_MINUTES = 1000 * 60 * 5;

function App() {
  const refOnce = useRef(false);

  const onRefreshTokens = useCallback(async () => {
    const accessToken = storage.get(ACCESS_TOKEN_KEY);
    const refreshToken = storage.get(REFRESH_TOKEN_KEY);

    try {
      // if (!accessToken || !refreshToken) {
      //   dispatch(logout())
      //   navigate('/auth/login');
      // }

      const { data } = await refreshTokens({
        access_token: String(accessToken),
        refresh_token: String(refreshToken),
      });

      const payload = jwt_decode(data.access_token);
      const userSession = UserSessionSchema.validateSync(payload);

      // in seconds
      const expirationDate = userSession.exp;

      storage.set(ACCESS_TOKEN_KEY, data.access_token);
      storage.set(REFRESH_TOKEN_KEY, data.refresh_token);
      storage.set(EXPIRATION_DATE_KEY, expirationDate);

      // dispatch(authenticate());
    } catch (err) {
      console.error(err);
      // dispatch(logout());
    }
  }, []);

  // const onLoginUser = useCallback(async () => {
  //   try {
  //     const data = await signIn({});
  //
  //     const expirationDate = data.ttl * 1000;
  //
  //     setToken(ACCESS_TOKEN_KEY, data.access_token);
  //     setToken(REFRESH_TOKEN_KEY, data.refresh_token);
  //     setToken(EXPIRE_DATE_KEY, expirationDate.toString());
  //   } catch (err) {
  //     return;
  //   }
  // }, []);

  useEffect(() => {
    const checkTokenExpiration = () => {
      // in miliseconds
      const nowUtc = new Date().getTime();

      // in seconds
      const expirationDate = Number(storage.get(EXPIRATION_DATE_KEY)) || 0;

      const refreshToken = storage.get(REFRESH_TOKEN_KEY);
      const accessToken = storage.get(ACCESS_TOKEN_KEY);

      // if (
      //   (!accessToken && !refOnce.current) ||
      //   (!expirationDate && !refreshToken && !refOnce.current)
      // ) {
      //   refOnce.current = true;
      //   return;
      // }

      const shouldRefresh = nowUtc > expirationDate * 1000 - FIVE_MINUTES;
      const hasAccessToken = !!accessToken;
      const hasRefreshToken = !!refreshToken;

      if (shouldRefresh && hasRefreshToken && hasAccessToken) {
        if (!refOnce.current) onRefreshTokens();
        refOnce.current = true;
        return;
      }
    };

    checkTokenExpiration();
    const timer = setInterval(checkTokenExpiration, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <ErrorBoundary>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              html: { height: '100%' },
              body: {
                height: '100%',
              },
              '#root': {
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              },
            }}
          />
          <CssBaseline />
          <Suspense fallback={<LoadingIndicator />}>
            <Router>
              <AppRoutes />
            </Router>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </ErrorBoundary>
  );
}

export default App;
