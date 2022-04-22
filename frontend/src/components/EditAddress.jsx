// import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../features/auth/authSlice"; //resetUser
// import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const EditAddress = ({ index }) => {
  const dispatch = useDispatch();

  //  isLoading, isError, isSuccess, message
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressNameUpdate: user.address[index].addressName,
      address1Update: user.address[index].address1,
      address2Update: user.address[index].address2,
      postalCodeUpdate: user.address[index].postalCode,
      phoneNumberUpdate: user.address[index].phoneNumber,
    },
  });

  // Update user address
  const onSubmitUpdate = (data) => {
    const address = JSON.parse(JSON.stringify(user.address));

    address[index] = {
      addressName: data.addressNameUpdate,
      address1: data.address1Update,
      address2: data.address2Update,
      postalCode: data.postalCodeUpdate,
      phoneNumber: data.phoneNumberUpdate,
    };

    const userData = {
      address: address,
    };

    dispatch(update(userData));
    toast.success("Address updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <>
      <div className="checkout-steps-form-style">
        <ul id="accordionExample">
          <li>
            <form className="form" onSubmit={handleSubmit(onSubmitUpdate)}>
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
                      {...register("addressNameUpdate", {
                        required: {
                          value: true,
                          message: "Address name is required.",
                        },
                      })}
                      style={{
                        border: errors.addressNameUpdate
                          ? "1px solid #f44336"
                          : "",
                      }}
                    />
                    {errors.addressNameUpdate && (
                      <p className="error-message">
                        ⚠ {errors.addressNameUpdate.message}
                      </p>
                    )}
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
                        {...register("address1Update", {
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
                          border: errors.address1Update
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.address1Update && (
                        <p className="error-message">
                          ⚠ {errors.address1Update.message}
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
                        id="address2Update"
                        {...register("address2Update", {
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
                          border: errors.address2Update
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.address2Update && (
                        <p className="error-message">
                          ⚠ {errors.address2Update.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="single-form form-default">
                      <label className="form-label">Postal Code</label>
                      <input
                        type="text"
                        className="form-control"
                        id="postalCodeUpdate"
                        {...register("postalCodeUpdate", {
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
                          border: errors.postalCodeUpdate
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.postalCodeUpdate && (
                        <p className="error-message">
                          ⚠ {errors.postalCodeUpdate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-6">
                    <div className="single-form form-default">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNumberUpdate"
                        {...register("phoneNumberUpdate", {
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
                          border: errors.phoneNumberUpdate
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.phoneNumberUpdate && (
                        <p className="error-message">
                          ⚠ {errors.phoneNumberUpdate.message}
                        </p>
                      )}
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
