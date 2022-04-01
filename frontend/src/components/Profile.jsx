// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
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
