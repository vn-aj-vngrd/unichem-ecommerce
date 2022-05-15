// import { Link } from "react-router-dom";
import { useEffect } from "react"; // useState
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, resetUser } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import EditAdddress from "../components/EditAddress";

const UserAddress = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message, isCustomerAddressUpdated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isCustomerAddressUpdated) {
      toast.success("Address updated successfully");
    }

    return () => {
      dispatch(resetUser());
    };
  }, [isError, isSuccess, message, isCustomerAddressUpdated, dispatch]);

  // Create user address
  const onSubmit = (data) => {
    const address = JSON.parse(JSON.stringify(user.address));
    address.push({
      addressName: data.addressName,
      address1: data.address1,
      address2: data.address2,
      postalCode: data.postalCode,
      phoneNumber: data.phoneNumber,
    });

    const userData = {
      address: address,
    };

    dispatch(updateUser(userData));
    reset();
  };

  // Delete user address
  const deleteAddress = (index) => {
    let newPrimaryAddress = user.primaryAddress;

    if (index === newPrimaryAddress) {
      toast.error("Cannot delete a default address");
      return;
    }

    const address = JSON.parse(JSON.stringify(user.address));

    address.splice(index, 1);

    const userData = {
      address: address,
      primaryAddress: newPrimaryAddress,
    };

    dispatch(updateUser(userData));
  };

  // Set default user address
  const onSubmitDefault = (index) => {
    const userData = {
      primaryAddress: index,
    };

    dispatch(updateUser(userData));
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Addresses</h5>
      </div>

      <div className="address-row">
        {user.address.map(
          (address, index) =>
            index === user.primaryAddress && (
              <div key={index}>
                <div className="address-row-banner d-flex justify-content-between d-flex align-items-center">
                  <h6 className="purchase-order-status">DEFAULT ADDRESS</h6>
                </div>
                <div className="profile-address-section">
                  <div className="addresses">
                    <div className="profile-address">
                      <ul>
                        <li className="address-header">
                          <h6>
                            <i className="lni lni-map-marker"></i>{" "}
                            {user.address[index].addressName}
                          </h6>
                        </li>
                        <li>
                          <p>
                            <b>Phone:</b> {address.phoneNumber}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Address:</b> {address.address1},{" "}
                            {address.address2}
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
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse" + index.toString()}
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          className="btn-alt second-option-btn title collapsed"
                        >
                          Edit
                        </button>

                        <button
                          to="/product-details"
                          onClick={() => deleteAddress(index)}
                          className="btn-alt second-option-btn"
                        >
                          Delete
                        </button>
                      </div>
                      <EditAdddress index={index} />
                    </div>
                  </div>
                </div>
              </div>
            )
        )}

        {user.address.map(
          (address, index) =>
            index !== user.primaryAddress && (
              <div key={index}>
                <div className="profile-address-section">
                  <div className="addresses">
                    <div className="profile-address">
                      <ul>
                        <li className="address-header">
                          <h6>
                            <i className="lni lni-map-marker"></i>{" "}
                            {user.address[index].addressName}
                          </h6>
                        </li>
                        <li>
                          <p>
                            <b>Phone:</b> {address.phoneNumber}
                          </p>
                        </li>
                        <li>
                          <p>
                            <b>Address:</b> {address.address1},{" "}
                            {address.address2}
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
                          data-bs-toggle="collapse"
                          data-bs-target={"#collapse" + index.toString()}
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          className="btn-alt second-option-btn title collapsed"
                        >
                          Edit
                        </button>

                        <button
                          to="/product-details"
                          onClick={() => deleteAddress(index)}
                          className="btn-alt second-option-btn"
                        >
                          Delete
                        </button>
                      </div>
                      <EditAdddress index={index} />
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
        <div className="checkout-steps-form-style">
          <ul id="accordionExample">
            <li className=" box-shadow">
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
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
                          {...register("addressName", {
                            required: {
                              value: true,
                              message: "Address name is required.",
                            },
                          })}
                          style={{
                            border: errors.addressName
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                        {errors.addressName && (
                          <p className="error-message">
                            ⚠ {errors.addressName.message}
                          </p>
                        )}
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
                          {...register("address1", {
                            required: {
                              value: true,
                              message:
                                "Region, Province, City, Barangay is required",
                            },
                            minLength: {
                              value: 3,
                              message: "Must be at least 5 characters",
                            },
                          })}
                          style={{
                            border: errors.address1 ? "1px solid #f44336" : "",
                          }}
                        />
                        {errors.address1 && (
                          <p className="error-message">
                            ⚠ {errors.address1.message}
                          </p>
                        )}
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
                          {...register("address2", {
                            required: {
                              value: true,
                              message:
                                "Street Name, Building, House No. is required",
                            },
                            minLength: {
                              value: 3,
                              message: "Must be at least 5 characters",
                            },
                          })}
                          style={{
                            border: errors.address2 ? "1px solid #f44336" : "",
                          }}
                        />
                        {errors.address2 && (
                          <p className="error-message">
                            ⚠ {errors.address2.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">Postal Code</label>
                        <input
                          type="number"
                          className="form-control"
                          id="postalCode"
                          {...register("postalCode", {
                            required: {
                              value: true,
                              message: "Postal Code is required",
                            },
                            minLength: {
                              value: 4,
                              message: "Must be at least 4 characters",
                            },
                          })}
                          style={{
                            border: errors.postalCode
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                        {errors.postalCode && (
                          <p className="error-message">
                            ⚠ {errors.postalCode.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="single-form form-default">
                        <label className="form-label">Phone Number</label>
                        <input
                          type="number"
                          className="form-control"
                          id="phoneNumber"
                          {...register("phoneNumber", {
                            required: {
                              value: true,
                              message: "Phone Number is required",
                            },
                            minLength: {
                              value: 11,
                              message: "Must consist of 11 digits",
                            },
                          })}
                          style={{
                            border: errors.phoneNumber
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                        {errors.phoneNumber && (
                          <p className="error-message">
                            ⚠ {errors.phoneNumber.message}
                          </p>
                        )}
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

export default UserAddress;
