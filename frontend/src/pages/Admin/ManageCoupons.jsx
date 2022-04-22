import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateCoupon from "../../components/CreateCoupon";
import UpdateCoupon from "../../components/UpdateCoupon";

const ManageCoupons = () => {
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
      <img
        className="avatar border-gray-100"
        alt="img"
        src=""
      />,
      "622c063496e12c68961c34ac",
      "Product Sale - 4/4/2022",
      "2022-03-26",
      "2022-03-26",
      <UpdateCoupon />,
    ],
  ];
  useEffect(() => {
    document.title = "Unichem Store | Coupons";
  });

  return (
    <div className="content">
      <Header />

      <div class="d-flex">
        <div class="me-auto">
          <SectionTitle
            title="Manage Coupons"
            subtitle="Below are the list of coupons."
            directory="Coupons"
          />
        </div>
        <div>
          <CreateCoupon />
        </div>
      </div>

      <div className="row mt-3 mb-4">
        <DataTable title="Coupons" columns={columns} data={data} />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageCoupons;
