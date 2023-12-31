import { Product } from 'app/product/types/product.type';

import { BeerTypes } from '../enums/beer-type.enum';

export interface Beer extends Product {
  type: BeerTypes;
  abv: number;
  country: string;
  volume: number;
  ibu: number;
}
