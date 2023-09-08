/* eslint-disable @typescript-eslint/no-explicit-any */
// Import screen from testing-library
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { editCartProduct } from './api/edit-cart-product.api';
import { getCartInfo } from './api/get-cart-info.api';
import { getCartProducts } from './api/get-cart-products.api';
import CartPage from './cart.page';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: any) => (key === 'cart:Nothing-in-the-cart' ? 'Nothing-in-the-cart' : key),
  }),
}));

jest.mock('./api/get-cart-info.api', () => ({
  getCartInfo: jest.fn(),
}));

jest.mock('./api/get-cart-products.api', () => ({
  getCartProducts: jest.fn(),
}));
jest.mock('./api/edit-cart-product.api', () => ({
  editCartProduct: jest.fn(),
}));

describe('CartPage Component', () => {
  let queryClient: QueryClient;

  beforeAll(() => {
    queryClient = new QueryClient();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('renders without errors', async () => {
    (getCartInfo as jest.MockedFunction<any>).mockResolvedValue({ data: { total: 100 } });
    (getCartProducts as jest.MockedFunction<any>).mockResolvedValue({ data: [] });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Your-cart')).toBeInTheDocument();
      expect(screen.getByText('Nothing-in-the-cart')).toBeInTheDocument();
    });
  });

  it('renders cart products when they are available', async () => {
    (getCartInfo as jest.MockedFunction<any>).mockResolvedValue({ data: { total: 100 } });
    (getCartProducts as jest.MockedFunction<any>).mockResolvedValue({
      data: [
        {
          id: '1',
          name: 'Product 1',
          imageUrl: 'product1.jpg',
          unitPrice: 10,
          quantity: 2,
        },
      ],
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Your-cart')).toBeInTheDocument();
      expect(screen.queryByText('Nothing-in-the-cart')).not.toBeInTheDocument();
    });
  });
});
