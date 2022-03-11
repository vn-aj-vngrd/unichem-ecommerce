import { useEffect } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Unichem Store | 404";
  });
  return (
    <div className="error-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="error-content">
              <h1>404</h1>
              <h2>Page Not Found!</h2>
              <p>The page you are looking for does not exist.</p>
              <div className="button">
                <Link to="/" className="btn">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
