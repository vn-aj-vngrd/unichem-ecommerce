const CreateCoupon = () => {
  return (
    <div>
      <div className="col-12 mt-5">
        <button
          type="button"
          className="btn btn-block btn-gray-800 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#create-promotion-modal"
        >
          Create Coupon
        </button>
        <div
          className="modal fade"
          id="create-promotion-modal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modal-form"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body p-0">
                <div className="card p-3 p-lg-4">
                  <button
                    type="button"
                    className="btn-close ms-auto"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                  <div className="text-center text-md-center mb-4 mt-md-0">
                    <h1 className="mb-0 h4">Create Promotion</h1>
                  </div>
                  <form action="#" className="mt-4">
                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Promo Image</label>
                        <div className="input-group">
                          <input
                            type="file"
                            name="image"
                            id="image"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Promo Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="productName"
                            id="productName"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Publish Promo</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="publish"
                            name="publish"
                            required
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-gray-800">
                        Create Promotion
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
