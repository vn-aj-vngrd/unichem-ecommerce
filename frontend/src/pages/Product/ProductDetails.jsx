import Details from "../../components/Details";
import Specifications from "../../components/Specifications";
import Reviews from "../../components/Reviews";
import ScrollToTop from "../../components/ScrollToTop";

const ProductDetails = () => {
  return (
    <>
      <ScrollToTop />
      <Details />
      <Specifications />
      <Reviews />
    </>
  );
};

export default ProductDetails;
