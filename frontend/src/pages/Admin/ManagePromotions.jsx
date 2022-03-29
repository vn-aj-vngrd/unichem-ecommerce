import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreatePromotion from "../../components/CreatePromotion";
import UpdatePromotion from "../../components/UpdatePromo";

const ManagePromotions = () => {
  const columns = ["Promotion ID", "Name", "Source", "Updated", "Created", ""];

  const data = [
    ["Promotion ID", "Name", "Source", "Updated", "Created", <UpdatePromotion />],
    ["Promotion ID", "Name", "Source", "Updated", "Created", <UpdatePromotion />],
    ["Promotion ID", "Name", "Source", "Updated", "Created", <UpdatePromotion />],
    ["Promotion ID", "Name", "Source", "Updated", "Created", <UpdatePromotion />],
    ["Promotion ID", "Name", "Source", "Updated", "Created", <UpdatePromotion />],
  ]
  useEffect(() => {
    document.title = "Unichem Store | Promotions";
  });

  return (
    <div className="content">
      <Header />
      <SectionTitle type="promotions" />
      <div className="row mt-3 mb-4">
        <CreatePromotion />
        <DataTable title="Promotions" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManagePromotions;
