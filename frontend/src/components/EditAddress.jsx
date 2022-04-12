import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, resetUser } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const EditAddress = ({ index }) => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formDataUpdate, setFormDataUpdate] = useState({
    addressNameUpdate: user.address[index].addressName,
    address1Update: user.address[index].address1,
    address2Update: user.address[index].address2,
    postalCodeUpdate: user.address[index].postalCode,
    phoneNumberUpdate: user.address[index].phoneNumber,
  });

  const {
    addressNameUpdate,
    address1Update,
    address2Update,
    postalCodeUpdate,
    phoneNumberUpdate,
  } = formDataUpdate;

  const onChangeUpdate = (e) => {
    setFormDataUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  return (
    <>
      <div className="checkout-steps-form-style">
        <ul id="accordionExample">
          <li>
            <form className="form" onSubmit={onSubmitUpdate(index)}>
              <section
                className=" collapse"
                id={"collapse" + index.toString()}
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="col-13">
                  <div className="form-default">
                    <label className="form-label">Address Name</label>
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
                    <div className="single-form form-default">
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
                    <div className="single-form form-default">
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
                      <label className="form-label">Postal Code</label>
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
                      <label className="form-label">Phone Number</label>
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
    </>
  );
};

export default EditAddress;
