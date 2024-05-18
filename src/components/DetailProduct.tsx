import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import ProductsServices from '../services/ProductsServices';
import shoppingCartService from '../services/shoppingCartService';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import currencyFormatter from '../utils/currencyFormatter';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import BottomNavBar from './BottomNavBar';

const DetailProduct = () => {
  const id: number = Number(useParams().id);
  const [product, setProduct] = useState<Product | undefined>();
  const [valueOfInput, setValueOfInput] = useState<number>();
  const [quantity, setQuantity] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  //////////////
  const getProduct = async () => {
    const rsp = await ProductsServices.getProductWhithCategory(
      id,
    );
    setProduct(rsp.data);
    setTimeout(() => {
      setLoading(false);
    }, 150);
  };
  ////
  const handleChange = (
    evt: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(evt.target.value);
    setValueOfInput(value); //to use onSubmit
    if (!product) return;
    setQuantity(value);
  };
  //////////////
  const onSubmit = () => {
    const productsOnCart = shoppingCartService.getProducts();
    const productSelected = productsOnCart.filter(
      (f: any) => f.name === product?.name, // filtra el nombre del producto que esta en el carrito y es igual al que quiero añadir
    );
    //// validacion de la cantidad de stock + producto en el carrito
    let actualQuantityOfTheProductOnCart = 0; // la cantidad de inicia en cero, y luego se pisara con el valor real en la linea 47 o sera efectivamente cero, linea 49
    if (
      productSelected.length > 0 &&
      productSelected[0].hasOwnProperty('quantity')
    ) {
      actualQuantityOfTheProductOnCart =
        productSelected[0].quantity; // establece la cantidad de ese producto que hay en el carrito, si lo hubiera
    } else {
      actualQuantityOfTheProductOnCart = 0; // Establece la cantidad en cero si no esta ese product en el carro
    }
    //////
    if (!valueOfInput || !product || !product.stock) return; //typescript validation
    if (valueOfInput < 1 || !Number.isInteger(valueOfInput)) {
      setQuantity(0); // seteo la cantiad a 0, tomando lo ingreso como error, y esto implica un reset de cantidad, si el nro negativo o invalido, automaticamente lo seteo en 0
      return toast.warning(
        'el numero ingresado tiene errores...',
      );
    }
    // aca se ponen en juego todos los valores, los del input, los del stock y los de la cantidad del carrito y los compara linea 58 a 64
    if (
      product.stock < valueOfInput ||
      actualQuantityOfTheProductOnCart + valueOfInput >
        product.stock
    ) {
      setQuantity(0); // seteo la cantiad a 0, tomando lo ingreso como error, y esto implica un reset de cantidad, si el nro negativo o invalido, automaticamente lo seteo en 0
      return toast.warning('el stock es insuficiente');
    }
    //////
    if (quantity > 0) {
      const _product = {
        ...product,
        quantity: quantity,
      };
      setProduct(_product);
      shoppingCartService.addProduct(_product);
      toast.success('Agregado al carrito!!!');
    } else return;
  };
  ///////
  useEffect(() => {
    getProduct();
    window.scroll({
      top: 0,
    });
  }, []);
  /////////////////
  return (

    <div>
      <Header />  
      <section
        style={{ minHeight: '100vh' }}
        className="section wf-section"
      >
        {loading ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <div className="columns w-row ">
            <div className="column w-col w-col-6">
              <div className="wrapperproductinfo">
                <h1 className="txtproductname">
                  {product?.name}
                </h1>
                <p className="paragraph">
                  <p style={{ whiteSpace: 'pre-line' }}>
                    {product?.description}
                  </p>
                </p>
                <p className="paragraph">
                  stock : {product?.stock}
                </p>
                <p>
                  Precio:{' '}
                  {product && product.price
                    ? currencyFormatter(product?.price)
                    : ''}
                </p>
                <div className="w-form">
                  <section>
                    <div className="wrapperadd">
                      <input
                        type="number"
                        className="amountinput w-input"
                        min={1}
                        maxLength={256}
                        name="field"
                        data-name="Field"
                        placeholder="Cantidad"
                        id="field"
                        onChange={handleChange}
                        style={{fontSize: '1.3rem'}}
                      />
                      <button
                        className="addbutton w-button"
                        onClick={onSubmit}
                        style={{fontSize: '1.3rem'}}
                      >
                        Añadir al carro
                      </button>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        marginTop: '15%',
                        justifyContent: 'center',
                      }}
                    >
                      
                      <Link
                        to="/"
                        style={{
                          display: 'flex',
                          textDecoration: 'none',
                          width: 'fit-content',
                        }}
                      >
                        <p
                          className="logintitle"
                          style={{
                            fontSize: '25px',
                            color: 'black'
                          }}
                        >
                          <span
                            className="logintitle"
                            style={{
                              fontSize: '32px',
                              color: 'black',
                            }}
                          >
                            ←
                          </span>{' '}
                          ATRÁS
                        </p>
                      </Link>
                    </div>
                  </section>
                </div>
              </div>
            </div>
            <div className="column w-col w-col-6">
              <div
                className="productimg"
                style={{
                  backgroundImage: product?.image
                    ? `url(${product.image})`
                    : undefined,
                }}
              ></div>
            </div>
          </div>
        )}
      
      </section>
      <BottomNavBar />
     
    </div>
  );
};

export default DetailProduct;
