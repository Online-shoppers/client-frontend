import repository from 'api/repository';

import { Accessory } from '../types/accessory.type';

export const getAccessoryById = (id?: string) => {
  return repository.get<Accessory>(`/api/accessory/${id}`);
};
