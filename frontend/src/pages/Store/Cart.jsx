import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarts, resetCart } from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import CartRow from "../../components/CartRow";
import PricingTable from "../../components/PricingTable";
import { toast } from "react-toastify";

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
      toast.error(cartMessage, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    dispatch(getCarts());
    return () => {
      dispatch(resetCart());
    };
  }, [user, navigate, isCartError, cartMessage, dispatch]);

  if (isCartLoading) {
    return <Spinner />;
  }

  const count = carts.length;
  let subtotal = 0;
  for (let i = 0; i < count; i++) {
    subtotal +=
      carts[i].product.prices[carts[i]._doc.productType] *
      carts[i]._doc.quantity;
  }
  const shippingFee = 50;
  const total = subtotal + shippingFee;

  return (
    <>
      <Breadcrumb type="cart" />
      <div className="shopping-cart">
        <div className="container">
          <div className="purchase-row-banner cart-banner">
            <div className="d-flex cart-product-left">
              <div className="include-in-cart color-white">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                ></input>
              </div>
              <div className="image-in-cart color-white hide-on-thin-screen"></div>
            </div>
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
