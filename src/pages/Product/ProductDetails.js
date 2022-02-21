import React from "react";
import Breadcrumb from "../../components/Breadcrumb";

const ProductDetails = () => {
  return (
    <div classNameName="container">
      <Breadcrumb />
      <div className="item-details">
        <div className="container">
          <div className="top-area">
            <div className="row align-items-center">
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-images">
                  <main id="gallery">
                    <div className="main-img">
                      <img
                        src="assets/images/product-details/01.jpg"
                        id="current"
                        alt="#"
                      />
                    </div>
                    <div className="images">
                      <img
                        src="assets/images/product-details/01.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/02.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/03.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/04.jpg"
                        className="img"
                        alt="#"
                      />
                      <img
                        src="assets/images/product-details/05.jpg"
                        className="img"
                        alt="#"
                      />
                    </div>
                  </main>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-12">
                <div className="product-info">
                  <h2 className="title">Product Title</h2>
                  <p className="category">
                    <i className="lni lni-package"></i> Category:
                    <a href="/">Test</a>
                  </p>
                  <h3 className="price">
                    ₱850
                  </h3>
                  <p className="info-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>

                  <div className="d-flex flex-row bd-highlight mb-3 w-100">
                    <div className="p-2 bd-highlight">
                      <div className="form-group">
                        <label for="color">Color / Type</label>
                        <select className="form-control" id="color">
                          <option>5100 mAh</option>
                          <option>6200 mAh</option>
                          <option>8000 mAh</option>
                        </select>
                      </div>
                    </div>
                    <div className="p-2 bd-highlight">
                      <div className="form-group quantity">
                        <label for="color">Quantity</label>
                        <div className="d-flex flex-row bd-highlight mb-3">
                          <div className="bd-highlight">
                            <button className="form-control">-</button>
                          </div>
                          <div className="bd-highlight">
                            <input type="number" className="form-control" />
                          </div>
                          <div className="bd-highlight">
                            <button className="form-control">+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

// <div className="product-details-info">
// <div className="single-block">
//   <div className="row">
//     <div className="col-lg-6 col-12">
//       <div className="info-body custom-responsive-margin">
//         <h4>Details</h4>
//         <p>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
//           do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           Ut enim ad minim veniam, quis nostrud exercitation ullamco
//           laboris nisi ut aliquip ex ea commodo consequat. Duis aute
//           irure dolor in reprehenderit in voluptate velit esse cillum
//           dolore eu fugiat.
//         </p>
//         <h4>Features</h4>
//         <ul className="features">
//           <li>Capture 4K30 Video and 12MP Photos</li>
//           <li>Game-Style Controller with Touchscreen</li>
//           <li>View Live Camera Feed</li>
//           <li>Full Control of HERO6 Black</li>
//           <li>Use App for Dedicated Camera Operation</li>
//         </ul>
//       </div>
//     </div>
//     <div className="col-lg-6 col-12">
//       <div className="info-body">
//         <h4>Specifications</h4>
//         <ul className="normal-list">
//           <li>
//             <span>Weight:</span> 35.5oz (1006g)
//           </li>
//           <li>
//             <span>Maximum Speed:</span> 35 mph (15 m/s)
//           </li>
//           <li>
//             <span>Maximum Distance:</span> Up to 9,840ft (3,000m)
//           </li>
//           <li>
//             <span>Operating Frequency:</span> 2.4GHz
//           </li>
//           <li>
//             <span>Manufacturer:</span> GoPro, USA
//           </li>
//         </ul>
//         <h4>Shipping Options:</h4>
//         <ul className="normal-list">
//           <li>
//             <span>Courier:</span> 2 - 4 days, $22.50
//           </li>
//           <li>
//             <span>Local Shipping:</span> up to one week, $10.00
//           </li>
//           <li>
//             <span>UPS Ground Shipping:</span> 4 - 6 days, $18.00
//           </li>
//           <li>
//             <span>Unishop Global Export:</span> 3 - 4 days, $25.00
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// </div>
// </div>
