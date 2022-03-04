import { Link } from "react-router-dom";
import Star from "./Star";

const PurchasedProduct = () => {
  return (
    <div>
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
              <div className="category">
                <i className="lni lni-package category-icon"></i> Category:
                <a href="/">{}</a>
              </div>

              <h4 class="title">
                <Link to="/">ProductName</Link>
              </h4>

              <div className="">
                Type / Color: Sample, Sample, Sample, Sample
              </div>

              <Star star={1} reviews={1} />
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
    </div>
  );
};

export default PurchasedProduct;
