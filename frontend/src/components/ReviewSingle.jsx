import React from "react";
import Star from "./Star";

function ReviewSingle({ review, editable }) {
  const moment = require("moment");
    console.log(review)
  return (
    <div key={review._doc._id} className="single-review">
      <img src={review.user.image} alt="#" />
      <div className="review-info">
        <div className="d-flex justify-content-between align-items-start">
          <h4 className="">
            {review.user.name}
            <span>
              {moment(review._doc.updatedAt).format("DD/MM/YY")}
            </span>
          </h4>
          <div className="btn-group dropstart">
            {editable && (
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
                    <li>Edit</li>
                    <li>Delete</li>
                  </ul>
                </ul>
              </>
            )}
          </div>
        </div>

        <Star star={review._doc.rating} />
        <p>{review._doc.review}</p>
      </div>
    </div>
  );
}

export default ReviewSingle;
