import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart } from "../features/cart/cartSlice";
import Quantity from "../components/Quantity";

const CartRow = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-single-list">
        <div className="d-flex single-cart-product">
          <div className="d-flex align-items-center cart-product-left">
            <div className="include-in-cart form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              ></input>
            </div>
            <div className="image-in-cart">
              <Link to="/products">
                <img src={cart.product.image} alt="" />
              </Link>
            </div>
          </div>

          <hr className="cart-div"></hr>

          <div className="cart-product-right">
            <div className="product-in-cart">
              <div className="category">
                <i className="lni lni-package category-icon"></i>
                Category: {cart.product.category}
              </div>
              <h5 className="title mt-1">
                <Link to="/">{cart.product.productName}</Link>
              </h5>
              <div className="product-des mt-1">
                <div>
                  Type / Color: {cart.product.types[cart._doc.productType]}
                </div>
              </div>
            </div>

            <div className="quantity-in-cart">
              <Quantity
                max={cart.product.quantities[cart._doc.productType]}
                quantity={cart._doc.quantity}
              />
            </div>

            <div className="price-in-cart">
              <div className="price">
                <h6> ₱ {cart.product.prices[cart._doc.productType]}</h6>
              </div>
            </div>
            <div className="total-in-cart">
              <div className="price">
                <h6 className="fw-bolder">
                  ₱{" "}
                  {cart.product.prices[cart._doc.productType] *
                    cart._doc.quantity}
                </h6>
              </div>
            </div>
            <div className="action-in-cart">
              <button
                className="remove-item"
                onClick={() => dispatch(deleteCart(cart._doc._id))}
              >
                <i className="lni lni-close"></i>
              </button>
            </div>
          </div>
          <div className="action-in-cart-2">
            <button
              className="remove-item"
              onClick={() => dispatch(deleteCart(cart._doc._id))}
            >
              <i className="lni lni-close"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartRow;
