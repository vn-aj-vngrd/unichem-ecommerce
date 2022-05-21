import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getOneProduct,
  resetProduct,
} from "../../features/products/productSlice";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import ReviewsSection from "../../components/ReviewsSection";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";
import PageNotFound from "../PageNotFound";

const ProductDetails = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    document.title = "Unichem Store | Product Details";

    if (isProductError) {
      dispatch(resetProduct());
    }

    dispatch(getOneProduct(id));

    return () => {
      dispatch(resetProduct());
    };
  }, [navigate, id, isProductError, productMessage, dispatch]);

  return (
    <>
      <Breadcrumb type="product" />
      <>
        {isProductLoading ? (
          <div className="container">
            <Spinner />
          </div>
        ) : (
          <>
            {products.length > 0 ? (
              <>
                <Details product={products[0]} />
                <Specifications product={products[0]} />
                <ReviewsSection productID={id} />
              </>
            ) : (
              <div className="not-found">
                <PageNotFound />
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};

export default ProductDetails;
