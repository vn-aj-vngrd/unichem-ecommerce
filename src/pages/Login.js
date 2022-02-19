import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Log in</h2>
              <p>Welcome to UniChem, please login.</p>
            </div>
          </div>
        </div>
        <form className="container border p-4 mb-5 w-75">
          <div className="mb-3">
            <label className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
            />
          </div>
          <div className="button text-center pt-1">
            <button type="submit" className="btn">
              LOG IN
            </button>
          </div>

          <hr />

          <div className="text-center mt-3">
            <p>
              Don't have an account yet?{" "}
              <Link to="/signup" className="text-danger">
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
