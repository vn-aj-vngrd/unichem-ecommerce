import React from "react";
import { Link } from "react-router-dom"; //useNavigate
import { useEffect } from "react"; //useState,
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews, resetReview } from "../features/reviews/reviewSlice";
// import Star from "./Star";
import Spinner from "../components/Spinner";
// import ReactPaginate from "react-paginate";
import ReviewSingle from "./ReviewSingle";
import { toast } from "react-toastify";

function ProfileReviews() {
  // const { user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const { reviews, isReviewLoading, isReviewError, isReviewCreated, isReviewUpdated, isReviewDeleted, isUpdateReviewLoading, reviewMessage } =
    useSelector((state) => state.reviews);

  useEffect(() => {
    if (isReviewError) {
      toast.error(reviewMessage);
    }

    if (isReviewCreated) {
      toast.success("Review created successfully");
    }

    if (isReviewDeleted) {
      toast.success("Review deleted successfully");
    }

    if (isReviewUpdated) {
      toast.success("Review updated successfully");
    }


    dispatch(getUserReviews());

    return () => {
      dispatch(resetReview());
    };
  }, [isReviewError, reviewMessage, isReviewCreated, isReviewUpdated, isReviewDeleted, dispatch]);

  if (isReviewLoading || isUpdateReviewLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  let allReviews = JSON.parse(JSON.stringify(reviews));

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Reviews</h5>
      </div>

      {/* One Review */}
      {allReviews.length > 0 ? (
        allReviews.map((review) => (
          <div key={review._doc._id} className="review-row box-shadow">
            <div className="review-single-product">
              <div className="d-flex">
                <div className="">
                  <div className="review-product-image">
                    <img
                      src={review._doc.images[0]}
                      alt={review._doc.productName}
                    ></img>
                  </div>
                </div>
                <div className="">
                  <div className="product-info">
                    <h5 className="title">
                      <Link to={`/product-details/${review._doc._id}`}>
                        {review._doc.productName}
                      </Link>
                    </h5>
                    <div className="category">
                      <i className="lni lni-package"></i> Category:
                      <Link to={`/products/category/${review._doc.category}`}>
                        {review._doc.category}
                      </Link>
                    </div>
                    Brand: {review._doc.brand}
                  </div>
                </div>
              </div>
            </div>
            <div className="no-box-shadow">
              <div className="review-second-row">
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
        ))
      ) : (
        <>
          <div className="empty-result">
            <div className="reviews">
              <h4>No reviews to display</h4>
            </div>
          </div>
        </>
      )}

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
