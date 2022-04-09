import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { resetCart } from "../../features/cart/cartSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { carts, isCartError, isCartSuccess, cartMessage } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    if (!user) {
      navigate("/");
    }

    return () => {
      // dispatch(resetCart());
    };
  }, [user, navigate, dispatch]);

  const subtotal = carts.reduce((sum, cart) => {
    if (cart._doc.checked && cart.product.quantities[cart._doc.productType]) {
      return (
        sum + cart._doc.quantity * cart.product.prices[cart._doc.productType]
      );
    }
    return sum;
  }, 0);

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  return (
    <>
      <Breadcrumb type="checkout" />
      <section className="checkout-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="checkout-steps-form-style">
                <ul id="accordionExample">
                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseProduct"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Ordered Products
                    </div>
                    <section
                      className="collapse show"
                      id="collapseProduct"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div>
                          <>
                            {carts.map((cart) => (
                              <div
                                key={cart._doc._id}
                                className="cart-list-head accordion-bodybox-shadow"
                              >
                                <div className="cart-single-list">
                                  <div className="row align-items-center">
                                    <div className="col-lg-2 col-md-2 col-12">
                                      <Link
                                        to={`/product-details/${cart.product._id}`}
                                      >
                                        <img
                                          src={cart.product.images[0]}
                                          alt=""
                                        />
                                      </Link>
                                    </div>
                                    <div className="col-lg-4 col-md-4 col-12">
                                      <h5>
                                        <Link
                                          to={`/product-details/${cart.product._id}`}
                                        >
                                          {cart.product.productName}
                                        </Link>
                                      </h5>
                                      <p className="product-des">
                                        <span>
                                          <em>Category: </em>{" "}
                                          {cart.product.category}
                                        </span>
                                        <span>
                                          <em>Type / Color:</em>{" "}
                                          {
                                            cart.product.types[
                                              cart._doc.productType
                                            ]
                                          }
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                      <p>x{cart._doc.quantity}</p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                      <p>
                                        ₱{" "}
                                        {
                                          cart.product.prices[
                                            cart._doc.productType
                                          ]
                                        }
                                      </p>
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-12">
                                      <p className="fw-bolder">
                                        ₱{" "}
                                        {Math.round(
                                          cart.product.prices[
                                            cart._doc.productType
                                          ] *
                                            cart._doc.quantity *
                                            100
                                        ) / 100}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </>
                        </div>
                      </div>
                    </section>
                  </li>

                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseAddress"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Payment Address
                    </div>
                    <section
                      className="profile-address-section collapse"
                      id="collapseAddress"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="addresses">
                          <div className="profile-address">
                            <ul className="">
                              <li className="address-header">
                                <h6>
                                  {
                                    user.address[user.primaryAddress]
                                      .addressName
                                  }
                                </h6>
                              </li>
                              <li>
                                <p>
                                  <b>Phone:</b>{" "}
                                  {
                                    user.address[user.primaryAddress]
                                      .phoneNumber
                                  }
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Address:</b>{" "}
                                  {`${
                                    user.address[user.primaryAddress].address1
                                  } ${
                                    user.address[user.primaryAddress].address2
                                  }`}
                                </p>
                              </li>
                              <li>
                                <p>
                                  <b>Postal Code:</b>{" "}
                                  {user.address[user.primaryAddress].postalCode}
                                </p>
                              </li>
                              <br></br>
                              <li className="address-options button">
                                <button
                                  to="/checkout"
                                  // onClick={() => onSubmitDefault(index)}
                                  className="btn set-default-btn"
                                >
                                  Change Address
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  </li>
                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Payment Method
                    </div>
                    <section
                      className="checkout-steps-form-content collapse"
                      id="collapseTwo"
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="checkout-payment-option">
                            <h6 className="heading-6 font-weight-400 payment-title">
                              Select Delivery Option
                            </h6>
                            <div className="payment-option-wrapper">
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-1"
                                />
                                <label htmlFor="payment-1">
                                  <p>Standard payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-2"
                                />
                                <label htmlFor="payment-2">
                                  <p>Standard payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-3"
                                />
                                <label htmlFor="payment-3">
                                  <p>Standard payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-4"
                                />
                                <label htmlFor="payment-4">
                                  <p>Standard payment</p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="checkout-sidebar">
                <div className="checkout-sidebar-coupon">
                  <p>Apply valid coupon here</p>
                  <form action="#">
                    <div className="single-form form-default">
                      <div className="form-input form">
                        <input type="text" placeholder="Coupon Code" />
                      </div>
                      <div className="button">
                        <button className="btn">apply</button>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="checkout-sidebar-price-table mt-3">
                  <h5 className="title">Order Summary</h5>
                  <div className="sub-total-price">
                    {carts.map((cart) => (
                      <div key={cart._doc._id} className="total-price">
                        {" "}
                        <p className="value">{cart.product.productName}</p>
                        <p className="price">
                          {" "}
                          ₱{" "}
                          {Math.round(
                            cart.product.prices[cart._doc.productType] *
                              cart._doc.quantity *
                              100
                          ) / 100}
                        </p>
                      </div>
                    ))}
                  </div>

                  <h5 className="title"> </h5>
                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value">Subtotal:</p>
                      <p className="price">₱ {subtotal}</p>
                    </div>
                  </div>

                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value">Shipping Fee:</p>
                      <p className="price">₱ {shippingFee}</p>
                    </div>
                  </div>

                  <h5 className="title"> </h5>
                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value">Order Total:</p>
                      <p className="price">₱ {total}</p>
                    </div>
                  </div>

                  <div className="price-table-btn button">
                    <button className="btn">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
