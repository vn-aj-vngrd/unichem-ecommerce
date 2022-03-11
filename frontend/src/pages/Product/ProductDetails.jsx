import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";
import Breadcrumb from "../../components/Breadcrumb";

const ProductDetails = () => {
  const location = useLocation();
  useEffect(() => {
    document.title = "Unichem Store | Product Details";
  }, [location.key]);

  let { id } = useParams();
  console.log(id);

  return (
    <>
      {/* <Breadcrumb type="product"/>
      <Details product={product} />
      <Specifications product={product} />
      <Reviews /> */}
    </>
  );
};

export default ProductDetails;
