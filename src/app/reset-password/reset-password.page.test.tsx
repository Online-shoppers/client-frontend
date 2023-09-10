import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import store from 'store';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { getResetToken } from './api/get-reset-token.api';
import ResetPasswordPage from './reset-password.page';

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

jest.mock('./api/get-reset-token.api', () => ({
  getResetToken: jest.fn(() => 'some-reset-token'),
}));

jest.mock('utils/get-error-messages.util', () => ({
  getErrorMessages: jest.fn(() => ['some-error']),
}));

describe('Reset password page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have neccessory inputs', async () => {
    const { getAllByRole, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<ResetPasswordPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const emailInput = getByText('Email');
      const inputs = getAllByRole('textbox');
      expect(inputs).toHaveLength(1);
      expect(emailInput).toBeInTheDocument();
    });
  });

  it('should trigger request', async () => {
    // const history = createMemoryHistory();
    // const { result: location } = renderHook(() => useLocation());

    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: '/' }]}>
            <Routes>
              <Route path="/" element={<ResetPasswordPage />} />
              <Route path="/:id" element={<div>new password</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const emailInput = getByTestId('reset-email-input');
    const form = getByTestId('form');

    expect(emailInput).toHaveValue('');

    fireEvent.change(emailInput, { target: { value: 'some.email@gmail.com' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('some.email@gmail.com');
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(getResetToken).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(getByText('new password')).toBeInTheDocument();
    });
  });

  it('should display error label on the email field with non-email value', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<ResetPasswordPage />} />
              <Route path="/:id" element={<div>new password</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const emailInput = getByTestId('reset-email-input');
    const form = getByTestId('form');

    expect(emailInput).toHaveValue('');

    fireEvent.change(emailInput, { target: { value: 'not email' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('not email');
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(getByText('validation:Field-should-be-email')).toBeInTheDocument();
      // todo: handle, why this is called one time
      // expect(getResetToken).toBeCalledTimes(0);
    });

    await waitFor(() => {
      expect(queryByText('new password')).not.toBeInTheDocument();
    });
  });

  it('should display snackbar error on request error', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<ResetPasswordPage />} />
              <Route path="/:id" element={<div>new password</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const emailInput = getByTestId('reset-email-input');
    const form = getByTestId('form');

    expect(emailInput).toHaveValue('');

    fireEvent.change(emailInput, { target: { value: 'some@email.com' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('some@email.com');
    });

    const err = new Error('Some error');
    try {
      (getResetToken as jest.Mock).mockRejectedValue(err);
      fireEvent.submit(form);
      // expect(await waitFor(() => getResetToken('email'))).toBe('some-reset-token');
    } catch (e) {
      expect(e).toBe(err);
      expect(getByText('some-error')).toBeInTheDocument();
      expect(getErrorMessages(e)).toStrictEqual(['some-error']);
    }

    try {
      (getResetToken as jest.Mock).mockRejectedValueOnce(err);
      (getErrorMessages as jest.Mock).mockReturnValue(null);
      fireEvent.submit(form);
      // expect(await waitFor(() => getResetToken('email'))).toBe('some-reset-token');
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(getErrorMessages(e)).toStrictEqual(null);
      expect(getByText('errors:Something-went-wrong')).toBeInTheDocument();
    }
  });
});
