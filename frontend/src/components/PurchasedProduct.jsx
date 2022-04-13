import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Star from "./Star";

const PurchasedProduct = ({ products, orderLines }) => {
  const navigate = useNavigate();

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
                <img
                  src={
                    products.find(
                      (product) => product._doc._id === orderLine.productID
                    )._doc.images[0]
                  }
                  alt="#"
                ></img>
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
                    <Link
                      to={`/products/category/${
                        products.find(
                          (product) => product._doc._id === orderLine.productID
                        )._doc.category
                      }`}
                    >
                      {
                        products.find(
                          (product) => product._doc._id === orderLine.productID
                        )._doc.category
                      }
                    </Link>
                  </div>
                </div>

                <h4 className="title">
                  <Link to={`/product-details/${orderLine.productID}`}>
                    {orderLine.productName}
                  </Link>
                </h4>

                <div className="">Type / Color: {orderLine.productType}</div>
                <Star
                  star={
                    products.find(
                      (product) => product._doc._id === orderLine.productID
                    ).market.averageRatings
                  }
                  reviews={
                    products.find(
                      (product) => product._doc._id === orderLine.productID
                    ).market.reviewsCount
                  }
                />
                <hr></hr>
                <div className="price d-flex justify-content-between">
                  <div className="">Quantity: {orderLine.quantity}pcs</div>
                  <div hidden>
                    {(subtotal = orderLine.price * orderLine.quantity)}
                  </div>
                  <span>₱{subtotal.toFixed(2)}</span>
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
