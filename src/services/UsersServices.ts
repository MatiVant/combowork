import CRUDService from './CRUDService';
import { newUser } from '../types/newUser';

class UsersServices extends CRUDService {
  constructor() {
    super('users');
  }
  async create(data: {
    user: any;
    companyCode: string;
    deliveryTime: string;
    companyTel: string;
  }) {
    const result = await this.post('/signup', data);
    return result;
  }
}

export default new UsersServices();
