import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, resetUser } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Recovery = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [emailError, setEmailError] = useState();

  useEffect(() => {
    document.title = "Unichem Store | Recover Account";

    if (isError) {
      setEmailError(message);
    }

    if (isSuccess) {
      Swal.fire({
        title: "Recovery Link Sent",
        text: message,
        icon: "warning",
        confirmButtonColor: "#f44336",
        confirmButtonText: "Ok",
      });

      // navigate("/");
    }

    if (user) {
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

    setEmailError();

    if (formData.email === "") {
      setEmailError("Email address is required");
      return;
    }

    const recoveryData = {
      email,
    };

    console.log(recoveryData);

    // dispatch(login(userData));
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
            <h2>Recover Account</h2>
            <p>
              We'll send instructions to your email for recovery.
              <br />
              Please input your email address below.
            </p>
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

                  <div className="button">
                    <button className="btn" type="submit">
                      Send
                    </button>
                  </div>
                  <div className="text-center mt-4">
                    {emailError && (
                      <small className="text-red">{emailError}</small>
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

export default Recovery;
