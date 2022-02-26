import { useEffect, useState } from "react";

const Cart = () => {
  const [counter, setCounter] = useState(1);
  let decrement, increment;
  if (counter > 1) decrement = () => setCounter(counter - 1);
  if (counter < 6) increment = () => setCounter(counter + 1);

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
                <p>Price</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Total</p>
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
                <div className="pe-2 bd-highlight">
                  <div className="form-group quantity">
                    <div className="quantity-control">
                      <button className="quantity-btn" onClick={decrement}>
                        <svg viewBox="0 0 409.6 409.6">
                          <g>
                            <g>
                              <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                            </g>
                          </g>
                        </svg>
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={counter}
                        step="0.1"
                        min="1"
                        max=""
                        name="quantity"
                        readOnly
                      />
                      <button className="quantity-btn" onClick={increment}>
                        <svg viewBox="0 0 426.66667 426.66667">
                          <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>₱910.00</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>₱2000.00</p>
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
                        Cart Subtotal<span>₱2000.00</span>
                      </li>
                      <li>
                        Shipping Fee<span>Free</span>
                      </li>
                      <li className="last">
                        Total Payment<span>₱2000.00</span>
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
