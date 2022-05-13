import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import OrderLogInformation from "../../components/OrderLogInformation";

const OrderDetails = () => {
  return (
    <>
      <Breadcrumb type="order" />
      <div className="container main-profile-section">
        <ProfileSidebar />
        <div className="spacer"></div>

        <div className="container">
          <OrderLogInformation />
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
