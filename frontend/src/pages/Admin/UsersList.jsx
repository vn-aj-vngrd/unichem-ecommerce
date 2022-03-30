import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SectionTitle from "../../components/SectionTitle";
import DataTable from "../../components/DataTable";
import UpdateUser from "../../components/UpdateUser";

const UsersList = () => {
  const columns = [
    "Profile",
    "UserID",
    "Name",
    "Email",
    "Sex",
    "Birthday",
    "Address",
    "Created",
    "Updated",
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
      "1-1-2001",
      "Danao, Cebu",
      "2022-03-26",
      "2022-03-26",
      <UpdateUser />,
    ],
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
      "1-1-2001",
      "Danao, Cebu",
      "2022-03-26",
      "2022-03-26",
      <UpdateUser />,
    ],
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
      "1-1-2001",
      "Danao, Cebu",
      "2022-03-26",
      "2022-03-26",
      <UpdateUser />,
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
