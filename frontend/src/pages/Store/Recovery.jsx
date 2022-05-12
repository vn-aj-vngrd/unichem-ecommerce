import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  validateRecovery,
  recoverAccount,
  resetUser,
} from "../../features/auth/authSlice";
import PageNotFound from "../PageNotFound";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Verification = () => {
  const [call, setCall] = useState(false);
  const [validUrl, setValidUrl] = useState(false);
  const [error, setError] = useState();

  const [formData, setFormData] = useState({
    password1: "",
    password2: "",
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const { password1, password2 } = formData;

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isAccountRecovered } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Account Recovery";

    if (user) {
      navigate("/");
    }

    if (!call) {
      dispatch(validateRecovery(param));
      setCall(true);
    }

    if (isSuccess) {
      setValidUrl(true);
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

    return () => {
      dispatch(resetUser());
    };
  }, [user, param, isSuccess, isAccountRecovered, call, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    setError();

    if (formData.password1.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (formData.password1 !== formData.password2) {
      setError("Password does not match");
      return;
    }

    const recoveryData = {
      param,
      password: password1,
    };

    dispatch(recoverAccount(recoveryData));
  };

  return (
    <>
      {validUrl ? (
        <div className="account-login">
          {isLoading ? (
            <div className="container">
              <Spinner />
            </div>
          ) : (
            <div className="container">
              <div className="section-title">
                <h2>Recover Account</h2>
                <p>Please input your new password below.</p>
              </div>
              <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                  <form className="card login-form" onSubmit={onSubmit}>
                    <div className="card-body">
                      <div className="form-group input-group">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password1"
                          name="password1"
                          value={password1}
                          onChange={onChange}
                          required
                        />
                      </div>

                      <div className="form-group input-group">
                        <label>Confirm New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password2"
                          name="password2"
                          value={password2}
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
                        {error && <small className="text-red">{error}</small>}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <PageNotFound />
        </>
      )}
    </>
  );
};

export default Verification;
