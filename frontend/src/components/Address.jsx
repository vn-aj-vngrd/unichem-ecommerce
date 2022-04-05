import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, resetUser } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    postalCode: "",
    phoneNumber: "",
  });
  
  const { address1, address2, postalCode, phoneNumber } = formData;
 
  const onChangeCreate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(user)

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // dispatch(get());
    return () => {
      dispatch(resetUser());
    };
  }, [isError, isSuccess, message, dispatch]);

  const onSubmitCreate = (e) => {
    e.preventDefault();

    const userData = {
      address1,
      address2,
      postalCode,
      phoneNumber,
    };

    // console.log(userData)

    dispatch(update(userData));
    toast.success("Address created successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmitDefault = (index) => {
    // setPrimaryAddress(index);

    const userData = {
      primaryAddress: index,
    };

    console.log(userData);

    dispatch(update(userData));
    toast.success("Address created successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const deleteAddress = (e) => {};

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Addresses</h5>
      </div>

      <div className="address-row">
        {/* Address Row Start Here */}
        {/* If Default */}

        {user.address.map((address, index) =>
          index == user.primaryAddress ? (
            <div key={index}>
              <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
                <div className="color-white purchase-update-time">
                  Last Update Time: mm/dd/yy - hh:mm
                </div>
                <h6 className="purchase-order-status">DEFAULT ADDRESS</h6>
              </div>
              <div className="profile-address-section">
                <div className="d-flex align-items-center">
                  <h4 className="">Address {index + 1}</h4>
                </div>
                <hr></hr>
                <div className="addresses">
                  <div className="profile-address">
                    <ul>
                      <li className="address-header">
                        <h6>Tumapon's Best Residence</h6>
                      </li>
                      <li>
                        <p>
                          <b>Phone:</b> {address.phoneNumber}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Address:</b> {address.address1}, {address.address2}
                          {/* Blk 2 Lot 11, Villa Marina subd. Pajac
                      Lapu-Lapu City, 6015, Cebu, Philippines Pajac, Lapu-Lapu
                      City Visayas, Cebu 6015 */}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Postal Code:</b> {address.postalCode}
                        </p>
                      </li>
                    </ul>
                    <br></br>
                    <div className="address-options button">
                      <button
                        to="/checkout"
                        onClick={() => onSubmitDefault(index)}
                        className="btn set-default-btn"
                      >
                        Set as Default
                      </button>
                      <button
                        to="/product-details"
                        // onClick={deleteAddress}
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + index.toString()}
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        className="btn-line second-option-btn title collapsed"
                      >
                        Edit
                      </button>
                      <button
                        to="/product-details"
                        onClick={deleteAddress}
                        className="btn-line second-option-btn"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="checkout-steps-form-style">
                      <ul id="accordionExample">
                        <li className="">
                          <form
                            className="form"
                            // onSubmit={onSubmitData}
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
                              id={"collapse" + index.toString()}
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="row">
                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Region, Province, City, Barangay
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1"
                                      name="address1"
                                      // value={address1}
                                      // onChange={onChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Street Name, Building, House No.
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address2"
                                      name="address2"
                                      // value={address2}
                                      // onChange={onChange}
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
                                      id="postalCode"
                                      name="postalCode"
                                      // value={postalCode}
                                      // onChange={onChange}
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
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      // value={phoneNumber}
                                      // onChange={onChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="steps-form-btn button">
                                    <button className="btn" type="submit">
                                      Save Changes
                                    </button>
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
          ) : (
            <div key={index}>
              <div className="profile-address-section">
                <div className="d-flex align-items-center">
                  <h4 className="">Address {index + 1}</h4>
                </div>
                <hr></hr>
                <div className="addresses">
                  <div className="profile-address">
                    <ul>
                      <li className="address-header">
                        <h6>Tumapon's Best Residence</h6>
                      </li>
                      <li>
                        <p>
                          <b>Phone:</b> {address.phoneNumber}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Address:</b> {address.address1}, {address.address2}
                          {/* Blk 2 Lot 11, Villa Marina subd. Pajac
                      Lapu-Lapu City, 6015, Cebu, Philippines Pajac, Lapu-Lapu
                      City Visayas, Cebu 6015 */}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Postal Code:</b> {address.postalCode}
                        </p>
                      </li>
                    </ul>
                    <br></br>
                    <div className="address-options button">
                      <button
                        to="/checkout"
                        onClick={() => onSubmitDefault(index)}
                        className="btn set-default-btn"
                      >
                        Set as Default
                      </button>
                      <button
                        to="/product-details"
                        // onClick={deleteAddress}
                        data-bs-toggle="collapse"
                        data-bs-target={"#collapse" + index.toString()}
                        aria-expanded="false"
                        aria-controls="collapseOne"
                        className="btn-line second-option-btn title collapsed"
                      >
                        Edit
                      </button>
                      <button
                        to="/product-details"
                        onClick={deleteAddress}
                        className="btn-line second-option-btn"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="checkout-steps-form-style">
                      <ul id="accordionExample">
                        <li className="">
                          <form
                            className="form"
                            // onSubmit={onSubmitData}
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
                              id={"collapse" + index.toString()}
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="row">
                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Region, Province, City, Barangay
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1"
                                      name="address1"
                                      // value={address1}
                                      // onChange={onChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Street Name, Building, House No.
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address2"
                                      name="address2"
                                      // value={address2}
                                      // onChange={onChange}
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
                                      id="postalCode"
                                      name="postalCode"
                                      // value={postalCode}
                                      // onChange={onChange}
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
                                      id="phoneNumber"
                                      name="phoneNumber"
                                      // value={phoneNumber}
                                      // onChange={onChange}
                                      required
                                    />
                                  </div>
                                </div>

                                <div className="col-md-12">
                                  <div className="steps-form-btn button">
                                    <button className="btn" type="submit">
                                      Save Changes
                                    </button>
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
          )
        )}

        <div className="checkout-steps-form-style">
          <ul id="accordionExample">
            <li className=" box-shadow">
              <form className="form" onSubmit={onSubmitCreate}>
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Create Address
                </div>
                <section
                  className="checkout-steps-form-content collapse show"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">
                          Region, Province, City, Barangay
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address1"
                          name="address1"
                          value={address1}
                          onChange={onChangeCreate}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">
                          Street Name, Building, House No.
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address2"
                          name="address2"
                          value={address2}
                          onChange={onChangeCreate}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="postalCode"
                          name="postalCode"
                          value={postalCode}
                          onChange={onChangeCreate}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phoneNumber"
                          name="phoneNumber"
                          value={phoneNumber}
                          onChange={onChangeCreate}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="steps-form-btn button">
                        <button className="btn" type="submit">
                          Save Changes
                        </button>
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
  );
};

export default Profile;
