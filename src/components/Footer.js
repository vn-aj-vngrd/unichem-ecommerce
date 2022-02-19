import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div class="footer-middle">
          <div class="container">
            <div class="bottom-inner">
              <div class="row">
                <div class="col-lg-4 col-md-6 col-12">
                  <div class="single-footer f-contact">
                    <h3>Stay In Touch</h3>
                    <p class="phone">Phone: +1 (900) 33 169 7720</p>
                    <ul>
                      <li>Monday-Friday: 9.00 am - 8.00 pm</li>
                      <li>Saturday: 10.00 am - 6.00 pm</li>
                    </ul>
                    <p class="mail">
                      <a href="mailto:unichem@test.com">
                        Email: unichem@test.com
                      </a>
                    </p>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                  <div class="single-footer f-link">
                    <h3>Information</h3>
                    <ul>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                  <div class="single-footer f-link">
                    <h3>Products</h3>
                    <ul>
                      <li>
                        <Link to="/products">Loctite</Link>
                      </li>
                      <li>
                        <Link to="/products">3M</Link>
                      </li>
                      <li>
                        <Link to="/products">Phoenix Lubricants</Link>
                      </li>
                      <li>
                        <Link to="/products">Polymer Cleaning Materials</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <div class="container">
            <div class="inner-content">
              <div class="row align-items-center">
                <div class="col-lg-6 col-12">
                  <div class="copyright">
                    <p>
                      © {new Date().getFullYear()} .<Link to="/">Unichem</Link>
                    </p>
                  </div>
                </div>
                <div class="col-lg-6 col-12">
                  <ul class="socila">
                    <li>
                      <span>Follow Us On:</span>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i class="lni lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i class="lni lni-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i class="lni lni-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
