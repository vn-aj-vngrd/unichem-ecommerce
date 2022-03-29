import React from 'react'

const UpdateProduct = () => {
  return (
    <div>
        <div class="">
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
            id="modal-asdform"
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
                      <h1 class="mb-0 h4">Sign in asddto our platform</h1>
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
      </div>
  )
}

export default UpdateProduct;