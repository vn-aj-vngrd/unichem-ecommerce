import React from "react";

const ProductDetails = () => {
  return (
    <section class="item-details section mt-150">
      <div class="container">
        <div class="top-area">
          <div class="row align-items-center">
            <div class="col-lg-6 col-md-12 col-12">
              <div class="product-images">
                <main id="gallery">
                  <div class="main-img">
                    <img
                      src="assets/images/product-details/01.jpg"
                      id="current"
                      alt="#"
                    />
                  </div>
                  <div class="images">
                    <img
                      src="assets/images/product-details/01.jpg"
                      class="img"
                      alt="#"
                    />
                    <img
                      src="assets/images/product-details/02.jpg"
                      class="img"
                      alt="#"
                    />
                    <img
                      src="assets/images/product-details/03.jpg"
                      class="img"
                      alt="#"
                    />
                    <img
                      src="assets/images/product-details/04.jpg"
                      class="img"
                      alt="#"
                    />
                    <img
                      src="assets/images/product-details/05.jpg"
                      class="img"
                      alt="#"
                    />
                  </div>
                </main>
              </div>
            </div>
            <div class="col-lg-6 col-md-12 col-12">
              <div class="product-info">
                <h2 class="title">GoPro Karma Camera Drone</h2>
                <p class="category">
                  <i class="lni lni-tag"></i> Drones:
                  <a href="/">Action cameras</a>
                </p>
                <h3 class="price">
                  $850<span>$945</span>
                </h3>
                <p class="info-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div class="col-lg-4 col-md-4 col-12">
                  <div class="form-group">
                    <label for="color">Battery capacity</label>
                    <select class="form-control" id="color">
                      <option>5100 mAh</option>
                      <option>6200 mAh</option>
                      <option>8000 mAh</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                  <div class="form-group quantity">
                    <label for="color">Quantity</label>
                    <select class="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="bottom-content">
                <div class="row align-items-end">
                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="button cart-button">
                      <button class="btn" style={{ width: `100%` }}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="wish-button">
                      <button class="btn">
                        <i class="lni lni-reload"></i> Compare
                      </button>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-12">
                    <div class="wish-button">
                      <button class="btn">
                        <i class="lni lni-heart"></i> To Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ProductDetails;

// <div class="product-details-info">
// <div class="single-block">
//   <div class="row">
//     <div class="col-lg-6 col-12">
//       <div class="info-body custom-responsive-margin">
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
//         <ul class="features">
//           <li>Capture 4K30 Video and 12MP Photos</li>
//           <li>Game-Style Controller with Touchscreen</li>
//           <li>View Live Camera Feed</li>
//           <li>Full Control of HERO6 Black</li>
//           <li>Use App for Dedicated Camera Operation</li>
//         </ul>
//       </div>
//     </div>
//     <div class="col-lg-6 col-12">
//       <div class="info-body">
//         <h4>Specifications</h4>
//         <ul class="normal-list">
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
//         <ul class="normal-list">
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