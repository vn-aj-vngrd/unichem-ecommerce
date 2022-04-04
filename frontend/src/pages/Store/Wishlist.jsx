import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getWishlists,
  resetWishlist,
} from "../../features/wishlist/wishlistSlice";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import WishlistRow from "../../components/WishlistRow";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { wishlists, isWishlistLoading, isWishlistError, wishlistMessage } =
    useSelector((state) => state.wishlist);

  useEffect(() => {
    document.title = "Unichem Store | Wishlist";

    if (!user) {
      navigate("/login");
    }

    if (isWishlistError) {
      // console.log(wishlistMessage);
    }
    dispatch(getWishlists());

    return () => {
      dispatch(resetWishlist());
    };
  }, [user, navigate, isWishlistError, wishlistMessage, dispatch]);

  if (isWishlistLoading) {
    return (
      <>
        <Spinner />
        <div className="empty-container"></div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb type="wishlist" />
      <div className="shopping-cart">
        <div className="container">
          <div className="purchase-row-banner cart-banner">
            <div className="cart-product-right hide-on-thin-screen">
              <div className="product-in-cart color-white hide-on-thin-screen">
                Product
              </div>
              <div className="price-in-cart color-white hide-on-thin-screen">
                Price
              </div>
              <div className="price-in-cart color-white hide-on-thin-screen"></div>
              <div className="total-in-cart color-white hide-on-thin-screen"></div>
              <div className="action-in-cart color-white hide-on-thin-screen">
                Action
              </div>
            </div>
          </div>

          <div className="cart-list-head accordion-bodybox-shadow">
            {wishlists.length > 0 ? (
              <>
                {wishlists.map((wishlist, index) => (
                  <WishlistRow key={index} wishlist={wishlist} />
                ))}
              </>
            ) : (
              <>
                <div className="empty-container-sm"></div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
