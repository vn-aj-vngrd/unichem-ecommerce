import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarts,
  updateCart,
  deleteCart,
  resetCart,
} from "../../features/cart/cartSlice";
import {
  setWishlist,
  resetWishlist,
} from "../../features/wishlist/wishlistSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import CartSummary from "../../components/CartSummary";
import Quantity from "../../components/Quantity";
import Swal from "sweetalert2";
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

    return () => {
      dispatch(resetWishlist());
      dispatch(resetCart());
    };
  }, [user, navigate, isCartError, cartMessage, dispatch]);

  // const checkoutItems = carts.filter(
  //   (cart) =>
  //     cart._doc.checked > 0 && cart.product.quantities[cart._doc.productType]
  // );
  // console.log(checkoutItems);

  const cartCount = carts.reduce((count, cart) => {
    if (cart.product.quantities[cart._doc.productType] > 0) {
      return count + 1;
    }
    return count;
  }, 0);

  let checkoutCount = 0;
  const subtotal = carts.reduce((sum, cart) => {
    if (cart._doc.checked && cart.product.quantities[cart._doc.productType]) {
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
    checkoutCount === cartCount && checkoutCount !== 0 ? true : false;

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

  const addToWishlist = (id, type) => {
    const wishlistData = {
      productID: id,
      productType: type,
    };
    dispatch(setWishlist(wishlistData));
    Swal.fire({
      title: "Item was added to your wishlist.",
      text: "To view your wishlist, please proceed to the wishlist page.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "<Link to='/cart'>Go to Wishlist</Link>",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) navigate("/wishlist");
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
                    className="me-1"
                    value={carts}
                    checked={selectAll}
                    readOnly
                    onClick={() => checkAll(carts)}
                  />
                </div>
                <div className="col-lg-2 col-md-3 col-12">
                  <p>Product</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Quantity</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Price</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <>Subtotal</>
                </div>
                <div className="col-lg-1 col-md-1 col-12">
                  <p></p>
                </div>
                <div className="col-lg-1 col-md-1 col-12">
                  <p></p>
                </div>
              </div>
            </div>
          </div>
          {carts.length > 0 ? (
            <>
              {carts.map((cart, index) =>
                cart.product.quantities[cart._doc.productType] > 0 ? (
                  <div
                    key={cart._doc._id}
                    className="cart-list-head accordion-body"
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
                        <div className="col-lg-1 col-md-1 col-12">
                          <Link to={`/product-details/${cart.product._id}`}>
                            <img src={cart.product.images[0]} alt="" />
                          </Link>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <h5>
                            <Link to={`/product-details/${cart.product._id}`}>
                              {cart.product.productName}
                            </Link>
                          </h5>
                          <p className="product-des">
                            <span>
                              <em>Category: </em> {cart.product.category}
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
                            type="cart"
                          />
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <p>₱ {cart.product.prices[cart._doc.productType]}</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <p className="fw-bolder">
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
                            className="add-item"
                            onClick={() =>
                              addToWishlist(
                                cart._doc.productID,
                                cart._doc.productType
                              )
                            }
                          >
                            <i className="lni lni-heart"></i>
                          </button>
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
                ) : (
                  <div
                    key={cart._doc._id}
                    className="cart-list-head accordion-body"
                  >
                    <div className="cart-single-list">
                      <div className="row align-items-center">
                        <div className="col-lg-1 col-md-1 col-12">
                          <input type="checkbox" checked={false} readOnly />
                        </div>
                        <div className="col-lg-1 col-md-1 col-12">
                          <Link to={`/product-details/${cart.product._id}`}>
                            <img src={cart.product.images[0]} alt="" />
                          </Link>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <h5>
                            <Link to={`/product-details/${cart.product._id}`}>
                              {cart.product.productName}
                            </Link>
                          </h5>
                          <p className="product-des">
                            <span>
                              <em>Category: </em> {cart.product.category}
                            </span>
                            <span>
                              <em>Type / Color:</em>{" "}
                              {cart.product.types[cart._doc.productType]}
                            </span>
                          </p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12 text-center text-red">
                          <Quantity
                            cartID={cart._doc._id}
                            max={cart.product.quantities[cart._doc.productType]}
                            quantity="0"
                          />
                          <small>Product is unavailable</small>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <p>₱ {cart.product.prices[cart._doc.productType]}</p>
                        </div>
                        <div className="col-lg-2 col-md-2 col-12">
                          <p className="fw-bolder">
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
                            className="add-item"
                            onClick={() => dispatch(addToWishlist(cart))}
                          >
                            <i className="lni lni-heart"></i>
                          </button>
                        </div>
                        <div className="col-lg-1 col-md-1 col-12">
                          <button
                            className="remove-item"
                            onClick={() =>
                              addToWishlist(
                                cart._doc.productID,
                                cart._doc.productType
                              )
                            }
                          >
                            <i className="lni lni-close"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </>
          ) : (
            <>
              <div className="cart-list-head">
                <div className="cart-add-padding">
                  <div className="text-center">
                    There are no items in your cart.
                  </div>
                  <div className="mt-3 text-center">
                    <div className="button">
                      <Link to="/" className="btn">
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
          <CartSummary
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
