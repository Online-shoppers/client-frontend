import repository from 'api/repository';

import { CreateOrderFormType } from '../types/create-order-form.type';

export const createOrder = (form: CreateOrderFormType) => {
  return repository.post('/api/order', form);
};
