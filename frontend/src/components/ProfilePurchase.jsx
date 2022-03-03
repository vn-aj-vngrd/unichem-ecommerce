import { Link } from "react-router-dom";
import Star from "./Star";

const row = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const star = 4.5;
const reviews = 5;

const Construction = () => {
  return (
    <div className="purchase-products-column">
      <div className="product-grid">
        <label className="sort-element">Order Status: </label>
        <select className="form-select sort-element" id="sorting">
          <option>All</option>
          <option>To Pay</option>
          <option>To Ship</option>
          <option>To Receive</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>

      <div className="product">
        {/* <div className="row">
          {row.map((row, index) => (
            <div key={index} className="col-lg-3 col-md-6 col-12">
              <div className="single-product">
                <div className="product-image">
                  <img
                    src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                    alt="/"
                  />
                  <div className="button">
                    <Link to="/product-details" className="btn">
                      <i className="lni lni-eye"></i> View
                    </Link>
                  </div>
                </div>
                <div className="product-info">
                  <span className="category">Category</span>
                  <h4 className="title">
                    <span>Title</span>
                  </h4>

                  <Star star={star} reviews={reviews} />

                  <hr />

                  <div className="price">
                    <span>₱199.00</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <div className="purchase-row">
          <div class="negative-padding-custom box-shadow">
            <div class="purchase-row-banner d-flex justify-content-between d-flex align-items-center">
              <Link to="/product-details" className="underline-link">
                <div className="color-white">Order Status Log </div>
              </Link>
              <div className="color-white">
                Last Update Time: mm/dd/yy - hh:mm
              </div>
              <h6 className="purchase-order-status">ORDER STATUS</h6>
            </div>

            {/* ORDERLINE START HERE */}
            <div class="single-product no-box-shadow profile-single-product">
              <div class="row align-items-center">
                <div class="col-lg-4 col-md-4 col-12">
                  <div class="purchase-product-image product-image">
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
                <div class="col-lg-8 col-md-8 col-12">
                  <div class="product-info">
                    <span class="category">Category</span>
                    <h4 class="title">
                      <a href="product-grids.html">ProductName</a>
                    </h4>

                    <div className="">
                      Specifications: Sample, Sample, Sample, Sample
                    </div>

                    <ul class="review">
                      <li>
                        <i class="lni lni-star-filled"></i>
                      </li>
                      <li>
                        <i class="lni lni-star-filled"></i>
                      </li>
                      <li>
                        <i class="lni lni-star-filled"></i>
                      </li>
                      <li>
                        <i class="lni lni-star-filled"></i>
                      </li>
                      <li>
                        <i class="lni lni-star"></i>
                      </li>
                      <li>
                        <span>4.0 Review(s)</span>
                      </li>
                    </ul>
                    <hr></hr>
                    <div class="price">
                      <div className="">Quantity: 4pcs</div>
                      <div className="spacer"></div>
                      <span>$199.00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* END OF ORDERLINE */}
            <div class="no-box-shadow">
              <div className="order-total-row">
                <div class="price d-flex justify-content-end align-items-center">
                  <div className="">Order Total:</div>
                  <div className="spacer"></div>
                  <h4 className="unichem-text-color">$199.00</h4>
                </div>
                <br></br>
                <div className="purchase-options">
                  <div className="d-flex justify-content-end button">
                    <Link to="/product-details" className="btn">
                      Buy Again
                    </Link>

                    {/* <Link to="/product-details" className="btn">
                        Cancel
                      </Link> */}

                    <Link to="/product-details" className="btn-line">
                      Message Unichem
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default Construction;
