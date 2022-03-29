import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";

const Home = () => {
  const columns = ["Name", "Company", "City", "State"];

  const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
  ];

  useEffect(() => {
    document.title = "Unichem Store | Dashboard";
  });

  return (
    <div className="content">
      <Header />
      <SectionTitle type="promotions" />
      <div className="row mt-3 mb-4">
        <DataTable title="Promotions" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default Home;
