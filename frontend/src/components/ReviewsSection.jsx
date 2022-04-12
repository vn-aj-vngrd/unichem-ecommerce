import { useEffect, useState } from "react";
import { getReviews, resetReview } from "../features/reviews/reviewSlice";
import { useSelector, useDispatch } from "react-redux";
import Star from "./Star";
import Spinner from "./Spinner";
import ReactPaginate from "react-paginate";
import ReviewSingle from "./ReviewSingle";

const ReviewsSection = ({ productID }) => {
  const dispatch = useDispatch();
  const moment = require("moment");
  const [pageNumber, setPageNumber] = useState(0);

  const { reviews, isReviewLoading, isReviewError, reviewMessage } =
    useSelector((state) => state.reviews);

  useEffect(() => {
    if (isReviewError) {
      // console.log(reviewMessage);
    }

    dispatch(getReviews());

    return () => {
      dispatch(resetReview());
    };
  }, [isReviewError, reviewMessage, dispatch]);

  if (isReviewLoading) {
    return (
      <>
        {/* <div className="empty-container"></div> */}
        <Spinner />
      </>
    );
  }

  // Pagination
  const reviewsPerPage = 10;
  const pagesVisited = pageNumber * reviewsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let productReviews = reviews.filter((review) => {
    return review.product._id === productID;
  });

  const ratings = [0, 0, 0, 0, 0];
  let totalRatings = 0;

  for (let i = 0; i < productReviews.length; i++) {
    ratings[productReviews[i]._doc.rating - 1]++;
    totalRatings += productReviews[i]._doc.rating;
  }

  if (totalRatings > 0) {
    totalRatings /= productReviews.length;
  }

  const pageCount = Math.ceil(productReviews.length / reviewsPerPage);
  productReviews = productReviews.slice(pagesVisited, pagesVisited + reviewsPerPage);

  return (
    <div className="product-details">
      <div className="container product-details-info">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="single-block give-review">
              <h4>{totalRatings.toFixed(2)} (Overall)</h4>
              <ul>
                <li>
                  <span>5 stars </span>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i> ({ratings[4]})
                </li>
                <li>
                  <span>4 stars </span>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star"></i> ({ratings[3]})
                </li>
                <li>
                  <span>3 stars </span>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i> ({ratings[2]})
                </li>
                <li>
                  <span>2 stars </span>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i> ({ratings[1]})
                </li>
                <li>
                  <span>1 star </span>
                  <i className="lni lni-star-filled"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i>
                  <i className="lni lni-star"></i> ({ratings[0]})
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-8 col-12">
            <div className="single-block">
              <div className="reviews">
                <h4 className="title">Latest Reviews</h4>
                {productReviews.map((review) => (
                  <ReviewSingle review={review} editable={false}/>
                ))}
              </div>
            </div>
            <nav>
              <ul className="product-pagination pagination justify-content-center">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageRangeDisplayed={8}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"page-link-button"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page"}
                  disabledClassName={"disabled"}
                  activeClassName={"page-link-active"}
                />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
