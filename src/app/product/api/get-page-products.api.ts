import repository from 'api/repository';

import { Product } from '../types/product.type';

interface ProductFilters {
  name?: string | null;
}

interface PageProductsResponse {
  info: {
    total: number;
  };

  items: Product[];
}

export const getPageProducts = (
  page: number,
  size: number,
  sorting: string,
  filters: ProductFilters,
) => {
  return repository.get<PageProductsResponse>('/api/products', {
    params: { page, size, sortOption: sorting, name: filters.name },
  });
};
