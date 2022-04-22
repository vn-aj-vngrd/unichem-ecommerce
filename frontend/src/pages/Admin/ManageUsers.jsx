import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";
import { getUsers, resetUser } from "../../features/auth/authSlice";
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
  ];

  const dispatch = useDispatch();

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    document.title = "Unichem Store | Users";

    // dispatch(getUsers());

    if (isError) {
      // console.log(message);
    }

    return () => {
      dispatch(resetUser());
    };
  }, [dispatch, isError, message]);

  const data = users.map(Object.values);
  // console.log(data);

  if (isLoading) {
    <Spinner />;
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
        <DataTable title="Users" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageUsers;
