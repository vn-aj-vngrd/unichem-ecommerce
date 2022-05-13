import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserOrders,
  cancelOrder,
  resetOrder,
} from "../features/orders/orderSlice";
import { useSelector, useDispatch } from "react-redux";
import PurchasedProduct from "./PurchasedProduct";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ReactPaginate from "react-paginate";

const ProfilePurchase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moment = require("moment");

  const { orders, isOrderLoading, isOrderError, orderMessage, isOrderUpdated } = useSelector(
    (state) => state.orders
  );

  const { user } = useSelector((state) => state.auth);

  const [orderStatus, setOrderStatus] = useState("All");

  const [pageNumber, setPageNumber] = useState(0);

  const handleCancelOrder = (orderID) => {
    dispatch(cancelOrder({ orderID: orderID }));
  };

  useEffect(() => {
    if (isOrderError) {
    }

    if (!user) {
      navigate("/login");
    }

    if (isOrderUpdated) {
      toast.success("Order updated successfully");
    }

    dispatch(getUserOrders());

    return () => {
      dispatch(resetOrder());
    };
  }, [user, navigate, isOrderError, orderMessage, isOrderUpdated, dispatch]);

  if (isOrderLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  // Pagination
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  let statusOrders = JSON.parse(JSON.stringify(orders));

  // 0 - Awaiting Confirmation
  // 1 - Awaiting Payment
  // 2 - Awaiting Fulfillment
  // 3 - Awaiting Shipment
  // 4 - Shipped
  // 5 - Awaiting Pickup
  // 6 - Completed
  // 7 - Cancelled
  // 8 - Declined
  // 9 - Awaiting Return
  // 10 - Returned

  switch (orderStatus) {
    case "Processing": {
      statusOrders = statusOrders.filter(
        (order) =>
          order.orderStatus === "Awaiting Payment" ||
          order.orderStatus === "Awaiting Confirmation" ||
          order.orderStatus === "Awaiting Fulfillment"
      );
      break;
    }
    case "Packed": {
      statusOrders = statusOrders.filter(
        (order) => order.orderStatus === "Awaiting Shipment"
      );
      break;
    }
    case "Shipped": {
      statusOrders = statusOrders.filter(
        (order) =>
          order.orderStatus === "Shiped" ||
          order.orderStatus === "Awaiting Pickup"
      );
      break;
    }
    case "Completed": {
      statusOrders = statusOrders.filter(
        (order) => order.orderStatus === "Completed"
      );
      break;
    }
    case "Cancelled": {
      statusOrders = statusOrders.filter(
        (order) => order.orderStatus === "Cancelled"
      );
      break;
    }
    case "Declined": {
      statusOrders = statusOrders.filter(
        (order) =>
          order.orderStatus === "Declined" ||
          order.orderStatus === "Awaiting Return"
      );
      break;
    }
    case "Returned": {
      statusOrders = statusOrders.filter(
        (order) => order.orderStatus === "Returned"
      );
      break;
    }
    default: {
      break;
    }
  }

  const pageCount = Math.ceil(statusOrders.length / ordersPerPage);
  statusOrders = statusOrders.slice(pagesVisited, pagesVisited + ordersPerPage);


  return (
    <div className="purchase-products-column">
      <div className="product-grid">
        <div className="d-flex product-filter align-items-center">
          <label className="sort-element">Order Status: </label>
          <select
            value={orderStatus}
            onChange={(e) => {
              setOrderStatus(e.target.value);
            }}
            className="form-select sort-element"
            id="sorting"
          >
            <option>All</option>
            <option>Processing</option>
            <option>Packed</option>
            <option>Shipped</option>
            <option>Completed</option>
            <option>Cancelled</option>
            <option>Declined</option>
            <option>Returned</option>
          </select>
        </div>
        {/* <div className="order-status">
          <div className="order-status-progress">
            <div className="order-status-progress-bar progress-packed"></div>
          </div>
          <div className="one-status">
            <button
              onClick={(e) => {
                setOrderStatus("processing");
              }}
              className="btn order-status-circle true"
            >
              <i className="lni lni-cogs"></i>
            </button>
            <p>Processing</p>
          </div>
          <div className="one-status">
            <button
              onClick={(e) => {
                setOrderStatus("packed");
              }}
              className="btn order-status-circle true"
            >
              <i className="lni lni-archive"></i>
            </button>
            <p>Packed</p>
          </div>
          <div className="one-status">
            <button
              onClick={(e) => {
                setOrderStatus("shipped");
              }}
              className="btn order-status-circle"
            >
              <i className="lni lni-ship"></i>
            </button>
            <p>Shipped</p>
          </div>
          <div className="one-status">
            <button
              onClick={(e) => {
                setOrderStatus("delivered");
              }}
              className="btn order-status-circle"
            >
              <i className="lni lni-checkmark"></i>
            </button>
            <p>Delivered</p>
          </div>
        </div> */}
      </div>

      <div className="product">
        {/* Product Purchase one */}
        {statusOrders.length > 0 ? (
          statusOrders.map((order) => (
            <div key={order._id} className="purchase-row">
              <div className="negative-padding-custom box-shadow">
                <div className="order-row-banner d-flex justify-content-between d-flex align-items-center">
                  <Link
                    to={`/order-details/${order._id}`}
                    type="button"
                    className="btn order-status-log color-white"
                  >
                    <i className="lni lni-question-circle pe-1"></i> Order Status log
                  </Link>
                  <div className="color-white purchase-update-time">
                    Order Date: {moment(order.createdAt).format("DD/MM/YY")}
                  </div>
                  <h6 className="purchase-order-status">
                    {order.orderStatus.toUpperCase()}
                  </h6>
                </div>

                {/* ORDERLINE START HERE */}

                <PurchasedProduct
                  userID={user._id}
                  userImage={user.image}
                  orderLines={order.orderLine}
                  orderStatus={order.orderStatus}
                />

                {/* END OF ORDERLINE */}

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    <div className="price d-flex justify-content-end align-items-center">
                      <div className="">Order Total:</div>
                      <div className="spacer"></div>
                      <h4 className="order-total unichem-text-color">
                        ₱{order.totalPrice.toFixed(2)}
                      </h4>
                    </div>
                    <br></br>
                    <div className="purchase-options">
                      <div className="d-flex justify-content-end button order-options">
                        {(order.orderStatus === "Awaiting Confirmation" ||
                        order.orderStatus === "Awaiting Payment" ||
                        order.orderStatus === "Awaiting Fulfillment") && (
                          <button
                            className="btn-alt"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Cancel
                          </button>
                        )}

                        <Link to="/product-details" className="btn">
                          Buy Again
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="empty-result">
              <div className="orders">
                <h4>No orders to display</h4>
              </div>
            </div>
          </>
        )}

        <nav>
          <ul className="product-pagination pagination justify-content-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageRangeDisplayed={8}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"page-link-button"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page"}
              disabledClassName={"disabled"}
              activeClassName={"page-link-active"}
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProfilePurchase;
