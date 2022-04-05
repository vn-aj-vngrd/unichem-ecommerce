import { useEffect } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import ProfileSidebar from "../../components/ProfileSidebar";
import UserAddress from "../../components/UserAddress";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Manage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Manage Acccount";

    if (!user) {
      console.log(user);
      navigate("/login");
    }
    
  }, [user, navigate]);

  return (
    <>
      <Breadcrumb type="manage" />
      <div className="container main-profile-section">
        <ProfileSidebar />
        <div className="spacer"></div>
        <UserAddress />
      </div>
    </>
  );
};

export default Manage;
