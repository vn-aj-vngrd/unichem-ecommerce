import { Link } from "react-router-dom";

//array of 5 items
const ShopSidebar = () => {
  return (
    <div>
      <div className="profile-sidebar single-widget search">
        <div className="d-flex align-items-center ">
          <div>
            <img
              src="https://scontent.fcrk4-1.fna.fbcdn.net/v/t1.6435-9/89595114_2790668074362384_5253522795815501824_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=a4a2d7&_nc_eui2=AeHXsn03IiqEn6omaUEIHM_Bi_8pd_rKJnGL_yl3-somcSQcauFysieA3LXgKI8yhRkZ1o5VDJ3MtPnrn4tZ3Kzw&_nc_ohc=GUU2jNVQE6sAX-Ni2kI&tn=k5PFbSYe6hUkAfvk&_nc_ht=scontent.fcrk4-1.fna&oh=00_AT-LMPLrqajMuCM7JZGz86dSo4VMp6jG82Tc1BzBiuluWA&oe=623E037F"
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
