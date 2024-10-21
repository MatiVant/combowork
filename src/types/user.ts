import { UserRole } from '../constants/User';

export interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  state?: string;
  role?: string;
  email?: string;
  calle: string;
  altura: string;
  ciudad: string;
  codigoPostalCode: string;
  // orders?: Order[];
  companyId?: number;
  roles?: UserRole[];
}
