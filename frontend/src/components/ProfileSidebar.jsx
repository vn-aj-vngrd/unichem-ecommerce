import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//array of 5 items
const ShopSidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <div className="profile-sidebar single-widget search">
        <div className="d-flex align-items-center ">
          <div>
            <img src={user.image} alt="#" className="profile-image" />
          </div>
          <div className="">
            <h5>{user.name.split(" ")[0]}</h5>
            <Link className="sidebar-nav" to="/manage">
              Edit Profile
            </Link>
          </div>
        </div>
        <hr></hr>
        <div className="profile-category">
          <ul className="list">
            <li>
              <Link to="/account/manage">Profile</Link>
            </li>
            <li>
              <Link to="/account/address">Address</Link>
            </li>
            <li>
              <Link to="/account/orders">Orders</Link>
            </li>
            <li>
              <Link to="/account/reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
