import { ReactNode } from "react";
import Home from "../components/Home";
import ShoppingCart from "../components/ShoppingCart";
import ChangerPassword from "../components/ChangerPassword";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import DetailProduct from "../components/DetailProduct";
import PurchaseConfirmation from "../components/PurchaseConfirmation";
import ShortSignUp from "../components/shortSignUp";


interface RouteType {
  path: string;
  element: ReactNode;
}
/////////
export const home: RouteType = {
  path: "/",
  element: <Home />,
};
///////
export const shoppingCart: RouteType = {
  path: "/shoppingCart",
  element: <ShoppingCart />,
};
/////

export const changerPassword: RouteType = {
  path: "/changemypassword",
  element: <ChangerPassword />,
};

export const login: RouteType = {
  path: "/",
  element: <Login />,
};
/////

export const signUp: RouteType = {
  path: "/signup",
  element: <SignUp />,
};
export const shortSignUp: RouteType = {
  path: "/shortSignUp",
  element: <ShortSignUp />,
};

export const detailProduct: RouteType = {
  path: "/products/:id",
  element: <DetailProduct />,
};

export const purchaseConfirmation: RouteType = {
  path: "/succes",
  element: <PurchaseConfirmation />,
};

export const routesEnable: RouteType[] = [
  home,
  purchaseConfirmation,
  shoppingCart,
  detailProduct,
  changerPassword,
];

export const routesDesable: RouteType[] = [login, signUp,shortSignUp];
