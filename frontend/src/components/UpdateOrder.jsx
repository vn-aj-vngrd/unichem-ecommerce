import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateOrder } from "../features/orders/orderSlice";
const moment = require("moment");

const UpdateOrder = ({ order }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const shippingDate = moment(order.shippingDate).format("YYYY-MM-D");
  const receivedDate = moment(order.receivedDate).format("YYYY-MM-D");

  const orderStatuses = [
    "Awaiting Payment",
    "Awaiting Shipment",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Refunded",
  ];

  const onSubmit = (data) => {
    const orderParams = {
      id: order._id,
      shippingDate: data.shippingDate,
      receivedDate: data.receivedDate,
      orderStatus: data.orderStatus,
    };
    // console.log(orderParams);
    dispatch(updateOrder(orderParams));
    toast.success(`Order has been updated.`);
  };

  return (
    <>
      <div className="col-lg-4">
        <div className="button">
          <button
            type="button"
            className=" btn"
            data-bs-toggle="modal"
            data-bs-target={`#modal${order._id}`}
          >
            Update
          </button>
        </div>

        <div
          className="modal fade"
          id={`modal${order._id}`}
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
                        <label>Shipping Date</label>
                        <div className="input-group">
                          <input
                            type="date"
                            defaultValue={shippingDate}
                            className="form-control"
                            {...register("shippingDate", {
                              required: {
                                value: true,
                                message: "Email is required",
                              },
                            })}
                            style={{
                              border: errors.shippingDate
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errors.shippingDate && (
                            <p className="error-message">
                              ⚠ {errors.shippingDate.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-group mb-4">
                        <label>Received Date</label>
                        <div className="input-group">
                          <input
                            type="date"
                            className="form-control"
                            defaultValue={receivedDate}
                            {...register("receivedDate", {
                              required: {
                                value: true,
                                message: "Received Date is required",
                              },
                            })}
                            style={{
                              border: errors.receivedDate
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errors.receivedDate && (
                            <p className="error-message">
                              ⚠ {errors.receivedDate.message}
                            </p>
                          )}
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
      </div>
    </>
  );
};

export default UpdateOrder;
