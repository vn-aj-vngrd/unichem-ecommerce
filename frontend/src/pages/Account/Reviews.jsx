import { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    document.title = "Unichem | Reviews";
  });

  return <div className="body-content">Reviews</div>;
};

export default Reviews;
