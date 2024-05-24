interface Props {
    total: number;
    quantity: number;
  }
  //
const CartMobileTotal = ({ total, quantity }: Props) => {
  return (
    <div className="wrappercartmobile">
    <div className="wrappertotalesmobile">
      <div className="div-block-7">
        <div className="texttotalemobile">TOTAL </div>
      </div>
      <div className="div-block-8">
        <div className="text-block-8">{quantity} {(quantity > 1 ? "PRODUCTOS" : "PRODUCTO")}</div>
      </div>
      <div className="div-block-9">
        <div className="texttotalemobile">$ {total}</div>
      </div>
    </div>
    </div>
  );
};

export default CartMobileTotal;
