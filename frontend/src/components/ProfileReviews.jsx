import React from "react";
import { Link } from "react-router-dom";
import Star from "./Star";

function ProfileReviews() {
  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Reviews</h5>
      </div>

      {/* One Review */}
      <>
        <div className="review-row">
          <div className="single-product no-box-shadow profile-single-product">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="purchase-product-image product-image">
                  <img
                    src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                    alt="#"
                  ></img>
                  <div className="button">
                    <Link to="/product-details" className="btn">
                      <i className="lni lni-eye"></i> View
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <div className="product-info">
                  <div className="category">
                    <i className="lni lni-package category-icon"></i> Category:
                    <a href="/">{}</a>
                  </div>

                  <h4 className="title">
                    <Link to="/">ProductName</Link>
                  </h4>

                  <div className="">
                    Type / Color: Sample, Sample, Sample, Sample
                  </div>

                  <Star star={1} reviews={1} />
                  <hr></hr>
                  <div className="price">
                    <div className="">Quantity: 4pcs</div>
                    <div className="spacer"></div>
                    <span>$199.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-box-shadow">
            <div className="order-total-row">
              <div className="product-details-info">
                <div className="">
                  <div className="reviews">
                    <div className="single-review">
                      <img
                        src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/89595114_2790668074362384_5253522795815501824_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_eui2=AeHXsn03IiqEn6omaUEIHM_Bi_8pd_rKJnGL_yl3-somcSQcauFysieA3LXgKI8yhRkZ1o5VDJ3MtPnrn4tZ3Kzw&_nc_ohc=GUU2jNVQE6sAX-Ni2kI&tn=k5PFbSYe6hUkAfvk&_nc_ht=scontent.fcrk4-1.fna&oh=00_AT-LMPLrqajMuCM7JZGz86dSo4VMp6jG82Tc1BzBiuluWA&oe=623E037F"
                        alt="#"
                      />
                      <div className="review-info">
                        <h4>
                          Awesome quality for the price
                          <span>Jacob Hammond</span>
                        </h4>
                        <ul className="stars">
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <>
        <div className="review-row">
          <div className="single-product no-box-shadow profile-single-product">
            <div className="row align-items-center">
              <div className="col-lg-4 col-md-4 col-12">
                <div className="purchase-product-image product-image">
                  <img
                    src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                    alt="#"
                  ></img>
                  <div className="button">
                    <Link to="/product-details" className="btn">
                      <i className="lni lni-eye"></i> View
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <div className="product-info">
                  <div className="category">
                    <i className="lni lni-package category-icon"></i> Category:
                    <a href="/">{}</a>
                  </div>

                  <h4 className="title">
                    <Link to="/">ProductName</Link>
                  </h4>

                  <div className="">
                    Type / Color: Sample, Sample, Sample, Sample
                  </div>

                  <Star star={1} reviews={1} />
                  <hr></hr>
                  <div className="price">
                    <div className="">Quantity: 4pcs</div>
                    <div className="spacer"></div>
                    <span>$199.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="no-box-shadow">
            <div className="order-total-row">
              <div className="product-details-info">
                <div className="">
                  <div className="reviews">
                    <div className="single-review">
                      <img
                        src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/89595114_2790668074362384_5253522795815501824_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_eui2=AeHXsn03IiqEn6omaUEIHM_Bi_8pd_rKJnGL_yl3-somcSQcauFysieA3LXgKI8yhRkZ1o5VDJ3MtPnrn4tZ3Kzw&_nc_ohc=GUU2jNVQE6sAX-Ni2kI&tn=k5PFbSYe6hUkAfvk&_nc_ht=scontent.fcrk4-1.fna&oh=00_AT-LMPLrqajMuCM7JZGz86dSo4VMp6jG82Tc1BzBiuluWA&oe=623E037F"
                        alt="#"
                      />
                      <div className="review-info">
                        <h4>
                          Awesome quality for the price
                          <span>Jacob Hammond</span>
                        </h4>
                        <ul className="stars">
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                          <li>
                            <i className="lni lni-star-filled"></i>
                          </li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor...
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>

      <nav>
          <ul className="product-pagination pagination justify-content-center">
            <li className="page-item disabled">
              <a
                className="page-link"
                href="/"
                tabIndex="-1"
                aria-disabled="true"
              >
                Previous
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="/">
                Next
              </a>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default ProfileReviews;
