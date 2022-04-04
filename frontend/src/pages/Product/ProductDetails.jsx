import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, resetProduct } from "../../features/products/productSlice";
import { createAction } from "@reduxjs/toolkit";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";
import Breadcrumb from "../../components/Breadcrumb";
import Spinner from "../../components/Spinner";

const ProductDetails = () => {
  let { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    document.title = "Unichem Store | Product Details";

    if (isError) {
      console.log(message);
    }

    dispatch(getProducts());

    return () => {
      dispatch(resetProduct());
    };
  }, [navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  let product = products.filter((product) => {
    return product._id === id;
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
      <Reviews />
    </>
  );
};

export default ProductDetails;
