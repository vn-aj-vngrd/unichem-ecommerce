import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PricingTable = () => {
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="total-amount">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-12"></div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="right">
                  <h5 className="heading">Pricing Table</h5>
                  <hr></hr>
                  <ul>
                    <li>
                      Total Items
                      <span>
                        <p className="fw-bold">69 Items</p>
                      </span>
                    </li>
                    <li>
                      Cart Subtotal
                      <span>
                        <p className="fw-bold">₱2000.00</p>
                      </span>
                    </li>
                    <li>
                      Shipping Fee
                      <span>
                        <p className="fw-bold">Free</p>
                      </span>
                    </li>
                  </ul>
                  <hr></hr>
                  <div>
                    <label className="form-label">Discount Coupon</label>
                    <input className="form-control" type="text"></input>
                  </div>
                </div>

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    <div className="price d-flex justify-content-between align-items-center">
                      <div>Order Total:</div>
                      <div className="spacer"></div>
                      <h5 className="text-danger">$199.00</h5>
                    </div>

                    <div className="button mt-4">
                      <Link to="/checkout" className="btn checkout-btn">
                        Checkout
                      </Link>
                    </div>
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

export default PricingTable;
