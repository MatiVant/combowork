import { Product } from '../types/product';
import CRUDService from './CRUDService';

class ProductsServices extends CRUDService {
  constructor() {
    super('products');
  }

  getProductWhithCategory = async (id: number) => {
    return this.findById(id, {
      include: ['category'],
    });
  };

  getProductsByCategory = async (categoryId: number) => {
    const res = await this.findByCategID(categoryId);
    return res;
  };

  chekStock = async (products: Product[]) => {
    const rsp = await this.post(`check-stock`, { products });
    return rsp;
  };
  getProducts = async () => {
    const resp = await this.get();
    return resp;
  };
}

export default new ProductsServices();

