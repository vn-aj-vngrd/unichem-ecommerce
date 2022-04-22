import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, resetUser } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const [loginError, setLoginError] = useState();

  useEffect(() => {
    document.title = "Unichem Store | Log in";

    if (isError) {
      setLoginError("");
      if (
        message ===
          "A verification link has been sent already to your email." ||
        message === "A new verification link has been sent to your email."
      ) {
        Swal.fire({
          title: "Verify your Email",
          text: message,
          icon: "warning",
          confirmButtonColor: "#f44336",
          confirmButtonText: "Ok",
        });
      } else {
        setLoginError(message);
      }
    }

    if (isSuccess || user) {
      // const temp = localStorage.getItem("user");
      // const user = JSON.parse(temp);
      toast.success(`Welcome to Unichem Store, ${user.name.split(" ")[0]}!`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/");
    }

    return () => {
      dispatch(resetUser());
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(login(data));
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container-md"></div>
      </>
    );
  }

  return (
    <>
      <div className="account-login">
        <div className="container">
          <div className="section-title">
            <h2>Log in</h2>
            <p>Welcome to Unichem Store, please login.</p>
          </div>
          <div className="row">
            <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
              <form
                className="card login-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="card-body">
                  <div className="form-group input-group">
                    <label>Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      {...register("email", {
                        required: { value: true, message: "Email is required" },
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
                      <p className="error-message">⚠ {errors.email.message}</p>
                    )}
                  </div>
                  <div className="form-group input-group">
                    <label>Password</label>
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
                          message: "Password must be at least 8 characters",
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
                  <div className="text-end outer-link">
                    <Link to="/recover-account">Forgot password?</Link>
                  </div>
                  <div className="button">
                    <button className="btn" type="submit">
                      Log in
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    {loginError && (
                      <p className="error-message">⚠ {loginError}</p>
                    )}
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
      </div>
    </>
  );
};

export default Login;
