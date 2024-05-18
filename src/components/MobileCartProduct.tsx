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
const MobileCartProduct = ({
  product,
  index,
  getProductsFromStorage,
  getProductsTotal,
  getQuantity,
}: Props) => {
  ////
  const handleDelete = () => {
    shoppingCartService.removeProduct(product, index);
    getProductsFromStorage();
    getProductsTotal();
    getQuantity();
    toast.success("Producto Eliminado correctamente");
  };
  ////
  return (
    <div className="wrappercartmobile">
      <div className="wrapperproductmobile">
        <div className="cartlinemobile">
          <div className="headermobile">
            <div className="textheadermobile">Producto</div>
          </div>
          <div className="datemobile">
            <div className="text-block-8">{product.name}</div>
          </div>
        </div>
        <div className="cartlinemobile">
          <div className="headermobile">
            <div className="textheadermobile">Cantidad</div>
          </div>
          <div className="datemobile">
            <div className="text-block-8">{product.quantity}</div>
          </div>
        </div>
        <div className="cartlinemobile">
          <div className="headermobile">
            <div className="textheadermobile">Precio</div>
          </div>
          <div className="datemobile">
            <div className="text-block-8">
              
              {product.price && product.quantity
                ? currencyFormatter(product.price * product.quantity)
                : ""}
            </div>
          </div>
        </div>
        <div className="cartlinemobile">
          <div className="headermobile">
            <div className="textheadermobile">{}</div>
          </div>
          <div className="datemobile">
            <div className="text-block-8"></div>
          </div>
        </div>
        <div className="div-block-10" onClick={handleDelete}>
          <img
            src="images/trash.png"
            loading="lazy"
            alt=""
            className="image-9"
          />
          <div className="text-block-9">Eliminar</div>
        </div>
      </div>
      <div className="lineseparador">
        <div className="line" />
      </div>
    </div>
  );
};

export default MobileCartProduct;
