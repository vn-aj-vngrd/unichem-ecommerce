import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setOrder, resetOrder } from "../../features/orders/orderSlice.js";
import { resetCart, getCarts } from "../../features/cart/cartSlice.js";
import {
  validateCoupon,
  resetCoupon,
} from "../../features/coupons/couponSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import Swal from "sweetalert2";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carts } = useSelector((state) => state.cart);
  const { isOrderAdded, isOrderError } = useSelector((state) => state.orders);
  const { coupons, couponError, isCouponSuccess } = useSelector(
    (state) => state.coupons
  );

  const [payment, setPayment] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const onChange = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    if (!user) {
      navigate("/");
    }

    dispatch(getCarts());

    if (isOrderAdded) {
      Swal.fire({
        title: "Order is being processed",
        text: "Please wait for the confirmation of your order.",
        icon: "success",
        confirmButtonColor: "#f44336",
      });
      navigate("/cart");
    }

    if (isOrderError) {
      Swal.fire({
        title: "Failed to Checkout",
        icon: "error",
        text: "There is a problem with your order process, please try again",
      });
      navigate("/cart");
    }

    if (couponError.length > 0) {
      switch (couponError) {
        case "notFound": {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Please input a valid coupon",
            confirmButtonColor: "#f44336",
          });
          break;
        }
        case "requiredAmountError": {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Sorry, coupon requirement does not meet your order amount.",
            confirmButtonColor: "#f44336",
          });
          break;
        }
        case "expired": {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Coupon has expired",
            confirmButtonColor: "#f44336",
          });
          break;
        }
        case "existingCoupon": {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Sorry, you already use this coupon.",
            confirmButtonColor: "#f44336",
          });
          break;
        }
        case "limitError": {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Sorry, the coupon has already exceeded the limit of use.",
            confirmButtonColor: "#f44336",
          });
          break;
        }
        default: {
          break;
        }
      }
    }

    if (isCouponSuccess) {
      console.log(coupons);
      Swal.fire({
        title: "Coupon is Verified",
        text: coupons.description,
        icon: "success",
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
      });
      setDiscount(coupons.discount);
    }

    return () => {
      dispatch(resetOrder());
      dispatch(resetCart());
      dispatch(resetCoupon());
    };
  }, [
    user,
    coupons,
    isCouponSuccess,
    navigate,
    isOrderAdded,
    isOrderError,
    couponError,
    dispatch,
  ]);

  if (localStorage.getItem("cartCount") < 1) {
    Swal.fire({
      title: "Cannot Checkout",
      icon: "error",
      text: "You don't have any items in your cart.",
    });
    navigate("/cart");
  }

  const checked = carts.reduce((count, cart) => {
    if (cart._doc.checked) {
      return count + 1;
    }
    return count;
  }, 0);

  let subtotal = 0;
  let orders = [];

  if (checked > 0) {
    subtotal = carts.reduce((sum, cart) => {
      if (
        cart._doc.checked &&
        cart.product.quantities[cart._doc.productType] > 0
      ) {
        return (
          sum + cart._doc.quantity * cart.product.prices[cart._doc.productType]
        );
      }
      return sum;
    }, 0);

    orders = carts.filter((cart) => {
      return cart._doc.checked === true;
    });
  }

  subtotal = carts.reduce((sum, cart) => {
    if (cart.product.quantities[cart._doc.productType] > 0) {
      return (
        sum + cart._doc.quantity * cart.product.prices[cart._doc.productType]
      );
    }
    return sum;
  }, 0);

  const shippingFee = 0;
  const total = subtotal + shippingFee;

  if (discount > 0) {
    subtotal -= (subtotal * discount) / 100;
  }

  const onSelectPayment = (e) => {
    setPayment(e.target.value);
  };

  const onCheckout = () => {
    if (payment === "") {
      Swal.fire({
        title: "Failed to Checkout",
        icon: "error",
        text: "Please select a payment method.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (subtotal === 0) {
      Swal.fire({
        title: "Failed to Checkout",
        icon: "error",
        text: "Please add an available item to your cart.",
      });

      navigate("/cart");
      return;
    }

    let orderData = {
      order: {
        shippingDate: new Date(new Date().setDate(new Date().getDate() + 5)),
        receivedDate: new Date(new Date().setDate(new Date().getDate() + 20)),
        shippingFee: shippingFee,
        discount: discount,
        totalPrice: total,
        orderStatus: "Pending",
        paymentMethod: payment,
      },
      orderline: [],
    };

    Swal.fire({
      title: "Are you sure to checkout?",
      text: "Select YES to proceed, otherwise select CANCEL.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (checked > 0 && orders) {
          orders.forEach((order) => {
            const orderline = {
              cartID: order._doc._id,
              image: order.product.images[0],
              productID: order.product._id,
              productName: order.product.productName,
              productType: order.product.types[order._doc.productType],
              quantity: order._doc.quantity,
              price: order.product.prices[order._doc.productType],
              reviewed: false,
            };
            orderData.orderline.push(orderline);
          });

          dispatch(setOrder(orderData));

          return;
        }

        carts.forEach((cart) => {
          const orderline = {
            cartID: cart._doc._id,
            image: cart.product.images[0],
            productID: cart.product.id,
            productName: cart.product.productName,
            productType: cart.product.productType[cart._doc.productType],
            quantity: cart._doc.quantity,
            price: cart.product.prices[cart._doc.productType],
            reviewed: false,
          };
          orderData.orderline.push(orderline);
        });

        dispatch(setOrder(orderData));
      }
    });
  };

  const onApply = () => {
    if (couponCode === "") {
      toast.error(`Please input a valid coupon.`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const couponData = {
      couponCode,
      subtotal,
    };

    dispatch(validateCoupon(couponData));
  };

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
                      className="title"
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
                            {checked > 0 ? (
                              <>
                                {carts.map(
                                  (cart) =>
                                    cart._doc.checked && (
                                      <div
                                        key={cart._doc._id}
                                        className="cart-list-head accordion-body"
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
                                    )
                                )}
                              </>
                            ) : (
                              <>
                                {carts.map((cart) => (
                                  <div
                                    key={cart._doc._id}
                                    className="cart-list-head accordion-body"
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
                            )}
                          </>
                          <div className="cart-list-head accordion-body">
                            <div className="cart-single-list">
                              <div className="col-md-12 align-items-right">
                                <div className="steps-form-btn-no-margin button">
                                  <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapseAddress"
                                    aria-expanded="false"
                                    aria-controls="collapsePayment"
                                  >
                                    next step
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
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
                      aria-labelledby="headingTwo"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="addresses">
                          <div className="profile-address">
                            <ul>
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

                              <div className="col-md-12">
                                <div className="steps-form-btn button">
                                  <Link
                                    to="/account/address"
                                    className="btn btn-alt me-2"
                                  >
                                    Change Address
                                  </Link>

                                  <button
                                    className="btn"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#collapsePayment"
                                    aria-expanded="false"
                                    aria-controls="collapsePayment"
                                  >
                                    next step
                                  </button>
                                </div>
                              </div>
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
                      data-bs-target="#collapsePayment"
                      aria-expanded="false"
                      aria-controls="collapsThree"
                    >
                      Payment Method
                    </div>
                    <section
                      className="checkout-steps-form-content collapse"
                      id="collapsePayment"
                      aria-labelledby="headingThree"
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
                                  value="cod"
                                  onClick={onSelectPayment}
                                />
                                <label htmlFor="payment-1">
                                  <p>COD</p>
                                  <div className="single-payment-option-check">
                                    <i className="lni lni-checkmark"></i>
                                  </div>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-2"
                                  value="in-store"
                                  onClick={onSelectPayment}
                                />
                                <label htmlFor="payment-2">
                                  <p>In Store</p>
                                  <div className="single-payment-option-check">
                                    <i className="lni lni-checkmark"></i>
                                  </div>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-3"
                                  value="bank-transfer"
                                  onClick={onSelectPayment}
                                />
                                <label htmlFor="payment-3">
                                  <p>Bank Transfer</p>
                                  <div className="single-payment-option-check">
                                    <i className="lni lni-checkmark"></i>
                                  </div>
                                </label>
                              </div>
                              <div className="single-payment-option single-payment-option-disabled">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-4"
                                  disabled
                                />
                                <label htmlFor="payment-4">
                                  <p>Not Available</p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="steps-form-btn button">
                          <button className="btn" onClick={onCheckout}>
                            checkout
                          </button>
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
                  <div className="single-form form-default">
                    <div className="form-input form">
                      <input
                        type="text"
                        placeholder="Coupon"
                        value={couponCode}
                        onChange={onChange}
                      />
                    </div>
                    <div className="button">
                      <button className="btn" onClick={onApply}>
                        apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="checkout-sidebar-price-table mt-3">
                  <h5 className="title">Order Summary</h5>
                  <div className="sub-total-price">
                    {checked > 0 ? (
                      <>
                        {carts.map(
                          (cart) =>
                            cart._doc.checked && (
                              <div key={cart._doc._id} className="total-price">
                                {" "}
                                <p className="value">
                                  {cart.product.productName}
                                </p>
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
                            )
                        )}{" "}
                      </>
                    ) : (
                      <>
                        {" "}
                        <>
                          {carts.map((cart) => (
                            <div key={cart._doc._id} className="total-price">
                              {" "}
                              <p className="value">
                                {cart.product.productName}
                              </p>
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
                          ))}{" "}
                        </>
                      </>
                    )}
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

                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value">Discount:</p>
                      <p className="price">₱ {discount}</p>
                    </div>
                  </div>

                  <h5 className="title"> </h5>
                  <div className="sub-total-price">
                    <div className="total-price">
                      <p className="value fw-bolder">Order Total:</p>
                      <p className="price fw-bolder">₱ {total}</p>
                    </div>
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
