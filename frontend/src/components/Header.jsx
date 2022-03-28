import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.success("User Logged Out", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  return (
    <nav className="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
      <div className="container-fluid px-0">
        <div
          className="d-flex justify-content-between w-100"
          id="navbarSupportedContent"
        >
          <div className="d-flex align-items-center"></div>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item dropdown">
              <a
                className="nav-link text-dark notification-bell unread dropdown-toggle"
                data-unread-notifications="true"
                href=" "
                role="button"
                data-bs-toggle="dropdown"
                data-bs-display="static"
                aria-expanded="false"
              >
                <svg
                  className="icon icon-sm text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </a>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                <div className="list-group list-group-flush">
                  <a
                    href=" "
                    className="text-center text-primary fw-bold border-bottom border-light py-3"
                  >
                    Notifications
                  </a>
                  <a
                    href="../pages/calendar.html"
                    className="list-group-item list-group-item-action border-bottom"
                  >
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          alt="img"
                          src="../assets/img/team/profile-picture-1.jpg"
                          className="avatar-md rounded"
                        />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">Jose Leos</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-danger">
                              a few moments ago
                            </small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">
                          Added you to an event "Project stand-up" tomorrow at
                          12:30 AM.
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="../pages/tasks.html"
                    className="list-group-item list-group-item-action border-bottom"
                  >
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          alt="img"
                          src="../assets/img/team/profile-picture-2.jpg"
                          className="avatar-md rounded"
                        />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">Neil Sims</h4>
                          </div>
                          <div className="text-end">
                            <small className="text-danger">2 hrs ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">
                          You've been assigned a task for "Awesome new project".
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="../pages/tasks.html"
                    className="list-group-item list-group-item-action border-bottom"
                  >
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          alt="img"
                          src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-1/271657462_4899150540105361_3610241298101667884_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeFlBi2QrWTsC6h8G6x_yldUISWEXve9bfohJYRe971t-nY_yoEBIbmpAfl8Fl9bN4QBHO6GTFtJ9-adM6MoQwQR&_nc_ohc=Hj62DarEIWwAX-y1cpD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fceb2-1.fna&oh=00_AT9w74DRCTtbaJum76ttU-HyP3QOc_o-YwejkzUjzKLeVg&oe=6245FD24"
                          className="avatar-md rounded"
                        />
                      </div>
                      <div className="col ps-0 m-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">
                              Roberta Casas
                            </h4>
                          </div>
                          <div className="text-end">
                            <small>5 hrs ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">
                          Tagged you in a document called "Financial plans",
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="../pages/single-message.html"
                    className="list-group-item list-group-item-action border-bottom"
                  >
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          alt="img"
                          src="../assets/img/team/profile-picture-4.jpg"
                          className="avatar-md rounded"
                        />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">Joseph Garth</h4>
                          </div>
                          <div className="text-end">
                            <small>1 d ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">
                          New message: "Hey, what's up? All set for the
                          presentation?"
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href="../pages/single-message.html"
                    className="list-group-item list-group-item-action border-bottom"
                  >
                    <div className="row align-items-center">
                      <div className="col-auto">
                        <img
                          alt="img"
                          src="../assets/img/team/profile-picture-5.jpg"
                          className="avatar-md rounded"
                        />
                      </div>
                      <div className="col ps-0 ms-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 className="h6 mb-0 text-small">
                              Administrator
                            </h4>
                          </div>
                          <div className="text-end">
                            <small>2 hrs ago</small>
                          </div>
                        </div>
                        <p className="font-small mt-1 mb-0">
                          New message: "We need to improve the UI/UX for the
                          landing page."
                        </p>
                      </div>
                    </div>
                  </a>
                  <a
                    href=" "
                    className="dropdown-item text-center fw-bold rounded-bottom py-3"
                  >
                    <svg
                      className="icon icon-xxs text-gray-400 me-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    View all
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown ms-lg-3">
              <a
                className="nav-link dropdown-toggle pt-1 px-0"
                href=" "
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="media d-flex align-items-center">
                  <img
                    className="avatar rounded-circle"
                    alt="img"
                    src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-1/271657462_4899150540105361_3610241298101667884_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeFlBi2QrWTsC6h8G6x_yldUISWEXve9bfohJYRe971t-nY_yoEBIbmpAfl8Fl9bN4QBHO6GTFtJ9-adM6MoQwQR&_nc_ohc=Hj62DarEIWwAX-y1cpD&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fceb2-1.fna&oh=00_AT9w74DRCTtbaJum76ttU-HyP3QOc_o-YwejkzUjzKLeVg&oe=6245FD24"
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">
                      Administrator
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <Link className="dropdown-item d-flex align-items-center" to="/settings">
                  <svg
                    className="dropdown-icon text-gray-400 me-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Settings
                </Link>

                <div role="separator" className="dropdown-divider my-1"></div>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href=" "
                  onClick={onLogout}
                >
                  <svg
                    className="dropdown-icon text-danger me-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
