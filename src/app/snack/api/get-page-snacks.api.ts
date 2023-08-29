import repository from 'api/repository';

import { Snack } from '../types/snack.type';

type PageSnacksResponse = {
  info: {
    total: number;
  };

  items: Snack[];
};

export const getPageSnacks = (sorting: string, page?: number, size?: number) => {
  return repository.get<PageSnacksResponse>('/api/snacks', {
    params: { page, size, sortOption: sorting },
  });
};
