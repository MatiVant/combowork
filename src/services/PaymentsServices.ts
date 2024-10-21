import { Product } from '../types/product';
import CRUDService from './CRUDService';

class PaymentsServices extends CRUDService {
  constructor() {
    super('payments');
  }

  createPreference = async (
    products: Product[],
    userId: number,
    deliveryMethod: string,
    descuento: number,
    deliveryTime: string,
  ) => {
    const rsp = await this.post(`preference`, {
      products,
      userId,
      deliveryMethod,
      descuento,
      deliveryTime,
    });
    return rsp;
  };
}

export default new PaymentsServices();
