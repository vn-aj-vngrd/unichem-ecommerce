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
  ];

  const data = [
    [
      "Sample Image",
      "31231asdef",
      "Horeb Barriga",
      "horeb@gmail.com",
      "Male",
      "1/1/2001",
      "das123as4adsf231213",
      "This is Modal",
      "2022-03-26T10:11:00.212+00:00",
      "2022-03-26T10:11:00.212+00:00",
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
