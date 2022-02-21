import React from "react";
import { Link } from "react-router-dom";

const Preview = () => {
  return (
    <section className="call-action section">
      <div className="container">
        <div className="row ">
          <div className="col-lg-8 offset-lg-2 col-12">
            <div className="inner">
              <div className="content">
                <h2>Unichem Industrial Sales Inc.</h2>
                <p>
                  Unichem Industrial Sales Inc. is a small-sized enterprise
                  based in the Philippines, specifically located in Mandaue
                  City, Cebu.
                </p>
                <div className="button wow fadeInUp" data-wow-delay=".8s">
                  <Link to="/about" className="btn">
                    Know More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Preview;
