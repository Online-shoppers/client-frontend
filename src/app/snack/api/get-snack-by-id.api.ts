import repository from 'api/repository';

import { Snack } from '../types/snack.type';

export const getSnackById = (id?: string) => {
  return repository.get<Snack>(`/api/snacks/${id}`);
};
