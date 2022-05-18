import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getFeaturedProducts,
  resetProduct,
} from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "./Spinner";

const Featured = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getFeaturedProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [navigate, isProductError, productMessage, dispatch]);

  if (isProductLoading) {
    return <Spinner />;
  }

  let salesPrice = 0;

  return (
    <>
      {products && products.length > 0 ? (
        <section className="trending-product">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="section-title">
                  <h2>Featured Products</h2>
                  <p>Here are the featured products of Unichem.</p>
                </div>
              </div>
            </div>
            <div className="row">
              {products.map((product) => (
                <div
                  key={product._doc._id}
                  className="col-lg-3 col-md-6 col-12"
                >
                  <div className="box-shadow">
                    <div className="single-product">
                      <div className="product-image featured-product-image">
                        {/* promo  CLASS (.sale-tag OR .new-tag)*/}
                        {product._doc.salePercent > 0 ? (
                          <div className="sale-tag">
                            <b>- {product._doc.salePercent}% OFF</b>
                          </div>
                        ) : (
                          <></>
                        )}

                        {/* end of promo */}
                        <img
                          src={product._doc.images[0]}
                          className=""
                          alt={product._doc.productName}
                        />
                        <div className="button">
                          <Link
                            to={`/product-details/${product._doc._id}`}
                            className="btn"
                          >
                            <i className="lni lni-eye"></i> View
                          </Link>
                        </div>
                      </div>
                      <div className="product-info">
                        <span className="category">
                          <i className="lni lni-package category-icon"></i>{" "}
                          {product._doc.category}
                        </span>
                        <div className="title">
                          <h5>{product._doc.productName}</h5>
                        </div>
                        <Star
                          star={product.market.averageRatings}
                          reviews={product.market.reviewsCount}
                        />
                      </div>
                    </div>
                    <div className="order-total-row">
                      <div className="price d-flex justify-content-between align-items-center">
                        <div>
                          <div hidden>
                            {
                              (salesPrice =
                                product._doc.prices[0] -
                                (product._doc.prices[0] *
                                  product._doc.salePercent) /
                                  100)
                            }
                          </div>

                          {product._doc.isSale ? (
                            <h6 className="text-red">
                              ₱ {salesPrice.toFixed(2)}
                              <del className="small text-grey ps-1">
                                ₱{product._doc.prices[0].toFixed(2)}
                              </del>
                            </h6>
                          ) : (
                            <h6 className="text-red">
                              ₱{product._doc.prices[0].toFixed(2)}
                            </h6>
                          )}
                        </div>
                        <div className="items-sold">
                          {product.market.sold} sold
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <></>
      )}
    </>
  );
};

export default Featured;
