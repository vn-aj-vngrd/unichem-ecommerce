import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";
import { getUsers, deleteUser, resetUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const moment = require("moment");
  const columns = [
    "User ID",
    "Name",
    "Email",
    "Sex",
    "Birthday",
    "Role",
    "Profile",
    "Created Date",
    "Updated Date",
    "Verified",
  ];

  const dispatch = useDispatch();

  const { users, isLoading, isAccountDeleted, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Users";

    dispatch(getUsers());

    if (isAccountDeleted) {
      toast.success("User deleted successfully");
    }

    if (isError) {
      toast.error(message);
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, isAccountDeleted, isError, message]);

  let data = [];
  if (users && users.length > 0) {
    users.forEach((user) => {
      data.push([
        user._id,
        user.name,
        user.email,
        user.sex,
        user.birthday,
        user.userType,
        <img
          src={user.image}
          alt=""
          className="avatar rounded-circle border-gray-100"
        />,
        moment(user.createdAt).format("llll"),
        moment(user.updatedAt).format("llll"),
        user.verified ? (
          <span className="badge bg-success">Yes</span>
        ) : (
          <span className="badge bg-danger">No</span>
        ),
      ]);
    });
  }

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        dispatch(deleteUser(data[item.dataIndex][0]));
      });
    },
  };

  return (
    <div className="content">
      <Header />

      <SectionTitle
        title="Manage Users"
        directory="Users"
        subtitle="Below are the list of users."
      />

      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row mt-3 mb-4">
          <DataTable
            title="Users"
            columns={columns}
            data={data}
            isempty={data}
            options={options}
          />
        </div>
      )}

      <Footer userType="admin" />
    </div>
  );
};

export default ManageUsers;
