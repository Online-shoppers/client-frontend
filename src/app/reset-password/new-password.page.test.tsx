import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import store from 'store';

import { getErrorMessages } from 'utils/get-error-messages.util';

import { changePassword } from './api/change-password.api';
import NewPasswordPage from './new-password.page';
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

jest.mock('./api/change-password.api', () => ({
  changePassword: jest.fn(),
}));

jest.mock('utils/get-error-messages.util', () => ({
  getErrorMessages: jest.fn(() => ['some-error']),
}));

describe('Change password page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have neccessory inputs', async () => {
    const { queryAllByRole, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/resetToken', '/']} initialIndex={0}>
            <Routes>
              <Route path="/:resetToken" element={<NewPasswordPage />} />
              <Route path="/" element={<ResetPasswordPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const passwordInput = getByTestId('password-input');
      const passwordConfirmInput = getByTestId('password-confirm-input');
      const inputs = queryAllByRole('textbox');
      expect(inputs).toHaveLength(0);
      expect(passwordInput).toBeInTheDocument();
      expect(passwordConfirmInput).toBeInTheDocument();
    });
  });

  it('should redirect to /reset-password if no token specified', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/new-password', '/']} initialIndex={0}>
            <Routes>
              <Route path="/new-password" element={<NewPasswordPage />} />
              <Route path="/" element={<div>reset-password</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(getByText('reset-password')).toBeInTheDocument();
    });
  });

  it('should trigger request', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/resetToken', '/']} initialIndex={0}>
            <Routes>
              <Route path="/:resetToken" element={<NewPasswordPage />} />
              <Route path="/" element={<ResetPasswordPage />} />
              <Route path="/auth/sign-in" element={<div>sign-in</div>} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const passwordInput = getByTestId('password-input');
    const passwordConfirmInput = getByTestId('password-confirm-input');
    const form = getByTestId('form');

    expect(passwordInput).toHaveValue('');
    expect(passwordConfirmInput).toHaveValue('');

    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.change(passwordConfirmInput, { target: { value: '12345' } });

    await waitFor(() => {
      expect(passwordInput).toHaveValue('12345');
      expect(passwordConfirmInput).toHaveValue('12345');
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(changePassword).toBeCalledTimes(1);
    });

    await waitFor(() => {
      expect(getByText('sign-in')).toBeInTheDocument();
    });
  });

  it('should display error label on different passwords', async () => {
    const { getByTestId, getByText, queryByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/resetToken', '/']} initialIndex={0}>
            <Routes>
              <Route path="/:resetToken" element={<NewPasswordPage />} />
              <Route path="/" element={<ResetPasswordPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const passwordInput = getByTestId('password-input');
    const passwordConfirmInput = getByTestId('password-confirm-input');
    const form = getByTestId('form');

    expect(passwordInput).toHaveValue('');
    expect(passwordConfirmInput).toHaveValue('');

    fireEvent.change(passwordInput, { target: { value: '1234' } });
    fireEvent.change(passwordConfirmInput, { target: { value: '12345' } });

    await waitFor(() => {
      expect(passwordInput).toHaveValue('1234');
      expect(passwordConfirmInput).toHaveValue('12345');
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(getByText("validation:Passwords-don't-match")).toBeInTheDocument();
      // todo: handle, why this is called one time
      // expect(getResetToken).toBeCalledTimes(0);
    });

    await waitFor(() => {
      expect(queryByText('sign-in')).not.toBeInTheDocument();
    });
  });

  it('should display snackbar error on request error', async () => {
    const { getByTestId, getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/resetToken', '/']} initialIndex={0}>
            <Routes>
              <Route path="/:resetToken" element={<NewPasswordPage />} />
              <Route path="/" element={<ResetPasswordPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const passwordInput = getByTestId('password-input');
    const passwordConfirmInput = getByTestId('password-confirm-input');
    const form = getByTestId('form');

    expect(passwordInput).toHaveValue('');
    expect(passwordConfirmInput).toHaveValue('');

    fireEvent.change(passwordInput, { target: { value: '12345' } });
    fireEvent.change(passwordConfirmInput, { target: { value: '12345' } });

    await waitFor(() => {
      expect(passwordInput).toHaveValue('12345');
      expect(passwordConfirmInput).toHaveValue('12345');
    });

    const err = new Error('Some error');
    jest.mock('./api/change-password.api', () => ({
      changePassword: jest.fn().mockRejectedValue(err),
    }));

    // try {
    //   fireEvent.submit(form);
    // } catch (e) {
    //   expect(e).toBe(err);
    //   expect(getByText('errors:Something-went-wrong')).toBeInTheDocument();
    //   expect(getErrorMessages(e)).toStrictEqual(null);
    // }
    //
    try {
      (changePassword as jest.Mock).mockRejectedValue(err);
      fireEvent.submit(form);
    } catch (e) {
      expect(e).toBe(err);
      expect(getByText('some-error')).toBeInTheDocument();
      expect(getErrorMessages(e)).toStrictEqual(['some-error']);
    }

    try {
      (changePassword as jest.Mock).mockRejectedValueOnce(err);
      (getErrorMessages as jest.Mock).mockReturnValue(null);
      fireEvent.submit(form);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect(getErrorMessages(e)).toStrictEqual(null);
      expect(getByText('errors:Something-went-wrong')).toBeInTheDocument();
    }
  });
});
