import { useSelector, useDispatch } from "react-redux";
import { MdStarHalf, MdStar, MdStarOutline } from "react-icons/md";
import { useState } from "react";

const ReviewModal = (productID, ) => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [starRating, setStarRating] = useState(0);


  const onStarClick = (rating) => {
    setStarRating(rating);
  };

  return (
    <>
      <button
        type="button"
        className="btn review-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Leave a Review
      </button>

      <div
        className="modal fade review-modal"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Leave a Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="product-details-info">
                <div className="row">
                  <div className="">
                    <div className="reviews">
                      <div className="single-review">
                        <img src={user.image} alt="#" />
                        <div className="review-info single-form form-default">
                          <textarea
                            className="review-modal-form form-control"
                            id="review-message"
                            rows="8"
                            required
                            placeholder="Write a Review"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-13">
                  <div className="single-form form-default">
                    <label className="form-label">Review</label>
                    <textarea
                      className="form-control"
                      id="review-message"
                      rows="8"
                      required
                    ></textarea>
                  </div>
                </div> */}
                </div>
              </div>
              <br></br>
              <div className="row d-flex">
                <div className="">
                  <div className="form-group d-flex align-items-center single-form form-default">
                    <label className="">Rating</label>
                    <li
                      className={starRating >= 1 ? "lni lni-star-filled" : "lni lni-star"}
                      id="star-review-1"
                      onClick={() => onStarClick(1)}
                    ></li>
                    <li
                      className={starRating >= 2 ? "lni lni-star-filled" : "lni lni-star"}
                      id="star-review-2"
                      onClick={() => onStarClick(2)}
                    ></li>
                    <li
                      className={starRating >= 3 ? "lni lni-star-filled" : "lni lni-star"}
                      id="star-review-3"
                      onClick={() => onStarClick(3)}
                    ></li>
                    <li
                      className={starRating >= 4 ? "lni lni-star-filled" : "lni lni-star"}
                      id="star-review-4"
                      onClick={() => onStarClick(4)}
                    ></li>
                    <li
                      className={starRating == 5 ? "lni lni-star-filled" : "lni lni-star"}
                      id="star-review-5"
                      onClick={() => onStarClick(5)}
                    ></li>
                    ({starRating})
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer button">
              <button type="button" className="btn">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
