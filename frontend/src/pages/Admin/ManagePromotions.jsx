import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreatePromotion from "../../components/CreatePromotion";
import UpdatePromotion from "../../components/UpdatePromotion";

const ManagePromotions = () => {
  const columns = [
    "Promo Image",
    "Promo ID",
    "Promo Name",
    "Updated",
    "Created",
    "",
  ];

  const data = [
    [
      <img className="avatar border-gray-100" alt="img" src="" />,
      "622c063496e12c68961c34ac",
      "Product Sale - 4/4/2022",
      "2022-03-26",
      "2022-03-26",
      <UpdatePromotion />,
    ],
  ];
  useEffect(() => {
    document.title = "Unichem Store | Promotions";
  });

  return (
    <div className="content">
      <Header />

      <div className="d-flex">
        <div className="me-auto">
          <SectionTitle
            title="Manage Promotions"
            subtitle="Below are the list of promotions."
            directory="Promotions"
          />
        </div>
        <div>
          <CreatePromotion />
        </div>
      </div>

      <div className="row mt-3 mb-4">
        <DataTable title="Promotions" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManagePromotions;
