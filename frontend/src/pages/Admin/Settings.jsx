import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import logo from "../../assets/images/logo.svg";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Settings";
  });
  return (
    <div className="content">
      <Header />
      <SectionTitle type="settings" />
      <div className="row mt-3">
        <div className="col-12 col-xl-8">
          <div className="card card-body border-0 shadow mb-4">
            <h2 className="h5 mb-4">Admin Information</h2>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div>
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="email"
                      value="Sample Text..."
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div>
                    <label>Name</label>
                    <input
                      className="form-control"
                      type="text"
                      value="Sample Text..."
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div>
                    <label>Password</label>
                    <input
                      className="form-control"
                      type="password"
                      value="Sample Text..."
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
            <div className="button mt-3">
              <button className="btn">Save Changes</button>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4">
          <div className="row">
            <div className="col-12 mb-4">
              <div
                className="card shadow border-0 text-center p-0"
                style={{ height: `326px` }}
              >
                <div
                  className="container p-3"
                  style={{ backgroundColor: `#424242` }}
                >
                  <img
                    src={logo}
                    className="avatar-xl rounded-circle mx-auto"
                    alt="Admin"
                  />
                </div>
                <div className="card-body pb-3 pt-4">
                  <h4 className="h3">Administrator</h4>
                  <h5 className="fw-normal">Unichem Store</h5>
                  <p className="text-gray">Mandaue City, Cebu PH</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default Home;
