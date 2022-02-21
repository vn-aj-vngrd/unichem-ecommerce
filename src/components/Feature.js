import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { Autoplay, Pagination } from "swiper";

const featureTest = [1, 2, 3, 4, 5];

const Feature = () => {
  return (
    <div>
      <section className="hero-area">
        <div className="container">
          <div className="row">
            <div className="slider-head">
              <div className="hero-slider">
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
                  {featureTest.map((count, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="single-slider"
                        style={{
                          backgroundImage: `url(assets/images/hero/slider-bg1.jpg)`,
                        }}
                      >
                        <div className="content">
                          <h2>
                            <span>No restocking fee ($35 savings)</span>
                            M75 Sport Watch
                          </h2>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                          </p>
                          <h3>
                            <span>Now Only</span> $320.99
                          </h3>
                          <div className="button">
                            <a href="product-grids.html" className="btn">
                              Shop Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feature;
