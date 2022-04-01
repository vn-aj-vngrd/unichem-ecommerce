import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"

const Profile = () => {
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  // console.log(user)

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Addresses</h5>
      </div>

      <div className="address-row">
        {/* Address Row Start Here */}
        <div className="profile-address-section">
          {/* If Default */}
          <div className="d-flex align-items-center">
            <h5 className="">Address [1]</h5>
            <div className="default-address-indicator">Default</div>
          </div>
          <hr></hr>
          <div className="addresses">
            <div className="profile-address">
              <ul>
                <li className="address-header">
                  <h6>Tumapon's Best Residence</h6>
                </li>
                <li>
                  <p>
                    <b>Phone:</b> (+63) 916 376 0832
                  </p>
                </li>
                <li>
                  <p>
                    <b>Address:</b> Blk 2 Lot 11, Villa Marina subd. Pajac
                    Lapu-Lapu City, 6015, Cebu, Philippines Pajac, Lapu-Lapu
                    City Visayas, Cebu 6015
                  </p>
                </li>
                <li>
                  <p>
                    <b>Postal Code:</b> 6015
                  </p>
                </li>
              </ul>
              <br></br>
              <div className="address-options button">
                <Link to="/checkout" className="btn set-default-btn">
                  Set as Default
                </Link>
                <Link
                  to="/product-details"
                  className="btn-line second-option-btn"
                >
                  Edit
                </Link>
                <Link
                  to="/product-details"
                  className="btn-line second-option-btn"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Address Row End */}
      </div>
    </div>
  );
};

export default Profile;
