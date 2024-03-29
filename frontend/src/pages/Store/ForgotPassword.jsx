import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createRecovery, resetUser } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    // watch,
    reset,
    formState: { errors },
  } = useForm();

  const [emailError, setEmailError] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Forgot Password";

    reset();

    if (isError) {
      setEmailError(message);
    }

    if (isSuccess) {
      setEmailError();
      Swal.fire({
        title: "Forgot Password Link Sent",
        text: message,
        icon: "success",
        confirmButtonColor: "#f44336",
        confirmButtonText: "Ok",
      });
    }

    if (user) {
      navigate("/");
    }

    dispatch(resetUser());
  }, [user, isError, isSuccess, message, navigate, dispatch, reset]);

  const onSubmit = (data) => {
    dispatch(createRecovery(data));
  };

  return (
    <>
      <div className="account-login">
        {isLoading ? (
          <div className="container">
            <Spinner />
          </div>
        ) : (
          <div className="container">
            <div className="section-title">
              <h2>Forgot Password</h2>
              <p>
                We'll send instructions to your email for recovery.
                <br />
                Please input your email address below.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                <form
                  className="card login-form"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {emailError && (
                    <div
                      className="alert alert-danger text-center"
                      role="alert"
                    >
                      <div>⚠ {emailError}</div>
                    </div>
                  )}
                  <div className="card-body">
                    <div className="form-group input-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        {...register("email", {
                          required: {
                            value: true,
                            message: "Email is required",
                          },
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email is badly formatted",
                          },
                        })}
                        style={{
                          border: errors.email ? "1px solid #f44336" : "",
                        }}
                      />
                      {errors.email && (
                        <p className="error-message">
                          ⚠ {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div className="button">
                      <button className="btn" type="submit">
                        Send
                      </button>
                    </div>
                    <p className="outer-link">
                      Don't have an account yet?{" "}
                      <Link to="/signup" className="text-red">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;
