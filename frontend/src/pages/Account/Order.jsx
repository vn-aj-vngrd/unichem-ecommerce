import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import ProfilePurchase from "../../components/ProfilePurchase";

const Order = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Orders";
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {user && (
        <>
          <Breadcrumb type="order" />
          <div className="container main-profile-section">
            <ProfileSidebar />
            <div className="spacer"></div>
            <div className="container">
              <ProfilePurchase />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Order;
