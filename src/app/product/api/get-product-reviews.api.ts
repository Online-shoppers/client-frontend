import repository from 'api/repository';

import { ProductReview } from '../types/product-review.type';

export const getProductReviews = (productId?: string) => {
  return repository.get<ProductReview[]>(`/api/reviews/${productId}`);
};
