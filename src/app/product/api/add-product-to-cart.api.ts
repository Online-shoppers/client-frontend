import repository from 'api/repository';

import { Cart } from 'app/cart/types/cart.type';

export const addProductToCart = (productId: string, quantity: number) => {
  return repository.post<Cart>(`/api/cart/products/${productId}`, {}, { params: { quantity } });
};
