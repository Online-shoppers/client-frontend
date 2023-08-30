import { ProductCategories } from 'app/product/enums/product-categories.enum';

export interface OrderProductType {
  id: string;
  created: number;
  updated: number;
  name: string;
  description: string;
  category: ProductCategories;
  imageUrl: string;
  price: number;
  quantity: number;
  orderId: string;
  productId: string;
}
