import repository from 'api/repository';

import { OrderType } from '../types/order.type';

export const getOrderById = (id?: string) => {
  return repository.get<OrderType>(`/api/order/${id}`);
};
