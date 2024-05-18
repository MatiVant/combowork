import { createContext } from "react";
import { Product } from "./types/product";
import { User } from "./types/user";

interface MyContextType {
  currentUser?: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  currentProduct?: Product[];
  setCurrentProduct: React.Dispatch<
    React.SetStateAction<Product[] | undefined>
  >;
}

const context = createContext<MyContextType | undefined>(undefined);

export default context;
