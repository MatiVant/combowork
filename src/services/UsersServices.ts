import CRUDService from './CRUDService';
import { newUser } from '../types/newUser';

class UsersServices extends CRUDService {
  constructor() {
    super('users');
  }
  async create(data: {
    user: any;
    password: string;
    companyCode: string;
    deliveryTime?: string;
    calle?: string;
    altura?: number;
    pisoDepto?: string;
    ciudad?: string;
    codigoPostal?: string;
  }) {
    const result = await this.post('/signup', data);
    console.log(result);
    return result;
  }
}

export default new UsersServices();
