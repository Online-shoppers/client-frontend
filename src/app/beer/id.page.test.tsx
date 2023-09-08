import { ThemeProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import store from 'store';

import { theme } from 'theme';

import IdPage from './id.page';

jest.mock('app/product/api/get-page-products.api');
jest.mock('axios');

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnMount: false, refetchOnWindowFocus: false } },
});

// getPageProducts.mockImplementation(() => Promise.resolve({ data: {} }));

describe('BeerIdPage', () => {
  it('should render welcome message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <IdPage />
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>,
    );

    const welcomeMessage = getByText('Yummy beer');
    expect(welcomeMessage).toBeInTheDocument();
  });
});
