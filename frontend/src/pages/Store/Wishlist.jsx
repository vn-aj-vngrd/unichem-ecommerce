import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlists,
  resetWishlist,
} from "../../features/wishlist/wishlistSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { wishlists, isWishlistLoading, isWishlistError, wishlistMessage } =
    useSelector((state) => state.cart);

  useEffect(() => {
    document.title = "Unichem Store | Wishlist";

    if (!user) {
      navigate("/login");
    }

    if (isWishlistError) {
      console.log(wishlistMessage);
    }

    dispatch(getWishlists());

    return () => {
      dispatch(resetWishlist());
    };
  }, [user, navigate, isWishlistError, wishlistMessage, dispatch]);

  if (isWishlistLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Breadcrumb type="wishlist" />
      <div className="shopping-cart">
        <div className="container">
          <div className="purchase-row-banner cart-banner">
            <div className="d-flex cart-product-left">
              <div className="image-in-cart color-white hide-on-thin-screen"></div>
            </div>
            <div className="cart-product-right">
              <div className="product-in-cart color-white hide-on-thin-screen">
                Product
              </div>
              <div className="price-in-cart color-white hide-on-thin-screen"></div>
              <div className="price-in-cart color-white hide-on-thin-screen"></div>
              <div className="total-in-cart color-white hide-on-thin-screen"></div>
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
                  <hr className="cart-div"></hr>
                  <div className="cart-product-right">
                    <div className="product-in-cart">
                      <div className="category">
                        <i className="lni lni-package category-icon"></i>{" "}
                        Category:
                        <a href="/">{}</a>
                      </div>
                      <h4 className="title">
                        <Link to="/">ProductName</Link>
                      </h4>
                      <div className="product-des">
                        <p>Type / Color: Sample, Sample, Sample, Sample</p>
                      </div>
                    </div>
                    <div className="price-in-cart">
                      <div className="price"></div>
                    </div>
                    <div className="price-in-cart">
                      <div className="price"></div>
                    </div>
                    <div className="total-in-cart">
                      <div className="price">
                        <h6></h6>
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
