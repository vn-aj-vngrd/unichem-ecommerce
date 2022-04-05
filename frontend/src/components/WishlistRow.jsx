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

    // console.log(cartData);
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
      {/* Row Start Here */}
      <div className="cart-list-head accordion-bodybox-shadow box-shadow">
      <div class="cart-single-list">
        <div class="row align-items-center">
          <div class="col-lg-1 col-md-1 col-12">
            <Link to="/products">
              <img src={wishlist.product.image} alt="" />
            </Link>
          </div>
          <div class="col-lg-4 col-md-3 col-12">
            <h5 class="">
              <Link to="/">{wishlist.product.productName}</Link>
            </h5>
            <p class="product-des">
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
          <div class="col-lg-2 col-md-2 col-12">
            {/* <div class="count-input">
              <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div> */}
          </div>
          <div class="col-lg-2 col-md-2 col-12">
            <p>$910.00</p>
          </div>
          <div class="col-lg-2 col-md-2 col-12">
            <p>₱ {wishlist.product.prices[wishlist._doc.productType]}</p>
          </div>
          <div class="col-lg-1 col-md-2 col-12">
            <button
              className="remove-item"
              onClick={() => dispatch(deleteWishlist(wishlist._doc._id))}
            >
              <i className="lni lni-close"></i>
            </button>
            <button className="add-item" onClick={addToCart}>
                <i className="lni lni-cart"></i>
              </button>
          </div>
        </div>
      </div>
      </div>
{/* 
      <div className="cart-list-head accordion-bodybox-shadow">
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
                <h5 className="title">
                  <Link to="/">{wishlist.product.productName}</Link>
                </h5>
                <div className="product-des">
                  <p>
                    Type / Color:{" "}
                    {wishlist.product.types[wishlist._doc.productType]}
                  </p>
                </div>
              </div>
              <div className="price-in-cart">
                <div className="price">
                  <h6 className="fw-bolder">
                    ₱ {wishlist.product.prices[wishlist._doc.productType]}
                  </h6>
                </div>
              </div>
              <div className="price-in-cart">
                <div className="price"></div>
              </div>
              <div className="action-in-cart">
                <button className="add-item" onClick={addToCart}>
                  <i className="lni lni-cart"></i>
                </button>
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
              <button className="add-item" onClick={addToCart}>
                <i className="lni lni-cart"></i>
              </button>
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
      </div> */}
      {/* Row End Here */}
    </>
  );
};

export default WishlistRow;
