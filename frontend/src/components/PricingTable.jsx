import React from "react";
import { deleteAllCart, resetCart } from "../features/cart/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const PricingTable = ({ count, subtotal, shippingFee, total }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   return () => {
  //     dispatch(resetCart());
  //   };
  // }, [dispatch]);

  const clearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Delete all items in the cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
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
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="total-amount">
            <div className="row">
              <div className="col-lg-8 col-md-6 col-12"></div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="right">
                  <h5 className="heading">Pricing Table</h5>
                  <hr></hr>
                  <ul>
                    <li>
                      Total Items
                      <span>
                        <p className="fw-bold">{count} Item(s)</p>
                      </span>
                    </li>
                    <li>
                      Cart Subtotal
                      <span>
                        <p className="fw-bold">₱ {subtotal}</p>
                      </span>
                    </li>
                    <li>
                      Shipping Fee
                      <span>
                        <p className="fw-bold">₱ {shippingFee}</p>
                      </span>
                    </li>
                  </ul>
                  <hr></hr>
                  <div>
                    <label className="form-label">Discount Coupon</label>
                    <input className="form-control" type="text"></input>
                  </div>
                </div>

                <div className="no-box-shadow">
                  <div className="order-total-row">
                    <div className="price d-flex justify-content-between align-items-center">
                      <div>Order Total:</div>
                      <div className="spacer"></div>
                      <h5 className="text-danger">₱ {total}</h5>
                    </div>

                    <div className="button mt-4">
                      <Link to="/checkout" className="btn checkout-btn">
                        Checkout
                      </Link>
                    </div>

                    <div className="button mt-3">
                      <button
                        className="btn-alt checkout-btn"
                        onClick={clearCart}
                      >
                        Clear Cart
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

export default PricingTable;
