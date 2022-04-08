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
    addressName: "",
    address1: "",
    address2: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [formDataUpdate, setFormDataUpdate] = useState({
    addressNameUpdate: "",
    address1Update: "",
    address2Update: "",
    postalCodeUpdate: "",
    phoneNumberUpdate: "",
  });

  const { addressName, address1, address2, postalCode, phoneNumber } = formData;
  const {
    addressNameUpdate,
    address1Update,
    address2Update,
    postalCodeUpdate,
    phoneNumberUpdate,
  } = formDataUpdate;

  const onChangeCreate = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeUpdate = (e) => {
    setFormDataUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

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

    return () => {
      dispatch(resetUser());
    };
  }, [isError, isSuccess, message, dispatch]);

  // Create user address
  const onSubmitCreate = (e) => {
    e.preventDefault();

    const address = JSON.parse(JSON.stringify(user.address));
    address.push({
      addressName,
      address1,
      address2,
      postalCode,
      phoneNumber,
    });

    const userData = {
      address: address,
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

  // Delete user address
  const deleteAddress = (index) => {
    let newPrimaryAddress = user.primaryAddress;

    if (index == newPrimaryAddress) {
      toast.error("Cannot delete a default address", {
        position: "top-center",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const address = JSON.parse(JSON.stringify(user.address));

    console.log(newPrimaryAddress);

    address.splice(index, 1);

    const userData = {
      address: address,
      primaryAddress: newPrimaryAddress,
    };

    dispatch(update(userData));
    toast.success("Address deleted successfully", {
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

  // Set default user address
  const onSubmitDefault = (index) => {
    const userData = {
      primaryAddress: index,
    };

    dispatch(update(userData));

    toast.success("Address updated successfully", {
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

  // Update user address
  const onSubmitUpdate = (index) => (e) => {
    e.preventDefault();

    const address = JSON.parse(JSON.stringify(user.address));

    address[index] = {
      addressName: addressNameUpdate,
      address1: address1Update,
      address2: address2Update,
      postalCode: postalCodeUpdate,
      phoneNumber: phoneNumberUpdate,
    };

    const userData = {
      address: address,
    };

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

  if (isLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container"></div>
      </>
    );
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Addresses</h5>
      </div>

      <div className="address-row">
        {user.address.map((address, index) =>
          index === user.primaryAddress ? (
            <div key={index}>
              <div className="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
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
                        <h6>{user.address[index].addressName}</h6>
                      </li>
                      <li>
                        <p>
                          <b>Phone:</b> {address.phoneNumber}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Address:</b> {address.address1}, {address.address2}
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
                        onClick={() => deleteAddress(index)}
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
                            onSubmit={onSubmitUpdate(index)}
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
                                    value={addressNameUpdate}
                                    onChange={onChangeUpdate}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Region, Province, City, Barangay
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1Update"
                                      name="address1Update"
                                      value={address1Update}
                                      onChange={onChangeUpdate}
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
                                      id="address2Update"
                                      name="address2Update"
                                      value={address2Update}
                                      onChange={onChangeUpdate}
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
                                      value={postalCodeUpdate}
                                      onChange={onChangeUpdate}
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
                                      value={phoneNumberUpdate}
                                      onChange={onChangeUpdate}
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
                        <h6>{user.address[index].addressName}</h6>
                      </li>
                      <li>
                        <p>
                          <b>Phone:</b> {address.phoneNumber}
                        </p>
                      </li>
                      <li>
                        <p>
                          <b>Address:</b> {address.address1}, {address.address2}
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
                        onClick={() => deleteAddress(index)}
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
                            onSubmit={onSubmitUpdate(index)}
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
                                    value={addressNameUpdate}
                                    onChange={onChangeUpdate}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="row">
                                <div className="col-6">
                                  <div className="single-form no-margin form-default">
                                    <label className="form-label">
                                      Region, Province, City, Barangay
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="address1Update"
                                      name="address1Update"
                                      value={address1Update}
                                      onChange={onChangeUpdate}
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
                                      id="address2Update"
                                      name="address2Update"
                                      value={address2Update}
                                      onChange={onChangeUpdate}
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
                                      value={postalCodeUpdate}
                                      onChange={onChangeUpdate}
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
                                      value={phoneNumberUpdate}
                                      onChange={onChangeUpdate}
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
                    <div className="col-13">
                      <div className="single-form form-default">
                        <label className="form-label">Address Name</label>
                        <input
                          type="text"
                          className="form-control"
                          id="addressName"
                          name="addressName"
                          value={addressName}
                          onChange={onChangeCreate}
                          required
                        />
                      </div>
                    </div>

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
                          Create Address
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
