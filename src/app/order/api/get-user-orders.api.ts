import repository from 'api/repository';

import { Order } from '../types/order.type';

export const getUserOrders = () => {
  return repository.get<Order[]>('/api/order');
};
