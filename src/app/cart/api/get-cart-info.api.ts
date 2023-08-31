import repository from 'api/repository';

import { CartInfo } from '../types/cart-info.type';

export const getCartInfo = () => {
  return repository.get<CartInfo>('/api/cart/info');
};
