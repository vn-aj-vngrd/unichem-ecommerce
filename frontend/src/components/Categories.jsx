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
                  <Link to="/products">Construction Adhesives</Link>
                </li>
                <li>
                  <Link to="/products">Threadlockers</Link>
                </li>
                <li>
                  <Link to="/products">Foam Sealants</Link>
                </li>
                <li>
                  <Link to="/products">Sealants</Link>
                </li>
                <li>
                  <Link to="/products">Epoxies</Link>
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
                  <Link to="/products">Tapes</Link>
                </li>
                <li>
                  <Link to="/products">Adhesives</Link>
                </li>
                <li>
                  <Link to="/products">Window Films</Link>
                </li>
                <li>
                  <Link to="/products">Car Tints</Link>
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
                  <Link to="/products">Industrial Oils</Link>
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
                  <Link to="/products">Housekeeping</Link>
                </li>
                <li>
                  <Link to="/products">Kitchen</Link>
                </li>
                <li>
                  <Link to="/products">Laundry</Link>
                </li>
                <li>
                  <Link to="/products">Restroom</Link>
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
