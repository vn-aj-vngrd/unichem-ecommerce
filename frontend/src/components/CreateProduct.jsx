import React from "react";

const CreateProduct = () => {
  return (
    <div>
      <div class="col-lg-4">
        <button
          type="button"
          class="btn btn-block btn-gray-800 mb-3"
          data-bs-toggle="modal"
          data-bs-target="#create-modal-form"
        >
          Create Product
        </button>
        <div
          class="modal fade"
          id="create-modal-form"
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
                    <h1 class="mb-0 h4">Create Product</h1>
                  </div>
                  <form action="#" class="mt-4">
                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Product Image</label>
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
                        <label>Product Name</label>
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
                        <label>Brand</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="brand"
                            id="brand"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Category</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="category"
                            id="category"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Types</label>
                        <div className="input-group">
                          <input
                            type="text"
                            name="types"
                            id="types"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Specifications</label>
                        <div className="input-group">
                          <input
                            type="specifications"
                            name="specifications"
                            id="types"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Quantities</label>
                        <div className="input-group">
                          <input
                            type="quantities"
                            name="quantities"
                            id="types"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Prices</label>
                        <div className="input-group">
                          <input
                            type="prices"
                            name="prices"
                            id="types"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Sale Prices</label>
                        <div className="input-group">
                          <input
                            type="salePrices"
                            name="salePrices"
                            id="types"
                            className="form-control"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Product Sale</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="isSale"
                            name="isSale"
                            required
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Feature Product</label>
                        <div className="input-group">
                          <select
                            className="form-select"
                            id="featured"
                            name="featured"
                            required
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label for="textarea">Description</label>
                        <div className="input-group">
                          <textarea
                            class="form-control"
                            id="description"
                            name="description"
                            required
                            rows="2"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="d-grid">
                      <button type="submit" className="btn btn-gray-800">
                        Create Product
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

export default CreateProduct;
