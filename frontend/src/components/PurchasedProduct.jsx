import { Link } from "react-router-dom";
import Star from "./Star";

const PurchasedProduct = () => {
  return (
    <div>
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
                Specifications: Sample, Sample, Sample, Sample
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
    </div>
  );
};

export default PurchasedProduct;
