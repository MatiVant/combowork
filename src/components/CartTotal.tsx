import currencyFormatter from '../utils/currencyFormatter';

interface Props {
  total: number;
  quantity: number;
}
///
const CartTotal = ({ total, quantity }: Props) => {
  console.log(total);
  return (
    <div className="header item total">
      <div className="headerproduct">
        <div className="txtheader left bold">Total</div>
      </div>

      <div className="txtheader">
        {quantity} {quantity > 1 ? 'PRODUCTOS' : 'PRODUCTO'}
      </div>

      <div className="headerprize" />
      <div className="headerstotal">
        <div className="txtheader right bold">
          {currencyFormatter(total)}
        </div>
      </div>
      <div className="div-block-4" />
    </div>
  );
};

export default CartTotal;
