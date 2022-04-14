import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { login, resetUser } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [passMin, setPassMin] = useState();
  const [loginError, setLoginError] = useState();

  useEffect(() => {
    if (isError) {
      if (
        message ===
        "A verification link has been sent to your email address. Please verify your email in one hour to login."
      ) {
        Swal.fire({
          title: "Please verify your email",
          text: "A verification link has been sent to your email address. Please verify your email in one hour to login.",
          icon: "warning",
          confirmButtonColor: "#f44336",
          confirmButtonText: "Ok",
        });
      } else {
        setLoginError(message);
      }
    }

    document.title = "Unichem Store | Log in";

    if (isSuccess || user) {
      const temp = localStorage.getItem("user");
      const user = JSON.parse(temp);
      toast.success(`Welcome, ${user.name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/");
    }

    dispatch(resetUser());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setPassMin();
    setLoginError();

    if (password.length < 8) {
      setPassMin("Must be at least 8 characters");
      return;
    }

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
              <form className="card login-form" onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group input-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={onChange}
                      required
                    />
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
                    {passMin && <small className="text-red">{passMin}</small>}
                    {loginError && <small className="text-red">{loginError}</small>}
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
