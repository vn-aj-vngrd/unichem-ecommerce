import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import logo from "../assets/images/logo.svg";

const cartCount = 5;
const wishListCount = 5;

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
    toast.error("User Logged Out", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (userType === "customer") {
    return (
      <header className="header navbar-area sticky">
        <div className="header-middle background-red">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-7">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="#" />
                  {/* <span className="fw-bold">Unichem Store</span> */}
                </Link>
              </div>

              <div className="col-lg-5 col-md-7 d-xs-none">
                <div className="main-menu-search">
                  <div className="navbar-search search-style-5">
                    <div className="search-select"></div>
                    <div className="search-input">
                      <input type="text" placeholder="Search Product" />
                    </div>
                    <div className="search-btn">
                      <button>
                        <Link
                          to="/products"
                          className="lni lni-search-alt nav-search"
                        ></Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-2 col-5">
                <div className="middle-right-area">
                  <div className="nav-hotline"></div>

                  <div className="navbar-cart">
                    <div className="wishlist">
                      <Link to="/wishlist">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">{wishListCount}</span>
                      </Link>
                    </div>

                    <div className="cart-items">
                      <Link to="/cart" className="main-btn">
                        <i className="lni lni-cart"></i>
                        <span className="total-items">{cartCount}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8 col-md-6 col-12">
              <div className="nav-inner">
                <div className="mega-category-menu">
                  <span className="cat-button">
                    <i className="lni lni-menu"></i>Products
                  </span>
                  <ul className="sub-category">
                    <li>
                      <Link to="/products">
                        Loctite <i className="lni lni-chevron-right"></i>
                      </Link>
                      <ul className="inner-sub-category">
                        <li>
                          <Link to="/products">Construction</Link>
                        </li>
                        <li>
                          <Link to="/products">Adhesives</Link>
                        </li>
                        <li>
                          <Link to="/products">Threadlockers</Link>
                        </li>
                        <li>
                          <Link to="/products">Foam Sealants</Link>
                        </li>
                        <li>
                          <Link to="/products">Sealants</Link>
                        </li>
                        <li>
                          <Link to="/products">Epoxies</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link to="/products">
                        3M <i className="lni lni-chevron-right"></i>
                      </Link>
                      <ul className="inner-sub-category">
                        <li>
                          <Link to="/products">Tapes </Link>
                        </li>
                        <li>
                          <Link to="/products">Adhesives</Link>
                        </li>
                        <li>
                          <Link to="/products">Window Films</Link>
                        </li>
                        <li>
                          <Link to="/products">Car Tints</Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link to="/products">
                        Phoenix Lubricants
                        <i className="lni lni-chevron-right"></i>
                      </Link>
                      <ul className="inner-sub-category">
                        <li>
                          <Link to="/products">Industrial Oils </Link>
                        </li>
                      </ul>
                    </li>

                    <li>
                      <Link to="/products">
                        Polymer Cleaning Chemicals
                        <i className="lni lni-chevron-right"></i>
                      </Link>
                      <ul className="inner-sub-category">
                        <li>
                          <Link to="/products">Housekeeping </Link>
                          <Link to="/products">Kitchen </Link>
                          <Link to="/products">Laundry </Link>
                          <Link to="/products">Restroom </Link>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <nav className="navbar navbar-expand-lg">
                  <button
                    className="navbar-toggler mobile-menu-btn"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse sub-menu-bar"
                    id="navbarSupportedContent"
                  >
                    <ul id="nav" className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <Link to="/" aria-label="Toggle navigation">
                          Home
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          to="/"
                          className="dd-menu collapsed"
                          data-bs-toggle="collapse"
                          data-bs-target="#submenu-1-2"
                          aria-controls="navbarSupportedContent"
                          aria-expanded="false"
                          aria-label="Toggle navigation"
                        >
                          Categories
                        </Link>
                        <ul className="sub-menu collapse" id="submenu-1-2">
                          <li className="nav-item">
                            <Link to="/products">Adhesives</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Car Tints</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Construction</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Epoxies </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Foam Sealants</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Housekeeping</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Industrial Oils</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Kitchen</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Laundry</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Restroom</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Sealants</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Tapes</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Threadlockers</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products">Window Films</Link>
                          </li>
                        </ul>
                      </li>

                      <li className="nav-item">
                        <Link to="/about" aria-label="Toggle navigation">
                          About
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/contact" aria-label="Toggle navigation">
                          Contact
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/faq" aria-label="Toggle navigation">
                          FAQ
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="d-flex justify-content-end container">
                {user ? (
                  // <div className="dropdown h5">
                  //   <i
                  //     className="lni lni-user dropdown-toggle"
                  //     href="#"
                  //     role="button"
                  //     id="dropdownMenuLink"
                  //     data-bs-toggle="dropdown"
                  //     aria-expanded="false"
                  //   ></i>

                  //   <ul
                  //     className="dropdown-menu"
                  //     aria-labelledby="dropdownMenuLink"
                  //   >
                  //     <li>
                  //       <Link to="/manage" className="dropdown-item">
                  //         Manage Account
                  //       </Link>
                  //     </li>
                  //     <li>
                  //       <Link to="/orders" className="dropdown-item">
                  //         My Orders
                  //       </Link>
                  //     </li>
                  //     <li>
                  //       <Link to="/reviews" className="dropdown-item">
                  //         My Reviews
                  //       </Link>
                  //     </li>
                  //     <li>
                  //       <button className="dropdown-item" onClick={onLogout}>
                  //         Log out
                  //       </button>
                  //     </li>
                  //   </ul>
                  // </div>

                  <>
                    <div className="">
                      <div className="nav-inner">
                        <nav className="navbar navbar-expand-lg">
                          <ul id="nav" className="navbar-nav">
                            <li className="nav-item">
                              <Link
                                to="/"
                                className="dd-menu"
                                data-bs-toggle="collapse"
                                data-bs-target="#submenu-1-2"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                              >
                                {user.name}
                              </Link>
                              <ul
                                className="sub-menu collapse"
                                id="submenu-1-2"
                              >
                                <li className="nav-item">
                                  <Link to="/manage">Manage Account</Link>
                                </li>
                                <li className="nav-item">
                                  <Link to="/orders">My Orders</Link>
                                </li>
                                <li className="nav-item">
                                  <Link to="/reviews">My Reviews</Link>
                                </li>
                                <li className="nav-item">
                                  <button
                                    className="logout-btn"
                                    onClick={onLogout}
                                  >
                                    <i className="lni lni-logout"></i> Log out{" "}
                                  </button>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </>
                ) : (
                  <ul>
                    <li className="border-end pe-2">
                      <Link to="/login">Log In</Link>
                    </li>
                    <li className="ps-2">
                      <Link to="/signup">Sign Up</Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <aside className="sidebar-nav-wrapper">
        <div className="navbar-logo">
          <a href="index.html">
            <img src={logo} alt="logo" />
          </a>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className="nav-item">
              <Link to="/">
                <span className="icon">
                  <svg width="22" height="22" viewBox="0 0 22 22">
                    <path d="M17.4167 4.58333V6.41667H13.75V4.58333H17.4167ZM8.25 4.58333V10.0833H4.58333V4.58333H8.25ZM17.4167 11.9167V17.4167H13.75V11.9167H17.4167ZM8.25 15.5833V17.4167H4.58333V15.5833H8.25ZM19.25 2.75H11.9167V8.25H19.25V2.75ZM10.0833 2.75H2.75V11.9167H10.0833V2.75ZM19.25 10.0833H11.9167V19.25H19.25V10.0833ZM10.0833 13.75H2.75V19.25H10.0833V13.75Z" />
                  </svg>
                </span>
                <span className="text">Dashboard</span>
              </Link>
            </li>

            <li className="nav-item nav-item-has-children">
              <a
                href="#0"
                className="collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#ddmenu_3"
                aria-controls="ddmenu_3"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.9067 14.2908L15.2808 11.9167H6.41667V10.0833H15.2808L12.9067 7.70917L14.2083 6.41667L18.7917 11L14.2083 15.5833L12.9067 14.2908ZM17.4167 2.75C17.9029 2.75 18.3692 2.94315 18.713 3.28697C19.0568 3.63079 19.25 4.0971 19.25 4.58333V8.86417L17.4167 7.03083V4.58333H4.58333V17.4167H17.4167V14.9692L19.25 13.1358V17.4167C19.25 17.9029 19.0568 18.3692 18.713 18.713C18.3692 19.0568 17.9029 19.25 17.4167 19.25H4.58333C3.56583 19.25 2.75 18.425 2.75 17.4167V4.58333C2.75 3.56583 3.56583 2.75 4.58333 2.75H17.4167Z" />
                  </svg>
                </span>
                <span className="text">Auth</span>
              </a>
              <ul id="ddmenu_3" className="collapse dropdown-nav">
                <li>
                  <a href="signin.html"> Sign In </a>
                </li>
                <li>
                  <a href="signup.html"> Sign Up </a>
                </li>
                <li>
                  <a href="reset-password.html">
                    <span className="text">
                      Reset Password <span className="pro-badge">Pro</span>
                    </span>
                  </a>
                </li>
              </ul>
            </li>

            <button className="logout-btn" onClick={onLogout}>
              <i className="lni lni-logout"></i> Log out{" "}
            </button>
          </ul>
        </nav>
      </aside>
    );
  }
};

export default Navbar;
