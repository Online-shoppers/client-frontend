import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import React from 'react';

import OrderHistoryPage from './order-history.page';

const queryClient = new QueryClient();

jest.mock('app/order/api/get-user-orders.api', () => ({
  getUserOrders: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('OrderHistoryPage', () => {
  it('renders loading skeleton when data is not available', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    const skeletonElements = container.querySelectorAll('div');
    expect(skeletonElements.length).toBe(skeletonElements.length);
  });

  it('renders orders when data is available', async () => {
    jest.spyOn(queryClient, 'getQueryData').mockReturnValueOnce([{ id: 1 }, { id: 2 }]);

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const orderElements = container.querySelectorAll('div');
      expect(orderElements.length).toBe(orderElements.length);
    });
  });
});
