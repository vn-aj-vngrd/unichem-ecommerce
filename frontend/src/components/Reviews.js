import React from "react";

const Reviews = () => {
  return (
    <div className="container product-details-info mb-4">
      <div className="row">
        <div className="col-lg-4 col-12">
          <div className="single-block give-review">
            <h4>4.5 (Overall)</h4>
            <ul>
              <li>
                <span>5 stars - 38</span>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
              </li>
              <li>
                <span>4 stars - 10</span>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star"></i>
              </li>
              <li>
                <span>3 stars - 3</span>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
              </li>
              <li>
                <span>2 stars - 1</span>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
              </li>
              <li>
                <span>1 star - 0</span>
                <i className="lni lni-star-filled"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
                <i className="lni lni-star"></i>
              </li>
            </ul>

            <button
              type="button"
              className="btn review-btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Leave a Review
            </button>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <div className="single-block">
            <div className="reviews">
              <h4 className="title">Latest Reviews</h4>

              <div className="single-review">
                <img src="assets/images/blog/comment1.jpg" alt="#" />
                <div className="review-info">
                  <h4>
                    Awesome quality for the price
                    <span>Jacob Hammond</span>
                  </h4>
                  <ul className="stars">
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                </div>
              </div>

              <div className="single-review">
                <img src="assets/images/blog/comment2.jpg" alt="#" />
                <div className="review-info">
                  <h4>
                    My husband love his new...
                    <span>Alex Jaza</span>
                  </h4>
                  <ul className="stars">
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star"></i>
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                </div>
              </div>

              <div className="single-review">
                <img src="assets/images/blog/comment3.jpg" alt="#" />
                <div className="review-info">
                  <h4>
                    I love the built quality...
                    <span>Jacob Hammond</span>
                  </h4>
                  <ul className="stars">
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                    <li>
                      <i className="lni lni-star-filled"></i>
                    </li>
                  </ul>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade review-modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Leave a Review
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="review-subject">Subject</label>
                    <input
                      class="form-control"
                      type="text"
                      id="review-subject"
                      required
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-group">
                    <label for="review-rating">Rating</label>
                    <select class="form-select" id="review-rating">
                      <option>5 Stars</option>
                      <option>4 Stars</option>
                      <option>3 Stars</option>
                      <option>2 Stars</option>
                      <option>1 Star</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="review-message">Review</label>
                <textarea
                  class="form-control"
                  id="review-message"
                  rows="8"
                  required
                ></textarea>
              </div>
            </div>
            <div class="modal-footer button">
              <button type="button" class="btn">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
