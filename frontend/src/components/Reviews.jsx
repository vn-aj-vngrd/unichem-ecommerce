import { useEffect } from "react";
import { getReviews, resetReview } from "../features/reviews/reviewSlice";
import { useSelector, useDispatch } from "react-redux";
import Star from "../components/Star";
import Spinner from "../components/Spinner";

const Reviews = ({ productID }) => {
  const dispatch = useDispatch();

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

  const productReviews = reviews.filter((review) => {
    return review.product._id === productID;
  });

  const ratings = [0, 0, 0, 0, 0];
  let totalRating = 0;

  for (let i = 0; i < productReviews.length; i++) {
    ratings[productReviews[i]._doc.rating - 1]++;
    totalRating += productReviews[i]._doc.rating;
  }

  if (productReviews.length > 0) {
    totalRating /= productReviews.length;
  }

  return (
    <div className="product-details">
      <div className="container product-details-info">
        <div className="row">
          <div className="col-lg-4 col-12">
            <div className="single-block give-review">
              <h4>{totalRating.toFixed(2)} (Overall)</h4>
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
                  <div key={review._doc._id} className="single-review">
                    <img src={review.user.image} alt="#" />
                    <div className="review-info">
                      <h4>
                        {review._doc.subject}
                        <span>{review.user.name}</span>
                      </h4>
                      <Star star={review._doc.rating} />
                      <p>{review._doc.review}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
