import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "./Spinner";

const Featured = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getProducts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  let featuredProducts = products.filter((product) => {
    return product.featured === true;
  });

  return (
    <>
      {featuredProducts.length > 0 ? (
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
              {featuredProducts.map((product) => (
                <div key={product._id} className="col-lg-3 col-md-6 col-12">
                  <div className="single-product">
                    <div className="product-image">
                      <img
                        src="https://dm.henkel-dam.com/is/image/henkel/loctite-power-grab-mounting-tape-.75inx60in-card_1280x1280?wid=2048&fit=fit%2C1&qlt=90&align=0%2C0&hei=2048"
                        alt="#"
                      />
                      <div className="button">
                        <Link
                          to={"product-details"}
                          state={{ product: product }}
                          className="btn"
                        >
                          <i className="lni lni-eye"></i> View
                        </Link>
                      </div>
                    </div>
                    <div className="product-info">
                      <span className="category">
                        <i className="lni lni-package category-icon"></i>{" "}
                        Category: {product.category}
                      </span>
                      <div className="title">
                        <h5>{product.productName}</h5>
                      </div>
                      <Star star={3} reviews={1} />
                    </div>
                  </div>
                  <div className="order-total-row">
                    <div className="price d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="text-red">
                          <span>₱{product.price[0]}</span>
                        </h6>
                      </div>
                      <div className="items-sold">6.9K items sold</div>
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
