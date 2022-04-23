import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";
import { getUsers, deleteUser, resetUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";

const ManageUsers = () => {
  const columns = [
    "ID",
    "Name",
    "Email",
    "Sex",
    "Birthday",
    "Password",
    "Role",
    "Image",
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

  const data = users.map(Object.values);
  data.forEach((item) => {
    item[8] = item[8] ? "Yes" : "No";
  });

  const options = {
    // filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        console.log(data[item.dataIndex][0]);
        dispatch(deleteUser(data[item.dataIndex][0]));
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
