import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, resetUser } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

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
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }

    document.title = "Unichem Store | Sign up";

    if (isSuccess || user) {
      Swal.fire({
        title: "Email Verification Sent",
        text: message,
        icon: "success",
        confirmButtonColor: "#f44336",
      });

      navigate("/login");
    }

    dispatch(resetUser());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (birthday) {
      const today = new Date();
      const birthDate = new Date(birthday);
      let age_now = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age_now--;
      }
      if (age_now < 18) {
        toast.error("You must be at least 18 years old to register.", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        return;
      }
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const addressName = "Primary Address";

    const userData = {
      name,
      birthday,
      sex,
      email,
      address: {
        addressName,
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
  };

  if (isLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container"></div>
      </>
    );
  }

  return (
    <div class="account-login">
      <div class="container">
        <div className="section-title">
          <h2>Sign up</h2>
          <p>Welcome to Unichem, please provide the necessary information.</p>
        </div>
        <div class="row">
          <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
            <div class="register-form">
              <form class="row" onSubmit={onSubmit}>
                <div className="col-sm-12 fw-bold">
                  Personal Information
                  <hr />
                </div>
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
                  <label className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="sex"
                    name="sex"
                    value={sex}
                    onChange={onChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
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

                <div className="col-sm-12 fw-bold">
                  Address Information
                  <hr />
                </div>

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

                <div class="button">
                  <button class="btn" type="submit">
                    Register
                  </button>
                </div>
                <p class="outer-link">
                  Already have an account? <Link to="/login">Login Now</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
