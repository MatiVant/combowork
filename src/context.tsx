import { createContext } from "react";
import { Product } from "./types/product";
import { User } from "./types/user";
import { Category } from "./types/category";

interface MyContextType {

  currentUser?: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  currentProduct?: Product[];
  setCurrentProduct: React.Dispatch<
  React.SetStateAction<Product[] | undefined>
  >;
  currentCategory?: Category[];
  setCurrentCategory: React.Dispatch<React.SetStateAction<Category[] | undefined>>;
}

const context = createContext<MyContextType | undefined>(undefined);

export default context;
