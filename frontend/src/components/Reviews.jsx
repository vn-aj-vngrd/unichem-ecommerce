import { useEffect } from "react";
import { getReviews, resetReview } from "../features/reviews/reviewSlice";
import { useSelector, useDispatch } from "react-redux";
import Star from "../components/Star";
import Spinner from "../components/Spinner";

const Reviews = ({ productID }) => {
  const dispatch = useDispatch();
  const moment = require("moment");

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
  let totalRatings = 0;

  for (let i = 0; i < productReviews.length; i++) {
    ratings[productReviews[i]._doc.rating - 1]++;
    totalRatings += productReviews[i]._doc.rating;
  }

  if (totalRatings > 0) {
    totalRatings /= productReviews.length;
  }

  console.log(productReviews);

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
                  <div key={review._doc._id} className="single-review">
                    <img src={review.user.image} alt="#" />
                    <div className="review-info">
                      <h4 className="">
                        {review.user.name}
                        <span>
                          {moment(review._doc.updatedAt).format("DD/MM/YY")}
                        </span>
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
