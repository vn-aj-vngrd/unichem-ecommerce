import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders, resetOrder } from "../features/orders/orderSlice";
import { getProducts, resetProduct } from "../features/products/productSlice";
import { useSelector, useDispatch } from "react-redux";
import PurchasedProduct from "./PurchasedProduct";
import Review from "./ReviewModal";
import Spinner from "../components/Spinner";

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

  useEffect(() => {
    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [isProductError, productMessage, dispatch]);

  if (isOrderLoading || isProductLoading) {
    return (
      <>
        {/* <div className="empty-container"></div> */}
        <Spinner />
      </>
    );
  }

  let statusOrders = JSON.parse(JSON.stringify(orders));

  console.log(orders)

  return (
    <div className="purchase-products-column">
      <div className="product-grid">
        <div className="d-flex product-filter align-items-center">
          <label className="sort-element">Order Status: </label>
          <select className="form-select sort-element" id="sorting">
            <option>All</option>
            <option>To Pay</option>
            <option>To Ship</option>
            <option>To Receive</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="d-flex product-filter align-items-center">
          <label className="sort-element">Sort by: </label>
          <select className="form-select sort-element" id="sorting">
            <option>Popularity</option>
            <option>Low - High Price</option>
            <option>High - Low Price</option>
            <option>Average Rating</option>
            <option>A - Z Order</option>
            <option>Z - A Order</option>
          </select>
        </div>
      </div>

      <div className="product">
        {/* Product Purchase one */}
        {statusOrders.map((order) => (
          <div key={order.orderID} className="purchase-row">
            <div className="negative-padding-custom box-shadow">
              <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
                <div className="color-white">Order ID: {order.orderID}</div>
                <div className="color-white purchase-update-time">
                  Order Date: {moment(order.orderDate).format("DD/MM/YY")}
                </div>
                <h6 className="purchase-order-status">
                  {order.orderStatus.toUpperCase()}
                </h6>
              </div>

              {/* ORDERLINE START HERE */}

              <PurchasedProduct
                orderID={order.orderID}
                products={products}
                productOrders={order.products}
              /> 

              {/* END OF ORDERLINE */}


              <div className="no-box-shadow">
                <div className="order-total-row">
                  <div className="price d-flex justify-content-end align-items-center">
                    <div className="">Order Total:</div>
                    <div className="spacer"></div>
                    <h4 className="unichem-text-color">${order.orderTotal}</h4>
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
            <li className="page-item disabled">
              <a
                className="page-link"
                href="/"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ProfilePurchase;
