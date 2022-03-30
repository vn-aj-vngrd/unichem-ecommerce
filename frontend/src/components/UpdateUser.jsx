import React from "react";

const UpdateUser = ({ id }) => {
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
                    <h1 className="mb-0 h4">User Information</h1>
                  </div>

                  <form action="#" className="mt-4">
                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>User Image</label>
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
                        <label>Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Email</label>
                        <div className="input-group">
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Sex</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="sex"
                            name="sex"
                            value="sample"
                            required
                          >
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Birthday</label>
                        <div className="input-group">
                          <input
                            type="date"
                            name="birthday"
                            id="birthday"
                            value="sample"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Address</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="address"
                            name="adress"
                            value="sample"
                            required
                          >
                            <option value="">Address1</option>
                            <option value="">Address2</option>
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

export default UpdateUser;
