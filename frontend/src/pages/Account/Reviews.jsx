import { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    document.title = "Unichem | Reviews";
  });

  return <div className="container mt-200">Reviews</div>;
};

export default Reviews;
