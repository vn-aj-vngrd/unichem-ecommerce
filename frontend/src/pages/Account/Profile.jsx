import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import Profile from "../../components/Profile";

const Manage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Profile";
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Breadcrumb type="manage" />
          <div className="container main-profile-section mt-90">
            <ProfileSidebar />
            <div className="spacer"></div>
            <Profile />
          </div>
        </>
      )}
    </>
  );
};

export default Manage;
