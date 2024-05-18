import { Product } from "../types/product";
import { toast } from "react-toastify";
import shoppingCartService from "../services/shoppingCartService";
import currencyFormatter from "../utils/currencyFormatter";
/////
interface Props {
  product: Product;
  index: number;
  getProductsFromStorage: () => string | undefined;
  getProductsTotal: () => number | undefined;
  getQuantity: () => void;
}
/////
const CartProduct = ({
  product,
  index,
  getProductsFromStorage,
  getProductsTotal,
  getQuantity,
}: Props) => {
  //////
  const handleDelete = () => {
    shoppingCartService.removeProduct(product, index);
    getProductsFromStorage();
    getProductsTotal();
    getQuantity();
    toast.success("Producto Eliminado correctamente");
  };
  ////
  return (
    <div className="header item">
      <div className="headerproduct">
        <div className="txtheader left">{product.name}</div>
      </div>
      <div className="headeraccount">
        <div className="txtheader">{product.quantity}</div>
      </div>
      <div className="headerprize">
        <div className="txtheader right">{product && product.price
                    ? currencyFormatter(product?.price)
                    : ""}</div>
      </div>
      <div className="headerstotal">
        <div className="txtheader right">
          {product.price && product.quantity
            ? currencyFormatter(product.price * product.quantity)
            : ""}
        </div>
      </div>
      <div className="div-block-4">
        <img
          src="images/trash.png"
          loading="lazy"
          alt=""
          className="image-8"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default CartProduct;
