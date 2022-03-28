import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";

const Wishlist = () => {
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
    document.title = "Unichem Store | Wishlist";

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
          <div className="purchase-row-banner cart-banner">
            <div className="d-flex cart-product-left">
              <div className="image-in-cart color-white hide-on-thin-screen"></div>
            </div>
            <div className="cart-product-right">
              <div className="product-in-cart color-white hide-on-thin-screen"></div>
              <div className="price-in-cart color-white hide-on-thin-screen">
                Price
              </div>
              <div className="price-in-cart color-white hide-on-thin-screen">
                Discount
              </div>
              <div className="total-in-cart color-white hide-on-thin-screen">
                Total Price
              </div>
              <div className="action-in-cart color-white hide-on-thin-screen">
                Action
              </div>
            </div>
          </div>

          <div className=" box-shadow">
            {/* Row Start Here */}
            <div className="cart-list-head">
              <div className="cart-single-list">
                <div className="d-flex single-cart-product">
                  <div className="d-flex align-items-center cart-product-left">
                    <div className="image-in-cart">
                      <Link to="/products">
                        <img
                          src="https://dm.henkel-dam.com/is/image/henkel/Loctite_271_232077_APAC_50ml_2019_12.15_QRcode?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                          alt="#"
                        />
                      </Link>
                    </div>
                  </div>
                  <hr classNam="cart-div"></hr>
                  <div className="cart-product-right">
                    <div className="product-in-cart">
                      <div className="category">
                        <i className="lni lni-package category-icon"></i>{" "}
                        Category:
                        <a href="/">{}</a>
                      </div>
                      <h4 class="title">
                        <Link to="/">ProductName</Link>
                      </h4>
                      <p className="product-des">
                        <div className="">
                          Type / Color: Sample, Sample, Sample, Sample
                        </div>
                      </p>
                    </div>
                    <div className="price-in-cart">
                      <div className="price">
                        <h6> $.00</h6>
                      </div>
                    </div>
                    <div className="price-in-cart">
                      <div className="price">
                        <h6> $50.00</h6>
                      </div>
                    </div>
                    <div className="total-in-cart">
                      <div className="price">
                        <h6>
                          <b> $199.00</b>
                        </h6>
                      </div>
                    </div>
                    <div className="action-in-cart">
                      <button className="remove-item">
                        <i className="lni lni-close"></i>
                      </button>
                    </div>
                  </div>
                  <div className="action-in-cart-2">
                    <button className="remove-item">
                      <i className="lni lni-close"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Row End Here */}
            {/* Row Start Here */}
            <div className="cart-list-head">
              <div className="cart-single-list">
                <div className="d-flex single-cart-product">
                  <div className="d-flex align-items-center cart-product-left">
                    <div className="image-in-cart">
                      <Link to="/products">
                        <img
                          src="https://dm.henkel-dam.com/is/image/henkel/Loctite_271_232077_APAC_50ml_2019_12.15_QRcode?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                          alt="#"
                        />
                      </Link>
                    </div>
                  </div>
                  <hr classNam="cart-div"></hr>
                  <div className="cart-product-right">
                    <div className="product-in-cart">
                      <div className="category">
                        <i className="lni lni-package category-icon"></i>{" "}
                        Category:
                        <a href="/">{}</a>
                      </div>
                      <h4 class="title">
                        <Link to="/">ProductName</Link>
                      </h4>
                      <p className="product-des">
                        <div className="">
                          Type / Color: Sample, Sample, Sample, Sample
                        </div>
                      </p>
                    </div>
                    <div className="price-in-cart">
                      <div className="price">
                        <h6> $.00</h6>
                      </div>
                    </div>
                    <div className="price-in-cart">
                      <div className="price">
                        <h6> $50.00</h6>
                      </div>
                    </div>
                    <div className="total-in-cart">
                      <div className="price">
                        <h6>
                          <b> $199.00</b>
                        </h6>
                      </div>
                    </div>
                    <div className="action-in-cart">
                      <button className="remove-item">
                        <i className="lni lni-close"></i>
                      </button>
                    </div>
                  </div>
                  <div className="action-in-cart-2">
                    <button className="remove-item">
                      <i className="lni lni-close"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Row End Here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
