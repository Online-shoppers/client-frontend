import repository from 'api/repository';

import { CartProduct } from '../types/cart-product.type';

export const editCartProduct = (cartProductId: string, amount: number) => {
  return repository.put<CartProduct>(
    `/api/cart/products/${cartProductId}`,
    {},
    { params: { quantity: amount } },
  );
};
