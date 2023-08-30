import repository from 'api/repository';

import { OrderType } from '../types/order.type';

export const getUserOrders = () => {
  return repository.get<OrderType[]>('/api/order');
};
