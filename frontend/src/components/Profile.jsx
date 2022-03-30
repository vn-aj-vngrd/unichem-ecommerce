// import { Link } from "react-router-dom";

const Profile = () => {
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
                src="https://i.mydramalist.com/kEpQwc.jpg"
                alt="#"
              />
              <br></br>
              <h5>Name</h5>
            </div>
            <hr></hr>
            <br></br>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input name="name" type="text" value="Your Name" required />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Birthday</label>
                  <input
                    name="subject"
                    type="text"
                    value="Your Birthday"
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
                    value="Your Email"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Sex</label>
                  <input name="phone" type="text" value="Sex" required />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    value="Your Password"
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
                    value="Confirm Password"
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
