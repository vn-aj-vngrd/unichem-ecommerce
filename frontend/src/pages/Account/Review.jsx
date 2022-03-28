import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfileReviews from "../../components/ProfileReviews";

const Review = () => {
  useEffect(() => {
    document.title = "Unichem Store | Reviews";
  });

  return (
    <>
      <Breadcrumb type="review" />
      <div className="container main-profile-section">
        <ProfileSidebar />
        <div className="spacer"></div>
        <ProfileReviews />
      </div>
      {/* content here */}
    </>
  );
};

export default Review;
