import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { Autoplay, Pagination } from "swiper";
import Star from "./Star";

const productImageTest = [1, 2, 3, 4, 5];

const Details = ({ product }) => {
  const [value, setValue] = useState(0);

  const [counter, setCounter] = useState(1);
  let decrement, increment;
  if (counter > 1) decrement = () => setCounter(counter - 1);
  if (counter < product.quantities[value])
    increment = () => setCounter(counter + 1);
  let handleChange = (e) => {
    setCounter(e.target.value);

    if (e.target.value > product.quantities[value]) {
      setCounter(product.quantities[value]);
    }
    if (e.target.value < 0) {
      setCounter(1);
    }
  };

  let navigate = useNavigate();
  let addToCart = (event) => {
    // const cartData = {

    // }

    event.preventDefault();
    Swal.fire({
      title: "Added to Cart!",
      text: "To checkout please proceed to the cart page.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "<Link to='/cart'>Go to Cart</Link>",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  let addToWishlist = (event) => {
    event.preventDefault();
    Swal.fire({
      title: "Added to Wishlist!",
      text: "The item has been added to the wishlist.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "<Link to='/cart'>View Wishlist</Link>",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) navigate("/wishlist");
    });
  };

  return (
    <>
      <div className="item-details">
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
                        autoplay={{
                          delay: 5500,
                          disableOnInteraction: false,
                        }}
                        pagination={{
                          clickable: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                      >
                        {productImageTest.map((count, index) => (
                          <SwiperSlide key={index}>
                            <div className="single-slider"></div>
                            <img
                              src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                              id="current"
                              alt="#"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h4 className="title">{product.productName}</h4>
                  <div className="category">
                    <i className="lni lni-package"></i>Category:
                    <a href="/">{product.category}</a>
                    <Star star={1} reviews={1} />
                  </div>

                  {product.quantities[value] === 1 && (
                    <div>{product.quantities[value]} item left</div>
                  )}

                  {product.quantities[value] > 1 && (
                    <div>{product.quantities[value]} items available</div>
                  )}

                  {product.quantities[value] === 0 && (
                    <div>Item is not available</div>
                  )}
                  <h4 className="text-red">₱{product.prices[value]}</h4>

                  <hr className="mt-3" />

                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label>Color / Type</label>
                        <select
                          className="form-control text-grey"
                          value={value}
                          onChange={(e) => setValue(e.currentTarget.value)}
                        >
                          {product.types.map((type, index) => (
                            <option key={index} value={index}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-group">
                        {product.quantities[value] !== 0 ? (
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
                                max={product.quantity}
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
                                min="0"
                                max="0"
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
                      <div className="cart-button">
                        <button className="btn" onClick={addToCart}>
                          <i className="lni lni-cart"></i> Cart
                        </button>
                      </div>
                    </div>
                    <div className="col">
                      <div className="wish-button">
                        <button className="btn" onClick={addToWishlist}>
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
      </div>
    </>
  );
};

export default Details;
