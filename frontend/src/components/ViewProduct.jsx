const ViewProduct = ({ product }) => {
  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn-alt"
          data-bs-toggle="modal"
          data-bs-target={`#VOM${product._doc._id}`}
        >
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`VOM${product._doc._id}`}
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
                />
                <div className="text-center text-md-center mb-2 mt-md-0">
                  <h1 className="mb-0 h4">Product Information</h1>
                </div>

                <p className="text-center">Product ID: {product._doc._id}</p>
                <div className="mt-2">
                  <div className="mb-4">
                    <div className="view-image-section">
                      {product._doc.images.map((image) => (
                        <div>
                          <img className="view-image" src={image} alt={image} />
                        </div>
                      ))}
                    </div>
                    <br />
                    <div className="ms-3">
                      Name: {product._doc.productName}
                      <br />
                      Brand: {product._doc.productName}
                      <br />
                      Category: {product._doc.category}
                      <br />
                      Featured: {product._doc.featured ? "Yes" : "No"}
                      <br />
                      Sale Percent: {product._doc.salePercent + "%"}
                      <br />
                      <br />
                      <h6>Product Specifications</h6>
                      {product._doc.specifications.map(
                        (specification, index) => (
                          <div key={"specifications" + index}>
                            {specification}
                            <br></br>
                          </div>
                        )
                      )}
                      <br />
                      <h6>Product Color/Types</h6>
                      {console.log(product)}
                      {product._doc.types.map((type, index) => (
                        <div key={"color/types" + index} className="d-flex">
                          <div className="col-3">{type}</div>
                          <div className="col-3">
                            {product._doc.quantities[index] + " pcs"}
                          </div>
                          {product._doc.isSale === true ? (
                            <>
                              <div className="col-3">
                                <del>{"PHP " + product._doc.prices[index]}</del>
                              </div>
                              <div className="col-3">
                                {"PHP " + (product._doc.prices[index] - (product._doc.prices[index] * product._doc.salePercent) / 100)}
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="col-6">
                                {"PHP " + product._doc.prices[index]}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                      <br />
                      <h6>Description</h6>
                      {product._doc.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProduct;
