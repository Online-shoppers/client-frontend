import repository from 'api/repository';

import { Cart } from '../types/cart.type';

export const getCart = () => {
  return repository.get<Cart>('/api/cart');
};
