import repository from 'api/repository';

import { Cart } from '../types/cart.type';

export const editCartProduct = (cartProductId: string, amount: number) => {
  return repository.put<Cart>(
    `/api/cart/products/${cartProductId}`,
    {},
    { params: { quantity: amount } },
  );
};
