import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";

const ManageOrders = () => {
  const columns = ["ID", "UserID", "ProductID", "Quantity", "Order Date", "Total", "Shipping Date", "Status", "Created at", "Updated at"];

  const data = [
    ["678894ddseqw", "3123dewqeqw", "6234452sd", "2", "3/29/2022", "450.50", "4/4/2022", "Shipped", "2022-03-26T10:11:00.212+00:00", "2022-03-26T10:11:00.212+00:00"],
  ];

  useEffect(() => {
    document.title = "Unichem Store | Orders";
  });

  return (
    <div className="content">
      <Header />
      <SectionTitle type="orders" />
      <div className="row mt-3 mb-4">
        <DataTable title="Orders" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageOrders;
