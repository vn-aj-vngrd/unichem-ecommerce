import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    sex: "",
    email: "",
    address1: "",
    address2: "",
    postalCode: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const {
    name,
    birthday,
    sex,
    email,
    address1,
    address2,
    postalCode,
    phoneNumber,
    password,
    confirmPassword,
  } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    document.title = "Unichem Store | Sign up";

    if (isSuccess || user) {
      const temp = localStorage.getItem("user");
      const user = JSON.parse(temp);
      toast.success(`Welcome, ${user.name}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      const userData = {
        name,
        birthday,
        sex,
        email,
        address: {
          address1,
          address2,
          postalCode,
          phoneNumber,
        },
        password,
        confirmPassword,
      };
      // console.log(userData);

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
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
        <form
          onSubmit={onSubmit}
          className="col-lg-10 col-md-10 offset-md-1 col-12 p-5 row g-3"
        >
          <div className="fw-bold">Personal Information</div>
          <hr />
          <div className="col-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Email Address</label>
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
          <div className="col-6 mb-3">
            <label className="form-label">Birthday</label>
            <input
              type="date"
              className="form-control"
              id="birthday"
              name="birthday"
              value={birthday}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Birthday</label>
            <select
              className="form-select"
              id="sex"
              name="sex"
              value={sex}
              onChange={onChange}
              required
            >
              <option value="" disabled>
                Please select your sex
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
              required
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
              required
            />
          </div>

          <div className="fw-bold">Address Information</div>
          <hr />

          <div className="col-6 mb-3">
            <label className="form-label">
              Region, Province, City, Barangay
            </label>
            <input
              type="text"
              className="form-control"
              id="address1"
              name="address1"
              value={address1}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">
              Street Name, Building, House No.
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              name="address2"
              value={address2}
              onChange={onChange}
              required
            />
          </div>
          <div className="col-6 mb-3">
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              className="form-control"
              id="postalCode"
              name="postalCode"
              value={postalCode}
              onChange={onChange}
              required
            />
          </div>

          <div className="col-6 mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={onChange}
              required
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
  );
};

export default Signup;
