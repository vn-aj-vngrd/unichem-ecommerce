import { useEffect } from "react";

const Cart = () => {
  useEffect(() => {
    document.title = "Unichem | Cart";
  });

  return (
    <div className="shopping-cart body-content">
      <div className="container">
        <div className="cart-list-head">
          <div className="cart-list-title">
            <div className="row">
              <div className="col-lg-1 col-md-1 col-12"></div>
              <div className="col-lg-4 col-md-3 col-12">
                <p>Product Name</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Quantity</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Subtotal</p>
              </div>
              <div className="col-lg-1 col-md-2 col-12">
                <p>Remove</p>
              </div>
            </div>
          </div>

          <div className="cart-single-list">
            <div className="row align-items-center">
              <div className="col-lg-1 col-md-1 col-12">
                <a href="product-details.html">
                  <img
                    src="https://dm.henkel-dam.com/is/image/henkel/Loctite_271_232077_APAC_50ml_2019_12.15_QRcode?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                    alt="#"
                  />
                </a>
              </div>
              <div className="col-lg-4 col-md-3 col-12">
                <h5 className="product-name">
                  <a href="product-details.html">Test</a>
                </h5>
                <p className="product-des">
                  <span>
                    <b>Type / Color:</b> test
                  </span>
                </p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <div className="count-input">
                  <select className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>$910.00</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>$29.00</p>
              </div>
              <div className="col-lg-1 col-md-2 col-12">
                <a className="remove-item" href="/">
                  <i className="lni lni-close"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="total-amount">
              <div className="row">
                <div className="col-lg-8 col-md-6 col-12"></div>
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="right">
                    <ul>
                      <li>
                        Cart Subtotal<span>$2560.00</span>
                      </li>
                      <li>
                        Shipping Fee<span>Free</span>
                      </li>
                      <li className="last">
                        Total Payment<span>$2531.00</span>
                      </li>
                    </ul>
                    <div className="button">
                      <a href="checkout.html" className="btn">
                        Checkout
                      </a>
                      <a href="product-grids.html" className="btn btn-alt">
                        Continue shopping
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
