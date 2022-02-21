import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { Autoplay, Pagination } from "swiper";

const productImageTest = [1, 2, 3, 4, 5];
const max = 10;

const Details = () => {
  const [counter, setCounter] = useState(1);
  let decrement, increment;
  if (counter > 1) decrement = () => setCounter(counter - 1);
  if (counter < max) increment = () => setCounter(counter + 1);

  return (
    <div className="container">
      <Breadcrumb />
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
                            <div
                              className="single-slider"
                              style={{
                                backgroundImage: `url(assets/images/hero/slider-bg1.jpg)`,
                              }}
                            ></div>
                            <img
                              src="assets/images/product-details/01.jpg"
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
                  <h2 className="title">Product Title</h2>
                  <p className="category">
                    <i className="lni lni-package"></i> Category:
                    <a href="/">Test</a>
                  </p>
                  <h3 className="price">₱850</h3>
                  <p className="info-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div className="d-flex flex-row bd-highlight w-100">
                    <div className="pe-2 bd-highlight">
                      <div className="form-group">
                        <label>Color / Type</label>
                        <select className="form-control" id="color">
                          <option>test 1</option>
                          <option>test 2</option>
                          <option>test 3</option>
                        </select>
                      </div>
                    </div>
                    <div className="pe-2 bd-highlight">
                      <div className="form-group quantity">
                        <label>Quantity</label>
                        <div className="quantity-control" data-quantity="">
                          <button className="quantity-btn" onClick={decrement}>
                            <svg viewBox="0 0 409.6 409.6">
                              <g>
                                <g>
                                  <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                                </g>
                              </g>
                            </svg>
                          </button>
                          <input
                            type="number"
                            className="quantity-input"
                            value={counter}
                            step="0.1"
                            min="1"
                            max=""
                            name="quantity"
                            readOnly
                          />
                          <button className="quantity-btn" onClick={increment}>
                            <svg viewBox="0 0 426.66667 426.66667">
                              <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-row bd-highlight w-100">
                    <div className="pe-2 bd-highlight cart-button">
                      <button className="btn">
                        <i className="lni lni-cart"></i>Add to Cart
                      </button>
                    </div>
                    <div className="pe-2 bd-highlight wish-button">
                      <button className="btn">
                        <i className="lni lni-heart"></i> To Wishlist
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
  );
};

export default Details;
