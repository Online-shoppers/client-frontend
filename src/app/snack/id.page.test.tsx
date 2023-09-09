import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { addProductToCart } from 'app/product/api/add-product-to-cart.api';
import { ProductCategories } from 'app/product/enums/product-categories.enum';
import { ProductReview } from 'app/product/types/product-review.type';

import store from 'store';

import { getSnackById } from './api/get-snack-by-id.api';
import { SnackTypes } from './enums/snack-types.enum';
import IdPage from './id.page';
import { Snack } from './types/snack.type';

const mockSnack: Snack = {
  id: 'id',
  created: 1000,
  updated: 1000,
  type: SnackTypes.NACHOS,
  name: 'Hello',
  description: 'Very yummy snack',
  weight: 100,
  price: 100,
  rating: 0,
  archived: false,
  category: ProductCategories.SNACKS,
  quantity: 1000,
  image_url: 'https://google.com',
  reviews_amount: 0,
};

const mockReviews: ProductReview[] = [
  {
    id: 'some1',
    created: 1000,
    updated: 1000,
    text: 'Very good',
    edited: false,
    rating: 4,
    userName: 'Some User',
    userId: 'user1-id',
    archived: false,
  },
  {
    id: 'some2',
    created: 1000,
    updated: 1000,
    text: 'Very very good',
    edited: false,
    rating: 5,
    userName: 'User',
    userId: 'user2-id',
    archived: false,
  },
];

jest.mock('./api/get-snack-by-id.api', () => ({
  getSnackById: jest.fn(() => Promise.resolve({ data: mockSnack })),
}));

jest.mock('app/product/api/get-product-reviews.api', () => ({
  getProductReviews: jest.fn(() => Promise.resolve({ data: mockReviews })),
}));

jest.mock('app/product/api/add-product-to-cart.api', () => ({
  addProductToCart: jest.fn(),
}));

jest.mock('app/product/api/add-product-review.api', () => ({
  addProductReview: jest.fn(),
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

describe('SnackIdPage', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('should have proper data', async () => {
    const data = await getSnackById(mockSnack.id);
    expect(data).toStrictEqual({ data: mockSnack });
  });

  it('should render skeletons while loading', async () => {
    const { getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/:id']}>
            <Routes>
              <Route path="/:id" element={<IdPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const skeletonElement = getByTestId('snack-id-info-skeleton');
      expect(skeletonElement).toBeInTheDocument();
    });
  });

  it('should render page with data', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/:id']}>
            <Routes>
              <Route path="/:id" element={<IdPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const name = getByText(mockSnack.name);
      const description = getByText(mockSnack.description);
      const price = getByText('$' + mockSnack.price);
      expect(name).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(price).toBeInTheDocument();
    });
  });

  it('should render reviews', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/:id']}>
            <Routes>
              <Route path="/:id" element={<IdPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      mockReviews.forEach(review => {
        expect(getByText(review.userName)).toBeInTheDocument();
        expect(getByText(review.text)).toBeInTheDocument();
      });
    });
  });

  it('should add to cart', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter initialEntries={['/:id']}>
            <Routes>
              <Route path="/:id" element={<IdPage />} />
            </Routes>
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      const button = getByText('cart:Add-to-cart');

      fireEvent.click(button);

      expect(addProductToCart).toBeCalledTimes(1);
    });
  });

  // it('should add review', async () => {
  //   const { getByText, getByTestId, getAllByTitle } = render(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={['/:id']}>
  //           <Routes>
  //             <Route path="/:id" element={<IdPage />} />
  //           </Routes>
  //         </MemoryRouter>
  //       </Provider>
  //     </QueryClientProvider>,
  //   );
  //
  //   // console.log(store.getState().auth.isAuthenticated);
  //
  //   await waitFor(() => {
  //     const form = getByTestId('new-review-form');
  //     const input = getByTestId('review-input');
  //     const rating = getByTestId('review-rating');
  //
  //     const fiveStars = rating.querySelector('[value="5"]');
  //
  //     if (!fiveStars) {
  //       expect(fiveStars).toBeInTheDocument();
  //       return;
  //     }
  //
  //     console.log(input.isContentEditable);
  //
  //     if (!isEditableInput(input)) {
  //       console.log('is not editable');
  //       expect(isEditableInput(input)).toBe(true);
  //       return;
  //     }
  //
  //     expect(input.value).toBe('');
  //     fireEvent.change(input, { target: { value: 'Very tasty' } });
  //     fireEvent.click(fiveStars);
  //     // const button = getByText('reviews:Leave-review');
  //     // console.log(button);
  //
  //     // fireEvent.submit(form);
  //
  //     expect(addProductReview).toBeCalledTimes(1);
  //     // expect(form).not.toBeInTheDocument();
  //   });
  // });
});
