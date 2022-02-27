import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";

const Review = () => {
  useEffect(() => {
    document.title = "Unichem | Reviews";
  });

  return (
    <>
      <Breadcrumb type="review" />
      {/* content here */}
    </>
  );
};

export default Review;
