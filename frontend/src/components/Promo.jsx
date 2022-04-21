import { Swiper, SwiperSlide } from "swiper/react";
// import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper";

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
                navigation={true} 
                autoplay={{
                  delay: 5500,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  style: { color: "white" },
                }}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
              >
                {HeroTest.map((count, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className="single-slider"
                      style={{
                        backgroundImage: `url(data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22348%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20348%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_17fcf6940b2%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A17pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_17fcf6940b2%22%3E%3Crect%20width%3D%22348%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22116.71388244628906%22%20y%3D%22120.00012588500977%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)`,
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
