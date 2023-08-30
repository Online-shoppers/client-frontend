import repository from 'api/repository';

import { Accessory } from '../types/accessory.type';

type PageAccessoryResponse = {
  info: {
    total: number;
  };

  items: Accessory[];
};

export const getPageAccessories = (sorting: string, page?: number, size?: number) => {
  return repository.get<PageAccessoryResponse>('/api/accessory', {
    params: { page, size, sortOption: sorting },
  });
};
