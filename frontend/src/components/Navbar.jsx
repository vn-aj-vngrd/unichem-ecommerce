import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, resetUser } from "../features/auth/authSlice";
import {
  getWishlists,
  resetWishlist,
} from "../features/wishlist/wishlistSlice";
import { getCarts, resetCart } from "../features/cart/cartSlice";
import logo from "../assets/images/logo.svg";
import { toast } from "react-toastify";

const Navbar = ({ userType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  useSelector((state) => state.wishlist);
  useSelector((state) => state.cart);

  const [input, setInput] = useState("");

  useEffect(() => {
    if (user && user.userType === "customer") {
      dispatch(getWishlists());
      dispatch(getCarts());

      return () => {
        dispatch(resetUser());
        dispatch(resetWishlist());
        dispatch(resetCart());
      };
    }
  }, [user, dispatch]);

  let wishlistCount = 0;
  let cartCount = 0;
  if (user) {
    wishlistCount = localStorage.getItem("wishlistCount");
    cartCount = localStorage.getItem("cartCount");
  }

  const onLogout = (e) => {
    e.preventDefault();

    toast.success(`See you around, ${user.name.split(" ")[0]}!`, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    localStorage.clear();
    dispatch(logout());
    dispatch(resetUser());
    navigate("/");
  };

  const onSearch = (e) => {
    e.preventDefault();

    navigate(`/products/product/${input}`);
    setInput("");
  };

  if (userType === "customer") {
    return (
      <header className="header navbar-area sticky">
        <div className="header-middle background-red">
          <div className="container">
            <div className="row align-items-center ">
              <div className="col-lg-3 col-md-2 col-3">
                <Link className="navbar-brand" to="/">
                  <img src={logo} alt="#" />
                  <span className="fw-bold text-white ps-2">Unichem Store</span>
                </Link>
              </div>

              <div className="col-lg-5 col-md-8 col-6 d-xs-none">
                <div className="main-menu-search">
                  <div className="navbar-search search-style-5">
                    <div className="search-select"></div>
                    <div className="search-input">
                      <input
                        type="text"
                        placeholder="Search Product"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        name="searchInput"
                      />
                    </div>
                    <div className="search-btn">
                      {input ? (
                        <button
                          className="lni lni-search-alt nav-search"
                          onClick={onSearch}
                        />
                      ) : (
                        <button
                          className="lni lni-search-alt nav-search"
                          disabled
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-2 col-3">
                <div className="middle-right-area">
                  <div className="navbar-loc">
                    <Link to="/contact">
                      <i className="lni lni-map"></i>
                      <h3>
                        Location:
                        <span>Mandaue City, Cebu</span>
                      </h3>
                    </Link>
                  </div>

                  <div className="navbar-cart">
                    <div className="wishlist-items">
                      <Link to="/wishlist">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">{wishlistCount}</span>
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
          <div className="row align-items-center nav-flex-on-thin-screen">
            <div className="col-lg-8 col-md-6 col-12 left-nav-profile-section">
              <div className="nav-inner">
                <div className="mega-category-menu">
                  <span className="cat-button">
                    <i className="lni lni-menu"></i>Products
                  </span>
                  <ul className="sub-category">
                    <li>
                      <Link to="/products/brand/loctite">Loctite</Link>
                    </li>

                    <li>
                      <Link to="/products/brand/3m">3M</Link>
                    </li>

                    <li>
                      <Link to="/products/brand/phoenix_lubricants">
                        Phoenix Lubricants
                      </Link>
                    </li>

                    <li>
                      <Link to="/products/brand/polymer_cleaning_chemicals">
                        Polymer Cleaning Chemicals
                      </Link>
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
                            <Link to="/products/category/adhesives">
                              Adhesives
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/cart_tints">
                              Car Tints
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/construction">
                              Construction
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/epoxies">
                              Epoxies{" "}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/foam_sealants">
                              Foam Sealants
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/housekeeping">
                              Housekeeping
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/industrial_oils">
                              Industrial Oils
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/kitchen">Kitchen</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/laundry">Laundry</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/restroom">
                              Restroom
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/sealants">
                              Sealants
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/tapes">Tapes</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/threadlockers">
                              Threadlockers
                            </Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/products/category/window_films">
                              Window Films
                            </Link>
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
            <div className="col-lg-4 col-md-6 col-12 right-nav-profile-section">
              <div className="d-flex justify-content-end nav-profile-section">
                {user ? (
                  <>
                    <div className="nav-inner">
                      <div className=" mobile-dropdown-hover">
                        <button className="hover-button">
                          <img
                            src={user.image}
                            className="nav-profile-image"
                            alt=""
                          ></img>
                          {user.name.split(" ")[0]}
                        </button>

                        <ul className="mobile-profile-collapse profile-collapse">
                          <li className="nav-item">
                            <Link to="/account/profile">My Profile</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/account/address">My Address</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/account/orders">My Orders</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/account/reviews">My Reviews</Link>
                          </li>
                          <li className="nav-item">
                            <Link to="/" onClick={onLogout}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="nav-inner ">
                      <nav className="navbar navbar-expand-lg hide-on-thin-screen">
                        <ul id="nav" className="navbar-nav">
                          <li className="nav-item nav-item-profile">
                            <Link
                              to="/"
                              className=""
                              data-bs-toggle="collapse"
                              data-bs-target="#submenu-1-3"
                              aria-controls="navbarSupportedContent"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                            >
                              <img
                                src={user.image}
                                className="nav-profile-image"
                                alt=""
                              ></img>
                              {user.name.split(" ")[0]}
                            </Link>
                            <ul
                              className="sub-menu collapse profile-collapse"
                              id="submenu-1-3"
                            >
                              <li className="nav-item">
                                <Link to="/account/profile">My Profile</Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/account/address">My Address</Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/account/orders">My Orders</Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/account/reviews">My Reviews</Link>
                              </li>
                              <li className="nav-item">
                                <Link to="/" onClick={onLogout}>
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                ) : (
                  <ul>
                    <li className="authlink">
                      <Link to="/login" className="pe-2 border-end">
                        Log In
                      </Link>
                      <Link to="/signup" className="ps-2">
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (userType === "admin") {
    return (
      <>
        <nav className="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
          <Link className="navbar-brand me-lg-5" to="/">
            <img className="navbar-brand" src={logo} alt="Logo" />
          </Link>
          <div className="d-flex align-items-center">
            <button
              className="navbar-toggler d-lg-none collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <nav
          id="sidebarMenu"
          className="sidebar d-lg-block text-white collapse"
          data-simplebar
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                {/* <div className="avatar-lg me-4">
                  <img
                    src={logo}
                    className="card-img-top rounded-circle border-white"
                    alt="#"
                  />
                </div>
                <div className="d-block">
                  <h2 className="h5">Administrator</h2>
                </div> */}
              </div>
              <div className="collapse-close d-md-none">
                <a
                  href="#sidebarMenu"
                  data-bs-toggle="collapse"
                  data-bs-target="#sidebarMenu"
                  aria-controls="sidebarMenu"
                  aria-expanded="true"
                  aria-label="Toggle navigation"
                >
                  <svg
                    className="icon icon-xs"
                    fill="white"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <ul className="nav flex-column pt-3 pt-md-0">
              <li>
                <Link to="/" className="nav-link d-flex align-items-center">
                  <span className="sidebar-icon">
                    <img src={logo} height="40" width="40" alt="#" />
                  </span>
                  <span className="mt-1 sidebar-text fw-bolder">
                    Unichem Store
                  </span>
                </Link>
              </li>

              <li role="separator" className="dropdown-divider mt-3 mb-3"></li>

              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link d-flex align-items-center justify-content-between"
                >
                  <span>
                    <span className="sidebar-icon">
                      <svg
                        className="icon icon-xs me-2"
                        fill="white"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </span>
                    <span className="sidebar-text">Dashboard</span>
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/users" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </span>
                  <span className="sidebar-text">Users</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="sidebar-text">Orders</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/products" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                      <path
                        fillRule="evenodd"
                        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span className="sidebar-text">Products</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/promotions" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                    </svg>
                  </span>
                  <span className="sidebar-text">Promotions</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/coupons" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0 4.5A1.5 1.5 0 0 1 1.5 3h13A1.5 1.5 0 0 1 16 4.5V6a.5.5 0 0 1-.5.5 1.5 1.5 0 0 0 0 3 .5.5 0 0 1 .5.5v1.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 11.5V10a.5.5 0 0 1 .5-.5 1.5 1.5 0 1 0 0-3A.5.5 0 0 1 0 6V4.5Zm4-1v1h1v-1H4Zm1 3v-1H4v1h1Zm7 0v-1h-1v1h1Zm-1-2h1v-1h-1v1Zm-6 3H4v1h1v-1Zm7 1v-1h-1v1h1Zm-7 1H4v1h1v-1Zm7 1v-1h-1v1h1Zm-8 1v1h1v-1H4Zm7 1h1v-1h-1v1Z" />
                    </svg>
                  </span>
                  <span className="sidebar-text">Coupons</span>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/settings" className="nav-link">
                  <span className="sidebar-icon">
                    <svg
                      className="icon icon-xs me-2"
                      fill="white"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="sidebar-text">Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
};

export default Navbar;
