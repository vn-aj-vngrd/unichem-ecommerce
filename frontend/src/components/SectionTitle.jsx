import { Link } from "react-router-dom";

const SectionTitle = ({ title, subtitle, directory }) => {
  return (
    <>
      <div className="d-block mb-4 mb-md-0">
        <nav aria-label="breadcrumb" className="d-none d-md-inline-block">
          <ol className="breadcrumb breadcrumb-dark breadcrumb-transparent">
            <li className="breadcrumb-item">
              <Link to="/">
                <svg
                  className="icon icon-xxs"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/">Dashboard</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {directory}
            </li>
          </ol>
        </nav>
        <h2 className="h4">{title}</h2>
        <small className="mb-0">{subtitle}</small>
      </div>
    </>
  );
};

export default SectionTitle;
