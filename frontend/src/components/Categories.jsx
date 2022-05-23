import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <section className="featured-categories">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-title">
              <h2>Categories</h2>
              <p>Here are the categories of Unichem.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="single-category">
              <h5 className="">Loctite</h5>
              <hr></hr>
              <ul>
                <li>
                  <Link to="/products/category/construction_adhesives">Construction Adhesives</Link>
                </li>
                <li>
                  <Link to="/products/category/threadlockers">Threadlockers</Link>
                </li>
                <li>
                  <Link to="/products/category/foam_sealants">Foam Sealants</Link>
                </li>
                <li>
                  <Link to="/products/category/sealants">Sealants</Link>
                </li>
                <li>
                  <Link to="/products/category/epoxies">Epoxies</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="single-category">
              <h5 className="heading">3M</h5>
              <hr></hr>
              <ul>
                <li>
                  <Link to="/products/category/tapes">Tapes</Link>
                </li>
                <li>
                  <Link to="/products/category/adhesives">Adhesives</Link>
                </li>
                <li>
                  <Link to="/products/category/window_films">Window Films</Link>
                </li>
                <li>
                  <Link to="/products/category/car_tints">Car Tints</Link>
                </li>
                <li>
                  <Link to="/products" className="invisible">
                    Hidden
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="single-category">
              <h5 className="heading">Phoenix Lubricants</h5>
              <hr></hr>
              <ul>
                <li>
                  <Link to="/products/category/industrial_oils">Industrial Oils</Link>
                </li>
                <li>
                  <Link to="/products" className="invisible">
                    Hidden
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="invisible">
                    Hidden
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="invisible">
                    Hidden
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <div className="single-category">
              <h5 className="heading">Polymer Cleaning Chemicals</h5>
              <hr></hr>
              <ul>
                <li>
                  <Link to="/products/category/housekeeping">Housekeeping</Link>
                </li>
                <li>
                  <Link to="/products/category/kitchen">Kitchen</Link>
                </li>
                <li>
                  <Link to="/products/category/laundry">Laundry</Link>
                </li>
                <li>
                  <Link to="/products/category/restroom">Restroom</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
