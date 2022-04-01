import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteWishlist } from "../features/wishlist/wishlistSlice";

const WishlistRow = ({ wishlist }) => {
  const dispatch = useDispatch();

  return (
    <>
      {/* Row Start Here */}
      <div className="cart-single-list">
        <div className="d-flex single-cart-product">
          <div className="d-flex align-items-center cart-product-left">
            <div className="image-in-cart">
              <Link to="/products">
                <img src={wishlist.product.image} alt="" />
              </Link>
            </div>
          </div>
          <hr className="cart-div"></hr>
          <div className="cart-product-right">
            <div className="product-in-cart">
              <div className="category">
                <i className="lni lni-package category-icon"></i> Category:{" "}
                {wishlist.product.category}
              </div>
              <h4 className="title">
                <Link to="/">{wishlist.product.productName}</Link>
              </h4>
              <div className="product-des">
                <p>
                  Type / Color:{" "}
                  {wishlist.product.types[wishlist._doc.productType]}
                </p>
              </div>
            </div>
            <div className="price-in-cart">
              <div className="price">
                ₱ {wishlist.product.prices[wishlist._doc.productType]}
              </div>
            </div>
            <div className="price-in-cart">
              <div className="price"></div>
            </div>
            <div className="total-in-cart">
              <div className="price"></div>
            </div>
            <div className="action-in-cart">
              <button
                className="remove-item"
                onClick={() => dispatch(deleteWishlist(wishlist._doc._id))}
              >
                <i className="lni lni-close"></i>
              </button>
            </div>
          </div>
          <div className="action-in-cart-2">
            <button
              className="remove-item"
              onClick={() => dispatch(deleteWishlist(wishlist._doc._id))}
            >
              <i className="lni lni-close"></i>
            </button>
          </div>
        </div>
      </div>
      {/* Row End Here */}
    </>
  );
};

export default WishlistRow;
