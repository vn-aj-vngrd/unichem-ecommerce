import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { setOrder, resetOrder } from "../../features/orders/orderSlice.js";
import { resetCart, getCarts } from "../../features/cart/cartSlice.js";
import {
  validateCoupon,
  resetCoupon,
} from "../../features/coupons/couponSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const Checkout = () => {
  let itemSubtotal = 0;

  const {
    register,
    handleSubmit,
    resetField,
    // watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { carts, isCartLoading } = useSelector((state) => state.cart);
  const { isOrderAdded, isOrderError, orderMessage } = useSelector(
    (state) => state.orders
  );
  const {
    coupons,
    couponMessage,
    isCouponSuccess,
    isCouponLoading,
    isCouponError,
  } = useSelector((state) => state.coupons);

  const [payment, setPayment] = useState("");
  const [orderDiscount, setOrderDiscount] = useState({
    value: 0,
    type: "",
    _id: null,
  });
  const [shippingDiscount, setShippingDiscount] = useState({
    value: 0,
    type: "",
    _id: null,
  });

  const [couponlogID, setCouponlogID] = useState([]);

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    resetField("couponCode");
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    if (!localStorage.getItem("token") && !localStorage.getItem("c-cnt") < 1) {
      Swal.fire({
        title: "Failed to Checkout",
        icon: "error",
        text: "You don't have any items in your cart.",
        confirmButtonColor: "#f44336",
      });
      navigate("/cart");
    }

    dispatch(getCarts());

    if (isOrderAdded) {
      Swal.fire({
        title: "Order is Processed",
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
        text: orderMessage,
      });
      navigate("/cart");
    }

    if (isCouponError) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: couponMessage,
      });
    }

    if (isCouponSuccess) {
      Swal.fire({
        title: "Coupon Verified",
        text: coupons.description,
        icon: "success",
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
      });

      if (coupons.couponType === "order-discount") {
        if (!orderDiscount.value) {
          setOrderDiscount({
            value: coupons.discount,
            type: coupons.couponType,
            _id: coupons._id,
          });
          setCouponlogID((prev) => [...prev, coupons._id]);
        } else {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Sorry, you can only use one coupon for the order's subtotal discount per checkout.",
            confirmButtonColor: "#f44336",
          });
        }
      } else if (coupons.couponType === "shipping-discount") {
        if (!shippingDiscount.value) {
          setShippingDiscount({
            value: coupons.discount,
            type: coupons.couponType,
            _id: coupons._id,
          });
          setCouponlogID((prev) => [...prev, coupons._id]);
        } else {
          Swal.fire({
            title: "Coupon is invalid",
            icon: "error",
            text: "Sorry, you can only use one coupon for the order's shipping discount per checkout.",
            confirmButtonColor: "#f44336",
          });
        }
      }
    }

    return () => {
      dispatch(resetOrder());
      dispatch(resetCart());
      dispatch(resetCoupon());
    };
  }, [
    coupons,
    isCouponSuccess,
    orderDiscount,
    shippingDiscount,
    navigate,
    isOrderAdded,
    isOrderError,
    isCouponError,
    orderMessage,
    couponMessage,
    dispatch,
    resetField,
  ]);

  const checked = carts.reduce((count, cart) => {
    if (cart._doc.checked) {
      return count + 1;
    }
    return count;
  }, 0);

  let subtotal = 0;
  let shippingFee = 0;
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

  const orderDiscountAmount = subtotal * (orderDiscount.value / 100);
  // console.log(orderDiscountAmount);

  const shippingDiscountAmount = shippingFee * (shippingDiscount.value / 100);
  // console.log(shippingDiscountAmount);

  const total =
    subtotal.toFixed(2) -
    orderDiscountAmount.toFixed(2) +
    (shippingFee.toFixed(2) - shippingDiscountAmount.toFixed(2));

  const onApply = (data) => {
    if (data.couponCode === "") {
      Swal.fire({
        title: "Coupon is Blank",
        icon: "error",
        text: "Please input a valid coupon.",
        confirmButtonColor: "#f44336",
      });
      return;
    }

    const couponData = {
      couponCode: data.couponCode,
      subtotal,
    };

    dispatch(validateCoupon(couponData));
  };

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

    let orderStatus = "Awaiting Confirmation";

    // const today = moment();

    const statusDates = [
      // 0 - Awaiting Confirmation
      {
        date: "",
        status: "Awaiting confirmation",
        desc: "Please wait for the confirmation of your order.",
      },

      // 1 - Awaiting Payment
      {
        date: "",
        status: "Awaiting Payment",
        desc: "You have completed the checkout process, but payment has yet to be confirmed.",
      },

      // 2 - Awaiting Fulfillment
      {
        date: "",
        status: "Awaiting Fulfillment",
        desc: "You have completed the checkout process and payment has been confirmed.",
      },

      // 3 - Awaiting Shipment
      {
        date: "",
        status: "Awaiting Shipment",
        desc: "Your order has been pulled and packaged and is awaiting collection from a shipping provider.",
      },

      // 4 - Shipped
      {
        date: "",
        status: "Shipped",
        desc: "Your order has been shipped and is on its way to you.",
      },

      // 5 - Awaiting Pickup
      {
        date: "",
        status: "Awaiting Pickup",
        desc: "Your order has been packaged and is awaiting customer pickup from a seller-specified location.",
      },

      // 6 - Completed
      {
        date: "",
        status: "Completed",
        desc: "Your order has been shipped/picked up, and receipt is confirmed.",
      },

      // 7 - Cancelled
      {
        date: "",
        status: "Cancelled",
        desc: "Your order has been cancelled due to the customer's reason.",
      },

      // 8 - Declined
      {
        date: "",
        status: "Declined",
        desc: "Your order has been declined due to a stock inconsistency by the admin.",
      },

      // 9 - Awaiting Return
      {
        date: "",
        status: "Awaiting Return",
        desc: "The return process is on-going. We are waiting for the customer to return the item.",
      },

      // 10 - Returned
      {
        date: "",
        status: "Returned",
        desc: "Your order has been returned and refunded based on the company's policy.",
      },
    ];

    let orderData = {
      order: {
        statusDates: statusDates,
        shippingFee: shippingFee.toFixed(2),
        subtotal: total.toFixed(2),
        totalPrice: total.toFixed(2),
        orderDiscount: orderDiscount.value,
        shippingDiscount: shippingDiscount.value,
        orderStatus: orderStatus,
        paymentMethod: payment,
      },
      orderlines: [],
      couponlogID: couponlogID,
    };

    Swal.fire({
      title: "Confirm your Order",
      text: "Select YES to confirm, otherwise select CANCEL.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (checked > 0 && orders) {
          orders.forEach((order) => {
            let quantities = [...order.product.quantities];
            quantities[order._doc.productType] -= order._doc.quantity;

            const orderlines = {
              cartID: order._doc._id,
              image: order.product.images[0],
              productID: order.product._id,
              productName: order.product.productName,
              productType: order.product.types[order._doc.productType],
              quantity: order._doc.quantity,
              quantities,
              price: order.product.prices[order._doc.productType],
              reviewed: false,
            };
            orderData.orderlines.push(orderlines);
          });

          dispatch(setOrder(orderData));
          // console.log(orderData);
        } else {
          carts.forEach((cart) => {
            let quantities = [...cart.product.quantities];
            quantities[cart._doc.productType] -= cart._doc.quantity;

            const orderlines = {
              cartID: cart._doc._id,
              image: cart.product.images[0],
              productID: cart.product.id,
              productName: cart.product.productName,
              type: cart._doc.productType,
              productType: cart.product.types[cart._doc.productType],
              quantity: cart._doc.quantity,
              quantities: quantities,
              price: cart.product.prices[cart._doc.productType],
              reviewed: false,
            };
            orderData.orderlines.push(orderlines);
          });

          dispatch(setOrder(orderData));
          // console.log(orderData);
        }
      }
    });
  };

  return (
    <>
      <Breadcrumb type="checkout" />
      {isCartLoading || isCouponLoading ? (
        <Spinner />
      ) : (
        <>
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
                                                      src={
                                                        cart.product.images[0]
                                                      }
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
                                                      <em>Category: </em>
                                                      {cart.product.category}
                                                    </span>
                                                    <span>
                                                      <em>Type / Color:</em>
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
                                                    ₱ {""}
                                                    {
                                                      cart.product.prices[
                                                        cart._doc.productType
                                                      ]
                                                    }
                                                  </p>
                                                </div>
                                                <div className="col-lg-2 col-md-2 col-12">
                                                  <div hidden>
                                                    {
                                                      (itemSubtotal =
                                                        cart.product.prices[
                                                          cart._doc.productType
                                                        ] * cart._doc.quantity)
                                                    }
                                                  </div>
                                                  <p className="fw-bolder">
                                                    ₱ {itemSubtotal.toFixed(2)}
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
                                                  <em>Category: </em>
                                                  {cart.product.category}
                                                </span>
                                                <span>
                                                  <em>Type / Color:</em>
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
                                                ₱ {""}
                                                {
                                                  cart.product.prices[
                                                    cart._doc.productType
                                                  ]
                                                }
                                              </p>
                                            </div>

                                            <div className="col-lg-2 col-md-2 col-12">
                                              <div hidden>
                                                {
                                                  (itemSubtotal =
                                                    cart.product.prices[
                                                      cart._doc.productType
                                                    ] * cart._doc.quantity)
                                                }
                                              </div>
                                              <p className="fw-bolder">
                                                ₱ {itemSubtotal.toFixed(2)}
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
                                      {user &&
                                        user.address[user.primaryAddress]
                                          .addressName}
                                    </h6>
                                  </li>
                                  <li>
                                    <p>
                                      <b>Phone:</b>
                                      {user &&
                                        user.address[user.primaryAddress]
                                          .phoneNumber}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <b>Address:</b>
                                      {`${
                                        user &&
                                        user.address[user.primaryAddress]
                                          .address1
                                      } ${
                                        user &&
                                        user.address[user.primaryAddress]
                                          .address2
                                      }`}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      <b>Postal Code:</b>
                                      {user &&
                                        user.address[user.primaryAddress]
                                          .postalCode}
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
                                      value="Cash on Delivery"
                                      onClick={onSelectPayment}
                                    />
                                    <label htmlFor="payment-1">
                                      <p>Cash on Delivery</p>
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
                                      value="In-Store"
                                      onClick={onSelectPayment}
                                    />
                                    <label htmlFor="payment-2">
                                      <p>In-Store Payment</p>
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
                                      value="Bank Transfer"
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
                        <form onSubmit={handleSubmit(onApply)}>
                          <div className="form-input form">
                            <input
                              type="text"
                              placeholder="Coupon Code"
                              {...register("couponCode", {
                                // required: {
                                //   value: true,
                                //   message: "Coupon Code is optional",
                                // },
                                minLength: {
                                  value: 3,
                                  message: "Must be at least 3 characters",
                                },
                              })}
                              style={{
                                border: errors.couponCode
                                  ? "1px solid #f44336"
                                  : "",
                              }}
                            />
                          </div>
                          <div className="button">
                            <button className="btn-coupon">apply</button>
                          </div>
                        </form>
                      </div>
                      {errors.couponCode && (
                        <p className="error-message">
                          ⚠ {errors.couponCode.message}
                        </p>
                      )}
                    </div>

                    <div className="checkout-sidebar-price-table mt-3">
                      <h5 className="heading">Cart Summary</h5>
                      <h5 className="title"> </h5>
                      <div className="sub-total-price">
                        {checked > 0 ? (
                          <>
                            {carts.map(
                              (cart) =>
                                cart._doc.checked && (
                                  <div
                                    key={cart._doc._id}
                                    className="total-price"
                                  >
                                    <p className="value">
                                      {cart.product.productName}
                                    </p>
                                    <div hidden>
                                      {
                                        (itemSubtotal =
                                          cart.product.prices[
                                            cart._doc.productType
                                          ] * cart._doc.quantity)
                                      }
                                    </div>
                                    <p className="price">
                                      ₱ {itemSubtotal.toFixed(2)}
                                    </p>
                                  </div>
                                )
                            )}
                          </>
                        ) : (
                          <>
                            <>
                              {carts.map((cart) => (
                                <div
                                  key={cart._doc._id}
                                  className="total-price"
                                >
                                  <p className="value">
                                    {cart.product.productName}
                                  </p>
                                  <div hidden>
                                    {
                                      (itemSubtotal =
                                        cart.product.prices[
                                          cart._doc.productType
                                        ] * cart._doc.quantity)
                                    }
                                  </div>
                                  <p className="price">
                                    ₱ {itemSubtotal.toFixed(2)}
                                  </p>
                                </div>
                              ))}
                            </>
                          </>
                        )}
                      </div>
                      <h5 className="title"> </h5>
                      <div className="sub-total-price">
                        <div className="total-price">
                          <p className="value">Order Discount:</p>
                          <p className="price">
                            - ₱ {orderDiscountAmount.toFixed(2)} (
                            {orderDiscount.value}%)
                          </p>
                        </div>
                      </div>

                      <div className="sub-total-price">
                        <div className="total-price">
                          <p className="value">Shipping Discount:</p>
                          <p className="price">
                            - ₱ {shippingDiscountAmount.toFixed(2)} (
                            {shippingDiscount.value}%)
                          </p>
                        </div>
                      </div>

                      <h5 className="title"> </h5>
                      <div className="sub-total-price">
                        <div className="total-price">
                          <p className="value">Subtotal:</p>
                          <p className="price">₱ {subtotal.toFixed(2)}</p>
                        </div>
                      </div>

                      <div className="sub-total-price">
                        <div className="total-price">
                          <p className="value">Shipping Fee:</p>
                          <p className="price">₱ {shippingFee.toFixed(2)}</p>
                        </div>
                      </div>

                      <h5 className="title"> </h5>
                      <div className="sub-total-price">
                        <div className="total-price">
                          <p className="value fw-bolder">Order Total:</p>
                          <p className="price fw-bolder">
                            ₱ {total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <h5 className="title"> </h5>
                      <p align="justify">
                        Note: Please take note that a shipping fee is added
                        after the confirmation of your order.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Checkout;
