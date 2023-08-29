import repository from 'api/repository';

import { Beer } from '../types/beer.type';

export const getBeerById = (id?: string) => {
  return repository.get<Beer>(`/api/beer/${id}`);
};
