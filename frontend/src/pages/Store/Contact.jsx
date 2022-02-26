import { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  useEffect(() => {
    document.title = "Unichem | Products";
  });

  return (
    <div className="mt-225 mb-110">
      <div className="row">
        <div className="col-12">
          <div className="section-title">
            <h2>Contact Us</h2>
            <p>Our company is actively helping our customers drive results with transactions everyday. <br></br> Please call our toll free number or use the form on this page if you have any questions abou our product or services.</p>
          </div>
        </div>
      </div>

      <div className="container main-product-section ">
        <div className="contact-sidebar single-widget search">
          <div class="">
            <div class="single-info-head">
              <div class="single-info">
                <i class="lni lni-map"></i>
                <h5 className="mb-10">Address</h5>

                <ul>
                  <li>Room 212 N & N Cortes Arcade A.C. Cortes Avenue, Ibabao Mandaue City, Cebu, 6014 Philippines</li>
                </ul>
              </div>
              <hr></hr>
              <div class="single-info">
                <i class="lni lni-phone"></i>
                <h5 className="mb-10">Call us on</h5>

                <ul>
                  <li>
                    <Link to="" className="sidebar-nav">
                      (032) 345 6589
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="sidebar-nav">(032) 345 1672</Link>
                  </li>
                </ul>
              </div>
              <hr></hr>
              <div class="single-info">
                <i class="lni lni-envelope"></i>
                <h5 className="mb-10">Mail at</h5>

                <ul>
                  <li>
                    <Link to="" className="sidebar-nav">
                      unichemsales@gmail.com
                    </Link>
                  </li>
                  <li>
                    <Link to="" className="sidebar-nav">
                      unichem_@yahoo.com
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div className="contact-form container">
            <form className="row g-3">
              <div className="fw-bold">Personal Information</div>
              <hr />
              <div className="col-6 mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  // value={name}
                  // onChange={onChange}
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
                  // value={email}
                  // onChange={onChange}
                  required
                />
              </div>
              <div className="col-6 mb-3">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  name="subject"
                  // value={birthday}
                  // onChange={onChange}
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
                  // value={phoneNumber}
                  // onChange={onChange}
                  required
                />
              </div>
              {/* <div className="col-6 mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  // value={password}
                  // onChange={onChange}
                  required
                />
              </div> */}
              <div className="mb-3">
                <label className="form-label">Your Message</label>
                <textarea className="form-control" name="message"></textarea>
              </div>

              <div className="button text-center pt-2 mb-3">
                <button type="submit" className="btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
