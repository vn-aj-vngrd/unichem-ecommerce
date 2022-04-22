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
      <img
        className="avatar border-gray-100"
        alt="img"
        src="https://scontent.fceb6-1.fna.fbcdn.net/v/t39.30808-1/265045880_4664465363610412_3077703784126999012_n.jpg?stp=dst-jpg_p100x100&_nc_cat=105&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeG6OCYCZ3CHvDCnn3gkw4f07VEmKdmD4HrtUSYp2YPgeijaAgkLlVvIZi6OkafPGr9I9Ew1JO3LnF6iAYvJVZH-&_nc_ohc=R_Ut2OKr7rYAX_fWA-c&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fceb6-1.fna&oh=00_AT_3yf_OfUe6nfYGrjiXaBTCciNNCn3FpGZJl_pgLL2cAQ&oe=6246A9C3"
      />,
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
