// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, resetUser } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  console.log(user);

  const [formData, setFormData] = useState({
    name: user.name,
    birthday: user.birthday,
    sex: user.sex,
    email: user.email,
    password: "",
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: "",
    image: "",
  });

  const {
    name,
    birthday,
    sex,
    email,
    password,
    newPassword,
    confirmNewPassword,
    currentPassword,
    image,
  } = formData;

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
      dispatch(resetUser());
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
      newPassword,
      confirmNewPassword,
      currentPassword,
      image,
    };

    dispatch(update(userData));
    toast.success("User updated successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Profile</h5>
      </div>

      <div className="">
        <div className="checkout-steps-form-style">
          <form className="form" onSubmit={onSubmit}>
            <ul id="accordionExample">
              <li className=" box-shadow">
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Personal Information
                </div>
                <section
                  className="checkout-steps-form-content collapse show"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <br></br>
                    <div className="profile-information-image-section">
                      <div className="profile-position">
                        <img
                          className="profile-information-image"
                          src={user.image}
                          alt=""
                        ></img>
                        <label
                          className="upload-image-label"
                          htmlFor="upload-photo"
                        >
                          <i className="lni lni-pencil"></i>
                        </label>
                        <input
                          type="file"
                          name="image"
                          value={image}
                          onChange={onChange}
                          id="upload-photo"
                        />
                      </div>
                      <br></br>
                      <h5>{user.name}</h5>
                    </div>
                    <br></br>

                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Name</label>
                        <div className="form-input form">
                          <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Birthday</label>
                        <div className="form-input form">
                          <input
                            name="birthday"
                            type="date"
                            value={birthday}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Email Address</label>
                        <div className="form-input form">
                          <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Gender</label>
                        <div className="form-input form">
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
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="steps-form-btn button">
                        <button
                          className="btn"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </li>

              <li className=" box-shadow">
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Change Password
                </div>
                <section
                  className="checkout-steps-form-content collapse"
                  id="collapseTwo"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">New Password</label>
                        <div className="form-input form">
                          <input
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Confirm Password</label>
                        <div className="form-input form">
                          <input
                            name="ConfirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="single-form form-default">
                        <label className="form-label">Current Password</label>
                        <div className="form-input form">
                          <input
                            name="password"
                            type="password"
                            value={currentPassword}
                            onChange={onChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="steps-form-btn button">
                        <button
                          className="btn"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          type="submit"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
