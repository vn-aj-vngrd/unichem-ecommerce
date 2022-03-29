import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Settings";
  });
  return (
    <div className="content">
      <Header />
      <SectionTitle type="settings" />
      <div className="row mt-3">
        <div class="col-12 col-xl-8">
          <div class="card card-body border-0 shadow mb-4">
            <h2 class="h5 mb-4">Admin Information</h2>
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div>
                    <label>Email</label>
                    <input
                      class="form-control"
                      type="email"
                      value="Sample Text..."
                      required
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <div>
                    <label>Name</label>
                    <input
                      class="form-control"
                      type="text"
                      value="Sample Text..."
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <div>
                    <label>Password</label>
                    <input
                      class="form-control"
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
        <div class="col-12 col-xl-4">
          <div class="row">
            <div class="col-12 mb-4">
              <div class="card shadow border-0 text-center p-0">
                <div class="card-body pb-5 pt-5">
                  <h4 class="h3">Administrator</h4>
                  <h5 class="fw-normal">Unichem Store</h5>
                  <p class="text-gray mb-4">Mandaue City, Cebu PH</p>
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
