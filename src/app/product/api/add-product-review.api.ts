import repository from 'api/repository';

import { CreateProductReviewForm } from '../types/create-product-review-form.type';
import { ProductReview } from '../types/product-review.type';

export const addProductReview = (
  productId: string,
  userId: string,
  review: CreateProductReviewForm,
) => {
  return repository.post<ProductReview>(`/api/reviews/${productId}`, { ...review, userId });
};
