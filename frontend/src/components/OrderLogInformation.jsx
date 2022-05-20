import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { getOneOrder, resetOrder } from "../features/orders/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import PurchasedProduct from "./PurchasedProduct";

import Spinner from "./Spinner";

const OrderLogInformation = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moment = require("moment");

  const { user } = useSelector((state) => state.auth);

  const { orders, isOrderLoading, isOrderError, orderMessage } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    dispatch(getOneOrder(id));

    return () => {
      dispatch(resetOrder());
    };
  }, [navigate, id, isOrderError, orderMessage, dispatch]);

  if (isOrderLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <>
      {orders.length > 0 && (
        <div className="order-details-column">
          <div className="product-grid">
            <div className="order-status">
              <div className="order-status-progress">
                <div
                  className={
                    "order-status-progress-bar " +
                    "progress-" +
                    orders[0].orderStatus.toLowerCase().replaceAll(" ", "-")
                  }
                ></div>
              </div>
              <div className="one-status">
                <button
                  className={
                    orders[0].orderStatus === "Awaiting Confirmation" ||
                    orders[0].orderStatus === "Awaiting Payment" ||
                    orders[0].orderStatus === "Awaiting Fulfillment" ||
                    orders[0].orderStatus === "Awaiting Shipment" ||
                    orders[0].orderStatus === "Shipped" ||
                    orders[0].orderStatus === "Awaiting Pickup" ||
                    orders[0].orderStatus === "Completed"
                      ? "order-status-circle true"
                      : "order-status-circle"
                  }
                >
                  +<i className="lni lni-cogs"></i>
                </button>
                <p>Processing</p>
              </div>
              <div className="one-status">
                <button
                  className={
                    orders[0].orderStatus === "Awaiting Shipment" ||
                    orders[0].orderStatus === "Shipped" ||
                    orders[0].orderStatus === "Awaiting Pickup" ||
                    orders[0].orderStatus === "Completed"
                      ? "order-status-circle true"
                      : "order-status-circle"
                  }
                >
                  <i className="lni lni-archive"></i>
                </button>
                <p>Packed</p>
              </div>
              <div className="one-status">
                <button
                  className={
                    orders[0].orderStatus === "Shipped" ||
                    orders[0].orderStatus === "Awaiting Pickup" ||
                    orders[0].orderStatus === "Completed"
                      ? "order-status-circle true"
                      : "order-status-circle"
                  }
                >
                  <i className="lni lni-ship"></i>
                </button>
                <p>Shipped</p>
              </div>
              <div className="one-status">
                <button
                  className={
                    orders[0].orderStatus === "Completed"
                      ? "order-status-circle true"
                      : "order-status-circle"
                  }
                >
                  <i className="lni lni-checkmark"></i>
                </button>
                <p>Delivered</p>
              </div>
            </div>
          </div>

          <div className="order-status-log-details">
            {orders[0].statusDates &&
              orders[0].statusDates.slice(0, 6).map((log, index) => (
                <div key={index} className="order-status-single-log">
                  <div className="order-details-date">
                    {log.date ? moment(log.date).format("DD/MM/YY") : ""}
                  </div>
                  <div className="order-details-status-progress">
                    {index < orders[0].statusDates.slice(0, 6).length - 1 && (
                      <div className="vertical-bar">
                        <div
                          className={
                            orders[0].statusDates[index + 1].date
                              ? "vertical-progress"
                              : ""
                          }
                        ></div>
                      </div>
                    )}

                    <div
                      className={
                        log.date
                          ? "status-circle-log-checked"
                          : "status-circle-log-unchecked"
                      }
                    >
                      <i className="lni lni-checkmark"></i>
                    </div>
                  </div>
                  <div className="order-details-description">
                    <h6>{log.label}</h6>
                    <p>{log.desc}</p>
                  </div>
                </div>
              ))}

            <hr></hr>
            <br></br>
            {orders[0].statusDates[7] && (
              <div className="order-status-single-log">
                <div className="order-details-date">
                  {orders[0].statusDates[7].date
                    ? moment(orders[0].statusDates[7].date).format("DD/MM/YY")
                    : ""}
                </div>
                <div className="order-details-status-progress">
                  <div
                    className={
                      orders[0].statusDates[7].date
                        ? "status-circle-log-checked"
                        : "status-circle-log-unchecked"
                    }
                  >
                    <i className="lni lni-checkmark"></i>
                  </div>
                </div>
                <div className="order-details-description">
                  <h6>{orders[0].statusDates[7].label}</h6>
                  <p>{orders[0].statusDates[7].desc}</p>
                </div>
              </div>
            )}

            {orders[0].statusDates[8] && (
              <div className="order-status-single-log">
                <div className="order-details-date">
                  {orders[0].statusDates[8].date
                    ? moment(orders[0].statusDates[8].date).format("DD/MM/YY")
                    : ""}
                </div>
                <div className="order-details-status-progress">
                  <div
                    className={
                      orders[0].statusDates[8].date
                        ? "status-circle-log-checked"
                        : "status-circle-log-unchecked"
                    }
                  >
                    <i className="lni lni-checkmark"></i>
                  </div>
                </div>
                <div className="order-details-description">
                  <h6>{orders[0].statusDates[8].label}</h6>
                  <p>{orders[0].statusDates[8].desc}</p>
                </div>
              </div>
            )}

            {orders[0].statusDates[9] && (
              <div className="order-status-single-log">
                <div className="order-details-date">
                  {orders[0].statusDates[9].date
                    ? moment(orders[0].statusDates[9].date).format("DD/MM/YY")
                    : ""}
                </div>
                <div className="order-details-status-progress">
                  <div
                    className={
                      orders[0].statusDates[9].date
                        ? "status-circle-log-checked"
                        : "status-circle-log-unchecked"
                    }
                  >
                    <i className="lni lni-checkmark"></i>
                  </div>
                </div>
                <div className="order-details-description">
                  <h6>{orders[0].statusDates[9].label}</h6>
                  <p>{orders[0].statusDates[9].desc}</p>
                </div>
              </div>
            )}

            {orders[0].statusDates[10] && (
              <div className="order-status-single-log">
                <div className="order-details-date">
                  {orders[0].statusDates[10].date
                    ? moment(orders[0].statusDates[10].date).format("DD/MM/YY")
                    : ""}
                </div>
                <div className="order-details-status-progress">
                  <div
                    className={
                      orders[0].statusDates[10].date
                        ? "status-circle-log-checked"
                        : "status-circle-log-unchecked"
                    }
                  >
                    <i className="lni lni-checkmark"></i>
                  </div>
                </div>
                <div className="order-details-description">
                  <h6>{orders[0].statusDates[10].label}</h6>
                  <p>{orders[0].statusDates[10].desc}</p>
                </div>
              </div>
            )}
          </div>

          <div className="product">
            <div className="purchase-row">
              <div className="negative-padding-custom box-shadow">
                <div className="order-row-banner d-flex justify-content-between d-flex align-items-center">
                  <div className="color-white purchase-update-time">
                    Last Updated:{" "}
                    {moment(orders[0].updatedAt).format("DD/MM/YY")}
                  </div>
                  <h6 className="purchase-order-status">
                    {orders[0].orderStatus.toUpperCase()}
                  </h6>
                </div>

                {orders[0].orderLine && (
                  <PurchasedProduct
                    userID={user._id}
                    userImage={user.image}
                    orderLines={orders[0].orderLine}
                    orderStatus={orders[0].orderStatus}
                  />
                )}

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    <div className="price d-flex justify-content-end align-items-center">
                      <div className="">Order Total:</div>
                      <div className="spacer"></div>
                      <h4 className="order-total unichem-text-color">
                        ₱ {orders[0].totalPrice}
                      </h4>
                    </div>
                    {/* <div className="purchase-options">
                      <div className="d-flex justify-content-end button">
                        <Link to="/product-details" className="btn">
                          Buy Again
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderLogInformation;
