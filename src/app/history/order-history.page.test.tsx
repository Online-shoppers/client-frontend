import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';

import OrderHistoryPage from './order-history.page';

jest.mock('app/order/api/get-user-orders.api', () => ({
  getUserOrders: jest.fn(() => Promise.resolve({ data: [] })),
}));

describe('OrderHistoryPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it('renders loading state', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    const loadingSkeletons = screen.getAllByTestId('previous-order-skeleton');
    expect(loadingSkeletons).toHaveLength(5);
  });

  it('renders order data', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];

    const mockResponse = new Response(JSON.stringify(mockData), {
      status: 200,
      headers: { 'Content-type': 'application/json' },
    });

    global.fetch = jest.fn().mockResolvedValue(mockResponse);

    render(
      <QueryClientProvider client={queryClient}>
        <OrderHistoryPage />
      </QueryClientProvider>,
    );

    const orderComponents = await screen.findAllByTestId('previous-order');
    expect(orderComponents).toHaveLength(mockData.length);

    global.fetch = jest.requireActual('node-fetch');
  });
});
