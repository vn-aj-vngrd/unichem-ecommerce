const ViewOrder = ({ order }) => {
  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn-alt"
          data-bs-toggle="modal"
          data-bs-target={`#VOM${order._id}`}
        >
          View
        </button>
      </div>

      <div
        className="modal fade"
        id={`VOM${order._id}`}
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
                  <div className="mb-0 h5">Order Information</div>
                </div>

                <div className="mt-2">
                  {order.orderLine &&
                    order.orderLine.map((orderline, index) => (
                      <div
                        key={index}
                        className="d-flex justify-content-center align-items-center mb-4"
                      >
                        <div className="w-25">
                          <img
                            src={orderline.image}
                            className="view-image"
                            alt="#"
                          />
                        </div>
                        <div className="ms-3">
                          ID: {orderline.orderID}
                          <br />
                          Name: {orderline.productName}
                          <br />
                          Type: {orderline.productType}
                          <br />
                          Quantity: {orderline.quantity}
                        </div>
                      </div>
                    ))}
                </div>
                <hr />
                <div className="container">
                  <div className="fw-bold text-center h5 mb-3">
                    Order Summary
                  </div>

                  <div>
                    Order ID: {order._id}
                    <br />
                    Shipping Discount: {order.shippingDiscount + "%"}
                    <br />
                    Order Discount: {order.orderDiscount + "%"}
                    <br />
                    Shipping Fee: Php {order.shippingFee.toFixed(2)}
                    <br />
                    Subtotal: Php {order.subtotal.toFixed(2)}
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

export default ViewOrder;
