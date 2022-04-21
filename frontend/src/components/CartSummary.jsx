import { deleteAllCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const PricingTable = ({
  carts,
  cartCount,
  checkoutCount,
  subtotal,
  shippingFee,
  total,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const clearCart = () => {
    Swal.fire({
      title: "Clear Cart?",
      text: "Select YES to clear, otherwise select CANCEL.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f44336",
      cancelButtonColor: "#424242",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Cleared!", "Your cart has been cleared.", "success");
        const userID = {
          id: user._id,
        };
        dispatch(deleteAllCart(userID));
      }
    });
  };

  const checkout = () => {
    navigate("/cart/checkout");
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
                  <h5 className="heading">Cart Summary</h5>
                  <hr></hr>
                  <ul>
                    <li>
                      Total Items
                      <span>
                        <p className="fw-bold">{checkoutCount} Item(s)</p>
                      </span>
                    </li>
                    <li>
                      Cart Subtotal
                      <span>
                        <p className="fw-bold">₱ {subtotal.toFixed(2)}</p>
                      </span>
                    </li>
                    <li>
                      Shipping Fee
                      <span>
                        <p className="fw-bold">₱ {shippingFee.toFixed(2)}</p>
                      </span>
                    </li>
                  </ul>
                  <hr></hr>

                  {/* {total > 0 ? (
                    <>
                      <label className="form-label">Coupon Code</label>
                      <input className="form-control" type="text"></input>
                    </>
                  ) : (
                    <></>
                  )} */}
                </div>

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    {checkoutCount > 0 ? (
                      <>
                        <div className="price d-flex justify-content-between align-items-center">
                          <div>Order Total:</div>
                          <div className="spacer"></div>
                          <h5 className="text-danger">₱ {total.toFixed(2)}</h5>
                        </div>
                        <div className="button mt-4">
                          <button
                            className="btn checkout-btn"
                            onClick={checkout}
                          >
                            Checkout
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="price d-flex justify-content-between align-items-center">
                          <div>Order Total:</div>
                          <div className="spacer"></div>
                          <h5 className="text-danger">₱ {total.toFixed(2)}</h5>
                        </div>
                        <div className="button mt-4">
                          <button className="btn checkout-btn" disabled>
                            Checkout
                          </button>
                        </div>
                      </>
                    )}
                    {cartCount > 0 ? (
                      <>
                        <div className="button mt-3">
                          <button
                            className="btn-alt checkout-btn"
                            onClick={clearCart}
                          >
                            Clear Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="button mt-3">
                          <button
                            className="btn-alt-disabled checkout-btn"
                            disabled
                          >
                            Clear Cart
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

export default PricingTable;
