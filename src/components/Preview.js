import React from "react";
import { Link } from "react-router-dom";

const Preview = () => {
  return (
    <section class="call-action section">
      <div class="container">
        <div class="row ">
          <div class="col-lg-8 offset-lg-2 col-12">
            <div class="inner">
              <div class="content">
                <h2>Unichem Industrial Sales Inc.</h2>
                <p>
                  Unichem Industrial Sales Inc. is a small-sized enterprise
                  based in the Philippines, specifically located in Mandaue
                  City, Cebu.
                </p>
                <div class="button wow fadeInUp" data-wow-delay=".8s">
                  <Link to="/about" class="btn">
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
