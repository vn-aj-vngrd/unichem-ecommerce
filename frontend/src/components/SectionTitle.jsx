import { Link } from "react-router-dom";

const SectionTitle = ({ type }) => {
  if (type === "userslist") {
    return (
      <>
        <div class="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li class="breadcrumb-item">
                <Link to="/">
                  <svg
                    class="icon icon-xxs"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Users List
              </li>
            </ol>
          </nav>
          {/* <h2 class="h4">Users List</h2>
          <p class="mb-0">Here are the list of users.</p> */}
        </div>
      </>
    );
  } else if (type === "transactions") {
    return (
      <>
        <div class="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li class="breadcrumb-item">
                <Link to="/">
                  <svg
                    class="icon icon-xxs"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Transactions
              </li>
            </ol>
          </nav>
          {/* <h2 class="h4">Transactions</h2>
          <p class="mb-0">Here are the list of transactions.</p> */}
        </div>
      </>
    );
  } else if (type === "products") {
    return (
      <>
        <div class="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li class="breadcrumb-item">
                <Link to="/">
                  <svg
                    class="icon icon-xxs"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
          {/* <h2 class="h4">Products</h2>
          <p class="mb-0">Here are the list of products.</p> */}
        </div>
      </>
    );
  } else if (type === "promotions") {
    return (
      <>
        <div class="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li class="breadcrumb-item">
                <Link to="/">
                  <svg
                    class="icon icon-xxs"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Promotions
              </li>
            </ol>
          </nav>
          {/* <h2 class="h4">Promotions</h2>
          <p class="mb-0">Here are the list of promotions.</p> */}
        </div>
      </>
    );
  } else if (type === "settings") {
    return (
      <>
        <div class="d-block mb-4 mb-md-0">
          <nav aria-label="breadcrumb" class="d-none d-md-inline-block">
            <ol class="breadcrumb breadcrumb-dark breadcrumb-transparent">
              <li class="breadcrumb-item">
                <Link to="/">
                  <svg
                    class="icon icon-xxs"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    ></path>
                  </svg>
                </Link>
              </li>
              <li class="breadcrumb-item">
                <Link to="/">Dashboard</Link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Settings
              </li>
            </ol>
          </nav>
          {/* <h2 class="h4">Settings</h2>
          <p class="mb-0">Here are the list of settings.</p> */}
        </div>
      </>
    );
  }
};

export default SectionTitle;
