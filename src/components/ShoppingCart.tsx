import React, { useState, useEffect, useContext } from 'react';
import { Product } from '../types/product';
import shoppingCartService from '../services/shoppingCartService';
import CartProduct from './CartProduct';
import CartTotal from './CartTotal';
import MobileCartProduct from './MobileCartProduct';
import CartMobileTotal from './CartMobileTotal';
import PaymentsServices from '../services/PaymentsServices';
import context from '../context';
import ProductsServices from '../services/ProductsServices';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './Header';
import Footer from './Footer';
import BottomNavBar from './BottomNavBar';
import currencyFormatter from '../utils/currencyFormatter';

const ShoppingCart: React.FC = () => {
  const costoEnvio = 1800;
  const [products, setProducts] = useState<Array<Product>>([]);
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const ctx = useContext(context);
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryPay, setDeliveryPay] = useState(true);
  const [descuento, setDescuento] = useState(0);
  const [deliveryTime, setDeliveryTime] = useState('');
  ///////

  const handleDeliveryTime = (option: string) => {
    setDeliveryTime(option);
  };
  const handleDeliveryMethod = (option: string) => {
    if (option === 'domicilio') {
      setDeliveryMethod(option);
      if (total > 20000) setDeliveryPay(false);
    } else {
      setDeliveryMethod('deposito');
    }
  };
  const getProductsTotal = (): number | undefined => {
    let totalProducts = 0;
    const productsFromStorage: Product[] | undefined =
      shoppingCartService.getProducts();
    if (!productsFromStorage) return;
    productsFromStorage.forEach((p) => {
      if (p.price && p.quantity)
        totalProducts += p.price * p.quantity;
    });
    if (deliveryMethod === 'deposito') {
      setDescuento(totalProducts * 0.1);
      totalProducts = totalProducts - totalProducts * 0.1;
    } else if (deliveryMethod === 'domicilio')
      totalProducts += costoEnvio;
    setTotal(totalProducts);
  };
  ///////

  const getProductsFromStorage = (): string | undefined => {
    const productsFromStorage: Product[] | undefined =
      shoppingCartService.getProducts();
    if (!productsFromStorage) return; //undefined
    setProducts(productsFromStorage); //string
  };
  ///////

  const createPayment = async (products: Product[]) => {
    if (!products.length) return;
    setLoading(true);
    if (!ctx?.currentUser) return;
    function cleanProducts() {
      // cleanProducts named????
      const productosWidthIdAndQuantity = products.map(
        (producto) => {
          return {
            id: producto.id,
            quantity: producto.quantity,
            name: producto.name,
            price: producto.price,
          };
        },
      );
      return productosWidthIdAndQuantity;
    }
   
    const rsp = await PaymentsServices.createPreference(
      cleanProducts(),
      ctx.currentUser.id,

      deliveryMethod,
      descuento,
      deliveryTime,
    );
    if (!rsp.hasError) {
      setLoading(true);
      shoppingCartService.setEmpyArray();
      window.location.href = rsp.data.response.init_point;
    }
    if (rsp.hasError) {
      if (rsp.msg === 'Out of stock') {
        const { productOutOfStock } = (
          await ProductsServices.chekStock(cleanProducts())
        ).data;
        const productToShow = productOutOfStock
          .map((p: any) => {
            return ` ${p.name}: está fuera de stock, el actual es de ${p.stock}`;
          })
          .join('\n');
        window.alert(productToShow);
      }
      setLoading(false);
    }
    return rsp;
  };
  ///////
  const getQuantity = () => {
    const quantity = shoppingCartService.getQuantity();
    setQuantity(quantity);
  };
  useEffect(() => {
    getProductsFromStorage();
    getProductsTotal();
    getQuantity();
  }, [deliveryMethod]);
  ////
  return (
    <div>
      <Header />

      <div
        className="navbar-logo-left wf-section"
        style={{ pointerEvents: loading ? 'none' : 'auto' }}
      >
        <section className="section-2 wf-section">
          <div
            className="titleproducts"
            style={{ padding: '0px' }}
          >
            <h3 style={{ color: 'white' }}>SU COMPRA</h3>
          </div>

          <div className="wrappercart">
            <div className="header">
              <div className="headerproduct">
                <div className="txtheader bold">Producto</div>
              </div>
              <div className="headeraccount">
                <div className="txtheader bold">Cantidad</div>
              </div>
              <div className="headerprize">
                <div className="txtheader right bold">
                  Precio
                </div>
              </div>
              <div className="headerstotal">
                <div className="txtheader right bold">
                  Sub total
                </div>
              </div>
            </div>
            {products.map((product, index) => (
              <CartProduct
                key={product.id}
                product={product}
                getProductsTotal={getProductsTotal}
                getProductsFromStorage={getProductsFromStorage}
                getQuantity={getQuantity}
                index={index}
              />
            ))}
            {deliveryPay && deliveryMethod === 'domicilio' ? (
              <h4
                style={{ textAlign: 'right', marginRight: 10 }}
              >
                Costo de envio: $ 1.800
              </h4>
            ) : null}
            {deliveryMethod === 'deposito' && (
              <h4
                style={{
                  textAlign: 'right',
                  marginRight: 10,
                  backgroundColor: 'yellow',
                }}
              >
                Descuento: {currencyFormatter(descuento)}
              </h4>
            )}
            <CartTotal total={total} quantity={quantity} />
          </div>
          {/*mobile*/}
          {products.map((product, index) => (
            <MobileCartProduct
              key={product.id}
              product={product}
              getProductsTotal={getProductsTotal}
              getProductsFromStorage={getProductsFromStorage}
              getQuantity={getQuantity}
              index={index}
            />
          ))}
          <CartMobileTotal total={total} quantity={quantity} />
          {/*mobile*/}
          <div
            style={{
              marginTop: 50,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <div
              id="deliveryMethod"
              className="txtheader right bold"
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h3>Elija el metodo de entrega</h3>
              <p>
                Si su pedido supera los 20.000 pesos el envío es
                SIN CARGO
              </p>
              <br />
              <select
                className="selectlogin w-input"
                style={{ width: '30%' }}
                id="option-select"
                defaultValue=""
                onChange={(e) =>
                  handleDeliveryMethod(e.target.value)
                }
              >
                <option value="" disabled>
                  Elija una opción
                </option>
                <option value="deposito">
                  Retira en depósito 10% off
                </option>
                <option value="domicilio">
                  Entrega a domicilio
                </option>
              </select>
            </div>
            {deliveryMethod === 'domicilio' ? (
              <div
                id="deliveryTime"
                className="txtheader right bold"
                style={{
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h3>Horario de entrega</h3>
                <br />

                <select
                  className="selectlogin w-input"
                  style={{ width: '30%' }}
                  id="option-select"
                  defaultValue=""
                  onChange={(e) =>
                    handleDeliveryTime(e.target.value)
                  }
                >
                  <option value="" disabled>
                    Elija una opción
                  </option>
                  <option value="turno1">8 a 11</option>
                  <option value="turno2">11 a 13</option>
                  <option value="turno3">13 a 18</option>
                </select>
                <h3>Direccion de entrega:</h3>
                <p>
                  {ctx?.currentUser?.calle}{' '}
                  {ctx?.currentUser?.altura}
                  {' - '}
                  {ctx?.currentUser?.ciudad}
                </p>
              </div>
            ) : null}
          </div>
          <div
            className="div-block-5"
            style={{ height: '40vh' }}
          >
            <div className="confirmacompra">
              {loading ? (
                <CircularProgress />
              ) : (
                <img
                  src="images/mercadopago-nuevo-logo-12208FF614-seeklogo.com.png"
                  loading="lazy"
                  alt=""
                  className="mercadopagologo"
                />
              )}

              <button
                onClick={() => createPayment(products)}
                className="confirmbutton"
              >
                Confirmar compra
              </button>
            </div>
          </div>
        </section>
      </div>
      <BottomNavBar />
    </div>
  );
};

export default ShoppingCart;
