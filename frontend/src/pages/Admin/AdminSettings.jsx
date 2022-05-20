import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import { updateAdmin, resetUser } from "../../features/auth/authSlice";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import logo from "../../assets/images/logo.svg";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { isLoading, message, isError, isAdminUpdated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Settings";

    reset();

    if (isAdminUpdated) {
      toast.success("Password updated successfully");
    }

    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, isAdminUpdated, isError, message, reset]);

  const password = watch("newPassword");

  const onSubmit = (data) => {
    const orderParams = {
      currentPassword: data.currentPassword,
      password: data.newPassword,
    };

    dispatch(updateAdmin(orderParams));
  };

  return (
    <div className="content">
      <Header />
      <SectionTitle
        title="Settings"
        subtitle="Manage admin settings here."
        directory="Settings"
      />

      {isLoading ? (
        <div className="container">
          <Spinner />
        </div>
      ) : (
        <div className="row mt-3">
          <div className="col-12 col-xl-8">
            <div className="card card-body border-0 shadow mb-4">
              <h2 className="h5 mb-4">Change Password</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div>
                      <label>New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        {...register("newPassword", {
                          required: {
                            value: true,
                            message: "New Password is required",
                          },
                          minLength: {
                            value: 8,
                            message:
                              "New Password must be at least 8 characters",
                          },
                        })}
                        style={{
                          border: errors.newPassword ? "1px solid #f44336" : "",
                        }}
                      />
                      {errors.newPassword && (
                        <p className="error-message">
                          ⚠ {errors.newPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div>
                      <label>Confirm New Password</label>
                      <input
                        className="form-control"
                        type="password"
                        {...register("confirmNewPassword", {
                          required: {
                            value: true,
                            message: "Confirm New Password is required",
                          },
                          validate: (value) =>
                            password === value || "Passwords do not match",
                        })}
                        style={{
                          border: errors.confirmNewPassword
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.confirmNewPassword && (
                        <p className="error-message">
                          ⚠ {errors.confirmNewPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div>
                      <label>Current Password</label>
                      <input
                        className="form-control"
                        type="password"
                        {...register("currentPassword", {
                          required: {
                            value: true,
                            message: "Current Password is required",
                          },
                          minLength: {
                            value: 8,
                            message:
                              "Current Password must be at least 8 characters",
                          },
                        })}
                        style={{
                          border: errors.currentPassword
                            ? "1px solid #f44336"
                            : "",
                        }}
                      />
                      {errors.currentPassword && (
                        <p className="error-message">
                          ⚠ {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="button mt-4">
                  <button className="btn">Save Changes</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="row">
              <div className="col-12 mb-4">
                <div
                  className="card shadow border-0 text-center p-0"
                  style={{ height: `318px` }}
                >
                  <div
                    className="container p-3"
                    style={{ backgroundColor: `#424242` }}
                  >
                    <img
                      src={logo}
                      className="avatar-xl rounded-circle mx-auto"
                      alt="Admin"
                    />
                  </div>
                  <div className="card-body pb-3 pt-4">
                    <h4 className="h3">Administrator</h4>
                    <h5 className="fw-normal">Unichem Store</h5>
                    <p className="text-gray">Mandaue City, Cebu PH</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer userType="admin" />
    </div>
  );
};

export default AdminSettings;
