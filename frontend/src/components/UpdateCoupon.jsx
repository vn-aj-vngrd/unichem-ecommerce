const UpdateCoupon = () => {
    return (
      <div>
        <div class="">
          <button
            type="button"
            class="btn btn-block btn-gray-800 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#modal-form"
          >
            View/Update
          </button>
          <div
            class="modal fade"
            id="modal-form"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modal-form"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body p-0">
                  <div class="card p-3 p-lg-4">
                    <button
                      type="button"
                      class="btn-close ms-auto"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <div class="text-center text-md-center mb-4 mt-md-0">
                      <h1 class="mb-0 h4">Promotion Information</h1>
                    </div>
                    <form action="#" class="mt-4">
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
                              value="sample"
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
                              value="sample"
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
                          Save Changes
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
  
  export default UpdateCoupon;
  