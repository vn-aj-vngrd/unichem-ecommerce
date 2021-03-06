import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { verifyUser } from "../../features/auth/authSlice";
// import PageNotFound from "../PageNotFound";
import Spinner from "../../components/Spinner";
import Swal from "sweetalert2";

const Verification = () => {
  const [call, setCall] = useState(false);
  const [validUrl, setValidUrl] = useState(false);

  const param = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isVerified, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Email Verification";

    if (!call) {
      dispatch(verifyUser(param));
      setCall(true);
    }

    if (isVerified) {
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
  }, [param, isError, message, isVerified, call, navigate, dispatch]);

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
        <div className="content">
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
