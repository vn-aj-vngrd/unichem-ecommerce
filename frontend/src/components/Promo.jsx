import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { Autoplay, Pagination } from "swiper";

const HeroTest = [1, 2, 3, 4, 5];

const Hero = () => {
  return (
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
                  style: { color: "white" },
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {HeroTest.map((count, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="single-slider"
                      style={{
                        backgroundImage: `url(https://www.paymaya.com/hubfs/PayMaya%20Deals%20Page/PayMaya%20Deals%20Page%202021/April%202021/Lazada-BDAY_Deals-Page.jpg)`,
                      }}
                    ></div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
