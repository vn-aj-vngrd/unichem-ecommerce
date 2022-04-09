import { Link } from "react-router-dom";
import { setOrder } from "../features/orders/orderSlice";
import Star from "./Star";

const PurchasedProduct = (products) => {
  console.log(products)

   return (
    <div>
      <div className="single-product no-box-shadow profile-single-product">
        {products.productOrders.map((orderLine) => (
          <div
            key={products.orderID + orderLine._id}
            className="row align-items-center"
          >
            <div className="col-lg-4 col-md-4 col-12">
              <div className="purchase-product-image product-image">
                <img
                  src={
                    products.products.find(
                      (product) => product._doc._id === orderLine.productID
                    )._doc.images
                  }
                  alt="#"
                ></img>
                <div className="button">
                  <Link to="/product-details" className="btn">
                    <i className="lni lni-eye"></i> View
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-12">
              <div className="product-info">
                <div className="category">
                  <i className="lni lni-package category-icon"></i>{" "}
                  <a href="/">
                    {
                      products.products.find(
                        (product) => product._doc._id === orderLine.productID
                      )._doc.category
                    }
                  </a>
                </div>

                <h4 className="title">
                  <Link to="/">
                    {
                      products.products.find(
                        (product) => product._doc._id === orderLine.productID
                      )._doc.productName
                    }
                  </Link>
                </h4>

                <div className="">
                  Type / Color:{" "}
                  {
                    products.products.find(
                      (product) => product._doc._id === orderLine.productID
                    )._doc.types[orderLine.productType]
                  }
                </div>
                {/* 
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
                /> */}
                <hr></hr>
                <div className="price">
                  <div className="">Quantity: {orderLine.quantity}pcs</div>
                  <div className="spacer"></div>
                  <span>
                    $
                    {products.products.find(
                      (product) => product._doc._id === orderLine.productID
                    )._doc.prices[orderLine.productType] * orderLine.quantity}
                    
                    {/* {products.addSubTotal(products.products.find(
                      (product) => product._doc._id === orderLine.productID
                    )._doc.prices[orderLine.productType] * orderLine.quantity)} */}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedProduct;
