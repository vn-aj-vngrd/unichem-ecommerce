// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   birthday: "",
  //   sex: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // const {
  //   name,
  //   birthday,
  //   sex,
  //   email,
  //   password,
  //   confirmPassword,
  // } = formData;

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } else {
  //     const userData = {
  //       name,
  //       birthday,
  //       sex,
  //       email,
  //       address: {
  //         address1,
  //         address2,
  //         postalCode,
  //         phoneNumber,
  //       },
  //       password,
  //       confirmPassword,
  //     };
  //     // console.log(userData);

  //     dispatch(register(userData));
  //   }
  // };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  
  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Profile</h5>
      </div>

      <div className="contact-form-head">
        <div className="form-main">
          <form className="form" method="post" action="assets/mail/mail.php">
            <h5>Personal Information</h5>
            <br></br>
            <div className="profile-information-image-section">
              <img
                className="profile-information-image"
                src={user.image}
                alt="#"
              />
              <br></br>
              <h5>{user.name}</h5>
            </div>
            <hr></hr>
            <br></br>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input name="name" type="text" defaultValue={user.name} required />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Birthday</label>
                  <input
                    name="subject"
                    type="date"
                    defaultValue={user.birthday}
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
                    defaultValue="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  id="sex"
                  name="sex"
                  // value={sex}
                  // onChange={onChange}
                  required
                >
                  {user.sex === "Male"? (
                    <>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    </>
                  ):(
                    <>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    </>
                  )}
                </select>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Confirm password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                  />
                </div>
              </div>
              <br></br>
              <div className="col-12">
                <div className="form-group button text-center">
                  <br></br>
                  <button type="submit" className="btn ">
                    Save
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
