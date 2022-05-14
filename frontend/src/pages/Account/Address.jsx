import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import UserAddress from "../../components/UserAddress";

const Manage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Address";

    if (!sessionStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {user && (
        <>
          <Breadcrumb type="manage" />
          <div className="container main-profile-section">
            <ProfileSidebar />
            <div className="spacer"></div>
            <div className="container">
              <UserAddress />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Manage;
