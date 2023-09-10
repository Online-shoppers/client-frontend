import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ProductCategories } from 'app/product/enums/product-categories.enum';

import store from 'store';

import { getPageAccessories } from './api/get-page-accessories.api';
import { AccessoryTypes } from './enums/accessory-types.enum';
import ListPage from './list.page';
import { Accessory } from './types/accessory.type';

const mockAccessories: Accessory[] = [
  {
    id: 'id1',
    created: 1000,
    updated: 1000,
    type: AccessoryTypes.BOTTLE_OPENER,
    name: 'Hello',
    description: 'Very convenient opener',
    price: 100,
    weight: 100,
    rating: 0,
    archived: false,
    category: ProductCategories.ACCESSORIES,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
  {
    id: 'id2',
    created: 1000,
    updated: 1000,
    type: AccessoryTypes.BOTTLE_OPENER,
    name: 'Hello',
    description: 'Very convenient opener',
    weight: 100,
    price: 100,
    rating: 0,
    archived: false,
    category: ProductCategories.ACCESSORIES,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
  {
    id: 'id3',
    created: 1000,
    updated: 1000,
    type: AccessoryTypes.BOTTLE_OPENER,
    name: 'Hello',
    description: 'Very convenient opener',
    price: 100,
    weight: 100,
    rating: 0,
    archived: false,
    category: ProductCategories.ACCESSORIES,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
];

const pageAccessoriesResponse = {
  info: { total: mockAccessories.length },
  items: mockAccessories,
};

jest.mock('./api/get-page-accessories.api', () => ({
  getPageAccessories: jest.fn(() => Promise.resolve({ data: pageAccessoriesResponse })),
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
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

describe('Accessories list page', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have proper data', async () => {
    const data = await getPageAccessories('price:asc', 1, 20);
    expect(data).toStrictEqual({ data: pageAccessoriesResponse });
  });

  it('should render skeletons while loading', async () => {
    const { findAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<ListPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    const skeletons = await findAllByTestId('product-card-skeleton');
    expect(skeletons).toHaveLength(10);
  });

  it('should render page with data', async () => {
    const { getAllByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <Routes>
              <Route path="/" element={<ListPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const productElements = getAllByTestId('product-card');

      expect(productElements).toHaveLength(mockAccessories.length);
    });
  });
});
