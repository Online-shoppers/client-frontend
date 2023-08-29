import { Product } from 'app/product/types/product.type';

import { SnackTypes } from '../enums/snack-types.enum';

export interface Snack extends Product {
  type: SnackTypes;
  weight: number;
}
