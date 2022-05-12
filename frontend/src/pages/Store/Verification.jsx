import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verifyUser, resetUser } from "../../features/auth/authSlice";
import PageNotFound from "../PageNotFound";
import Spinner from "../../components/Spinner";

const Verification = () => {
  const [call, setCall] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Email Verification";

    if (user) {
      navigate("/");
    }

    if (!call) {
      dispatch(verifyUser(param));

      setCall(true);
    }

    if (isSuccess) {
      setValidUrl(true);
    }

    return () => {
      dispatch(resetUser());
    };
  }, [user, param, isSuccess, call, navigate, dispatch]);

  return (
    <>
      {validUrl ? (
        <div className="content">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="success-area">
              <div className="d-table">
                <div className="d-table-cell">
                  <div className="container">
                    <div className="success-content">
                      <h1>
                        <i className="lni lni-checkmark-circle"></i>
                      </h1>
                      <h2>Email Verified</h2>
                      <p>
                        Your email address has been verified, and you can now
                        access your account.
                      </p>
                      <div className="button">
                        <Link to="/login" className="btn">
                          Log in
                        </Link>
                      </div>
                    </div>
                  </div>
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
