import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfilePurchase from "../../components/ProfilePurchase";

const Order = () => {
  useEffect(() => {
<<<<<<< Updated upstream
    document.title = "Unichem Store | Orders";
=======
    document.title = "Unichem | Manage Acccount";
>>>>>>> Stashed changes
  });

  return (
    <>
      <Breadcrumb type="manage" />
      <div className="container main-profile-section">
        <ProfileSidebar />
        <div className="spacer"></div>
        <ProfilePurchase />
      </div>
      {/* content here */}
    </>
  );
};

export default Order;
