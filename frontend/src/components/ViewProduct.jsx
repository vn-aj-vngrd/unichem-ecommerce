import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import { Navigation } from "swiper";

import { Autoplay, Pagination } from "swiper";

const ViewProduct = ({ product }) => {
  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn-alt"
          data-bs-toggle="modal"
          data-bs-target={`#VOM${product._doc._id}`}
        >
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`VOM${product._doc._id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card p-3 p-lg-4">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
                <div className="text-center text-md-center mb-2 mt-md-0">
                  <h1 className="mb-0 h4">Product Information</h1>
                </div>

                <p className="text-center">Product ID: {product._doc._id}</p>
                <div className="mt-2">
                  <div className="mb-4">
                    <div className="">
                      {/* {product._doc.images.map((image) => (
                        <div>
                          <img className="view-image" src={image} alt={image} />
                        </div>
                      ))} */}
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
                            <div className="single-slider "></div>
                            <img src={image} id="current view-image" alt="#" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <br></br>
                      <div className="ms-3">
                        Name: {product._doc.productName}
                        <br />
                        Brand: {product._doc.brand}
                        <br />
                        Category: {product._doc.category}
                        <br />
                        Featured: {product._doc.featured ? "Yes" : "No"}
                        <br />
                        Sale Percent: {product._doc.salePercent + "%"}
                        <br />
                      </div>
                    </div>
                    <br />
                    <div className="ms-3">
                      <h6>Product Specifications</h6>
                      {product._doc.specifications.map(
                        (specification, index) => (
                          <div key={"specifications" + index}>
                            {specification}
                            <br></br>
                          </div>
                        )
                      )}
                      <br />
                      <h6>Product Color/Types</h6>
                      {product._doc.types.map((type, index) => (
                        <div
                          key={"color/types" + index}
                          className="d-flex align-center"
                        >
                          <div className="col">{type}</div>
                          <div className="col-3 d-flex align-center">
                            {product._doc.quantities[index] + " pcs"}
                            {product._doc.quantities[index] <
                              product._doc.minStock[index] &&
                              product._doc.quantities[index] > 0 && (
                                <i className="lni lni-warning low-stock-lni"></i>
                              )}

                            {product._doc.quantities[index] === 0 && (
                              <i className="lni lni-warning severe-stock-lni"></i>
                            )}
                          </div>
                          {product._doc.isSale === true ? (
                            <>
                              <div className="col-2">
                                <del>
                                  {"PHP " + product._doc.prices[index] &&
                                    product._doc.prices[index].toFixed(2)}
                                </del>
                              </div>
                              <div className="col-2">
                                {"PHP " +
                                  (
                                    product._doc.prices[index] &&
                                    product._doc.prices[index] -
                                      (product._doc.prices[index] *
                                        product._doc.salePercent) /
                                        100
                                  ).toFixed(2)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="col-2">
                                {"PHP " + product._doc.prices[index]}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      <br />
                      <h6>Description</h6>
                      {product._doc.description}
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

export default ViewProduct;
