import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { getPageProducts } from 'app/product/api/get-page-products.api';

import store from 'store';

import { theme } from 'theme';

import HomePage from './home.page';

const axios = {
  // Mock Axios interceptors
  interceptors: {
    request: {
      use: jest.fn(),
    },
  },
  // Mock Axios methods or other properties you use
  get: jest.fn(),
  post: jest.fn(),
  // Add any other Axios methods you use in your code
};

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false, refetchOnWindowFocus: false } },
});

describe('HomePage', () => {
  it('should render welcome message', async () => {
    const { getByText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>,
    );

    // Wait for the element to appear
    await waitFor(() => {
      const welcomeMessage = getByText('Yummy beer');
      expect(welcomeMessage).toBeInTheDocument();
    });
  });
});
