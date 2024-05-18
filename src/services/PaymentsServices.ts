import { Product } from '../types/product';
import CRUDService from './CRUDService';

class PaymentsServices extends CRUDService {
  constructor() {
    super('payments');
  }

  createPreference = async (
    products: Product[],
    userId: number,
  ) => {
    const rsp = await this.post(`preference`, {
      products,
      userId,
    });
    return rsp;

  };
}

export default new PaymentsServices();
