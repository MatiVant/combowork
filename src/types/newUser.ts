import { Maybe } from "yup";

export interface newUser {
  firstName?: string;
  lastName?: string;
  dni?: number;
  placeOfBirth?: string;
  dateOfBirth?: string;
  address?: string;
  location?: string;
  zipCode?: number;
  cuit?: number;
  phone?: number;
  dniFrente?: Maybe<object | undefined>;
  dniDorso?: Maybe<object | undefined>;
  isUserPep?: boolean;
  isUserSujetoObligado?: boolean;
  isUserPepDescription?: Maybe<string | undefined>;
  state?: string;
  email?: string;
  companyCode?: string;
}
