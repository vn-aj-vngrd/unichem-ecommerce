import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateOrder } from "../features/orders/orderSlice";

const UpdateOrder = ({ order }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    document.title = "Unichem Store | Orders";

    setFormData({
      shippingFee: order.shippingFee,
      orderStatus: order.orderStatus,
      awaitingConfirmationDate: order.statusDates[0].date,
      awaitingPaymentDate: order.statusDates[1].date,
      awaitingFulfillmentDate: order.statusDates[2].date,
      awaitingShipmentDate: order.statusDates[3].date,
      shippedDate: order.statusDates[4].date,
      awaitingPickupDate: order.statusDates[5].date,
      completedDate: order.statusDates[6].date,
      cancelledDate: order.statusDates[7].date,
      declinedDate: order.statusDates[8].date,
      awaitingReturnDate: order.statusDates[9].date,
      returnedDate: order.statusDates[10].date,
    });
  }, [order]);

  const {
    shippingFee,
    orderStatus,
    awaitingConfirmationDate,
    awaitingPaymentDate,
    awaitingFulfillmentDate,
    awaitingShipmentDate,
    shippedDate,
    awaitingPickupDate,
    completedDate,
    cancelledDate,
    declinedDate,
    awaitingReturnDate,
    returnedDate,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const dispatch = useDispatch();

  const orderStatuses = [
    "Awaiting Confirmation",
    "Awaiting Payment",
    "Awaiting Fulfillment",
    "Awaiting Shipment",
    "Shipped",
    "Awaiting Pickup",
    "Completed",
    "Cancelled",
    "Declined",
    "Awaiting Return",
    "Returned",
  ];

  const onSubmit = (e) => {
    e.preventDefault();

    const statusDates = [
      // 0 - Awaiting Confirmation
      {
        date: awaitingConfirmationDate,
        status: "Awaiting confirmation",
        desc: "Please wait for the confirmation of your order.",
      },

      // 1 - Awaiting Payment
      {
        date: awaitingPaymentDate,
        status: "Awaiting Payment",
        desc: "You have completed the checkout process, but payment has yet to be confirmed.",
      },

      // 2 - Awaiting Fulfillment
      {
        date: awaitingFulfillmentDate,
        status: "Awaiting Fulfillment",
        desc: "You have completed the checkout process and payment has been confirmed.",
      },

      // 3 - Awaiting Shipment
      {
        date: awaitingShipmentDate,
        status: "Awaiting Shipment",
        desc: "Your order has been pulled and packaged and is awaiting collection from a shipping provider.",
      },

      // 4 - Shipped
      {
        date: shippedDate,
        status: "Shipped",
        desc: "Your order has been shipped and is on its way to you.",
      },

      // 5 - Awaiting Pickup
      {
        date: awaitingPickupDate,
        status: "Awaiting Pickup",
        desc: "Your order has been packaged and is awaiting customer pickup from a seller-specified location.",
      },

      // 6 - Completed
      {
        date: completedDate,
        status: "Completed",
        desc: "Your order has been shipped/picked up, and receipt is confirmed.",
      },

      // 7 - Cancelled
      {
        date: cancelledDate,
        status: "Cancelled",
        desc: "Your order has been cancelled due to the customer's reason.",
      },

      // 8 - Declined
      {
        date: declinedDate,
        status: "Declined",
        desc: "Your order has been declined due to a stock inconsistency by the admin.",
      },

      // 9 - Awaiting Return
      {
        date: awaitingReturnDate,
        status: "Awaiting Return",
        desc: "The return process is on-going. We are waiting for the customer to return the item.",
      },

      // 10 - Returned
      {
        date: returnedDate,
        status: "Returned",
        desc: "Your order has been returned and refunded based on the company's policy.",
      },
    ];

    const orderParams = {
      id: order._id,
      shippingFee: shippingFee,
      orderStatus: orderStatus,
      statusDates,
    };
    // console.log(orderParams);
    dispatch(updateOrder(orderParams));
    toast.success(`Order has been updated.`);
  };

  return (
    <>
      <div className="button">
        <button
          type="button"
          className=" btn"
          data-bs-toggle="modal"
          data-bs-target={`#UOM${order._id}`}
        >
          Update
        </button>
      </div>

      <div
        className="modal fade"
        id={`UOM${order._id}`}
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
                  <h1 className="mb-0 h4">Order Information</h1>
                </div>

                <p className="text-center">Order ID: {order._id}</p>

                <form onSubmit={onSubmit} className="mt-2">
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Shipping Fee (PHP)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step=".01"
                          className="form-control"
                          name="shippingFee"
                          value={shippingFee}
                          onChange={onChange}
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
                          name="orderStatus"
                          value={orderStatus}
                          onChange={onChange}
                        >
                          {orderStatuses.map((status, index) => (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Confirmation Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingConfirmationDate"
                          value={awaitingConfirmationDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Payment Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingPaymentDate"
                          value={awaitingPaymentDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Fulfillment Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingFulfillmentDate"
                          value={awaitingFulfillmentDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Shipment Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingShipmentDate"
                          value={awaitingShipmentDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Shipped Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="shippedDate"
                          value={shippedDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Pickup Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingPickupDate"
                          value={awaitingPickupDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Completed Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="completedDate"
                          value={completedDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Cancelled Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="cancelledDate"
                          value={cancelledDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Awaiting Return Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="awaitingReturnDate"
                          value={awaitingReturnDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Returned Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="returnedDate"
                          value={returnedDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Declined Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          name="declinedDate"
                          value={declinedDate}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-grid button">
                    <button
                      type="submit"
                      className="btn"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateOrder;
