import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Cart";

    if (!user) {
      navigate("/");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  return (
    <>
      <Breadcrumb type="checkout" />
      <section className="checkout-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="checkout-steps-form-style">
                <ul id="accordionExample">
                  <li>
                    <div
                      className="title collapsed"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Products to Purchase
                    </div>
                    <section
                      className="checkout-steps-form-content collapse show"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div>
                          <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
                            <h6 className="purchase-order-status">
                              DEFAULT ADDRESS
                            </h6>
                          </div>
                          <div className="profile-address-section">
                            <div className="d-flex align-items-center">
                              {/* <h4 className="">Address {index + 1}</h4> */}
                            </div>
                            <hr></hr>
                            <div className="addresses">
                              <div className="profile-address">
                                <ul>
                                  <li className="address-header">
                                    {/* <h6>{user.address[index].addressName}</h6> */}
                                  </li>
                                  <li>
                                    <p>
                                      {/* <b>Phone:</b> {address.phoneNumber} */}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      {/* <b>Address:</b> {address.address1},{" "} */}
                                      {/* {address.address2} */}
                                    </p>
                                  </li>
                                  <li>
                                    <p>
                                      {/* <b>Postal Code:</b> {address.postalCode} */}
                                    </p>
                                  </li>
                                </ul>
                                <br></br>

                                <div className="checkout-steps-form-style">
                                  <ul id="accordionExample">
                                    <li className="">
                                      <form
                                        className="form"
                                        // onSubmit={onSubmitUpdate(index)}
                                      >
                                        {/* <div
                          className="title collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse" + index.toString()}
                          aria-expanded="false"
                          aria-controls="collapseOne"
                        >
                          Edit Address
                        </div> */}
                                        <section
                                          className=" collapse"
                                          // id={"collapse" + index.toString()}
                                          aria-labelledby="headingOne"
                                          data-bs-parent="#accordionExample"
                                        >
                                          <div className="col-13">
                                            <div className="single-form form-default">
                                              <label className="form-label">
                                                Address Name
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="addressNameUpdate"
                                                name="addressNameUpdate"
                                                // value={addressNameUpdate}
                                                // onChange={onChangeUpdate}
                                                required
                                              />
                                            </div>
                                          </div>

                                          <div className="row">
                                            <div className="col-6">
                                              <div className="single-form no-margin form-default">
                                                <label className="form-label">
                                                  Region, Province, City,
                                                  Barangay
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="address1Update"
                                                  name="address1Update"
                                                  // value={address1Update}
                                                  // onChange={onChangeUpdate}
                                                  required
                                                />
                                              </div>
                                            </div>

                                            <div className="col-6">
                                              <div className="single-form no-margin form-default">
                                                <label className="form-label">
                                                  Street Name, Building, House
                                                  No.
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="address2Update"
                                                  name="address2Update"
                                                  // value={address2Update}
                                                  // onChange={onChangeUpdate}
                                                  required
                                                />
                                              </div>
                                            </div>
                                            <div className="col-6">
                                              <div className="single-form form-default">
                                                <label className="form-label">
                                                  Postal Code
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="postalCodeUpdate"
                                                  name="postalCodeUpdate"
                                                  // value={postalCodeUpdate}
                                                  // onChange={onChangeUpdate}
                                                  required
                                                />
                                              </div>
                                            </div>

                                            <div className="col-6">
                                              <div className="single-form form-default">
                                                <label className="form-label">
                                                  Phone Number
                                                </label>
                                                <input
                                                  type="text"
                                                  className="form-control"
                                                  id="phoneNumberUpdate"
                                                  name="phoneNumberUpdate"
                                                  // value={phoneNumberUpdate}
                                                  // onChange={onChangeUpdate}
                                                  required
                                                />
                                              </div>
                                            </div>

                                          </div>
                                        </section>
                                      </form>
                                    </li>
                                  </ul>
                                </div>
                              </div>
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
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      Payment Address
                    </div>
                    <section
                      className="checkout-steps-form-content collapse"
                      id="collapseOne"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="single-form form-default">
                            <label>Select Address</label>
                            <div className="form-input form">
                              <select
                                className="form-select"
                                id="address"
                                name="address"
                                // value={address}
                                // onChange={address}
                                required
                              >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
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
                        <div className="col-md-12">
                          <div className="checkout-payment-option">
                            <h6 className="heading-6 font-weight-400 payment-title">
                              Select Delivery Option
                            </h6>
                            <div className="payment-option-wrapper">
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-1"
                                />
                                <label htmlFor="payment-1">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-2"
                                />
                                <label htmlFor="payment-2">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-3"
                                />
                                <label htmlFor="payment-3">
                                  <p>Standerd payment</p>
                                </label>
                              </div>
                              <div className="single-payment-option">
                                <input
                                  type="radio"
                                  name="payment"
                                  id="payment-4"
                                />
                                <label htmlFor="payment-4">
                                  <p>Standerd payment</p>
                                </label>
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
                <div className="checkout-sidebar-coupon">
                  <p>Apply Valid Coupon Here</p>
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
                <div className="checkout-sidebar-price-table mt-3">
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
                    <button className="btn">Checkout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
