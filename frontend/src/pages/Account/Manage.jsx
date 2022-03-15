import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import Profile from "../../components/Profile";

const Manage = () => {
  useEffect(() => {
    document.title = "Unichem Store | Manage Acccount";
  });

  return (
    <>
      <Breadcrumb type="manage" />
      <div className="container main-profile-section">
        <ProfileSidebar />
        <div className="spacer"></div>
        <Profile />
      </div>
      {/* content here */}
    </>
  );
};

export default Manage;
