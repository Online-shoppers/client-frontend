import { OrderProductType } from './order-product.type';

export interface OrderType {
  id: string;
  created: number;
  updated: number;
  status: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
  phone: string;
  total: number;
  buyerId: string;
  products: OrderProductType[];
}
