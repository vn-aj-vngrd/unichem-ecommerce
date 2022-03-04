import { useEffect } from "react";
import Map from "../../components/Map";

const Login = () => {
  useEffect(() => {
    document.title = "Unichem | Contact";
  });

  return (
    <>
      <section className="contact-us body-content">
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
                      <h6 class="contact-us-label">Address</h6>
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
                      <h6 class="contact-us-label">Telephone</h6>
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
                      <h6 class="contact-us-label">Email</h6>
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
                      <form
                        className="form"
                        method="post"
                        action="assets/mail/mail.php"
                      >
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-group">
                              <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                required="required"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-group">
                              <input
                                name="subject"
                                type="text"
                                placeholder="Your Subject"
                                required="required"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-group">
                              <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                required="required"
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="form-group">
                              <input
                                name="phone"
                                type="text"
                                placeholder="Your Phone"
                                required="required"
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group message">
                              <textarea
                                name="message"
                                placeholder="Your Message"
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="form-group button text-center">
                              <button type="submit" className="btn ">
                                Submit Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Map />
      </section>
    </>
  );
};

export default Login;
