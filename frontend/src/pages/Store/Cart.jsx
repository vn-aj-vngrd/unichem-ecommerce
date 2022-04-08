import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarts,
  updateCart,
  deleteCart,
} from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import PricingTable from "../../components/PricingTable";
import Quantity from "../../components/Quantity";
// import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { carts, isCartLoading, isCartError, cartMessage } = useSelector(
    (state) => state.cart
  );
  const { user } = useSelector((state) => state.auth);
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

  const [checkoutItems, setCheckout] = useState([]);
  const cartCount = localStorage.getItem("cartCount");

  let checkoutCount = 0;
  const subtotal = carts.reduce((sum, cart) => {
    if (cart._doc.checked) {
      checkoutCount++;
      return (
        sum + cart._doc.quantity * cart.product.prices[cart._doc.productType]
      );
    }
    return sum;
  }, 0);

  const shippingFee = 0; //Initial Value
  const total = shippingFee + subtotal;

  const selectAll =
    checkoutCount === parseInt(localStorage.getItem("cartCount")) &&
    checkoutCount !== 0
      ? true
      : false;

  const checkOne = (cart) => {
    const cartParams = {
      checked: !cart._doc.checked,
      id: cart._doc._id,
    };
    dispatch(updateCart(cartParams));
  };

  const checkAll = (carts) => {
    carts.forEach((cart) => {
      const cartParams = {
        checked: !selectAll,
        id: cart._doc._id,
      };
      dispatch(updateCart(cartParams));
    });
  };

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
                <div className="col-lg-2 col-md-1 col-12">
                  <input
                    id="main"
                    type="checkbox"
                    value={carts}
                    checked={selectAll}
                    readOnly
                    onClick={() => checkAll(carts)}
                  />
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <p>Product</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Quantity</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Price</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Subtotal</p>
                </div>
                <div className="col-lg-1 col-md-1 col-12">
                  <p>Remove</p>
                </div>
              </div>
            </div>
          </div>
          {carts.length > 0 ? (
            <>
              {carts.map((cart, index) => (
                <div
                  key={cart._doc._id}
                  className="cart-list-head accordion-bodybox-shadow box-shadow"
                >
                  <div className="cart-single-list">
                    <div className="row align-items-center">
                      <div className="col-lg-1 col-md-1 col-12">
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={cart}
                          value={cart}
                          checked={cart._doc.checked}
                          readOnly
                          onClick={() => checkOne(cart)}
                        />
                      </div>
                      <div className="col-lg-1 col-md-2 col-12">
                        <Link to="/products">
                          <img src={cart.product.images[0]} alt="" />
                        </Link>
                      </div>
                      <div className="col-lg-3 col-md-2 col-12">
                        <h5 className="">
                          <Link to={`/product-details/${cart.product._id}`}>
                            {cart.product.productName}
                          </Link>
                        </h5>
                        <p className="product-des">
                          <span>
                            <em>
                              <i className="lni lni-package category-icon"></i>
                              Category:{" "}
                            </em>{" "}
                            {cart.product.category}
                          </span>
                          <span>
                            <em>Type / Color:</em>{" "}
                            {cart.product.types[cart._doc.productType]}
                          </span>
                        </p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                        <Quantity
                          cartID={cart._doc._id}
                          max={cart.product.quantities[cart._doc.productType]}
                          quantity={cart._doc.quantity}
                        />
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                        <p>₱ {cart.product.prices[cart._doc.productType]}</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-12">
                        <p>
                          ₱
                          {Math.round(
                            cart.product.prices[cart._doc.productType] *
                              cart._doc.quantity *
                              100
                          ) / 100}
                        </p>
                      </div>
                      <div className="col-lg-1 col-md-1 col-12">
                        <button
                          className="remove-item"
                          onClick={() => dispatch(deleteCart(cart._doc._id))}
                        >
                          <i className="lni lni-close"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
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
            carts={carts}
            checkoutCount={checkoutCount}
            cartCount={cartCount}
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
