import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateOrder, getAllOrders } from "../features/orders/orderSlice";
const moment = require("moment");

const UpdateOrder = ({ order }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllOrders());
    return () => {
      // dispatch(getAllOrders());
      // dispatch(resetOrder);
    };
  }, [dispatch]);

  const awaitingConfirmationDate = moment(order.statusDates[0].date).format(
    "YYYY-MM-DD"
  );
  const awaitingPaymentDate = moment(order.statusDates[1].date).format(
    "YYYY-MM-DD"
  );
  const awaitingFulfillmentDate = moment(order.statusDates[2].date).format(
    "YYYY-MM-DD"
  );
  const awaitingShipmentDate = moment(order.statusDates[3].date).format(
    "YYYY-MM-DD"
  );
  const shippedDate = moment(order.statusDates[4].date).format("YYYY-MM-DD");
  const awaitingPickupDate = moment(order.statusDates[5].date).format(
    "YYYY-MM-DD"
  );
  const completedDate = moment(order.statusDates[6].date).format("YYYY-MM-DD");
  const cancelledDate = moment(order.statusDates[7].date).format("YYYY-MM-DD");
  const declinedDate = moment(order.statusDates[8].date).format("YYYY-MM-DD");
  const awaitingReturnDate = moment(order.statusDates[9].date).format(
    "YYYY-MM-DD"
  );
  const returnedDate = moment(order.statusDates[10].date).format("YYYY-MM-DD");

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

  const onSubmit = (data) => {
    const statusDates = [
      // 0 - Awaiting Confirmation
      {
        date: data.awaitingConfirmationDate,
        status: "Awaiting confirmation",
        desc: "Please wait for the confirmation of your order.",
      },

      // 1 - Awaiting Payment
      {
        date: data.awaitingPaymentDate,
        status: "Awaiting Payment",
        desc: "You have completed the checkout process, but payment has yet to be confirmed.",
      },

      // 2 - Awaiting Fulfillment
      {
        date: data.awaitingFulfillmentDate,
        status: "Awaiting Fulfillment",
        desc: "You have completed the checkout process and payment has been confirmed.",
      },

      // 3 - Awaiting Shipment
      {
        date: data.awaitingShipmentDate,
        status: "Awaiting Shipment",
        desc: "Your order has been pulled and packaged and is awaiting collection from a shipping provider.",
      },

      // 4 - Shipped
      {
        date: data.shippedDate,
        status: "Shipped",
        desc: "Your order has been shipped and is on its way to you.",
      },

      // 5 - Awaiting Pickup
      {
        date: data.awaitingPickupDate,
        status: "Awaiting Pickup",
        desc: "Your order has been packaged and is awaiting customer pickup from a seller-specified location.",
      },

      // 6 - Completed
      {
        date: data.completedDate,
        status: "Completed",
        desc: "Your order has been shipped/picked up, and receipt is confirmed.",
      },

      // 7 - Cancelled
      {
        date: data.cancelledDate,
        status: "Cancelled",
        desc: "Your order has been cancelled due to the customer's reason.",
      },

      // 8 - Declined
      {
        date: data.declinedDate,
        status: "Declined",
        desc: "Your order has been declined due to a stock inconsistency by the admin.",
      },

      // 9 - Awaiting Return
      {
        date: data.awaitingReturnDate,
        status: "Awaiting Return",
        desc: "The return process is on-going. We are waiting for the customer to return the item.",
      },

      // 10 - Returned
      {
        date: data.returnedDate,
        status: "Returned",
        desc: "Your order has been returned and refunded based on the company's policy.",
      },
    ];

    const orderParams = {
      id: order._id,
      shippingFee: data.shippingFee,
      orderStatus: data.orderStatus,
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

                <form onSubmit={handleSubmit(onSubmit)} className="mt-2">
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Shipping Fee (PHP)</label>
                      <div className="input-group">
                        <input
                          type="number"
                          step=".01"
                          className="form-control"
                          defaultValue={order.shippingFee}
                          {...register("shippingFee")}
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
                          defaultValue={order.orderStatus}
                          {...register("orderStatus", {
                            required: {
                              value: true,
                              message: "Order Status is required",
                            },
                          })}
                          style={{
                            border: errors.orderStatus
                              ? "1px solid #f44336"
                              : "",
                          }}
                        >
                          {orderStatuses.map((status, index) => (
                            <option key={index} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {errors.orderStatus && (
                          <p className="error-message">
                            ⚠ {errors.orderStatus.message}
                          </p>
                        )}
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
                          defaultValue={awaitingConfirmationDate}
                          {...register("awaitingConfirmationDate")}
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
                          defaultValue={awaitingPaymentDate}
                          {...register("awaitingPaymentDate")}
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
                          defaultValue={awaitingFulfillmentDate}
                          {...register("awaitingFulfillmentDate")}
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
                          defaultValue={awaitingShipmentDate}
                          {...register("awaitingShipmentDate")}
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
                          defaultValue={shippedDate}
                          {...register("shippedDate")}
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
                          defaultValue={awaitingPickupDate}
                          {...register("awaitingPickupDate")}
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
                          defaultValue={completedDate}
                          {...register("completedDate")}
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
                          defaultValue={cancelledDate}
                          {...register("cancelledDate")}
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
                          defaultValue={awaitingReturnDate}
                          {...register("awaitingReturnDate")}
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
                          defaultValue={returnedDate}
                          {...register("returnedDate")}
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
                          defaultValue={declinedDate}
                          {...register("declinedDate")}
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
