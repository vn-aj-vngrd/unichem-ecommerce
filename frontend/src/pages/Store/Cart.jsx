import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarts, resetCart } from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import CartRow from "../../components/CartRow";
import PricingTable from "../../components/PricingTable";
// import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carts, isCartLoading, isCartError, cartMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    if (!user) {
      navigate("/login");
    }

    if (isCartError) {
      console.log(isCartError);
    }

    dispatch(getCarts());
    return () => {
      dispatch(resetCart());
    };
  }, [user, navigate, isCartError, cartMessage, dispatch]);

  if (isCartLoading) {
    return <Spinner />;
  }

  let count = 0;
  let subtotal = 0;
  let shippingFee = 0;
  let total = 0;

  // console.log(carts);

  if (carts.length > 0) {
    count = carts.length;
    subtotal = 0;
    for (let i = 0; i < count; i++) {
      subtotal +=
        carts[i].product.prices[carts[i]._doc.productType] *
        carts[i]._doc.quantity;
    }
    shippingFee = 50;
    total = subtotal + shippingFee;
  }

  if (isCartLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container"></div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb type="cart" />
      <div className="shopping-cart">
        <div className="container">
          <div className="purchase-row-banner cart-banner">
            <div className="cart-product-right hide-on-thin-screen">
              <div className="product-in-cart color-white hide-on-thin-screen">
                <>Product</>
              </div>
              <div className="quantity-in-cart color-white hide-on-thin-screen">
                Quantity
              </div>
              <div className="price-in-cart color-white hide-on-thin-screen">
                Price
              </div>
              <div className="total-in-cart color-white hide-on-thin-screen">
                Total
              </div>
              <div className="action-in-cart color-white hide-on-thin-screen">
                Action
              </div>
            </div>
          </div>

          <div className="cart-list-head box-shadow"></div>
          {carts.length > 0 ? (
            <>
              {carts.map((cart, index) => (
                <CartRow key={index} cart={cart} />
              ))}
            </>
          ) : (
            <></>
          )}
          <PricingTable
            count={count}
            subtotal={subtotal}
            shippingFee={shippingFee}
            total={total}
          />
        </div>
      </div>
    </>
  );
};

export default Cart;
