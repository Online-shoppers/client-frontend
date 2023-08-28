import repository from 'api/repository';

import { ProductReview } from '../types/product-review.type';

export const addProductReview = (
  productId: string,
  userId: string,
  review: Pick<ProductReview, 'text' | 'rating'>,
) => {
  return repository.post<ProductReview>(`/api/reviews/${productId}`, { ...review, userId });
};
