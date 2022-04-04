import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Notification from "./Notification";
import admin from "../assets/images/admin.svg";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
    dispatch(resetUser());
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
              <Notification />
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
                    className="avatar rounded-circle border-gray-100"
                    alt="img"
                    src={admin}
                  />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold text-gray-900">
                      Administrator
                    </span>
                  </div>
                </div>
              </a>
              <div className="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                <Link
                  className="dropdown-item d-flex align-items-center"
                  to="/settings"
                >
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
