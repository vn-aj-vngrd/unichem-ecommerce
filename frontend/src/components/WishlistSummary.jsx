import {
  deleteAllWishlist,
  resetWishlist,
} from "../features/wishlist/wishlistSlice";
import { setCart, resetCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const WishlistSummary = ({ wishlists, count }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetCart());
      // dispatch(resetWishlist());
    };
  }, [dispatch]);

  const clearWishlist = (e) => {
    e.preventDefault();

    const userID = {
      id: user._id,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Delete all items in wishlist",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cleared!", "Your wishlist has been cleared.", "success");
        dispatch(deleteAllWishlist(userID));
      }
    });
  };

  const addAlltoCart = () => {
    for (let i = 0; i < wishlists.length; i++) {
      const cartData = {
        productID: wishlists[i]._doc.productID,
        productType: wishlists[i]._doc.productType,
        quantity: 1,
        max: wishlists[i].product.quantities[wishlists[i]._doc.productType],
      };
      dispatch(setCart(cartData));
      // console.log(cartData);
    }

    Swal.fire({
      title: "Items were added to your cart.",
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
                        <div className="button mt-4">
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
