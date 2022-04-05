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
          <div class="cart-list-head">
            <div class="cart-list-title purchase-row-banner">
              <div class="row">
                <div class="col-lg-1 col-md-1 col-12"></div>
                <div class="col-lg-4 col-md-3 col-12">
                  <p>Product Name</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                  <p>Quantity</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                  <p>Subtotal</p>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                  <p>Discount</p>
                </div>
                <div class="col-lg-1 col-md-2 col-12">
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
                      There no items in the cart.
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
