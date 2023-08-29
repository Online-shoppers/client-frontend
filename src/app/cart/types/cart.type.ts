import { CartProduct } from './cart-product.type';

export interface Cart {
  id: string;
  created: number;
  updated: number;
  total: number;
  products: CartProduct[];
}
