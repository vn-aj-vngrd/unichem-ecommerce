import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";

const UsersList = () => {
  const columns = [
    "Image",
    "ID",
    "Name",
    "Email",
    "Sex",
    "Birthday",
    "Password",
    "Address",
    "Created at",
    "Updated at",
    "",
  ];

  const data = [
    [
      <img
        className="avatar rounded-circle border-gray-100"
        alt="img"
        src="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-1/265045880_4664465363610412_3077703784126999012_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeG6OCYCZ3CHvDCnn3gkw4f07VEmKdmD4HrtUSYp2YPgeijaAgkLlVvIZi6OkafPGr9I9Ew1JO3LnF6iAYvJVZH-&_nc_ohc=R_Ut2OKr7rYAX_fWA-c&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fceb6-1.fna&oh=00_AT_3yf_OfUe6nfYGrjiXaBTCciNNCn3FpGZJl_pgLL2cAQ&oe=6246A9C3"
      />,
      "31231asdef",
      "Horeb Barriga",
      "horeb@gmail.com",
      "Male",
      "1/1/2001",
      "das123as4adsf231213",
      "This is Modal",
      "2022-03-26",
      "2022-03-26",
      <>
        <div class="col-lg-4">
          <button
            type="button"
            class="btn btn-block btn-gray-800 mb-3"
            data-bs-toggle="modal"
            data-bs-target="#modal-form"
          >
            Update
          </button>
          <div
            class="modal fade"
            id="modal-form"
            tabindex="-1"
            role="dialog"
            aria-labelledby="modal-form"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-body p-0">
                  <div class="card p-3 p-lg-4">
                    <button
                      type="button"
                      class="btn-close ms-auto"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <div class="text-center text-md-center mb-4 mt-md-0">
                      <h1 class="mb-0 h4">Sign in to our platform</h1>
                    </div>
                    <form action="#" class="mt-4">
                      <div class="form-group mb-4">
                        <label for="email">Your Email</label>
                        <div class="input-group">
                          <span class="input-group-text" id="basic-addon1">
                            <svg
                              class="icon icon-xs text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                            </svg>{" "}
                          </span>
                          <input
                            type="email"
                            class="form-control"
                            placeholder="example@company.com"
                            id="email"
                            autofocus
                            required
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <div class="form-group mb-4">
                          <label for="password">Your Password</label>
                          <div class="input-group">
                            <span class="input-group-text" id="basic-addon2">
                              <svg
                                class="icon icon-xs text-gray-600"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>{" "}
                            </span>
                            <input
                              type="password"
                              placeholder="Password"
                              class="form-control"
                              id="password"
                              required
                            />
                          </div>
                        </div>
                        <div class="d-flex justify-content-between align-items-top mb-4">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              value=""
                              id="remember"
                            />
                            <label class="form-check-label mb-0" for="remember">
                              Remember me
                            </label>
                          </div>
                          <div>
                            <a
                              href="./forgot-password.html"
                              class="small text-right"
                            >
                              Lost password?
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="d-grid">
                        <button type="submit" class="btn btn-gray-800">
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
    ],
  ];

  useEffect(() => {
    document.title = "Unichem Store | User List";
  });

  return (
    <div className="content">
      <Header />
      <SectionTitle type="userslist" />
      <div className="row mt-3 mb-4">
        <DataTable title="Users List" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default UsersList;
