import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";

const Home = () => {
  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });

  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];
  return (
    <div className="content">
      <Header />
      <div className="row mt-3">
        <DataTable columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default Home;
