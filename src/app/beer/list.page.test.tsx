import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ProductCategories } from 'app/product/enums/product-categories.enum';

import store from 'store';

import { getPageBeer } from './api/get-page-beer.api';
import { BeerTypes } from './enums/beer-type.enum';
import ListPage from './list.page';
import { Beer } from './types/beer.type';

const mockBeer: Beer[] = [
  {
    id: 'id1',
    type: BeerTypes.ALE,
    abv: 0,
    name: 'Hello',
    description: 'Very yummy beer',
    ibu: 0,
    price: 100,
    rating: 0,
    volume: 1,
    country: 'Belarus',
    created: 1000,
    updated: 1000,
    archived: false,
    category: ProductCategories.BEER,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
  {
    id: 'id2',
    type: BeerTypes.ALE,
    abv: 0,
    name: 'Hello',
    description: 'Very yummy beer',
    ibu: 0,
    price: 100,
    rating: 0,
    volume: 1,
    country: 'Belarus',
    created: 1000,
    updated: 1000,
    archived: false,
    category: ProductCategories.BEER,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
  {
    id: 'id3',
    type: BeerTypes.ALE,
    abv: 0,
    name: 'Hello',
    description: 'Very yummy beer',
    ibu: 0,
    price: 100,
    rating: 0,
    volume: 1,
    country: 'Belarus',
    created: 1000,
    updated: 1000,
    archived: false,
    category: ProductCategories.BEER,
    quantity: 1000,
    image_url: 'https://google.com',
    reviews_amount: 0,
  },
];

const pageBeerResponse = {
  info: { total: mockBeer.length },
  items: mockBeer,
};

jest.mock('./api/get-page-beer.api', () => ({
  getPageBeer: jest.fn(() => Promise.resolve({ data: pageBeerResponse })),
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

describe('BeerIdPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have proper data', async () => {
    const data = await getPageBeer('price:asc', 1, 20);
    expect(data).toStrictEqual({ data: pageBeerResponse });
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

      expect(productElements).toHaveLength(mockBeer.length);
    });
  });
});
