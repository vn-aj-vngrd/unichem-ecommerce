import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCart } from "../features/cart/cartSlice";
import Quantity from "../components/Quantity";

const CartRow = ({ cart }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-list-head accordion-bodybox-shadow box-shadow">
        <div className="cart-single-list">
          <div className="row align-items-center">
            <div className="col-lg-1 col-md-1 col-12">
              <Link to="/products">
                <img src={cart.product.image} alt="" />
              </Link>
            </div>
            <div className="col-lg-4 col-md-3 col-12">
              <h5 className="">
                <Link to={`/product-details/${cart.product._id}`}>
                  {cart.product.productName}
                </Link>
              </h5>
              <p className="product-des">
                <span>
                  <em>
                    <i className="lni lni-package category-icon"></i>Category:{" "}
                  </em>{" "}
                  {cart.product.category}
                </span>
                <span>
                  <em>Type / Color:</em>{" "}
                  {cart.product.types[cart._doc.productType]}
                </span>
              </p>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <Quantity
                cartID={cart._doc._id}
                max={cart.product.quantities[cart._doc.productType]}
                quantity={cart._doc.quantity}
              />
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <p>₱ {cart.product.prices[cart._doc.productType]}</p>
            </div>
            <div className="col-lg-2 col-md-2 col-12">
              <p>
                ₱
                {Math.round(
                  cart.product.prices[cart._doc.productType] *
                    cart._doc.quantity *
                    100
                ) / 100}
              </p>
            </div>
            <div className="col-lg-1 col-md-2 col-12">
              <button
                className="remove-item"
                onClick={() => dispatch(deleteCart(cart._doc._id))}
              >
                <i className="lni lni-close"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <div className="cart-list-head box-shadow">
        <div className="cart-single-list">
          <div className="d-flex single-cart-product">
            <div className="d-flex align-items-center cart-product-left">
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
                  cartID={cart._doc._id}
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
      </div> */}
    </>
  );
};

export default CartRow;
