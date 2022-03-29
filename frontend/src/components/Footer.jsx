import { Link } from "react-router-dom";

const Footer = ({ userType }) => {
  if (userType === "customer") {
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
                      <p className="phone">
                        Hotline: (032) 345 6589 / (032) 345 1672
                      </p>
                      <ul>
                        <li>Monday-Friday: 9.00 am - 8.00 pm</li>
                        <li>Saturday: 10.00 am - 6.00 pm</li>
                      </ul>
                      <ul className="mail">
                        <li>
                          <a href="mailto:unichem_@yahoo.com">
                            Yahoo: unichem_@yahoo.com
                          </a>
                        </li>
                        <li>
                          <a href="mailto:unichemsales@gmail.com">
                            Gmail: unichemsales@gmail.com
                          </a>
                        </li>
                      </ul>
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
                        © {new Date().getFullYear()} |
                        <Link to="/">Unichem</Link>
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
                          href="https://m.facebook.com/Unichem-Industrial-Sales-Inc-108090717684147/?_rdr"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="mailto:unichemsales@gmail.com"
                          rel="noreferrer"
                          target="_blank"
                        >
                          <i className="lni lni-google"></i>
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
  } else {
    return (
      <>
        <footer className="bg-white rounded footer-element p-4 mb-4 mt-2">
          <div className="row">
            <div className="col-12 col-md-4 col-xl-6 mb-4 mb-md-0">
              <p className="mb-0 text-center text-lg-start">
                © {new Date().getFullYear()} |{" "}
                <span className="current-year"></span>
                <Link className="text-primary fw-normal" to="/">
                  Unichem Admin
                </Link>
              </p>
            </div>
            <div className="col-12 col-md-8 col-xl-6 text-center text-lg-start">
              <ul className="list-inline list-group-flush list-group-borderless text-md-end mb-0">
                <li className="list-inline-item">
                  <div>Created by:</div>
                </li>
                <li className="list-inline-item">
                  <div>Exclusive Developers</div>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    );
  }
};

export default Footer;
