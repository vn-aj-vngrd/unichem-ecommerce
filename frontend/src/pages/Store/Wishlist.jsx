import { useEffect } from "react";

const Wishlist = () => {
  useEffect(() => {
    document.title = "Unichem | Wishlist";
  });

  return (
    // margin-top 200 so that container may be visible
    <div className="body-content">Wishlist TEST 2</div>
  )
}

export default Wishlist