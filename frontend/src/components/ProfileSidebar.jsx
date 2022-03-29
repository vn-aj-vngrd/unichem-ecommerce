import { Link } from "react-router-dom";

//array of 5 items
const ShopSidebar = () => {
  return (
    <div>
      <div className="profile-sidebar single-widget search">
        <div className="d-flex align-items-center ">
          <div>
            <img
              src="https://i.mydramalist.com/kEpQwc.jpg"
              alt="#"
              className="profile-image"
            />
          </div>
          <div className="">
            <h5>Username</h5>
            <Link className="sidebar-nav" to="/manage">
              Edit Profile
            </Link>
          </div>
        </div>
        <hr></hr>
        <div className="profile-category">
          <ul className="list">
            <li>
              <Link className="" to="/manage">
                Profile
              </Link>
            </li>
            <li>
              <Link className="" to="/address">
                Address
              </Link>
            </li>
            <li>
              <Link className="" to="/orders">
                Orders
              </Link>
            </li>
            <li>
              <Link className="" to="/reviews">
                Reviews
              </Link>
            </li>
            <li>
              <Link className="" to="">
                Change Password
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
