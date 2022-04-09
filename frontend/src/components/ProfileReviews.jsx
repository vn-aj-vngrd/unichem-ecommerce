import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Star from "./Star";
import EditReview from "./EditReviewModal";

function ProfileReviews() {
  // const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Reviews</h5>
      </div>

      {/* One Review */}
      <>
        <div className="review-row box-shadow">
          <div className="single-product no-box-shadow profile-single-product">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="purchase-product-image product-image">
                  <img
                    src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                    alt="#"
                  ></img>
                  <div className="button">
                    <Link to="/product-details" className="btn">
                      <i className="lni lni-eye"></i> View
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <div className="product-info">
                  <div className="category">
                    <i className="lni lni-package category-icon"></i> Category:
                    <a href="/">{}</a>
                  </div>

                  <h4 className="title">
                    <Link to="/">ProductName</Link>
                  </h4>

                  <div className="">
                    Type / Color: Sample, Sample, Sample, Sample
                  </div>

                  <Star star={1} reviews={1} />
                  <hr></hr>
                  <div className="price">
                    <div className="">Quantity: 4pcs</div>
                    <div className="spacer"></div>
                    <span>$199.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-box-shadow">
            <div className="order-total-row">
              <div className="product-details-info">
                <div className="">
                  <div className="reviews">
                    {/* {productReviews.map((review) => ( */}
                    {/* <div key={review._doc._id} className="single-review"> */}
                    <div className="single-review">
                      {/* <img src={review.user.image} alt="#" /> */}
                      <img
                        src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                        alt="#"
                      />
                      <div className="review-info">
                        <h4 className="">
                          <div className="d-flex justify-content-between">
                            Horeb Barriga
                            <div className="btn-group dropstart">
                              <button
                                type="button"
                                className="vertical-menu-button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <li className="lni lni-more-alt"></li>
                              </button>
                              <ul className="review-menu dropdown-menu">
                                <ul>
                                  <li>Edit</li>
                                  <li>Delete</li>
                                </ul>
                              </ul>
                            </div>
                          </div>
                          {/* {review.user.name} */}
                          <span>
                            mm/dd/yy
                            {/* {moment(review._doc.updatedAt).format("DD/MM/YY")} */}
                          </span>
                        </h4>

                        {/* <Star star={review._doc.rating} /> */}
                        <Star star={4} />
                        {/* <p>{review._doc.review}</p> */}
                        <p>Lorem Ipsum Dolor amit bayot unggoy</p>
                      </div>
                    </div>
                    {/* ))} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <nav>
        <ul className="product-pagination pagination justify-content-center">
          <li className="page-item disabled">
            <a
              className="page-link"
              href="/"
              tabIndex="-1"
              aria-disabled="true"
            >
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="/">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default ProfileReviews;
