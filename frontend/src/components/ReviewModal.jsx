import { useDispatch } from "react-redux";
import { setReview } from "../features/reviews/reviewSlice";
import { useState } from "react";
import { toast } from "react-toastify";

const ReviewModal = ({ userID, userImage, orderLineID, productID, reviewed }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    review: "",
  });

  const [starRating, setStarRating] = useState(0);
  const { review } = formData;

  console.log(starRating) 

  const onChangeReview = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitReview = (e) => {
    e.preventDefault();

    const reviewData = {
      userID: userID,
      productID: productID,
      review,
      reviewed: false,
      rating: starRating,
    };

    dispatch(setReview(reviewData));
    toast.success("Review created successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
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
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Leave a Review
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body review-modal-body product-details-info">
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
                                starRating == 5
                                  ? "lni lni-star-filled"
                                  : "lni lni-star"
                              }
                              id="star-review-5"
                              onClick={() => setStarRating(5)}
                            ></li>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="edit-review">
                      <br></br>
                      <div className="row d-flex">
                        <div className="button d-flex justify-content-end">
                          <button type="submit" className="btn">
                            Submit Review
                          </button>
                          <button
                            // onClick={() => setIsEditing(false)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
