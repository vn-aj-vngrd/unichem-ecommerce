const UpdateOrder = () => {
  return (
    <>
      <div className="col-lg-4">
        <button
          type="button"
          className="btn btn-block btn-gray-800 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modal-form"
        >
          View/Update
        </button>
        <div
          className="modal fade"
          id="modal-form"
          tabindex="-1"
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
                    <h1 className="mb-0 h4">Order Information</h1>
                  </div>

                  <form action="#" className="mt-4">
                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Order Date</label>
                        <div className="input-group">
                          <input
                            type="date"
                            name="orderDate"
                            id="orderDate"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Shipping Date</label>
                        <div className="input-group">
                          <input
                            type="date"
                            name="shippingDate"
                            id="shippingDate"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Received Date</label>
                        <div className="input-group">
                          <input
                            type="date"
                            name="receivedDate"
                            id="receivedDate"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Order Status</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="orderStatus"
                            name="orderStatus"
                            value="sample"
                            required
                          >
                            <option value="">Awaiting Payment</option>
                            <option value="">Packed</option>
                            <option value="">Shipped</option>
                            <option value="">Completed</option>
                            <option value="">Cancelled</option>
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
    </>
  );
};

export default UpdateOrder;
