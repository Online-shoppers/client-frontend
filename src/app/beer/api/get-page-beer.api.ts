import repository from 'api/repository';

import { Beer } from '../types/beer.type';

type PageBeerResponse = {
  info: {
    total: number;
  };

  items: Beer[];
};

export const getPageBeer = (sorting: string, page?: number, size?: number) => {
  return repository.get<PageBeerResponse>('/api/beer', {
    params: { page, size, sortOption: sorting },
  });
};
