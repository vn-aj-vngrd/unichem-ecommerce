import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, reset } from "../features/products/productSlice";
import Star from "./Star";
import Spinner from "../components/Spinner";

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
        <section className="trending-product section">
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
                      <img src="assets/images/products/product-1.jpg" alt="#" />
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
                      <span className="category">{product.category}</span>
                      <h4 className="title">
                        <span>{product.productName}</span>
                      </h4>

                      <Star star={3} reviews={1} />

                      <hr />

                      <div className="price">
                        <span>₱{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-80"> </div>
      )}
    </>
  );
};

export default Featured;
