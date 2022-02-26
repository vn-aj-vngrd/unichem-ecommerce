const Checkout = () => {
  return (
    <section className="checkout-wrapper body-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h6>Shipping Address</h6>
            <section
              className="checkout-steps-form-content collapse"
              id="collapseFour"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="single-form form-default">
                    <label>User Name</label>
                    <div className="row">
                      <div className="col-md-6 form-input form">
                        <input type="text" placeholder="First Name" />
                      </div>
                      <div className="col-md-6 form-input form">
                        <input type="text" placeholder="Last Name" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>Email Address</label>
                    <div className="form-input form">
                      <input type="text" placeholder="Email Address" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>Phone Number</label>
                    <div className="form-input form">
                      <input type="text" placeholder="Phone Number" />
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-form form-default">
                    <label>Mailing Address</label>
                    <div className="form-input form">
                      <input type="text" placeholder="Mailing Address" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>City</label>
                    <div className="form-input form">
                      <input type="text" placeholder="City" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>Post Code</label>
                    <div className="form-input form">
                      <input type="text" placeholder="Post Code" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>Country</label>
                    <div className="form-input form">
                      <input type="text" placeholder="Country" />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="single-form form-default">
                    <label>Region/State</label>
                    <div className="select-items">
                      <select className="form-control">
                        <option value="0">select</option>
                        <option value="1">select option 01</option>
                        <option value="2">select option 02</option>
                        <option value="3">select option 03</option>
                        <option value="4">select option 04</option>
                        <option value="5">select option 05</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="checkout-payment-option">
                    <h6 className="heading-6 font-weight-400 payment-title">
                      Select Delivery Option
                    </h6>
                    <div className="payment-option-wrapper">
                      <div className="single-payment-option">
                        <input
                          type="radio"
                          name="shipping"
                          checked
                          id="shipping-1"
                        />
                        <label for="shipping-1">
                          <img
                            src="assets/images/shipping/shipping-1.png"
                            alt="Sipping"
                          />
                          <p>Standerd Shipping</p>
                          <span className="price">$10.50</span>
                        </label>
                      </div>
                      <div className="single-payment-option">
                        <input type="radio" name="shipping" id="shipping-2" />
                        <label for="shipping-2">
                          <img
                            src="assets/images/shipping/shipping-2.png"
                            alt="Sipping"
                          />
                          <p>Standerd Shipping</p>
                          <span className="price">$10.50</span>
                        </label>
                      </div>
                      <div className="single-payment-option">
                        <input type="radio" name="shipping" id="shipping-3" />
                        <label for="shipping-3">
                          <img
                            src="assets/images/shipping/shipping-3.png"
                            alt="Sipping"
                          />
                          <p>Standerd Shipping</p>
                          <span className="price">$10.50</span>
                        </label>
                      </div>
                      <div className="single-payment-option">
                        <input type="radio" name="shipping" id="shipping-4" />
                        <label for="shipping-4">
                          <img
                            src="assets/images/shipping/shipping-4.png"
                            alt="Sipping"
                          />
                          <p>Standerd Shipping</p>
                          <span className="price">$10.50</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="steps-form-btn button">
                    <button
                      className="btn"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      previous
                    </button>
                    <a href="javascript:void(0)" className="btn btn-alt">
                      Save & Continue
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="col-lg-4">
            <div className="checkout-sidebar">
              <div className="checkout-sidebar-coupon">
                <p>Appy Coupon to get discount!</p>
                <form action="#">
                  <div className="single-form form-default">
                    <div className="form-input form">
                      <input type="text" placeholder="Coupon Code" />
                    </div>
                    <div className="button">
                      <button className="btn">apply</button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="checkout-sidebar-price-table mt-30">
                <h5 className="title">Pricing Table</h5>
                <div className="sub-total-price">
                  <div className="total-price">
                    <p className="value">Subotal Price:</p>
                    <p className="price">$144.00</p>
                  </div>
                  <div className="total-price shipping">
                    <p className="value">Subotal Price:</p>
                    <p className="price">$10.50</p>
                  </div>
                  <div className="total-price discount">
                    <p className="value">Subotal Price:</p>
                    <p className="price">$10.00</p>
                  </div>
                </div>
                <div className="total-payable">
                  <div className="payable-price">
                    <p className="value">Subotal Price:</p>
                    <p className="price">$164.50</p>
                  </div>
                </div>
                <div className="price-table-btn button">
                  <a href="javascript:void(0)" className="btn btn-alt">
                    Checkout
                  </a>
                </div>
              </div>
              <div className="checkout-sidebar-banner mt-30">
                <a href="product-grids.html">
                  <img src="assets/images/banner/banner.jpg" alt="#" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
