import { deleteAllWishlist } from "../features/wishlist/wishlistSlice";
import { setCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const WishlistSummary = ({ wishlists, count }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const clearWishlist = (e) => {
    e.preventDefault();

    const userID = {
      id: user._id,
    };

    Swal.fire({
      title: "Are you sure to clear your wishlist?",
      text: "Select YES to proceed, otherwise select CANCEL.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cleared!", "Your wishlist has been cleared.", "success");
        dispatch(deleteAllWishlist(userID));
      }
    });
  };

  const addAlltoCart = () => {
    wishlists.forEach((wishlist) => {
      if (wishlist.product.quantities[wishlist._doc.productType] > 0) {
        const cartData = {
          productID: wishlist._doc.productID,
          productType: wishlist._doc.productType,
          quantity: 1,
          max: wishlist.product.quantities[wishlist._doc.productType],
        };
        dispatch(setCart(cartData));
      }

      // console.log(cartData);
    });

    Swal.fire({
      title: "Items were added to your cart.",
      text: "To checkout, please proceed to the cart page.",
      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "<Link to='/cart'>Go to Cart</Link>",
      cancelButtonText: "Close",
    }).then((result) => {
      if (result.isConfirmed) navigate("/cart");
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="total-amount">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-12"></div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="right">
                  <h5 className="heading">Wishlist Summary</h5>
                  <hr></hr>
                  <ul>
                    <li>
                      Total Items
                      <span>
                        <p className="fw-bold"> {count} Item(s)</p>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    {count > 0 ? (
                      <>
                        <div className="button mt-4">
                          <button
                            className="btn checkout-btn"
                            onClick={addAlltoCart}
                          >
                            Add All to Cart
                          </button>
                        </div>
                        <div className="button mt-3">
                          <button
                            className="btn-alt checkout-btn"
                            onClick={clearWishlist}
                          >
                            Clear Wishlist
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="button">
                          <button className="btn checkout-btn" disabled>
                            Add All to Cart
                          </button>
                        </div>
                        <div className="button mt-3">
                          <button
                            className="btn-alt-disabled checkout-btn"
                            disabled
                          >
                            Clear Wishlist
                          </button>
                        </div>
                      </>
                    )}
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

export default WishlistSummary;
