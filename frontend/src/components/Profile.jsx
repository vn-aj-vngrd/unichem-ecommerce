// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: user.name,
    birthday: user.birthday,
    sex: user.sex,
    email: user.email,
    password: "",
    currentPassword: "",
  });

  const { name, birthday, sex, email, password, currentPassword } = formData;

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

    // dispatch(get());
    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      birthday,
      sex,
      email,
      password,
      currentPassword,
    };
    // console.log(userData);
    dispatch(update(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Profile</h5>
      </div>

      <div className="contact-form-head">
        <div className="form-main">
          <form className="form" onSubmit={onSubmit}>
            <h5>Personal Information</h5>
            <br />
            <div className="profile-information-image-section">
              <img
                className="profile-information-image"
                src={user.image}
                alt="#"
              />
              <br />
              <h5>{user.name}</h5>
            </div>
            <hr></hr>
            <br />
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Birthday</label>
                  <input
                    name="birthday"
                    type="date"
                    value={birthday}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  name="sex"
                  value={sex}
                  onChange={onChange}
                  required
                >
                  {user.sex === "Male" ? (
                    <>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </>
                  ) : (
                    <>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </>
                  )}
                </select>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    name="currentPassword"
                    type="password"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    name="password"
                    type="password"
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <br />
              <div className="col-12">
                <div className="form-group button text-center">
                  <br />
                  <button type="submit" className="btn ">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
