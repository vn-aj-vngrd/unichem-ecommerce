const Reviews = () => {
  return (
    <div className="product-details">
      <div className="container product-details-info">
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
                  <img src="https://i.mydramalist.com/kEpQwc.jpg" alt="#" />
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor...
                    </p>
                  </div>
                </div>

                <div className="single-review">
                  <img src="https://i.mydramalist.com/kEpQwc.jpg" alt="#" />
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor...
                    </p>
                  </div>
                </div>

                <div className="single-review">
                  <img src="https://i.mydramalist.com/kEpQwc.jpg" alt="#" />
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
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade review-modal"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
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
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        className="form-control"
                        type="text"
                        id="review-subject"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-group">
                      <label>Rating</label>
                      <select className="form-select" id="review-rating">
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Review</label>
                  <textarea
                    className="form-control"
                    id="review-message"
                    rows="8"
                    required
                  ></textarea>
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
      </div>
    </div>
  );
};

export default Reviews;
