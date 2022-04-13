import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders, resetOrder } from "../features/orders/orderSlice";
import { getProducts, resetProduct } from "../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import PurchasedProduct from "./PurchasedProduct";
import Review from "./ReviewModal";
import Spinner from "../components/Spinner";
import ReactPaginate from "react-paginate";

const ProfilePurchase = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const moment = require("moment");

  const { orders, isOrderLoading, isOrderError, orderMessage } = useSelector(
    (state) => state.orders
  );

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  const { user } = useSelector((state) => state.auth);

  const [orderStatus, setOrderStatus] = useState("All");

  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    if (isProductError) {
      console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [isProductError, productMessage, dispatch]);

  useEffect(() => {
    if (isOrderError) {
      console.log(orderMessage);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getOrders());

    return () => {
      dispatch(resetOrder());
    };
  }, [user, navigate, isOrderError, orderMessage, dispatch]);

  if (isOrderLoading || isProductLoading) {
    return (
      <>
        <div className="empty-container"></div>
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

  switch (orderStatus) {
    case "To Pay": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "toPay"
      );
      break;
    }
    case "To Ship": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "toShip"
      );
      break;
    }
    case "To Receive": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "toReceive"
      );
      break;
    }
    case "Completed": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "completed"
      );
      break;
    }
    case "Cancelled": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "cancelled"
      );
      break;
    }
    case "Failed": {
      let statusOrders = orders.filter(
        (order) => order.orderStatus === "failed"
      );
      break;
    }
    default: {
      let statusOrders = orders;
      break;
    }
  }

  let statusOrders = JSON.parse(JSON.stringify(orders));

  const pageCount = Math.ceil(statusOrders.length / ordersPerPage);
  statusOrders = statusOrders.slice(pagesVisited, pagesVisited + ordersPerPage);

  return (
    <div className="purchase-products-column">
      <div className="product-grid">
        {/* <div className="d-flex product-filter align-items-center">
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
            <option>Delivered</option>
          </select>
        </div> */}
        <div className="order-status">
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
        </div>
      </div>

      <div className="product">
        {/* Product Purchase one */}
        {statusOrders.map((order) => (
          <div key={order._id} className="purchase-row">
            <div className="negative-padding-custom box-shadow">
              <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
                <div className="color-white">Order ID: {order._id}</div>
                <div className="color-white purchase-update-time">
                  Order Date: {moment(order.createdAt).format("DD/MM/YY")}
                </div>
                <h6 className="purchase-order-status">
                  {order.orderStatus.toUpperCase()}
                </h6>
              </div>

              {/* ORDERLINE START HERE */}

              <PurchasedProduct
                products={products}
                orderLines={order.orderLine}
              />

              {/* END OF ORDERLINE */}

              <div className="no-box-shadow">
                <div className="order-total-row">
                  <div className="price d-flex justify-content-end align-items-center">
                    <div className="">Order Total:</div>
                    <div className="spacer"></div>
                    <h4 className="unichem-text-color">₱{order.totalPrice.toFixed(2)}</h4>
                  </div>
                  <br></br>
                  <div className="purchase-options">
                    <div className="d-flex justify-content-end button">
                      <Review />
                      <Link to="/product-details" className="btn">
                        Buy Again
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

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
