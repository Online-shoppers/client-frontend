import repository from 'api/repository';

import { CartProduct } from '../types/cart-product.type';

export const getCartProducts = () => {
  return repository.get<CartProduct[]>('/api/cart/products');
};
