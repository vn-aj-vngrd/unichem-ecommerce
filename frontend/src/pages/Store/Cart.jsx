import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarts, deleteCart } from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import PricingTable from "../../components/PricingTable";
import Quantity from "../../components/Quantity";
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

  let count = 0;
  let subtotal = 0;
  let shippingFee = 0;
  let total = 0;

  if (isCartLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container"></div>
      </>
    );
  }

  if (carts.length > 0) {
    count = carts.length;
    subtotal = 0;
    for (let i = 0; i < count; i++) {
      subtotal +=
        carts[i].product.prices[carts[i]._doc.productType] *
        carts[i]._doc.quantity;
    }
    shippingFee = 0.0;
    total = subtotal + shippingFee;
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
                  <input type="checkbox" />
                </div>
                <div className="col-lg-3 col-md-4 col-12">
                  <p>Product</p>
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
                <div className="col-lg-1 col-md-1 col-12">
                  <p>Remove</p>
                </div>
              </div>
            </div>
          </div>
          {carts.length > 0 ? (
            <>
              {carts.map((cart) => (
                <div
                  key={cart._doc._id}
                  className="cart-list-head accordion-bodybox-shadow box-shadow"
                >
                  <div className="cart-single-list">
                    <div className="row align-items-center">
                      <div className="col-lg-1 col-md-1 col-12">
                        <input
                          type="checkbox"
                          // onClick={checkItem}
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
