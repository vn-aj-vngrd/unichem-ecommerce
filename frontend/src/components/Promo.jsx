import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPromos, resetPromo } from "../features/promos/promoSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import Spinner from "../components/Spinner";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper";

import { Autoplay, Pagination } from "swiper";

const Hero = () => {
  const dispatch = useDispatch();

  const { promos, isPromoLoading, isPromoError, promoMessage } = useSelector(
    (state) => state.promos
  );

  useEffect(() => {
    if (isPromoError) {
      console.log(promoMessage);
    }

    dispatch(getPromos());

    return () => {
      dispatch(resetPromo());
    };
  }, [dispatch, isPromoError, promoMessage]);

  return (
    <section className="hero-area">
      {isPromoLoading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
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
                  {promos.map((promo, index) => (
                    <SwiperSlide key={index}>
                      <div
                        className="single-slider"
                        style={{
                          backgroundImage: `url(${promo.image})`,
                        }}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
