const EditReviewModal = () => {
  return (
    <>
      <button
        type="button"
        className="lni-edit-btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <lni lni-pencil></lni>
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
              <div className="row">
                <div className="col-13">
                  <div className="form-group single-form form-default">
                    <label className="form-label">Rating</label>
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
              <div className="row">
                <div className="col-13">
                  <div className="single-form form-default">
                    <label className="form-label">Review</label>
                    <textarea
                      className="form-control"
                      id="review-message"
                      rows="8"
                      required
                    ></textarea>
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

export default EditReviewModal;
