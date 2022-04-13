import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProduct } from "../features/products/productSlice";
import { getReviews, resetReview } from "../features/reviews/reviewSlice";
import Star from "./Star";
import Spinner from "../components/Spinner";
import ReactPaginate from "react-paginate";
import ReviewSingle from "./ReviewSingle";

function ProfileReviews() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, isReviewLoading, isReviewError, reviewMessage } =
    useSelector((state) => state.reviews);

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (isReviewError) {
      // console.log(reviewMessage);
    }

    dispatch(getReviews());

    return () => {
      dispatch(resetReview());
    };
  }, [isReviewError, reviewMessage, dispatch]);

  useEffect(() => {
    document.title = "Unichem Store | Product Details";

    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [navigate, isProductError, productMessage, dispatch]);

  if (isReviewLoading || isProductLoading) {
    return (
      <>
        <div className="empty-container"></div>
        <Spinner />
      </>
    );
  }

  let allReviews = JSON.parse(JSON.stringify(reviews));
  allReviews.filter((review) => review.userID === user._id);

  console.log(allReviews);

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Reviews</h5>
      </div>

      {/* One Review */}
      {allReviews.map((review) => (
        <div key={review._doc._id} className="review-row box-shadow">
          <div className="review-single-product">
            <div className="d-flex">
              <div className="">
                <div className="review-product-image">
                  <img src={review.product.images[0]} alt="#"></img>
                </div>
              </div>
              <div className="">
                <div className="product-info">
                  <h5 className="title">
                    <Link to="/">{review.product.productName}</Link>
                  </h5>
                  <div className="category">
                    <i className="lni lni-package"></i> Category:
                    <Link to={`/products/category/${review.product.category}`}>
                      {review.product.category}
                    </Link>
                  </div>
                    Types / Color: {review.product.types}
                </div>
              </div>
            </div>
          </div>
          <div className="no-box-shadow">
            <div className="order-total-row">
              <div className="product-details-info">
                <div className="">
                  <div className="reviews">
                    <ReviewSingle reviewOne={review} editable={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

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
