import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updatePromo } from "../features/promos/promoSlice";
import { useEffect } from "react";

const UpdatePromotion = (promo) => {
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
      // image: promo.promo.image,
      promoName: promo.promo.promoName,
      description: promo.promo.description,
      startDate: moment(promo.promo.startDate).format("YYYY-MM-DD").toString(),
      expiryDate: moment(promo.promo.expiryDate)
        .format("YYYY-MM-DD")
        .toString(),
    };
    reset(defaultValues);
  }, [promo, reset, moment]);

  const startDate = watch("startDate");
  const expiryDate = watch("expiryDate");

  const onSubmit = (data) => {
    const promoData = {
      _id: promo.promo._id,
      promoName: data.promoName,
      description: data.description,
      startDate: data.startDate,
      expiryDate: data.expiryDate,
    };

    let formData = new FormData();

    if (data.image) {
      formData.append("image", data.image[0]);
    }

    for (var key in promoData) {
      console.log(key, promoData[key]);
      formData.append(key, promoData[key]);
    }

    dispatch(updatePromo(formData));
  };

  return (
    <div className="button">
      <button
        type="button"
        className="btn"
        data-bs-toggle="modal"
        data-bs-target={"#modal-form" + promo.promo._id}
      >
        Update
      </button>
      <div
        className="modal"
        id={"modal-form" + promo.promo._id}
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
                  <h1 className="mb-0 h4">Promotion Information</h1>
                </div>
                <form
                  action="#"
                  className="mt-4"
                  onSubmit={handleSubmit(onSubmit)}
                  enctype="multipart/form-data"
                >
                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Promo Image</label>
                      <div className="input-group">
                        <input
                          type="file"
                          className="form-control"
                          {...register("image")}
                          style={{
                            border: errors.image ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.image && (
                        <p className="error-message">
                          ⚠ {errors.image.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-group mb-4">
                      <label>Promo Name</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          {...register("promoName", {
                            required: {
                              value: true,
                              message: "Product name is required.",
                            },
                          })}
                          style={{
                            border: errors.promoName ? "1px solid #f44336" : "",
                          }}
                        />
                      </div>
                      {errors.promoName && (
                        <p className="error-message">
                          ⚠ {errors.promoName.message}
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
                    {Object.keys(errors).length === 0 && (
                      <button
                        type="submit"
                        className="btn"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      >
                        Save Changes
                      </button>
                    )}
                    {Object.keys(errors).length !== 0 && (
                      <button className="btn">Save Changes</button>
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

export default UpdatePromotion;
