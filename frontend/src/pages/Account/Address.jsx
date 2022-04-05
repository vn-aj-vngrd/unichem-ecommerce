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
    document.title = "Unichem Store | Manage Acccount";

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      {user && (
        <>
          <Breadcrumb type="manage" />
          <div className="container main-profile-section">
            <ProfileSidebar />
            <div className="spacer"></div>
            <UserAddress />
          </div>
        </>
      )}
    </>
  );
};

export default Manage;
