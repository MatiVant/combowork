import { UserRole } from "../constants/User";

export interface User {
    id: number;
    firstName?: string;
    lastName?: string;
    state?: string;
    role?: string;
    email?: string;
    // orders?: Order[];
    companyId?: number;
    roles?: UserRole[];
}
