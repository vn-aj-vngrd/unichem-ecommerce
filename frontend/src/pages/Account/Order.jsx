import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfilePurchase from "../../components/ProfilePurchase";

const Order = () => {
  useEffect(() => {
    document.title = "Unichem Store | Orders";
  });

  return (
    <>
      <Breadcrumb type="order" />
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
