import React, { useContext, useEffect, useState } from 'react';
import CardProduct from './CardProduct';
import context from '../context';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useMediaQuery } from '@mui/material';
import Info from './Info';
import BottomNavBar from './BottomNavBar';
import Header from './Header';
import { Product } from '../types/product';

///
const Body: React.FC = () => {
  const [productClicked, setProductClicked] = useState<
    Product | undefined
  >();
  const matches = useMediaQuery('(max-width:479px)');
  const [loading, setLoading] = useState(true);
  const allProducts = useContext(context);
  
  //////
  useEffect(() => {
    window.scrollTo({ top: 0 });
    console.log(allProducts);
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  //

  return (
    <>
      <Header />

      <div className="image-container">
        {loading ? (
          <Box sx={{ width: '100%', position: 'absolute' }}>
            <LinearProgress />
          </Box>
        ) : (
          ''
        )}
        <section>
          <img
            srcSet="/images/Banner1.png 1200w"
            sizes="(max-width: 991px) 100vw, 
          (max-width: 479px) 50vw"
            src="/images/Banner1.png"
            alt="combowork"
            style={{ marginBottom: '2%' }}
          />
        </section>

        <a href="https://wa.me/3413110700" target="_blank">
          <WhatsAppIcon
            sx={{
              fontSize: matches ? 50 : 80,
              right: matches ? 10 : 50,
              bottom: matches ? 10 : 50,
            }}
            className="btn-wsp"
          />
        </a>
        <section className="wrapperproducts wf-section" style={{ display: 'flex'}}>
          
          <div id='navBarCategories' className="navBarCategories" style={{minWidth: "18%"}}>
              CATEGORÍAS
              <ul className='categoriesList'>
                {allProducts?.currentCategory?.map((categ) => <li>{categ.description}</li>)}
                
              </ul>
              
          </div>
          <div>

          
          <h1 style={{ textAlign: 'center', lineHeight: 1 }}>
            NUESTROS PRODUCTOS
          </h1>
          <hr className="lineaHorProducts"></hr>
          {loading ? (
            <section style={{ height: '100vh' }}></section>
          ) : (
            <div className="lineproduct">
              {allProducts?.currentProduct
                ? allProducts.currentProduct
                  .filter((prod)=> prod && prod.stock !== undefined && prod.stock > 0)
                  .map((p, index) => (
                    <CardProduct
                      product={p}
                      key={index}
                      setProductClicked={setProductClicked}
                    />
                  ))
                : null}
            </div>
          )}
          </div>
        </section>
          <div
            className="titleproducts"
            style={{ marginTop: 80 }}
          >
            <div
              style={{
                color: 'white',
                fontSize: 40,
                padding: 40,
                fontWeight: 600,
              }}
            >
              ¡LAS MEJORES MARCAS!
            </div>
          </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Info />
      </div>
      {/* <BottomNavBar /> */}
    </>
  );
};
export default Body;
