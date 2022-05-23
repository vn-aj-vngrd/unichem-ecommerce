import { useDispatch } from "react-redux";
import { setReview } from "../features/reviews/reviewSlice";
import { useState } from "react";

const ReviewModal = ({
  userID,
  userImage,
  orderLineID,
  productID,
  reviewed,
}) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    review: "",
  });

  const [starRating, setStarRating] = useState(1);
  const { review } = formData;

  const onChangeReview = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitReview = (e) => {
    e.preventDefault();

    const reviewData = {
      orderLineID: orderLineID,
      userID: userID,
      productID: productID,
      review,
      reviewed: false,
      rating: starRating,
    };
    dispatch(setReview(reviewData));
  };

  return (
    <>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target={"#modal" + orderLineID}
        className="btn lni lni-comments-alt"
        disabled={reviewed}
      ></button>

      <div
        className="modal fade review-modal"
        id={"modal" + orderLineID}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Leave a Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body review-modal-body product-details-info">
              <div className="reviews">
                <form className="form" onSubmit={onSubmitReview}>
                  <div className="single-review">
                    <img src={userImage} alt={userImage} />
                    <div className="review-info">
                      <div className="edit-review">
                        <div className="product-details-info">
                          <div className="row">
                            <div className="">
                              <div className="reviews">
                                <textarea
                                  className="review-modal-form form-control"
                                  id="review-message"
                                  rows="8"
                                  name="review"
                                  value={review}
                                  onChange={onChangeReview}
                                  placeholder="Write a Review"
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="edit-review-stars d-flex justify-align-content-between align-items-center">
                            <label className="">Rating</label>
                            <li
                              className={
                                starRating >= 1
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-1"
                              onClick={() => setStarRating(1)}
                            ></li>
                            <li
                              className={
                                starRating >= 2
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-2"
                              onClick={() => setStarRating(2)}
                            ></li>
                            <li
                              className={
                                starRating >= 3
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-3"
                              onClick={() => setStarRating(3)}
                            ></li>
                            <li
                              className={
                                starRating >= 4
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-4"
                              onClick={() => setStarRating(4)}
                            ></li>
                            <li
                              className={
                                starRating === 5
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-5"
                              onClick={() => setStarRating(5)}
                            ></li>
                            {starRating === 1 && (<h6 className="rating-label rating-label-gray">Very Poor</h6>)}
                            {starRating === 2 && (<h6 className="rating-label rating-label-gray">Poor</h6>)}
                            {starRating === 3 && (<h6 className="rating-label rating-label-gray">Neutral</h6>)}
                            {starRating === 4 && (<h6 className="rating-label rating-label-yellow">Satisfactory</h6>)}
                            {starRating === 5 && (<h6 className="rating-label rating-label-yellow">Delightful</h6>)}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="edit-review">
                      <br></br>
                      <div className="row d-flex">
                        <div className="button d-flex justify-content-end">
                          <button
                            type="submit"
                            className="btn"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Submit Review
                          </button>
                          <button
                            // onClick={() => setIsEditing(false)}
                            type="button"
                            className="btn btn-alt"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
