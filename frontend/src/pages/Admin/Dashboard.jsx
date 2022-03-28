import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });
  return (
    <div className="content">
      <Header />
      <div className="row mt-3">
        <div className="col-12 mb-4">
          <div className="card border-0 shadow">
            <div className="card-header d-sm-flex flex-row align-items-center flex-0">
              <div className="d-block mb-3 mb-sm-0">
                <div className="fs-5 fw-normal mb-2">Sales Value</div>
                <h2 className="fs-3 fw-extrabold">$10,567</h2>
                <div className="small mt-2">
                  <span className="fw-normal me-2">Yesterday</span>
                  <span className="fas fa-angle-up text-success"></span>
                  <span className="text-success fw-bold">10.57%</span>
                </div>
              </div>
              <div className="d-flex ms-auto">
                <a href=" " className="btn btn-secondary text-dark btn-sm me-2">
                  Month
                </a>
                <a href=" " className="btn btn-secondary text-dark btn-sm me-2">
                  Week
                </a>
              </div>
            </div>
            <div className="card-body p-2">
              {/* <div className="ct-chart-sales-value ct-double-octave ct-series-g"><Doughnut /></div> */}
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-primary rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="h5">Users</h2>
                    <h3 className="fw-extrabold mb-1">230</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Users</h2>
                    <h3 className="fw-extrabold mb-1">230</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    Total Users
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-success rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Revenue</h2>
                    <h3 className="mb-1">₱43,594</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Revenue</h2>
                    <h3 className="fw-extrabold mb-1">₱43,594</h3>
                  </div>
                  <small className="d-flex align-items-center">
                    For this Month
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-4 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body">
              <div className="row d-block d-xl-flex align-items-center">
                <div className="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center">
                  <div className="icon-shape icon-shape-tertiary rounded me-4 me-sm-0">
                    <svg
                      className="icon icon-md"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div className="d-sm-none">
                    <h2 className="fw-extrabold h5">Orders</h2>
                    <h3 className="mb-1">20</h3>
                  </div>
                </div>
                <div className="col-12 col-xl-7 px-xl-0">
                  <div className="d-none d-sm-block">
                    <h2 className="h5">Orders</h2>
                    <h3 className="fw-extrabold mb-1">20</h3>
                  </div>
                  <small>For this Month</small>
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
