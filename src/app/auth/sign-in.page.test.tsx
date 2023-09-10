import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import store from 'store';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { signIn } from './api/sign-in.api';
import AuthRoutes from './routes';
import { authenticate, logout } from './store/auth.slice';

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

jest.mock('utils/get-error-messages.util', () => ({
  getErrorMessages: jest.fn(() => ['some-error']),
}));

jest.mock('./api/sign-in.api', () => ({
  signIn: jest.fn(() => ({
    data: {
      access_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1OTBiY2Q3LWY2N2EtNGVmMy1iYjVmLWZlMWEyM2JkZjMwMCIsImVtYWlsIjoibGVzaGEubGlob0BnbWFpbC5jb20iLCJyb2xlX2lkIjoiNDc0MWMzNDQtNWJjMi00ODcxLTlhZDctMDBkN2E3NGU5MDNjIiwicm9sZV90eXBlIjoiY2xpZW50IiwicGVybWlzc2lvbnMiOlsicGVybWlzc2lvbnMucHJvZHVjdHMubGVhdmUtcmV2aWV3cyJdLCJpYXQiOjE2OTQzNTkzOTAsImV4cCI6MTY5NDM2MTE5MH0.KaUrjW5Xy8upPiI7iFw0_hqUFQsnQIGPU4J7G6COWcQ',
      refresh_token:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1OTBiY2Q3LWY2N2EtNGVmMy1iYjVmLWZlMWEyM2JkZjMwMCIsImVtYWlsIjoibGVzaGEubGlob0BnbWFpbC5jb20iLCJyb2xlX2lkIjoiNDc0MWMzNDQtNWJjMi00ODcxLTlhZDctMDBkN2E3NGU5MDNjIiwicm9sZV90eXBlIjoiY2xpZW50IiwicGVybWlzc2lvbnMiOlsicGVybWlzc2lvbnMucHJvZHVjdHMubGVhdmUtcmV2aWV3cyJdLCJpYXQiOjE2OTQzNTkzOTAsImV4cCI6MTY5NDk2NDE5MH0.D3O67h2mGrYjPLDyfFG0WtLDSH8Ww0lh5EkbwPe05oE',
    },
  })),
}));

describe('Sign In page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    store.dispatch(logout());

    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  // it('should have neccessary inputs', async () => {
  //   const { getByTestId, findByTestId } = render(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={['/auth/sign-in', '/auth/sign-up', '/']} initialIndex={0}>
  //           <Suspense fallback={<div>loading...</div>}>
  //             <Routes>
  //               <Route path="/auth/*" element={<AuthRoutes />} />
  //               <Route path="/" element={<div>home</div>} />
  //             </Routes>
  //           </Suspense>
  //         </MemoryRouter>
  //       </Provider>
  //     </QueryClientProvider>,
  //   );
  //
  //   const emailInput = await findByTestId('email-input');
  //   const passwordInput = await findByTestId('password-input');
  //   expect(emailInput).toBeInTheDocument();
  //   expect(passwordInput).toBeInTheDocument();
  //   // await waitFor(() => {
  //   //   const emailInput = getByTestId('email-input');
  //   //   const passwordInput = getByTestId('password-input');
  //   //   expect(emailInput).toBeInTheDocument();
  //   //   expect(passwordInput).toBeInTheDocument();
  //   // });
  // });

  it('should redirect to / if authenticated', async () => {
    store.dispatch(
      authenticate({
        id: '1234',
        exp: 100000000,
        iat: 100000,
        email: 'email@gmail.com',
        role_id: 'string',
        role_type: 'client',
        permissions: [],
      }),
    );
    console.log(store.getState());
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth/sign-in', '/auth/sign-up', '/']} initialIndex={0}>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/" element={<div>home</div>} />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText('home')).toBeInTheDocument();
    });
  });

  it('should trigger request', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth/sign-in', '/auth/sign-up', '/']} initialIndex={0}>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/" element={<div>home</div>} />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const form = getByTestId('form');

    await waitFor(() => {
      expect(passwordInput).toHaveValue('');
    });

    fireEvent.change(emailInput, { target: { value: 'email@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '12345' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('email@gmail.com');
      expect(passwordInput).toHaveValue('12345');
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(signIn).toBeCalledTimes(1);
      store.dispatch(
        authenticate({
          id: '1234',
          exp: 100000000,
          iat: 100000,
          email: 'email@gmail.com',
          role_id: 'string',
          role_type: 'client',
          permissions: [],
        }),
      );
    });

    await waitFor(() => {
      expect(getByText('home')).toBeInTheDocument();
    });
  });

  it('should display error label on missing data', async () => {
    const { getByTestId, queryByText, getAllByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth/sign-in', '/auth/sign-up', '/']} initialIndex={0}>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/" element={<div>home</div>} />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const form = getByTestId('form');

    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');

    fireEvent.submit(form);

    await waitFor(() => {
      expect(getAllByText("validation:Field-shouldn't-be-empty")).toHaveLength(2);
    });

    fireEvent.change(emailInput, { target: { value: 'not email' } });

    await waitFor(() => {
      expect(getAllByText('validation:Field-should-be-email')).toHaveLength(1);
    });

    await waitFor(() => {
      expect(queryByText('sign-in')).not.toBeInTheDocument();
    });
  });

  it('should display snackbar error on request error', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/auth/sign-in', '/auth/sign-up', '/']} initialIndex={0}>
            <Suspense fallback={<div>loading...</div>}>
              <Routes>
                <Route path="/auth/*" element={<AuthRoutes />} />
                <Route path="/" element={<div>home</div>} />
              </Routes>
            </Suspense>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const passwordInput = getByTestId('password-input');
    const form = getByTestId('form');

    expect(passwordInput).toHaveValue('');

    fireEvent.change(passwordInput, { target: { value: '12345' } });

    await waitFor(() => {
      expect(passwordInput).toHaveValue('12345');
    });

    const err = new Error('Some error');
    try {
      (signIn as jest.Mock).mockRejectedValue(err);
      fireEvent.submit(form);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(getByText('Some error')).toBeInTheDocument();
      expect(getErrorMessages(e)).toStrictEqual(['Some error']);
    }

    try {
      const err = new Error();
      jest.mock('./api/sign-in.api', () => ({
        signIn: jest.fn().mockRejectedValue(err),
      }));
      fireEvent.submit(form);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(getErrorMessages(e)).toStrictEqual(null);
      expect(getByText('errors:Something-went-wrong')).toBeInTheDocument();
    }
  });
});
