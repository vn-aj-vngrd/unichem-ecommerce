import { useState, useEffect } from "react";
import { setCart, resetCart } from "../features/cart/cartSlice";
import { setWishlist, resetWishlist } from "../features/wishlist/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper";

import { Autoplay, Pagination } from "swiper";
import Star from "./Star";

const Details = ({ product }) => {
  let [value, setValue] = useState(0);
  let [counter, setCounter] = useState(1);
  let decrement, increment;
  if (counter > 1) decrement = () => setCounter(counter - 1);
  if (counter < product._doc.quantities[value])
    increment = () => setCounter(counter + 1);
  let handleChange = (e) => {
    setCounter(e.target.value);

    if (e.target.value > product._doc.quantities[value]) {
      setCounter(product._doc.quantities[value]);
    }
    if (e.target.value < 0) {
      setCounter(1);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isCartLoading, isCartError, isCartAdded, cartMessage } = useSelector(
    (state) => state.cart
  );

  const { user } = useSelector((state) => state.auth);

  const {
    isWishlistLoading,
    isWishlistError,
    isWishlistAdded,
    wishlistMessage,
  } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (isCartError) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: cartMessage,
      });
    }

    if (isWishlistError) {
      Swal.fire({
        title: "Failed",
        icon: "error",
        text: wishlistMessage,
        confirmButtonColor: "#f44336",
      });
    }

    if (isWishlistAdded) {
      Swal.fire({
        title: "Added to Wishlist",
        text: "Item is added to your wishlist.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
        confirmButtonText: "<Link to='/wishlist'>Go to Wishlist</Link>",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) navigate("/wishlist");
      });
    }

    if (isCartAdded) {
      Swal.fire({
        title: "Added to Cart",
        text: "Item is added to your cart.",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
        confirmButtonText: "<Link to='/cart'>Go to Cart</Link>",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) navigate("/cart");
      });
    }

    return () => {
      dispatch(resetCart());
      dispatch(resetWishlist());
    };
  }, [
    isCartError,
    cartMessage,
    isCartAdded,
    isWishlistError,
    isWishlistAdded,
    wishlistMessage,
    navigate,
    dispatch,
  ]);

  const changeType = (e) => {
    setValue(e.currentTarget.value);
    setCounter((counter = 1));
  };

  const addToCart = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Can't add to cart",
        text: "Please log in to continue.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
        confirmButtonText: "<Link to='/login'>Login</Link>",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) navigate("/cart");
      });
      return;
    }

    if (counter <= 0) {
      Swal.fire({
        title: "Invalid Quantity",
        text: "Please enter a valid quantity.",
        icon: "error",
      });
      return;
    }

    if (String(counter)[0] === "0") {
      const temp = String(counter).slice(1);
      counter = parseInt(temp);
    }

    const cartData = {
      productID: product._doc._id,
      productType: value,
      quantity: counter,
      max: product._doc.quantities[value],
    };

    dispatch(setCart(cartData));
  };

  const addToWishlist = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Can't add to wishlist",
        text: "Please log in to continue.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#424242",
        confirmButtonText: "<Link to='/login'>Login</Link>",
        cancelButtonText: "Close",
      }).then((result) => {
        if (result.isConfirmed) navigate("/cart");
      });
      return;
    }

    const wishlistData = {
      productID: product._doc._id,
      productType: value,
    };

    dispatch(setWishlist(wishlistData));
  };

  let salesPrice = 0;

  return (
    <>
      <div className="item-details">
        {isCartLoading || isWishlistLoading ? (
          <>
            <Spinner />
          </>
        ) : (
          <>
            {" "}
            <div className="container">
              <div className="top-area">
                <div className="row align-items-center">
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-images">
                      <main id="gallery">
                        <div className="main-img">
                          <Swiper
                            spaceBetween={30}
                            centeredSlides={true}
                            navigation={true}
                            autoplay={{
                              delay: 5500,
                              disableOnInteraction: false,
                            }}
                            pagination={{
                              clickable: true,
                            }}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                          >
                            {product._doc.images.map((image, index) => (
                              <SwiperSlide key={index}>
                                <div className="single-slider"></div>
                                <img src={image} id="current" alt="#" />
                              </SwiperSlide>
                            ))}
                          </Swiper>
                        </div>
                      </main>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-12">
                    <div className="product-info">
                      <h4 className="title">{product._doc.productName}</h4>

                      <div className="category">
                        <div>
                          <i className="lni lni-package"></i>Category:
                          <Link
                            to={`/products/category/${product._doc.category}`}
                          >
                            {product._doc.category}
                          </Link>
                        </div>
                        <div className="mt-1">
                          <i className="lni lni-delivery"></i>Sold:{" "}
                          {product.market.sold}
                        </div>
                        <Star
                          star={product.market.averageRatings}
                          reviews={product.market.reviewsCount}
                        />
                      </div>

                      {product._doc.quantities[value] === 1 && (
                        <div>{product._doc.quantities[value]} item left</div>
                      )}

                      {product._doc.quantities[value] > 1 && (
                        <div>
                          {product._doc.quantities[value]} items available
                        </div>
                      )}

                      {product._doc.quantities[value] === 0 && (
                        <div>Item is not available</div>
                      )}

                      <div hidden>
                        {
                          (salesPrice =
                            product._doc.prices[value] -
                            (product._doc.prices[value] *
                              product._doc.salePercent) /
                              100)
                        }
                      </div>

                      {product._doc.isSale ? (
                        <h4 className="text-red">
                          ₱ {salesPrice.toFixed(2)}
                          <del className="h6 text-grey ps-1">
                            ₱{product._doc.prices[value] && product._doc.prices[value].toFixed(2)}
                          </del>
                        </h4>
                      ) : (
                        <h4 className="text-red">
                          ₱{product._doc.prices[value] && product._doc.prices[value].toFixed(2)}
                        </h4>
                      )}

                      <hr className="mt-3" />

                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label>Color / Type</label>
                            <select
                              className="form-control text-grey"
                              value={value}
                              onChange={changeType}
                            >
                              {product._doc.types.map((type, index) => (
                                <option key={index} value={index}>
                                  {type}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col">
                          <div className="form-group">
                            {product._doc.quantities[value] !== 0 ? (
                              <div>
                                <label>Quantity</label>
                                <div className="quantity-control text-center">
                                  <button
                                    className="quantity-btn"
                                    onClick={decrement}
                                  >
                                    <svg viewBox="0 0 409.6 409.6">
                                      <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                    </svg>
                                  </button>
                                  <input
                                    type="number"
                                    className="quantity-input"
                                    value={counter}
                                    min="1"
                                    max={product._doc.quantity}
                                    name="quantity"
                                    onChange={handleChange}
                                  />

                                  <button
                                    className="quantity-btn"
                                    onClick={increment}
                                  >
                                    <svg viewBox="0 0 426.66667 426.66667">
                                      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <label>Quantity</label>
                                <div className="quantity-control text-center">
                                  <button className="quantity-btn">
                                    <svg viewBox="0 0 409.6 409.6">
                                      <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                    </svg>
                                  </button>
                                  <input
                                    type="number"
                                    className="quantity-input"
                                    value="0"
                                    readOnly
                                  />
                                  <button className="quantity-btn">
                                    <svg viewBox="0 0 426.66667 426.66667">
                                      <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="cart-button button">
                            {product._doc.quantities[value] !== 0 ? (
                              <button className="btn" onClick={addToCart}>
                                <i className="lni lni-cart"></i> Cart
                              </button>
                            ) : (
                              <button
                                className="btn disabled"
                                onClick={addToCart}
                              >
                                <i className="lni lni-cart disabled"></i>{" "}
                                Unavailable
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="col">
                          <div className="wish-button button">
                            <button
                              className="btn btn-alt"
                              onClick={addToWishlist}
                            >
                              <i className="lni lni-heart"></i> Wishlist
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Details;
