import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, resetUser } from "../features/auth/authSlice";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const UserProfile = () => {
  const dispatch = useDispatch();
  const {
    user,
    isLoading,
    isError,
    isCustomerProfileUpdated,
    isCustomerPasswordUpdated,
    message,
  } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({});

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: resetPassword,
    formState: { errors: errorsPassword },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
      currentPassword: "",
    },
  });

  // const [ selectedFile, setSelectedFile ] = useState("");
  const [ previewSource, setPreviewSource ] = useState("");

  const newPassword = watch("newPassword");

  useEffect(() => {
    const defaultValues = {
      name: user.name,
      birthday: user.birthday,
      sex: user.sex,
      email: user.email,
    };
    reset(defaultValues);
    resetPassword();

    if (isError) {
      toast.error(message);
    }

    if (isCustomerProfileUpdated) {
      toast.success("Profile updated successfully");
    }

    if (isCustomerPasswordUpdated) {
      toast.success("Password updated successfully");
    }

    return () => {
      dispatch(resetUser());
    };
  }, [
    user,
    setValue,
    reset,
    resetPassword,
    isError,
    isCustomerProfileUpdated,
    isCustomerPasswordUpdated,
    message,
    dispatch,
  ]);

  const onSubmitData = (data) => {
    const userData = {
      name: data.name,
      birthday: data.birthday,
      sex: data.sex,
      email: data.email,
    };

    let formData = new FormData();
    
    formData.append("image", data.image[0]);

    for (var key in userData) {
      formData.append(key, userData[key]);
    }

    dispatch(updateUser(formData));
  };

  const onSubmitPassword = (data) => {
    const userData = {
      password: data.newPassword,
      currentPassword: data.currentPassword,
    };

    dispatch(updateUser(userData));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
  }


  const validateAge = (bday) => {
    const today = new Date();
    const birthDate = new Date(bday);

    let age_now = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age_now--;
    }

    return age_now >= 18;
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Profile</h5>
      </div>

      <div className="">
        <div className="checkout-steps-form-style">
          <ul id="accordionExample">
            <li className=" box-shadow">
              <form
                className="form"
                onSubmit={handleSubmit(onSubmitData)}
                encType="multipart/form-data"
              >
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Personal Information
                </div>
                <section
                  className="checkout-steps-form-content collapse show"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <br></br>
                    <div className="profile-information-image-section">
                      <div className="profile-position">
                        <img
                          className="profile-information-image"
                          src={previewSource ? (
                              previewSource
                            ) : (
                              user.image
                            )}
                          alt=" "
                        ></img>
                        
                        <label
                          className="upload-image-label"
                          htmlFor="upload-photo"
                        >
                          <i className="lni lni-pencil"></i>
                        </label>
                        <input
                          type="file"
                          {...register("image")}
                          style={{
                            border: errors.image ? "1px solid #f44336" : "",
                          }}
                          onChange={handleFileInputChange}
                          id="upload-photo"
                        />
                      </div>
                      <br></br>
                      <h5>{user.name}</h5>
                    </div>
                    <br></br>

                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Name</label>
                        <div className="form-input form">
                          <input
                            type="text"
                            className="form-control"
                            {...register("name", {
                              required: {
                                value: true,
                                message: "Name is required",
                              },
                              minLength: {
                                value: 3,
                                message: "Name must be at least 3 characters",
                              },
                            })}
                            style={{
                              border: errors.name ? "1px solid #f44336" : "",
                            }}
                          />
                          {errors.name && (
                            <p className="error-message">
                              ⚠ {errors.name.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Birthday</label>
                        <div className="form-input form">
                          <input
                            type="date"
                            className="form-control"
                            {...register("birthday", {
                              required: {
                                value: true,
                                message: "Birthday is required",
                              },
                              min: {
                                value: "1900-01-01",
                                message: "Age is invalid",
                              },
                              validate: (value) =>
                                validateAge(value) === true ||
                                "You must be at least 18 years old",
                            })}
                            style={{
                              border: errors.birthday
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errors.birthday && (
                            <p className="error-message">
                              ⚠ {errors.birthday.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Email Address</label>
                        <div className="form-input form">
                          <input
                            type="email"
                            className="form-control"
                            {...register("email")}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Gender</label>
                        <div className="form-input form">
                          <select
                            className="form-select"
                            {...register("sex", {
                              required: {
                                value: true,
                                message: "Sex is required",
                              },
                              validate: (value) =>
                                "" !== value || "Sex is required",
                            })}
                            style={{
                              border: errors.sex ? "1px solid #f44336" : "",
                            }}
                          >
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                          {errors.sex && (
                            <p className="error-message">
                              ⚠ {errors.sex.message}
                            </p>
                          )}
                        </div>
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

            <li className=" box-shadow">
              <form
                className="form"
                onSubmit={handleSubmitPassword(onSubmitPassword)}
              >
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Change Password
                </div>
                <section
                  className="checkout-steps-form-content collapse"
                  id="collapseTwo"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">New Password</label>
                        <div className="form-input form">
                          <input
                            type="password"
                            className="form-control"
                            {...registerPassword("newPassword", {
                              required: {
                                value: true,
                                message: "Password is required",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "Password must be at least 8 characters.",
                              },
                            })}
                            style={{
                              border: errorsPassword.newPassword
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errorsPassword.newPassword && (
                            <p className="error-message">
                              ⚠ {errorsPassword.newPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Confirm Password</label>
                        <div className="form-input form">
                          <input
                            type="password"
                            className="form-control"
                            {...registerPassword("confirmNewPassword", {
                              required: {
                                value: true,
                                message: "Confirm new password is required",
                              },
                              validate: (value) =>
                                newPassword === value ||
                                "Passwords do not match",
                            })}
                            style={{
                              border: errorsPassword.confirmNewPassword
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errorsPassword.confirmNewPassword && (
                            <p className="error-message">
                              ⚠ {errorsPassword.confirmNewPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="single-form form-default">
                        <label className="form-label">Current Password</label>
                        <div className="form-input form">
                          <input
                            type="password"
                            className="form-control"
                            {...registerPassword("currentPassword", {
                              required: {
                                value: true,
                                message: "Password is required",
                              },
                              minLength: {
                                value: 8,
                                message:
                                  "Password must be at least 8 characters.",
                              },
                            })}
                            style={{
                              border: errorsPassword.currentPassword
                                ? "1px solid #f44336"
                                : "",
                            }}
                          />
                          {errorsPassword.currentPassword && (
                            <p className="error-message">
                              ⚠ {errorsPassword.currentPassword.message}
                            </p>
                          )}
                        </div>
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

export default UserProfile;
