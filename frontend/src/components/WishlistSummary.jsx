import {
  deleteAllWishlist,
  resetWishlist,
} from "../features/wishlist/wishlistSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const WishlistSummary = ({ count }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    return () => {
      dispatch(resetWishlist());
    };
  }, [dispatch]);

  const clearWishlist = () => {
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
        const userID = {
          id: user._id,
        };
        dispatch(deleteAllWishlist(userID));
      }
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
                    <div className="button mt-4">
                      <button to="/checkout" className="btn checkout-btn">
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
