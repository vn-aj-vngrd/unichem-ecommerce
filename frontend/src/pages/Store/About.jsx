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
                  src="https://images.unsplash.com/photo-1549194388-2469d59ec75c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
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
                    // src="https://scontent.fceb2-2.fna.fbcdn.net/v/t39.30808-6/265045880_4664465363610412_3077703784126999012_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeG6OCYCZ3CHvDCnn3gkw4f07VEmKdmD4HrtUSYp2YPgeijaAgkLlVvIZi6OkafPGr9I9Ew1JO3LnF6iAYvJVZH-&_nc_ohc=aqCKcJTr730AX_jh2lf&_nc_ht=scontent.fceb2-2.fna&oh=00_AT_6BqovlMtCUeTqci4MFGHSItKRq0HLzJiVupFteSUTcA&oe=621DED01"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Barigga, Horeb</h3>
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
                    // src="https://scontent.fceb2-2.fna.fbcdn.net/v/t1.6435-9/60255777_10205808349163781_6229416713532735488_n.jpg?_nc_cat=102&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGuXE5hs2F1PtWOpccTSnbAY9sEjR8tFldj2wSNHy0WVwxTPmfOm9dMbU0rZS91gaS6ruU5b0c9R-0Mb9BnOSGx&_nc_ohc=uyKs1itBYK8AX9T4ObU&_nc_ht=scontent.fceb2-2.fna&oh=00_AT_nN_XimotmMXGDCcMPgNYFxf3aTpUZ-LbCoT619FIXIQ&oe=623E115D"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Gelacio, Roque</h3>
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
                    // src="https://scontent.fceb2-1.fna.fbcdn.net/v/t39.30808-6/271657462_4899150540105361_3610241298101667884_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFlBi2QrWTsC6h8G6x_yldUISWEXve9bfohJYRe971t-nY_yoEBIbmpAfl8Fl9bN4QBHO6GTFtJ9-adM6MoQwQR&_nc_ohc=ufndT4srzboAX80ILUL&_nc_ht=scontent.fceb2-1.fna&oh=00_AT-A8grgTFsZSuLZuD7U947C3px4AWiUgjERlAcuTAxZKQ&oe=621E0BA2"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Tumapon, Nikolai Franz</h3>
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
                    // src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/89595114_2790668074362384_5253522795815501824_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_eui2=AeHXsn03IiqEn6omaUEIHM_Bi_8pd_rKJnGL_yl3-somcSQcauFysieA3LXgKI8yhRkZ1o5VDJ3MtPnrn4tZ3Kzw&_nc_ohc=GUU2jNVQE6sAX-Ni2kI&tn=k5PFbSYe6hUkAfvk&_nc_ht=scontent.fcrk4-1.fna&oh=00_AT-LMPLrqajMuCM7JZGz86dSo4VMp6jG82Tc1BzBiuluWA&oe=623E037F"
                    alt="#"
                  />
                </div>
                <div className="content">
                  <div className="info">
                    <h3>Vanguardia, Van AJ</h3>
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
