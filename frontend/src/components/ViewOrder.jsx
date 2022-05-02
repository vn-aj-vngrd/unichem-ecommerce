const ViewOrder = ({ order }) => {
  // console.log(order);
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
                  <h1 className="mb-0 h4">Product Information</h1>
                </div>

                {order && order.count > 0 && (
                  <>
                    <p className="text-center">Order ID: {order._id}</p>
                    <div className="mt-2">
                      {order.orderLine.map((orderline, index) => (
                        <div
                          key={index}
                          className="d-flex justify-content-center align-items-center mb-4"
                        >
                          <div className="w-25">
                            <img src={orderline.image} alt="#" />
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
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewOrder;
