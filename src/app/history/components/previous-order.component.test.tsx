import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { OrderType } from 'app/order/types/order.type';
import { ProductCategories } from 'app/product/enums/product-categories.enum';

import PreviousOrder from './previous-order.component';

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

describe('PreviousOrder Component', () => {
  it('renders without errors', () => {
    const sampleOrder: OrderType = {
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
          created: 1000,
          updated: 1000,
          category: ProductCategories.BEER,
          productId: '123',
          imageUrl: 'sample-image.jpg',
          name: 'Sample Product',
          description: 'Tasty',
          price: 20,
          quantity: 2,
          orderId: '12345',
        },
        {
          id: 'product2',
          created: 1000,
          updated: 1000,
          category: ProductCategories.SNACKS,
          productId: '456',
          imageUrl: 'sample-image2.jpg',
          name: 'Another Product',
          description: 'Tasty',
          price: 30,
          quantity: 3,
          orderId: '12345',
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
