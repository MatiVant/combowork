import { Product } from '../types/product';
import {
  Link,
  NavLink,
  Navigate,
  redirect,
  useNavigate,
} from 'react-router-dom';
import currencyFormatter from '../utils/currencyFormatter';
import shoppingCartService from '../services/shoppingCartService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ProductsServices from '../services/ProductsServices';

interface Prop {
  product: Product;
  // productClicked: {} | undefined;
  setProductClicked: Function;
}
///
const CardProduct: React.FC<Prop> = ({
  product,
  setProductClicked,
}) => {
  const id = Number(product.id);
  const [quantity, setQuantity] = useState<number>(0);

  const getProduct = async () => {
    try {
      const rsp = await ProductsServices.getProductWhithCategory(
        id,
      );
      console.log(rsp);
      setProductClicked(rsp.data);
      return rsp.data; // Añadido para devolver el producto
    } catch (error) {
      console.error('Error fetching product:', error);
      return undefined;
    }
  };
  const addToCart = async () => {
    setQuantity(0)
    const productData = await getProduct();
    const productsOnCart = shoppingCartService.getProducts();
    const productSelected = productsOnCart.filter(
      (f: any) => f.id === productData?.id,
    );
    
    let actualQuantityOfTheProductOnCart = 0;
    if (
      productSelected.length > 0 &&
      productSelected[0].hasOwnProperty('quantity')
    ) {
      actualQuantityOfTheProductOnCart =
        productSelected[0].quantity;
    } else {
      actualQuantityOfTheProductOnCart = 0;
    }

    if (!product || !product.stock) return toast.warning('el stock es insuficiente');

    // if (actualQuantityOfTheProductOnCart + 1 < 1 || !Number.isInteger(valueOfInput)) {
    //   setQuantity(0); // seteo la cantiad a 0, tomando lo ingreso como error, y esto implica un reset de cantidad, si el nro negativo o invalido, automaticamente lo seteo en 0
    //   return toast.warning(
    //     'el numero ingresado tiene errores...',
    //   );
    // }

    if (product.stock < actualQuantityOfTheProductOnCart + 1) {
      setQuantity(0); // seteo la cantiad a 0, tomando lo ingreso como error, y esto implica un reset de cantidad, si el nro negativo o invalido, automaticamente lo seteo en 0
      return toast.warning('el stock es insuficiente');
    }
    //////
    // setQuantity((prev) => prev + 1);

    const _product = {
      ...productData,
      quantity: quantity + 1,
    };
    setProductClicked(_product);
    shoppingCartService.addProduct(_product);
    toast.success('Agregado al carrito!!!');
  };

  return (
    <div className="product">
          <Link
            to={`products/${product.id}`}
            style={{textDecoration: 'none', color: 'black'}}
            
          >
      <div className="productData">
        <div className="containerDiscountImage">
        {/* {product.discount && (
        <div className="txtdescription inverse">
          {product.discount}% de DESCUENTO!
        </div>
        )} */}
        <img
          src={
            product.image
              ? product.image
              : '../images/generica COMBOWORK.png'
          }
          alt={product.name}
        />
        </div>
        {product.offer ? (
          <div className="offer">
            <div className="txtdescription title offer">
              OFERTA !!!
            </div>
          </div>
        ) : null}
      
        
        <h3 className="txtdescription title ">{product.name}</h3>

          <div className="txtdescription title precio">
            {product && product.price
              ? currencyFormatter(product?.price)
              : ''}
          </div>
      
      
      </div>
            
          </Link>
      <div
        style={{
          display: 'flex',
          justifyItems: 'center',
          flexDirection: 'column',
        }}
      >
        <button className="addButton" onClick={addToCart}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
