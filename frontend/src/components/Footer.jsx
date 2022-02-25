import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-middle">
          <div className="container">
            <div className="bottom-inner">
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="single-footer f-contact">
                    <h3>Stay In Touch</h3>
                    <p className="phone">Phone: (032) 345 6589 / (032) 345 1672</p>
                    <ul>
                      <li>Monday-Friday: 9.00 am - 8.00 pm</li>
                      <li>Saturday: 10.00 am - 6.00 pm</li>
                    </ul>
                    <p className="mail">
                      Yahoo:
                      <a href="mailto:unichem_@yahoo.com">
                         unichem_@yahoo.com
                      </a><br></br>
                      G-mail:
                      <a href="mailto:unichemsales@gmail.com">
                         unichemsales@gmail.com<br></br>
                      </a>
                      
                    </p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="single-footer f-link">
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
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="single-footer f-link">
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
        <div className="footer-bottom">
          <div className="container">
            <div className="inner-content">
              <div className="row align-items-center">
                <div className="col-lg-6 col-12">
                  <div className="copyright">
                    <p>
                      © {new Date().getFullYear()} | <Link to="/">Unichem</Link>
                    </p>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <ul className="socila">
                    <li>
                      <span>Follow Us On:</span>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i className="lni lni-facebook-filled"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i className="lni lni-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <i className="lni lni-instagram"></i>
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
