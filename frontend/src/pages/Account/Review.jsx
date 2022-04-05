import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfileReviews from "../../components/ProfileReviews";

const Review = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Reviews";
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Breadcrumb type="review" />
          <div className="container main-profile-section">
            <ProfileSidebar />
            <div className="spacer"></div>
            <ProfileReviews />
          </div>
        </>
      )}
    </>
  );
};

export default Review;
