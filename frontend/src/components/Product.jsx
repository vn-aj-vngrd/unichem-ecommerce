import { Link } from "react-router-dom";
import Star from "./Star";

const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const star = 4.5;
const reviews = 5;

const Product = () => {
  return (
    <div className="">
      <div className="product-grid">
        <label className="sort-element">Sort by: </label>
        <select className="form-select sort-element" id="sorting">
          <option>Popularity</option>
          <option>Low - High Price</option>
          <option>High - Low Price</option>
          <option>Average Rating</option>
          <option>A - Z Order</option>
          <option>Z - A Order</option>
        </select>
      </div>

      <div className="product">
        <div className="row">
          {count.map((count, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-12 ">
              <div className="box-shadow">
                <div className="single-product">
                  <div className="product-image">
                    {/* promo  CLASS (.sale-tag OR .new-tag)*/}
                    <div className="sale-tag">
                      <b>-100% OFF</b>
                    </div>
                    {/* end of promo */}
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
                    <div className="category">
                      <i className="lni lni-package category-icon"></i>{" "}
                      Category:
                      <a href="/">{}</a>
                    </div>
                    <h4 className="title">
                      <span>Title</span>
                    </h4>

                    <Star star={star} reviews={reviews} />

                    {/* <hr /> */}

                    {/* <div className="price">
                    <span>₱199.00</span>
                  </div> */}
                  </div>
                </div>
                <div className="order-total-row ">
                  <div className="price d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-red">₱199.00</h6>
                    </div>
                    <div className="items-sold">6.9K items sold</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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

export default Product;
