import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  validateRecovery,
  recoverAccount,
} from "../../features/auth/authSlice";
// import PageNotFound from "../PageNotFound";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Verification = () => {
  const [call, setCall] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password1 = watch("password1");

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isSuccess, message, isAccountRecovered, isError } =
    useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Account Recovery";

    if (!call) {
      dispatch(validateRecovery(param));
      setCall(true);
    }

    if (isSuccess) {
      setValidUrl(true);
    }

    if (isError) {
      Swal.fire({
        title: "Something went wrong!",
        text: message,
        icon: "error",
        confirmButtonColor: "#f44336",
      });
      navigate("/login");
    }

    if (isAccountRecovered) {
      Swal.fire({
        title: "Account Recovered",
        text: "You may now proceed to login.",
        icon: "success",
        confirmButtonColor: "#f44336",
      });
      navigate("/login");
    }
  }, [
    param,
    isSuccess,
    isError,
    isAccountRecovered,
    call,
    message,
    navigate,
    dispatch,
  ]);

  const onSubmit = (data) => {
    const recoveryData = {
      param,
      password: data.password1,
    };

    // console.log(recoveryData);
    dispatch(recoverAccount(recoveryData));
  };

  if (isLoading) {
    return (
      <>
        <div className="empty-container-md"></div>
        <Spinner globalSpinner="true" />
      </>
    );
  }

  return (
    <>
      {validUrl ? (
        <div className="account-login">
          <div className="container">
            <div className="section-title">
              <h2>Recover Account</h2>
              <p>Please input your new password below.</p>
            </div>
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                <form
                  className="card login-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="card-body">
                    <div className="form-group input-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("password1", {
                          required: {
                            value: true,
                            message: "Password is required",
                          },
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                          },
                        })}
                        style={{
                          border: errors.password1 ? "1px solid #f44336" : "",
                        }}
                      />
                      {errors.password1 && (
                        <p className="error-message">
                          ⚠ {errors.password1.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group input-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        {...register("password2", {
                          required: {
                            value: true,
                            message: "Confirm Password is required",
                          },
                          validate: (value) =>
                            password1 === value || "Passwords do not match",
                        })}
                        style={{
                          border: errors.password2 ? "1px solid #f44336" : "",
                        }}
                      />
                      {errors.password2 && (
                        <p className="error-message">
                          ⚠ {errors.password2.message}
                        </p>
                      )}
                    </div>

                    <div className="button">
                      <button className="btn" type="submit">
                        Send
                      </button>
                    </div>
                    <div className="text-center mt-4"></div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* <PageNotFound /> */}
        </>
      )}
    </>
  );
};

export default Verification;
