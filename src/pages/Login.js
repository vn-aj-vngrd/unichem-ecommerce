import React from "react";
import {Link} from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Login</h2>
              <p>Welcome to UniChem, please login.</p>
            </div>
          </div>
        </div>
        <form className="container border p-4 mb-5 w-50">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="button text-center pt-2">
            <button type="submit" class="btn">
              LOGIN
            </button>
          </div>

          <div className="container text-center mt-3">
            <p>Don't have an account yet? <Link to="/signup" className="text-danger">Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
