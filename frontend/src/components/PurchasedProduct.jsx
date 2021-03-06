import { Link } from "react-router-dom";
import Review from "./ReviewModal";

const PurchasedProduct = ({ userID, userImage, orderLines, orderStatus }) => {
  let subtotal = 0;
  return (
    <div>
      {orderLines.map((orderLine) => (
        <div
          key={orderLine._id}
          className="single-product no-box-shadow order-single-product"
        >
          <div key={orderLine._id} className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-12">
              <div className="purchase-product-image product-image">
                <img src={orderLine.image} alt="#"></img>
                <div className="button">
                  <Link
                    to={`/product-details/${orderLine.productID}`}
                    className="btn"
                  >
                    <i className="lni lni-eye"></i> View
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-12">
              <div className="product-info">
                <div className="category">
                  <div>
                    <i className="lni lni-package"></i>Category:
                    <Link to={`/products/category/${orderLine.category}`}>
                      {orderLine.category}
                    </Link>
                  </div>
                </div>

                <h4 className="title">
                  <Link to={`/product-details/${orderLine.productID}`}>
                    {orderLine.productName}
                  </Link>
                </h4>

                <div className="">Type / Color: {orderLine.productType}</div>
                <div className=" price d-flex justify-content-between">
                  <div className="">Quantity: {orderLine.quantity}pcs</div>
                  <div hidden>
                    {(subtotal = orderLine.price * orderLine.quantity)}
                  </div>
                  <div className=" d-flex justify-content-between">
                    <span>₱{subtotal.toFixed(2)}</span>
                    {orderStatus === "Completed" && (
                      <Review
                        userID={userID}
                        userImage={userImage}
                        orderLineID={orderLine._id}
                        productID={orderLine.productID}
                        reviewed={orderLine.reviewed}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PurchasedProduct;
