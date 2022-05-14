import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlists,
  resetWishlist,
} from "../../features/wishlist/wishlistSlice";
import { resetCart } from "../../features/cart/cartSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import WishlistRow from "../../components/WishlistRow";
import WishlistSummary from "../../components/WishlistSummary";
import { toast } from "react-toastify";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { wishlists, isWishlistLoading, isWishlistError, wishlistMessage } =
    useSelector((state) => state.wishlist);

  useEffect(() => {
    document.title = "Unichem Store | Wishlist";

    if (!localStorage.getItem("user")) {
      navigate("/login");
    }

    if (isWishlistError) {
      toast.error(wishlistMessage);
    }

    dispatch(getWishlists());

    return () => {
      dispatch(resetCart());
      dispatch(resetWishlist());
    };
  }, [navigate, isWishlistError, wishlistMessage, dispatch]);

  return (
    <>
      <Breadcrumb type="wishlist" />
      <div className="shopping-cart">
        {isWishlistLoading ? (
          <div className="container">
            <Spinner />
          </div>
        ) : (
          <div className="container">
            <div className="cart-list-head">
              <div className="cart-list-title purchase-row-banner">
                <div className="row">
                  <div className="col-lg-1 col-md-1 col-12"></div>
                  <div className="col-lg-3 col-md-3 col-12">
                    <p>Product</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Price</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Discount</p>
                  </div>
                  <div className="col-lg-2 col-md-2 col-12">
                    <p>Stock</p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-12">
                    <p></p>
                  </div>
                  <div className="col-lg-1 col-md-1 col-12">
                    <p></p>
                  </div>
                </div>
              </div>
            </div>

            {wishlists.length > 0 ? (
              <>
                {wishlists.map((wishlist, index) => (
                  <WishlistRow key={index} wishlist={wishlist} />
                ))}
              </>
            ) : (
              <>
                <div className="cart-list-head">
                  <div className="cart-add-padding">
                    <div className="text-center">
                      There are no items in your wishlist.
                    </div>
                    <div className="text-center mt-3">
                      <div className="button">
                        <Link to="/" className="btn">
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            <WishlistSummary wishlists={wishlists} count={wishlists.length} />
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
