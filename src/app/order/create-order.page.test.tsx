import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import CreateOrderPage from './create-order.page';

jest.mock('../cart/api/get-cart-products.api', () => ({
  getCartProducts: jest.fn(), //.mockResolvedValue({ data: [] }),
}));

jest.mock('./api/create-order.api', () => ({
  createOrder: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: unknown) => (key === 'cart:Nothing-in-the-cart' ? 'Nothing-in-the-cart' : key),
  }),
}));

describe('CreateOrderPage Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('renders without errors', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CreateOrderPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    expect(screen.getByText('Details:')).toBeInTheDocument();
    expect(screen.getByText('Order:')).toBeInTheDocument();
  });
});
