import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";
import { getUsers, deleteUser, resetUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
const moment = require("moment");

const ManageUsers = () => {
  const columns = [
    "ID",
    "Name",
    "Email",
    "Sex",
    "Birthday",
    "Role",
    "Profile",
    "Verified",
    "Created",
    "Updated",
  ];

  const dispatch = useDispatch();

  const { users, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Unichem Store | Users";

    dispatch(getUsers());

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch]);

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
        user.verified ? "Yes" : "No",
        moment(user.createdAt).format("llll"),
        moment(user.updatedAt).format("llll"),
      ]);
    });
  }

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        // console.log(data[item.dataIndex][0]);
        dispatch(deleteUser(data[item.dataIndex][0]));
        toast.success("User deleted successfully");
      });
    },
  };

  if (isLoading) {
    return (
      <>
        <Spinner />;
      </>
    );
  }

  return (
    <div className="content">
      <Header />
      <SectionTitle
        title="Manage Users"
        directory="Users"
        subtitle="Below are the list of users."
      />
      <div className="row mt-3 mb-4">
        <DataTable
          title="Users"
          columns={columns}
          data={data}
          isempty={data}
          options={options}
        />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageUsers;
