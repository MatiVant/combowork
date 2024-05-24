import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { home, shoppingCart } from '../resources/routes';
import shoppingCartService from '../services/shoppingCartService';
import { Product } from '../types/product';
import ProductsServices from '../services/ProductsServices';
import context from '../context';
import currencyFormatter from '../utils/currencyFormatter';
import { red } from '@mui/material/colors';
import CategoriesServices from '../services/CategoriesServices';
/////
const Header: React.FC = () => {
  const [open, setOpen] = useState<string>('');
  const userLogged = useContext(context);
  const allProducts = useContext(context);
  ////
  const getCategories = async () => {
    const resp = await CategoriesServices.get()
    console.log('header response CAT', resp)
    allProducts?.setCurrentCategory(resp.data)
  }
  const getProducts = async () => {
    const resp = await ProductsServices.get();
    console.log('header response',resp);
    ////sort products by categoryId
    const productsSortedByCategoryId = resp.data.sort(
      (cId1: any, cId2: any) => {
        return cId1.categoryId - cId2.categoryId;
      },
    );
    ///
    allProducts?.setCurrentProduct(productsSortedByCategoryId);
  };
  ///// handler of open the dropdown
  const handleOpen = () => {
    if (open !== 'w--open') {
      setOpen('w--open');
    } else setOpen('');
  };
  /////
  const getProductsTotal = (): number => {
    let total = 0;
    const products: Product[] | undefined =
      shoppingCartService.getProducts();
    if (!products) return total;
    products.forEach((p) => {
      if (p.price && p.quantity) total += p.price * p.quantity;
    });
    return total;
  };
  ////
  const getQuantity = () => {
    const quantity = shoppingCartService.getQuantity();
    return quantity;
  };
  /////
  const logOut = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    //SETCURRENTUSER FROM CTX HERE
    userLogged?.setCurrentUser(undefined); // log out set user from context as undefine
    localStorage.clear();
  };
  //////
  useEffect(() => {
    getProducts();
    getCategories()
  }, []);
  return (
    <>
      
      <div className="navbar-logo-left wf-section" style={{scrollBehavior:'auto'}}>

        <div
          data-animation="default"
          data-collapse="medium"
          data-duration={400}
          data-easing="ease"
          data-easing2="ease"
          role="banner"
          className="navbar-logo-left-container shadow-three w-nav"
          >
          
      <div className="navbar-wrapper">
        <div className="wrapperdetail" style={{ display: 'flex', alignItems: 'center'}}>
          <Link to="/" className="navbar-brand w-nav-brand">
            <img
              loading="lazy"
              src="/images/logo_combowork_720.png"
              alt=""
              className="image"
            />
          </Link>
          <nav
            role="navigation"
            className="nav-menu-wrapper w-nav-menu"
            style={{marginLeft: "20px"}}
          >
            <ul
              role="list"
              className="nav-menu-two w-list-unstyled"
            >
              <li>
                <Link
                  to={home.path}
                  aria-current="page"
                  className="nav-link w--current"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <a
                  onClick={() =>
                    window.open(
                      'https://www.combowork.ar/nosotros',
                    )
                  }
                  className="nav-link w--current"
                  style={{ cursor: 'pointer' }}
                >
                  Nosotros
                </a>
              </li>
              <li>
                <div className="wrapperuser">
                  <li>
                    <div
                      data-delay={0}
                      data-hover="false"
                      className="nav-dropdown w-dropdown"
                      onClick={handleOpen}
                    >
                      <div className="nav-dropdown-toggle w-dropdown-toggle">
                        <div className="nav-dropdown-icon w-icon-dropdown-toggle" />
                        <div
                          className="text-block-5"
                          style={{ fontSize: '24px' }}
                        >
                          Hola{' '}
                          {userLogged?.currentUser?.firstName}!
                        </div>
                      </div>
                      <nav
                        className={`nav-dropdown-list shadow-three mobile-shadow-hide w-dropdown-list ${open}`}
                      >
                        <Link
                          to="/changemypassword"
                          className="nav-dropdown-link w-dropdown-link"
                        >
                          Cambiar contraseña
                        </Link>
                        <Link
                          to="/"
                          className="nav-dropdown-link w-dropdown-link"
                          onClick={logOut}
                        >
                          Cerrar sesión
                        </Link>
                      </nav>
                    </div>
                  </li>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <Link
              to={getQuantity() ? shoppingCart.path : home.path}
              style={{textDecoration: 'none'}}
              
            >
        <div id="wrapper carrito" className="cart-wrapper">
         
          <div className='cartIcon' >
            <div className="txtnumber">
              {getProductsTotal()
                ? currencyFormatter(getProductsTotal())
                : ''}
            </div>

            <img
              loading="lazy"
              src="../public/images/cart.png"
              alt=""
              className="image-3"
              />
            {getQuantity() ? <div className="txtCartNumber"> {getQuantity()}</div> : ''}
          </div>
         
        </div>
        </Link>
      </div>
      </div>
      </div>            
    </>
  );
};
export default Header;
