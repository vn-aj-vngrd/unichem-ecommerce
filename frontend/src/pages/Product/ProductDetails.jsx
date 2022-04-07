import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  resetProduct,
} from "../../features/products/productSlice";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";

const ProductDetails = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isProductLoading, isProductError, productMessage } =
    useSelector((state) => state.products);

  useEffect(() => {
    document.title = "Unichem Store | Product Details";

    if (isProductError) {
      // console.log(productMessage);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [navigate, isProductError, productMessage, dispatch]);

  if (isProductLoading) {
    return (
      <>
        <div className="empty-container"></div>
        <Spinner />
      </>
    );
  }

  const product = products.filter((product) => {
    return product._doc._id === id;
  });

  return (
    <>
      <Breadcrumb type="product" />

      {product.length > 0 ? (
        <>
          <Details product={product[0]} />
          <Specifications product={product[0]} />
        </>
      ) : (
        <></>
      )}
      <Reviews productID={id} />
    </>
  );
};

export default ProductDetails;
