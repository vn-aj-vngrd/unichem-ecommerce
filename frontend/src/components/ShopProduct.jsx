import { Link } from "react-router-dom";
import Star from "./Star";

const count = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const star = 4.5;
const reviews = 5;

const ShopConstruction = () => {
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
        Showing: 1 - 12 items
        
      </div>
      <div className="product-grid">
        <label className="sort-element">Create New Product: </label>
        <div className="button">
          <Link to="/product-create" className="btn">
            <i className=""></i> Create
          </Link>
        </div>
      </div>

      <div className="product">
        <div className="row">
          {count.map((count, index) => (
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

export default ShopConstruction;
