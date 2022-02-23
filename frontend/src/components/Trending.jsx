import { Link } from "react-router-dom";
import Star from "./Star";

const count = [1, 2, 3, 4, 5, 6, 7, 8];
const star = 4.5;
const reviews = 5;

const Trending = () => {
  return (
    <div>
      <section className="trending-product section">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Trending Products</h2>
                <p>Here are the trending products of the month.</p>
              </div>
            </div>
          </div>
          <div className="row">
            {count.map((count, index) => (
              <div key={index} className="col-lg-3 col-md-6 col-12">
                <div className="single-product">
                  <div className="product-image">
                    <img src="assets/images/products/product-1.jpg" alt="#" />
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
        </div>
      </section>
    </div>
  );
};

export default Trending;
