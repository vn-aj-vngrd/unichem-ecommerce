import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import PageNotFound from "../PageNotFound";

const Verification = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();

  useEffect(() => {
    document.title = "Unichem Store | Email Verification";

    const verifyEmailUrl = async () => {
      try {
        const url = `/api/users/${param.id}/verify/${param.token}`;
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        console.log(error);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

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
          <PageNotFound />
        </>
      )}
    </>
  );
};

export default Verification;
