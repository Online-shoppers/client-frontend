import { Product } from 'app/product/types/product.type';

import { AccessoryTypes } from '../enums/accessory-types.enum';

export interface Accessory extends Product {
  type: AccessoryTypes;
  weight: number;
}
