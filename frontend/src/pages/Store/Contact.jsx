import { useEffect } from "react";
import Map from "../../components/Map";

const Login = () => {
  useEffect(() => {
    document.title = "Unichem Store | Contact";
  });

  return (
    <>
      <section className="contact-us">
        <div className="container">
          <div className="contact-head">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2>Contact Us</h2>
                  <p>
                    Our company is actively helping our customers drive results
                    with transactions everyday.
                  </p>
                </div>
              </div>
            </div>
            <div className="contact-info">
              <div className="row">
                <div className="col-lg-4 col-md-12 col-12">
                  <div className="box-shadow single-info-head">
                    <div className="single-info">
                      <i className="lni lni-map text-danger"></i>
                      <h6 className="contact-us-label">Address</h6>
                      <ul>
                        <li>
                          Room 212 N & N Cortes Arcade
                          <br /> A.C. Cortes Avenue, Ibabao
                          <br /> Mandaue City, Cebu, 6014 Philippines
                        </li>
                      </ul>
                    </div>

                    <div className="single-info">
                      <i className="lni lni-phone text-danger"></i>
                      <h6 className="contact-us-label">Telephone</h6>
                      <ul>
                        <li>
                          <a href="tel:+(032) 345 6589">(032) 345 6589</a>
                        </li>
                        <li>
                          <a href="tel:+(032) 345 1672">(032) 345 1672</a>
                        </li>
                      </ul>
                    </div>

                    <div className="single-info">
                      <i className="lni lni-envelope text-danger"></i>
                      <h6 className="contact-us-label">Email</h6>
                      <ul>
                        <li>
                          <a href="mailto:unichemsales@gmail.com">
                            unichemsales@gmail.com
                          </a>
                        </li>
                        <li>
                          <a href="mailto:unichem_@yahoo.com">
                            unichem_@yahoo.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8 col-md-12 col-12">
                  <div className="contact-form-head">
                    <div className="box-shadow form-main">
                      <Map />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
