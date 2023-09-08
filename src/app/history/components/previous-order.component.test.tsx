/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import PreviousOrder from './previous-order.component';

describe('PreviousOrder Component', () => {
  it('renders without errors', () => {
    const sampleOrder: any = {
      id: '12345',
      created: Date.now(),
      updated: Date.now(),
      status: 'completed',
      country: 'Sample Country',
      city: 'Sample City',
      zipCode: '12345',
      address: '123 Sample St',
      phone: '+1234567890',
      total: 100,
      buyerId: 'buyer123',
      products: [
        {
          id: 'product1',
          category: 'category1',
          productId: '123',
          imageUrl: 'sample-image.jpg',
          name: 'Sample Product',
          price: 20,
          quantity: 2,
        },
        {
          id: 'product2',
          category: 'category2',
          productId: '456',
          imageUrl: 'sample-image2.jpg',
          name: 'Another Product',
          price: 30,
          quantity: 3,
        },
      ],
    };

    const { getByText } = render(
      <BrowserRouter>
        <PreviousOrder order={sampleOrder} />
      </BrowserRouter>,
    );

    expect(getByText(/Order-ID:/)).toBeInTheDocument();
  });
});
