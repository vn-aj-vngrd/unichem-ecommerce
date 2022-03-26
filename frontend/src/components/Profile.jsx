import { Link } from "react-router-dom";

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
                src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/89595114_2790668074362384_5253522795815501824_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_eui2=AeHXsn03IiqEn6omaUEIHM_Bi_8pd_rKJnGL_yl3-somcSQcauFysieA3LXgKI8yhRkZ1o5VDJ3MtPnrn4tZ3Kzw&_nc_ohc=GUU2jNVQE6sAX-Ni2kI&tn=k5PFbSYe6hUkAfvk&_nc_ht=scontent.fcrk4-1.fna&oh=00_AT-LMPLrqajMuCM7JZGz86dSo4VMp6jG82Tc1BzBiuluWA&oe=623E037F"
              ></img>
              <br></br>
              <h5>Name</h5>
            </div>
            <hr></hr>
            <br></br>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                    <label className="form-label">Name</label>
                  <input
                    name="name"
                    type="text"
                    value="Your Name"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                    <label className="form-label">Birthday</label>
                  <input
                    name="subject"
                    type="text"
                    value="Your Birthday"
                    required="required"
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
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Sex</label>
                  <input
                    name="phone"
                    type="text"
                    value="Sex"
                    required="required"
                  />
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    name="password"
                    type="password"
                    value="Your Password"
                    required="required"
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
                    required="required"
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
