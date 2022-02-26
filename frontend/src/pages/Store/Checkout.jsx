const Checkout = () => {
  return (
    <section className="checkout-wrapper body-content">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="checkout-steps-form-style-1">
              <ul id="accordionExample">
                <li>
                  <div
                    className="title collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Shipping Address
                  </div>
                  <section
                    className="checkout-steps-form-content collapse show"
                    id="collapseOne"
                    aria-labelledby="headingOne"
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
                        <div className="steps-form-btn button">
                          <button
                            className="btn"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
                <li>
                  <div
                    className="title collapsed"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Payment Method
                  </div>
                  <section
                    className="checkout-steps-form-content collapse"
                    id="collapseTwo"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="col-md-12">
                          <div className="checkout-payment-option">
                            <div className="payment-option-wrapper">
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-1"
                                />
                                <label for="payment-1">
                                  <p>Cash on Delivery</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-2"
                                />
                                <label for="payment-2">
                                  <p>Bank Transfer</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-3"
                                />
                                <label for="payment-3">
                                  <p>G-Cash</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-4"
                                />
                                <label for="payment-4">
                                  <p>VISA</p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="checkout-sidebar">
              <div className="checkout-sidebar-price-table">
                <h5 className="title">Pricing Table</h5>
                <div className="sub-total-price">
                  <div className="total-price">
                    <p className="value">Product 1 Price:</p>
                    <p className="price">₱144.00</p>
                  </div>
                  <div className="total-price payment">
                    <p className="value">Product 2 Price:</p>
                    <p className="price">₱10.50</p>
                  </div>
                  <div className="total-price discount">
                    <p className="value">Product 3 Price:</p>
                    <p className="price">₱10.00</p>
                  </div>
                </div>
                <div className="total-payable">
                  <div className="payable-price">
                    <p className="value">Total Price:</p>
                    <p className="price">₱164.50</p>
                  </div>
                </div>
                <div className="price-table-btn button">
                  <button className="btn">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
