import { Link } from "react-router-dom";
import PurchasedProduct from "./PurchasedProduct";

// const row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// const star = 4.5;
// const reviews = 5;

const ProfilePurchase = () => {
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
        <>
        <div className="purchase-row">
          <div className="negative-padding-custom box-shadow">
            <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
              <Link to="/product-details" className="underline-link">
                <div className="color-white">Order Status Log </div>
              </Link>
              <div className="color-white purchase-update-time">
                Last Update Time: mm/dd/yy - hh:mm
              </div>
              <h6 className="purchase-order-status">ORDER STATUS</h6>
            </div>

            {/* ORDERLINE START HERE */}

            <PurchasedProduct />

            {/* END OF ORDERLINE */}
            <div className="no-box-shadow">
              <div className="order-total-row">
                <div className="price d-flex justify-content-end align-items-center">
                  <div className="">Order Total:</div>
                  <div className="spacer"></div>
                  <h4 className="unichem-text-color">$199.00</h4>
                </div>
                <br></br>
                <div className="purchase-options">
                  <div className="d-flex justify-content-end button">
                    <Link to="/product-details" className="btn">
                      Buy Again
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>

        {/* Product Purchase one */}
        <>
        <div className="purchase-row">
          <div className="negative-padding-custom box-shadow">
            <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
              <Link to="/product-details" className="underline-link">
                <div className="color-white">Order Status Log </div>
              </Link>
              <div className="color-white purchase-update-time">
                Last Update Time: mm/dd/yy - hh:mm
              </div>
              <h6 className="purchase-order-status">ORDER STATUS</h6>
            </div>

            {/* ORDERLINE START HERE */}

            <PurchasedProduct />

            {/* END OF ORDERLINE */}
            <div className="no-box-shadow">
              <div className="order-total-row">
                <div className="price d-flex justify-content-end align-items-center">
                  <div className="">Order Total:</div>
                  <div className="spacer"></div>
                  <h4 className="unichem-text-color">$199.00</h4>
                </div>
                <br></br>
                <div className="purchase-options">
                  <div className="d-flex justify-content-end button">
                    <Link to="/product-details" className="btn">
                      Buy Again
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>

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
