import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCarts, resetCart } from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import CartRow from "../../components/CartRow";

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
      console.log(cartMessage);
    }

    dispatch(getCarts());
    return () => {
      dispatch(resetCart());
    };
  }, [user, navigate, isCartError, cartMessage, dispatch]);

  if (isCartLoading) {
    return <Spinner />;
  }

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
            <div className="cart-product-right">
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

          <div className="row">
            <div className="col-12">
              <div className="total-amount">
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-12"></div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="right">
                      <h5 className="heading">Pricing Table</h5>
                      <hr></hr>
                      <ul>
                        <li>
                          Total Items
                          <span>
                            <p className="fw-bold">69 Items</p>
                          </span>
                        </li>
                        <li>
                          Cart Subtotal
                          <span>
                            <p className="fw-bold">₱2000.00</p>
                          </span>
                        </li>
                        <li>
                          Shipping Fee
                          <span>
                            <p className="fw-bold">Free</p>
                          </span>
                        </li>
                      </ul>
                      <hr></hr>
                      <div>
                        <label className="form-label">Discount Coupon</label>
                        <input className="form-control" type="text"></input>
                      </div>
                    </div>

                    <div className="no-box-shadow">
                      <div className="order-total-row">
                        <div className="price d-flex justify-content-between align-items-center">
                          <div>Order Total:</div>
                          <div className="spacer"></div>
                          <h5 className="text-danger">$199.00</h5>
                        </div>

                        <div className="button mt-4">
                          <Link to="/checkout" className="btn checkout-btn">
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
