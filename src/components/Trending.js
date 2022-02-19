import React from "react";

//array of 5 items
const count = [1,2,3,4,5,6,7,8];

const Trending = () => {
  return (
    <div>
      <section className="trending-product section" style={{marginTop: `12px`}}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">
                <h2>Trending Product</h2>
                <p>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {count.map((count,index) => (
            <div className="col-lg-3 col-md-6 col-12">
            <div className="single-product">
              <div className="product-image">
                <img src="assets/images/products/product-1.jpg" alt="#" />
                <div className="button">
                  <a href="product-details.html" className="btn">
                    <i className="lni lni-cart"></i> Add to Cart
                  </a>
                </div>
              </div>
              <div className="product-info">
                <span className="category">Watches</span>
                <h4 className="title">
                  <a href="product-grids.html">Xiaomi Mi Band 5</a>
                </h4>
                <ul className="review">
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
                    <i className="lni lni-star"></i>
                  </li>
                  <li>
                    <span>4.0 Review(s)</span>
                  </li>
                </ul>
                <div className="price">
                  <span>$199.00</span>
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
