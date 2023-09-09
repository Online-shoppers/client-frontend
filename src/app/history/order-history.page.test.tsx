import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';

import { OrderType } from 'app/order/types/order.type';

import OrderHistoryPage from './order-history.page';

const mockOrder: OrderType = {
  id: 'asdf',
  city: 'Minsk',
  phone: '1234',
  total: 100,
  status: 'pending',
  address: 'Minsk',
  buyerId: '1234',
  country: 'Belarus',
  created: 12345,
  updated: 12345,
  zipCode: '1234',
  products: [],
};

jest.mock('app/order/api/get-user-orders.api', () => ({
  getUserOrders: jest.fn(() => Promise.resolve({ data: [mockOrder] })),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const queryClient = new QueryClient();

jest.mock('app/order/api/get-user-orders.api', () => ({
  getUserOrders: jest.fn(() => Promise.resolve({ data: [mockOrder] })),
}));

describe('OrderHistoryPage', () => {
  it('renders loading skeleton when data is not available', async () => {
    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    const skeletonElements = getAllByTestId('previous-order-skeleton');
    expect(skeletonElements.length).toBe(5);
  });

  it('renders orders when data is available', async () => {
    // jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([{ id: 1 }, { id: 2 }]);

    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const orderElements = getAllByTestId('previous-order');
      expect(orderElements.length).toBe(1);
    });
  });
});
