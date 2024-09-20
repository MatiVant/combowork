import { Category } from './category';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  code?: string;
  price?: number;
  stock?: number;
  offer?: boolean;
  categoryId?: number;
  category?: Category;
  image?: string;
  quantity?: number;
  discount?: number;
  show?: boolean;
}
