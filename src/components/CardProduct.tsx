import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import currencyFormatter from '../utils/currencyFormatter';

interface Prop {
  product: Product;
}
///
const CardProduct: React.FC<Prop> = ({ product }) => {
  return (
    <Link
      className="linkproducto w-inline-block"
      to={`products/${product.id}`}
    >
      {/* AGREGUE EL SIGUIENT CSS INLINE */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          padding: 20,
        }}
      >
        <div className="product">
          <div className="imgproduct">
            <img
              src={
                product.image
                  ? product.image
                  : '../images/generica COMBOWORK.png'
              }
              alt={product.name}
            />
            {product.offer ? (
              <div className="offer">
                <div className="txtdescription title offer">
                  OFERTA !!!
                </div>
              </div>
            ) : null}
          </div>
          <div className="wrapperdescription">
            <h3 className="txtdescription title ">
              {product.name}
            </h3>

            <div className="wrapperprecio">
              <div className="txtdescription title precio">
                {product && product.price
                  ? currencyFormatter(product?.price)
                  : ''}
              </div>
              {product.discount && (
                <div className="txtdescription inverse">
                  {product.discount}% de DESCUENTO!
                </div>
              )}
            </div>
          </div>
          <div
            style={{ display: 'flex', justifyItems: 'center', flexDirection: 'column'}}
          >
            <button className="confirmbutton" >
              Ver más
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardProduct;
