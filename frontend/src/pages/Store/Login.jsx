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
        toast.error(message, {
          position: "top-center",
          autoClose: 6500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }

    document.title = "Unichem Store | Log in";

    if (isSuccess || user) {
      const temp = localStorage.getItem("user");
      const user = JSON.parse(temp);
      toast.success(`Welcome, ${user.name}`, {
        position: "top-center",
        autoClose: 6500,
        hideProgressBar: true,
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

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.", {
        position: "top-center",
        autoClose: 6500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Log in</h2>
              <p>Welcome to Unichem Store, please login.</p>
            </div>
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          className="container p-5 col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12"
        >
          <div className="mb-3">
            <label className="form-label">Email Address</label>
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
          <div className="mb-3">
            <label className="form-label">Password</label>
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

          <p>
            <Link className="text-red" to="/recover-account">
              Forgot password?
            </Link>
          </p>

          <div className="button text-center pt-3 pb-3">
            <button type="submit" className="btn">
              Log In
            </button>
          </div>

          <hr />

          <div className="text-center mt-4">
            <p>
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-red">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
