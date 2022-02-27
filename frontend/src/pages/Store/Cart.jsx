import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";

const Cart = () => {
  const quantity = 5; //test
  const [counter, setCounter] = useState(1);
  let decrement, increment;
  if (counter > 1) decrement = () => setCounter(counter - 1);
  if (counter < quantity) increment = () => setCounter(counter + 1);
  let handleChange = (e) => {
    setCounter(e.target.value);

    if (e.target.value > quantity) {
      setCounter(quantity);
    }
    if (e.target.value < 0) {
      setCounter(1);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem | Cart";

    if (!user) {
      navigate("/login");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Breadcrumb type="cart" />
      <div className="shopping-cart">
        <div className="container">
          <div className="cart-list-head">
            <div className="cart-list-title">
              <div className="row">
                <div className="col-lg-1 col-md-1 col-12"></div>
                <div className="col-lg-4 col-md-3 col-12">
                  <p>Product Name</p>
                </div>
                <div className="col-lg-2 col-md-3 col-12">
                  <p>Quantity</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Price</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>Total</p>
                </div>
                <div className="col-lg-1 col-md-1 col-12"></div>
              </div>
            </div>

            <div className="cart-single-list">
              <div className="row align-items-center">
                <div className="col-lg-1 col-md-1 col-12">
                  <Link to="/products">
                    <img
                      src="https://dm.henkel-dam.com/is/image/henkel/Loctite_271_232077_APAC_50ml_2019_12.15_QRcode?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                      alt="#"
                    />
                  </Link>
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
                <div className="col-lg-2 col-md-3 col-12">
                  <div className="quantity-control text-center">
                    <button className="quantity-btn" onClick={decrement}>
                      <svg viewBox="0 0 409.6 409.6">
                        <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                      </svg>
                    </button>
                    <input
                      type="number"
                      className="quantity-input"
                      value={counter}
                      name="quantity"
                      min="1"
                      max={quantity}
                      onChange={handleChange}
                    />
                    <button className="quantity-btn" onClick={increment}>
                      <svg viewBox="0 0 426.66667 426.66667">
                        <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>₱910.00</p>
                </div>
                <div className="col-lg-2 col-md-2 col-12">
                  <p>₱2000.00</p>
                </div>
                <div className="col-lg-1 col-md-1 col-12">
                  <button className="remove-item">
                    <i className="lni lni-close"></i>
                  </button>
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
                        <Link to="/checkout" className="btn">
                          Checkout
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
