import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signup, resetUser } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [emailEx, setEmailEx] = useState();

  useEffect(() => {
    if (isError) {
      setEmailEx(message);
    }

    document.title = "Unichem Store | Sign up";

    if (isSuccess) {
      Swal.fire({
        title: "Email Verification Sent",
        text: message,
        icon: "success",
        confirmButtonColor: "#f44336",
      });

      navigate("/login");
    }

    if (user) {
      navigate("/");
    }

    return () => {
      dispatch(resetUser());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      birthday: data.birthday,
      sex: data.sex,
      email: data.email,
      address: {
        addressName: "Default Address",
        address1: data.address1,
        address2: data.address2,
        postalCode: data.postalCode,
        phoneNumber: data.phoneNumber,
      },
      password: data.password,
    };

    // console.log(userData);
    dispatch(signup(userData));
  };

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

  // if (isLoading) {
  //   return (
  //     <>
  //       <Spinner />
  //       <div className="empty-container"></div>
  //     </>
  //   );
  // }

  return (
    <div className="account-login">
      {isLoading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <div className="container">
          <div className="section-title">
            <h2>Sign up</h2>
            <p>Welcome to Unichem, please provide the necessary information.</p>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
              <div className="register-form">
                <form className="row" onSubmit={handleSubmit(onSubmit)}>
                  <div className="col-sm-12 fw-bold">
                    Personal Information
                    <hr />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("name", {
                        required: { value: true, message: "Name is required" },
                        minLength: {
                          value: 3,
                          message: "Name must be at least 3 characters",
                        },
                      })}
                      style={{ border: errors.name ? "1px solid #f44336" : "" }}
                    />
                    {errors.name && (
                      <p className="error-message">⚠ {errors.name.message}</p>
                    )}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email is badly formatted",
                        },
                      })}
                      style={{
                        border:
                          errors.email || emailEx ? "1px solid #f44336" : "",
                      }}
                    />
                    {errors.email && (
                      <p className="error-message">⚠ {errors.email.message}</p>
                    )}
                    {emailEx && <p className="error-message">⚠ {emailEx}</p>}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Birthday</label>
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
                        border: errors.birthday ? "1px solid #f44336" : "",
                      }}
                    />
                    {errors.birthday && (
                      <p className="error-message">
                        ⚠ {errors.birthday.message}
                      </p>
                    )}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Sex</label>
                    <select
                      className="form-select"
                      {...register("sex", {
                        required: { value: true, message: "Sex is required" },
                        validate: (value) => "" !== value || "Sex is required",
                      })}
                      style={{ border: errors.sex ? "1px solid #f44336" : "" }}
                    >
                      <option value="">Select Sex</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {errors.sex && (
                      <p className="error-message">⚠ {errors.sex.message}</p>
                    )}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Password is required",
                        },
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters.",
                        },
                      })}
                      style={{
                        border: errors.password ? "1px solid #f44336" : "",
                      }}
                    />
                    {errors.password && (
                      <p className="error-message">
                        ⚠ {errors.password.message}
                      </p>
                    )}
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...register("confirmPassword", {
                        required: {
                          value: true,
                          message: "Confirm Password is required",
                        },
                        validate: (value) =>
                          password === value || "Passwords do not match",
                      })}
                      style={{
                        border: errors.confirmPassword
                          ? "1px solid #f44336"
                          : "",
                      }}
                    />
                    {errors.confirmPassword && (
                      <p className="error-message">
                        ⚠ {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  <div className="col-sm-12 fw-bold">
                    Address Information
                    <hr />
                  </div>

                  <div className="col-6 mb-3">
                    <label className="form-label">
                      Region, Province, City, Barangay
                    </label>
                    <input
                      type="text"
                      className="form-control"
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

                  <div className="col-6 mb-3">
                    <label className="form-label">
                      Street Name, Building, House No.
                    </label>
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="col-6 mb-3">
                    <label className="form-label">Postal Code</label>
                    <input
                      type="text"
                      className="form-control"
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
                        border: errors.postalCode ? "1px solid #f44336" : "",
                      }}
                    />
                    {errors.postalCode && (
                      <p className="error-message">
                        ⚠ {errors.postalCode.message}
                      </p>
                    )}
                  </div>

                  <div className="col-6 mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
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
                        border: errors.phoneNumber ? "1px solid #f44336" : "",
                      }}
                    />
                    {errors.phoneNumber && (
                      <p className="error-message">
                        ⚠ {errors.phoneNumber.message}
                      </p>
                    )}
                  </div>

                  <div className="button">
                    <button className="btn" type="submit">
                      Register
                    </button>
                  </div>
                  <p className="outer-link">
                    Already have an account? <Link to="/login">Login Now</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
