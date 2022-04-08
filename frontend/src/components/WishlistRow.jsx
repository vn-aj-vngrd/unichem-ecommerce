import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteWishlist } from "../features/wishlist/wishlistSlice";
import { setCart } from "../features/cart/cartSlice.js";
import Swal from "sweetalert2";

const WishlistRow = ({ wishlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToCart = (e) => {
    e.preventDefault();

    const cartData = {
      productID: wishlist.product._id,
      productType: wishlist._doc.productType,
      quantity: 1,
      max: wishlist.product.quantities[wishlist._doc.productType],
    };

    dispatch(setCart(cartData));
    Swal.fire({
      title: "Item was added to your cart.",
      text: "To checkout, please proceed to the cart page.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "<Link to='/cart'>Go to Cart</Link>",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  return (
    <>
      <div className="cart-list-head accordion-body">
        <div className="cart-single-list">
          <div className="row align-items-center">
            <div className="col-lg-1 col-md-1 col-12">
              <Link to="/products">
                <img src={wishlist.product.images[0]} alt="" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-3 col-12">
              <h5 className="">
                <Link to="/">{wishlist.product.productName}</Link>
              </h5>
              <p className="product-des">
                <span>
                  <em>
                    <i className="lni lni-package category-icon"></i>Category:{" "}
                  </em>{" "}
                  {wishlist.product.category}
                </span>
                <span>
                  <em>Type / Color:</em>{" "}
                  {wishlist.product.types[wishlist._doc.productType]}
                </span>
              </p>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <p>
                ₱{" "}
                {wishlist.product.prices[wishlist._doc.productType].toFixed(2)}
              </p>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              {wishlist.product.salePercent > 0 ? (
                <p>- {wishlist.product.salePercent}% OFF</p>
              ) : (
                <p>Unavailable</p>
              )}
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <button className="add-item" onClick={addToCart}>
                <i className="lni lni-cart"></i>
              </button>
            </div>

            <div className="col-lg-1 col-md-2 col-12">
              <button
                className="remove-item"
                onClick={() => dispatch(deleteWishlist(wishlist._doc._id))}
              >
                <i className="lni lni-close"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistRow;
