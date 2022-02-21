import React from "react";
import { Link } from "react-router-dom";

const loggedIn = false;
const cartCount = 5;
const wishListCount = 5;

const Navbar = () => {
  if (true) {
    return (
      <header className="header navbar-area sticky">
        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-7">
                <Link className="navbar-brand" to="/">
                  <img
                    className="w-25 h-25 p-2"
                    src="assets/images/logo/logo.svg"
                    alt="Logo"
                  />
                  <span className="fw-bold text-danger">UniChem</span>
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
                        <i className="lni lni-search-alt"></i>
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
                          <Link to="/construction">Construction </Link>
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
                          Category
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
                        <Link to="/wishlist" aria-label="Toggle navigation">
                          Wishlist
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/cart" aria-label="Toggle navigation">
                          Cart
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="account">
                {loggedIn ? (
                  <div className="dropdown">
                    <i
                      className="lni lni-user h5 dropdown-toggle"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    ></i>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <Link to="/" className="dropdown-item">
                          Manage Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item">
                          My Orders
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item">
                          My Reviews
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item">
                          My Cancellations
                        </Link>
                      </li>
                      <li>
                        <Link to="/" className="dropdown-item">
                          Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <ul>
                    <li className="border-end pe-2">
                      <Link to="/login">Login</Link>
                    </li>
                    <li className="ps-2">
                      <Link to="/signup">Signup</Link>
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
};

export default Navbar;
