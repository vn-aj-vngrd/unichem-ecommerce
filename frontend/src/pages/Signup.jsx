import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bday: "",
    sex: "",
    email: "",
    address: "",
    province: "",
    city_municipality: "",
    barangay: "",
    password: "",
    confirmPassword: "",
  });

  const {
    firstName,
    lastName,
    bday,
    sex,
    email,
    address,
    province,
    city_municipality,
    barangay,
    password,
    confirmPassword,
  } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault()

  }

  return (
    <div className="signup">
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
        <div className="col-lg-10 col-md-10 offset-md-1 col-12 border p-5 mb-5">
          <form onSubmit={onSubmit} className="row g-3">
            <div className="fw-bold">Personal Information</div>
            <hr />
            <div className="col-6 mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <div className="col-3 mb-3">
              <label className="form-label">Birthday</label>
              <input
                type="date"
                className="form-control"
                id="bday"
                name="bday"
                value={bday}
                onChange={onChange}
              />
            </div>
            <div className="col-3 mb-3">
              <label className="form-label">Sex</label>
              <select
                className="form-select"
                defaultValue={"DEFAULT"}
                id="sex"
                name="sex"
                value={sex}
                onChange={onChange}
              >
                <option value="DEFAULT" disabled>
                  Please select your sex.
                </option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
              />
            </div>

            <div className="fw-bold">Address Information</div>
            <hr />

            <div className="col-6 mb-3">
              <label className="form-label">
                House/Unit/Flr #, Bldg Name, Blk or Lot #
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Province</label>
              <input
                type="text"
                className="form-control"
                id="city_municipality"
                name="city_municipality"
                value={city_municipality}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">City/Municipality</label>
              <input
                type="text"
                className="form-control"
                id="province"
                name="province"
                value={province}
                onChange={onChange}
              />
            </div>
            <div className="col-6 mb-3">
              <label className="form-label">Barangay</label>
              <input
                type="text"
                className="form-control"
                id="barangay"
                name="barangay"
                value={barangay}
                onChange={onChange}
              />
            </div>

            <div className="button text-center pt-2 mb-3">
              <button type="submit" className="btn">
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
