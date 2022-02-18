import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  if (true) {
    return (
      <header className="header navbar-area">
        <div className="topbar">
          <div className="container">
            <div className="top-end">
              {false ? (
                <ul className="user-login">
                  <li>
                    <Link to="/" className="user">
                      <i className="lni lni-user"></i> Hello
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="user-login">
                  <li>
                    <Link to="/login">Log In</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="header-middle">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-7">
                <Link className="navbar-brand" to="/">
                  <img className="w-25 h-25 p-2" src="assets/images/logo/logo.svg" alt="Logo" />
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
                        <i className="lni lni-search-alt disabled"></i>
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
                      <a href="/">
                        <i className="lni lni-heart"></i>
                        <span className="total-items">0</span>
                      </a>
                    </div>
                    <div className="cart-items">
                      <a href="/" className="main-btn">
                        <i className="lni lni-cart"></i>
                        <span className="total-items">2</span>
                      </a>

                      <div className="shopping-item">
                        <div className="dropdown-cart-header">
                          <span>2 Items</span>
                          <a href="cart.html">View Cart</a>
                        </div>
                        <ul className="shopping-list">
                          <li>
                            <a
                              href="/"
                              className="remove"
                              title="Remove this item"
                            >
                              <i className="lni lni-close"></i>
                            </a>
                            <div className="cart-img-head">
                              <a
                                className="cart-img"
                                href="product-details.html"
                              >
                                <img
                                  src="assets/images/header/cart-items/item1.jpg"
                                  alt="#"
                                />
                              </a>
                            </div>

                            <div className="content">
                              <h4>
                                <a href="product-details.html">
                                  Apple Watch Series 6
                                </a>
                              </h4>
                              <p className="quantity">
                                1x - <span className="amount">$99.00</span>
                              </p>
                            </div>
                          </li>
                          <li>
                            <a
                              href="/"
                              className="remove"
                              title="Remove this item"
                            >
                              <i className="lni lni-close"></i>
                            </a>
                            <div className="cart-img-head">
                              <a
                                className="cart-img"
                                href="product-details.html"
                              >
                                <img
                                  src="assets/images/header/cart-items/item2.jpg"
                                  alt="#"
                                />
                              </a>
                            </div>
                            <div className="content">
                              <h4>
                                <a href="product-details.html">
                                  Wi-Fi Smart Camera
                                </a>
                              </h4>
                              <p className="quantity">
                                1x - <span className="amount">$35.00</span>
                              </p>
                            </div>
                          </li>
                        </ul>
                        <div className="bottom">
                          <div className="total">
                            <span>Total</span>
                            <span className="total-amount">$134.00</span>
                          </div>
                          <div className="button">
                            <a href="checkout.html" className="btn animate">
                              Checkout
                            </a>
                          </div>
                        </div>
                      </div>
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
                          <Link to="/products">Construction </Link>
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
                        <Link to="/contact" aria-label="Toggle navigation">
                          Category
                        </Link>
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
                        <Link to="/contact" aria-label="Toggle navigation">
                          Wish List
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link to="/contact" aria-label="Toggle navigation">
                          Cart
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <div className="nav-social">
                <h5 className="title">Connect with us: </h5>
                <ul>
                  <li>
                    <a href="/">
                      <i className="lni lni-facebook-filled"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="lni lni-twitter-original"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="lni lni-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="lni lni-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
};

export default Navbar;
