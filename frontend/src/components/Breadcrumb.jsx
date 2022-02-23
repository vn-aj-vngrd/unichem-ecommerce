import { Link } from "react-router-dom";

const Breadcrumb = () => {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="breadcrumbs-content">
              <h1 className="page-title">Single Product</h1>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <ul className="breadcrumb-nav">
              <li>
                <Link to="/">
                  <i className="lni lni-home"></i> Home
                </Link>
              </li>
              <li>Category</li>
              <li>Single Product</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
