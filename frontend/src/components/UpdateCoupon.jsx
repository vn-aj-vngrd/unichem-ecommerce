import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCoupon } from "../features/coupons/couponSlice";

const UpdateCoupon = (coupon) => {
  const moment = require("moment");
  const dispatch = useDispatch();

  const {
    register,
    // control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    const defaultValues = {
      couponCode: coupon.coupon.couponCode,
      couponType: coupon.coupon.couponType,
      description: coupon.coupon.description,
      discount: coupon.coupon.discount,
      requiredAmount: coupon.coupon.requiredAmount,
      limit: coupon.coupon.limit,
      startDate: moment(coupon.coupon.startDate)
        .format("YYYY-MM-DD")
        .toString(),
      expiryDate: moment(coupon.coupon.expiryDate)
        .format("YYYY-MM-DD")
        .toString(),
    };
    reset(defaultValues);
  }, [coupon, reset, moment]);

  const startDate = watch("startDate");
  const expiryDate = watch("expiryDate");

  const onSubmit = (data) => {
    const couponData = {
      _id: coupon.coupon._id,
      ...data,
    };
    dispatch(updateCoupon(couponData));
  };

  return (
    <div className="button">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={"#modal-form" + coupon.coupon._id}
      >
        Update
      </button>
      <div
        className="modal fade"
        id={"modal-form" + coupon.coupon._id}
        tabindex="-1"
        role="dialog"
        aria-labelledby="modal-form"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card p-3 p-lg-4">
                <button
                  type="button"
                  className="btn-close ms-auto"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h1 className="mb-0 h4">Coupon Information</h1>
                </div>
                <form
                  action="#"
                  className="mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Coupon Code</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          {...register("couponCode", {
                            required: {
                              value: true,
                              message: "Coupon code is required.",
                            },
                          })}
                          style={{
                            border: errors.couponCode
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                      </div>
                      {errors.couponCode && (
                        <p className="error-message">
                          ⚠ {errors.couponCode.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Coupon Type</label>
                      <div className="input-group">
                        <select
                          className="form-select"
                          {...register("couponType", {
                            required: {
                              value: true,
                              message: "Coupon type is required.",
                            },
                            validate: (value) =>
                              "" !== value || "Coupon type is required",
                          })}
                          style={{
                            border: errors.couponType
                              ? "1px solid #f44336"
                              : "",
                          }}
                        >
                          <option value="order-discount">order-discount</option>
                          <option value="shipping-discount">
                            shipping-discount
                          </option>
                        </select>
                      </div>
                      {errors.couponType && (
                        <p className="error-message">
                          ⚠ {errors.couponType.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label htmlFor="textarea">Description</label>
                      <div className="input-group">
                        <textarea
                          className="form-control"
                          id="description"
                          rows="8"
                          {...register("description", {
                            required: {
                              value: true,
                              message: "Description is required",
                            },
                          })}
                          style={{
                            border: errors.description
                              ? "1px solid #f44336"
                              : "",
                          }}
                        ></textarea>
                      </div>
                      {errors.description && (
                        <p className="error-message">
                          ⚠ {errors.description.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Discount</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          step="any"
                          {...register("discount", {
                            required: {
                              value: true,
                              message: "Discount is required.",
                            },
                            min: {
                              value: 0,
                              message: "Discount must be greater than 0.",
                            },
                          })}
                          style={{
                            border: errors.discount ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>

                      {errors.discount && (
                        <p className="error-message">
                          ⚠ {errors.discount.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Required Amount</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          {...register("requiredAmount", {
                            required: {
                              value: true,
                              message: "Required amount is required.",
                            },
                            min: {
                              value: 0,
                              message:
                                "Required amount must be greater than 0.",
                            },
                          })}
                          style={{
                            border: errors.requiredAmount
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                      </div>

                      {errors.requiredAmount && (
                        <p className="error-message">
                          ⚠ {errors.requiredAmount.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Limit</label>
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          {...register("limit", {
                            required: {
                              value: true,
                              message: "Limit is required.",
                            },
                            min: {
                              value: 0,
                              message: "Limit must be greater than 0.",
                            },
                          })}
                          style={{
                            border: errors.limit ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>

                      {errors.limit && (
                        <p className="error-message">
                          ⚠ {errors.limit.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Start Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          {...register("startDate", {
                            required: {
                              value: true,
                              message: "Start date is required.",
                            },
                            max: {
                              value: expiryDate,
                              message:
                                "Expiry date must be later than the start date.",
                            },
                          })}
                          style={{
                            border: errors.startDate ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.startDate && (
                        <p className="error-message">
                          ⚠ {errors.startDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Expiry Date</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          {...register("expiryDate", {
                            required: {
                              value: true,
                              message: "Expiry date is required.",
                            },
                            min: {
                              value: startDate,
                              message:
                                "Expiry date must be later than the start date.",
                            },
                          })}
                          style={{
                            border: errors.expiryDate
                              ? "1px solid #f44336"
                              : "",
                          }}
                        />
                      </div>
                      {errors.expiryDate && (
                        <p className="error-message">
                          ⚠ {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="d-grid button">
                    {errors ? (
                      <button className="btn">Save Changes</button>
                    ) : (
                      <button
                        type="submit"
                        className="btn"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCoupon;
