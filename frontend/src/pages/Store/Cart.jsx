import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarts } from "../../features/cart/cartSlice";
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
      // console.log(isCartError);
    }

    dispatch(getCarts());
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
          <div className="cart-list-head">
            <div className="cart-list-title purchase-row-banner">
              <div className="row">
                <div className="col-lg-1 col-md-1 col-12"></div>
                <div className="col-lg-4 col-md-3 col-12">
                  <p>Product Name</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Quantity</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Subtotal</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Total</p>
                </div>
                <div className="col-lg-1 col-md-2 col-12">
                  <p>Remove</p>
                </div>
              </div>
            </div>
          </div>
          {carts.length > 0 ? (
            <>
              {carts.map((cart, index) => (
                <CartRow key={index} cart={cart} />
              ))}
            </>
          ) : (
            <>
              <div className="cart-list-head box-shadow">
                <div className="cart-single-list">
                  <div className="d-flex single-cart-product">
                    <div className="d-flex align-items-center cart-product-left">
                      There are no items in the cart.
                    </div>
                  </div>
                </div>
              </div>
            </>
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
