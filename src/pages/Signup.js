import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Sign up</h2>
              <p>
                Welcome to UniChem, please provide the necessary information.
              </p>
            </div>
          </div>
        </div>
        <div className="container justify-content-center border p-5 mb-5">
          <form className="row g-3">
            <div className="fw-bold">Personal Information</div>
            <hr />
            <div class="col-6 mb-3">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Email address</label>
              <input type="email" class="form-control" />
            </div>
            <div class="col-3 mb-3">
              <label class="form-label">Birthday</label>
              <input type="date" class="form-control" />
            </div>
            <div class="col-3 mb-3">
              <label class="form-label">Sex</label>
              <select class="form-select">
                <option value="" selected disabled>Please select your sex.</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Password</label>
              <input type="password" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Confirm Password</label>
              <input type="password" class="form-control" />
            </div>

            <div className="fw-bold">Address Information</div>
            <hr />

            <div class="col-6 mb-3">
              <label class="form-label">
                House/Unit/Flr #, Bldg Name, Blk or Lot #
              </label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Province</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">City/Municipality</label>
              <input type="text" class="form-control" />
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">Barangay</label>
              <input type="text" class="form-control" />
            </div>

            <div className="button text-center pt-2">
              <button type="submit" class="btn">
                Sign Up
              </button>
            </div>

            <hr />
            <div className="text-center mt-3">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-danger">
                  {" "}
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
