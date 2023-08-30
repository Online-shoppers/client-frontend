import { ProductCategories } from 'app/product/enums/product-categories.enum';

export interface CartProduct {
  id: string;
  created: number;
  updated: number;
  name: string;
  description: string;
  imageUrl: string;
  category: ProductCategories;
  quantity: number;
  unitPrice: number;
  productId: string;
}
