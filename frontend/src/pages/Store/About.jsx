import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Unichem Store | About";
  });

  return (
    <>
      <section className="about-us">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="content-left">
                <img
                  src="https://images.unsplash.com/photo-1586528116022-aeda1613c63d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="#"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="content-right">
                <h2>Unichem Industrial Sales Inc.</h2>
                <p align="justify">
                  Unichem Industrial Sales Inc. is a merchant wholesaler of
                  chemical and different allied products. It is a small and
                  medium-sized business (SME) company based in the Philippines,
                  specifically in Mandaue City, Cebu. Its core business is
                  trading and distributing products from Loctite, 3M, Polymer,
                  and Phoenix. The firm employs around 15 people in areas such
                  as delivery, accounting, management, and administration.
                  Unichem's gross profit margin is projected to be roughly P5
                  million every year. Its services continue to grow and extend
                  throughout the country.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2 className="wow fadeInUp" data-wow-delay=".4s">
                  Our Unichem Team
                </h2>
                <p className="wow fadeInUp" data-wow-delay=".6s">
                  Meet the team members of Unichem.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-team box-shadow">
                <div className="image">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>President</h3>
                    <ul className="social">
                      <li>
                        <a href="/">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-github-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-instagram-filled"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-team box-shadow">
                <div className="image">
                  <img
                    src="https://images.unsplash.com/photo-1573497019236-17f8177b81e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Manager</h3>
                    <ul className="social">
                      <li>
                        <a href="/">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-github-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-instagram-filled"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-team box-shadow">
                <div className="image">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Employee 1</h3>
                    <ul className="social">
                      <li>
                        <a href="/">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-github-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-instagram-filled"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12">
              <div className="single-team box-shadow">
                <div className="image">
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Employee 2</h3>
                    <ul className="social">
                      <li>
                        <a href="/">
                          <i className="lni lni-facebook-filled"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-github-original"></i>
                        </a>
                      </li>
                      <li>
                        <a href="/">
                          <i className="lni lni-instagram-filled"></i>
                        </a>
                      </li>
                    </ul>
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

export default About;
