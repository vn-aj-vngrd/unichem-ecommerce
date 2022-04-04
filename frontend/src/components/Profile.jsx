// // import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { update, resetUser } from "../features/auth/authSlice";
// import Spinner from "../components/Spinner";
// import { toast } from "react-toastify";

// const Profile = () => {
//   const dispatch = useDispatch();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   const [formData, setFormData] = useState({
//     name: user.name,
//     birthday: user.birthday,
//     sex: user.sex,
//     email: user.email,
//     password: "",
//     currentPassword: "",
//   });

//   const { name, birthday, sex, email, password, currentPassword } = formData;

//   const onChange = (e) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(message, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }

//     if (isSuccess) {
//       toast.success(message, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }

//     // dispatch(get());
//     return () => {
//       dispatch(resetUser());
//     };
//   }, [isError, isSuccess, message, dispatch]);

//   const onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       name,
//       birthday,
//       sex,
//       email,
//       password,
//       currentPassword,
//     };
//     console.log(userData);
//     // console.log(userData);
//     dispatch(update(userData));
//   };

//   if (isLoading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="profile-information-column">
//       <div className="profile-grid">
//         <h5>My Profile</h5>
//       </div>

//       <div className="contact-form-head">
//         <div className="form-main">
//           <form className="form" onSubmit={onSubmit}>
//             <h5>Personal Information</h5>
//             <br />
//             <div className="profile-information-image-section">
//               <img
//                 className="profile-information-image"
//                 src={user.image}
//                 alt="#"
//               />
//               <br />
//               <h5>{user.name}</h5>
//             </div>
//             <hr></hr>
//             <br />
//             <div className="row">
//               <div className="col-lg-6 col-md-6 col-12">
//                 <div className="form-group">
//                   <label className="form-label">Name</label>
//                   <input
//                     name="name"
//                     type="text"
//                     value={name}
//                     onChange={onChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <div className="form-group">
//                   <label className="form-label">Birthday</label>
//                   <input
//                     name="birthday"
//                     type="date"
//                     value={birthday}
//                     onChange={onChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <div className="form-group">
//                   <label className="form-label">Email Address</label>
//                   <input
//                     name="email"
//                     type="email"
//                     value={email}
//                     onChange={onChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <label className="form-label">Gender</label>
//                 <select
//                   className="form-select"
//                   name="sex"
//                   value={sex}
//                   onChange={onChange}
//                   required
//                 >
//                   {user.sex === "Male" ? (
//                     <>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </>
//                   ) : (
//                     <>
//                       <option value="Female">Female</option>
//                       <option value="Male">Male</option>
//                     </>
//                   )}
//                 </select>
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <div className="form-group">
//                   <label className="form-label">Current Password</label>
//                   <input
//                     name="currentPassword"
//                     type="password"
//                     onChange={onChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="col-lg-6 col-md-6 col-12">
//                 <div className="form-group">
//                   <label className="form-label">New Password</label>
//                   <input
//                     name="password"
//                     type="password"
//                     onChange={onChange}
//                     required
//                   />
//                 </div>
//               </div>
//               <br />
//               <div className="col-12">
//                 <div className="form-group button text-center">
//                   <br />
//                   <button type="submit" className="btn ">
//                     Save Changes
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update, resetUser } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: user.name,
    birthday: user.birthday,
    sex: user.sex,
    email: user.email,
    // image: "",
  });

  const [formPassword, setFormPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
    currentPassword: "",
  });

  const {
    name,
    birthday,
    sex,
    email,
    // image,
  } = formData;

  const { newPassword, confirmNewPassword, currentPassword } = formPassword;

  // const [formData, setFormData] = useState({
  //   name: user.name,
  //   birthday: user.birthday,
  //   sex: user.sex,
  //   email: user.email,
  //   newPassword: "",
  //   confirmNewPassword: "",
  //   currentPassword: "",
  //   // image: "",
  // });

  // const {
  //   name,
  //   birthday,
  //   sex,
  //   email,
  //   newPassword,
  //   confirmNewPassword,
  //   currentPassword,
  //   // image,
  // } = formData;

  const onChangeData = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.files[0]);
  };

  const onChangePassword = (e) => {
    setFormPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    // console.log(e.target.files[0]);
  };

  useEffect(() => {
    if (isError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    // dispatch(get());
    return () => {
      dispatch(resetUser());
    };
  }, [isError, isSuccess, message, dispatch]);

  const onSubmitData = (e) => {
    e.preventDefault();

    const userData = {
      name,
      birthday,
      sex,
      email,
      // image,
    };

    dispatch(update(userData));
    toast.success("User updated successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmitPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (newPassword.length <= 8) {
      toast.error("Password must contain atleast 8 characters", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const userData = {
      newPassword,
      confirmNewPassword,
      currentPassword,
      // image,
    };

    dispatch(update(userData));
    toast.success("User updated successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="profile-information-column">
      <div className="profile-grid">
        <h5>My Profile</h5>
      </div>

      <div className="">
        <div className="checkout-steps-form-style">
          <ul id="accordionExample">
            <li className=" box-shadow">
              <form className="form" onSubmit={onSubmitData}>
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                >
                  Personal Information
                </div>
                <section
                  className="checkout-steps-form-content collapse show"
                  id="collapseOne"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <br></br>
                    <div className="profile-information-image-section">
                      <div className="profile-position">
                        <img
                          className="profile-information-image"
                          src={user.image}
                        ></img>
                        <label
                          className="upload-image-label"
                          htmlFor="upload-photo"
                        >
                          <i className="lni lni-pencil"></i>
                        </label>
                        <input
                          type="file"
                          name="image"
                          // value={image}
                          // onChange={onChange}
                          id="upload-photo"
                        />
                      </div>
                      <br></br>
                      <h5>{user.name}</h5>
                    </div>
                    <br></br>

                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Name</label>
                        <div className="form-input form">
                          <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={onChangeData}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Birthday</label>
                        <div className="form-input form">
                          <input
                            name="birthday"
                            type="date"
                            value={birthday}
                            onChange={onChangeData}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Email Address</label>
                        <div className="form-input form">
                          <input
                            name="email"
                            type="email"
                            value={email}
                            onChange={onChangeData}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Gender</label>
                        <div className="form-input form">
                          <select
                            className="form-select"
                            name="sex"
                            value={sex}
                            onChange={onChangeData}
                            required
                          >
                            {user.sex === "Male" ? (
                              <>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </>
                            ) : (
                              <>
                                <option value="Female">Female</option>
                                <option value="Male">Male</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="steps-form-btn button">
                        <button className="btn" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </li>

            <li className=" box-shadow">
              <form className="form" onSubmit={onSubmitPassword}>
                <div
                  className="title collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  Change Password
                </div>
                <section
                  className="checkout-steps-form-content collapse"
                  id="collapseTwo"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">New Password</label>
                        <div className="form-input form">
                          <input
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={onChangePassword}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="single-form form-default">
                        <label className="form-label">Confirm Password</label>
                        <div className="form-input form">
                          <input
                            name="confirmNewPassword"
                            type="password"
                            value={confirmNewPassword}
                            onChange={onChangePassword}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <div className="single-form form-default">
                        <label className="form-label">Current Password</label>
                        <div className="form-input form">
                          <input
                            name="currentPassword"
                            type="password"
                            value={currentPassword}
                            onChange={onChangePassword}
                            // required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="steps-form-btn button">
                        <button className="btn" type="submit">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
