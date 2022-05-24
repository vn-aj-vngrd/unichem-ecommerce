import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  updateReview,
  deleteReview,
  // resetReview,
} from "../features/reviews/reviewSlice";
import Star from "./Star";
import Swal from "sweetalert2";

function ReviewSingle({ reviewOne, editable }) {
  const dispatch = useDispatch();
  const moment = require("moment");
  const [starRating, setStarRating] = useState(reviewOne._doc.rating);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    review: reviewOne._doc.review,
  });

  const currentDate = moment();
  const createdtDate = moment(reviewOne._doc.createdAt);
  const expiryDate = moment(currentDate).add(30, "d");

  const { review } = formData;

  const onChangeReview = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitReview = (e) => {
    e.preventDefault();
    const productID = reviewOne._doc.productID;

    const reviewData = {
      productID: productID,
      review,
      reviewed: true,
      rating: starRating,
    };

    dispatch(updateReview(reviewData));
  };

  const onClickDeleteReview = (_id) => {
    Swal.fire({
      title: "Are you sure you want to delete this review?",
      text: "Click Yes to delete, otherwise No.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) dispatch(deleteReview(_id));
    });
  };

  return (
    <>
      {reviewOne && reviewOne.user && (
        <form className="form" onSubmit={onSubmitReview}>
          <div className="single-review">
            {reviewOne.user.image && (
              <img src={reviewOne.user.image} alt={reviewOne.user.image} />
            )}
            <div className="review-info">
              <div
                className={
                  isEditing ? "edit-review" : "edit-review hide-on-review-edit"
                }
              >
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
                          required
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
                        starRating >= 1 ? "lni lni-star-filled" : "lni lni-star"
                      }
                      id="star-review-1"
                      onClick={() => setStarRating(1)}
                    ></li>
                    <li
                      className={
                        starRating >= 2 ? "lni lni-star-filled" : "lni lni-star"
                      }
                      id="star-review-2"
                      onClick={() => setStarRating(2)}
                    ></li>
                    <li
                      className={
                        starRating >= 3 ? "lni lni-star-filled" : "lni lni-star"
                      }
                      id="star-review-3"
                      onClick={() => setStarRating(3)}
                    ></li>
                    <li
                      className={
                        starRating >= 4 ? "lni lni-star-filled" : "lni lni-star"
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

              <div className={isEditing ? "hide-on-review-edit" : ""}>
                <div className="d-flex justify-content-between align-items-start">
                  <h4 className="">
                    {reviewOne.user.name}
                    <span>
                      {moment(reviewOne._doc.updatedAt).format("DD/MM/YY")}
                    </span>
                  </h4>
                  <div className="btn-group dropstart">
                    {editable &&
                      currentDate.isBetween(createdtDate, expiryDate) && (
                        <>
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
                              <li onClick={() => setIsEditing(true)}>Edit</li>
                              <li
                                onClick={() =>
                                  onClickDeleteReview(reviewOne._doc._id)
                                }
                              >
                                Delete
                              </li>
                            </ul>
                          </ul>
                        </>
                      )}
                  </div>
                </div>

                <Star star={reviewOne._doc.rating} />
                <p>{reviewOne._doc.review}</p>
              </div>
            </div>

            <div
              className={
                isEditing ? "edit-review" : "edit-review hide-on-review-edit"
              }
            >
              <br></br>
              <div className="row d-flex">
                <div className="button d-flex justify-content-end">
                  <button type="submit" className="btn">
                    Submit Review
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    type="button"
                    className="btn btn-alt"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default ReviewSingle;
