import { useEffect } from "react";
import {
  getPromos,
  resetPromo,
  deletePromo,
} from "../../features/promos/promoSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreatePromotion from "../../components/CreatePromotion";
import UpdatePromotion from "../../components/UpdatePromotion";
import ViewPromotion from "../../components/ViewPromotion";
// import RowImage from "../../components/RowImage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const ManagePromotions = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  useEffect(() => {
    document.title = "Unichem Store | Promotions";
  });

  const {
    promos,
    isPromoLoading,
    isPromoError,
    promoMessage,
    isPromoDeleted,
    isPromoUpdated,
    isPromoCreated,
  } = useSelector((state) => state.promos);

  useEffect(() => {
    if (isPromoError) {
      toast.error(promoMessage);
    }

    dispatch(getPromos());

    if (isPromoCreated) {
      toast.success("Promotion created successfully");
    }

    if (isPromoDeleted) {
      toast.success("Promotion deleted successfully");
    }

    if (isPromoUpdated) {
      toast.success("Promotion updated successfully");
    }

    return () => {
      dispatch(resetPromo());
    };
  }, [
    isPromoError,
    promoMessage,
    isPromoDeleted,
    isPromoUpdated,
    isPromoCreated,
    dispatch,
  ]);

  console.log(promos);

  const columns = [
    // "Promo Image",
    "Promo ID",
    "Promo Name",
    "Description",
    "Start Date",
    "Expiry Date",
    "Updated At",
    "Created At",
    "",
    "",
  ];

  let data = [];
  const maxLength = 50;
  promos.forEach((promo) => {
    console.log(promo);
    let temp = [];

    // temp.push(
    //   <RowImage src={promo.image} alt={promo.promoName} />,
    //   promo._id,
    //   promo.promoName
    // );
    temp.push(promo._id, promo.promoName);

    promo.description.length > maxLength
      ? temp.push(promo.description.substr(0, maxLength).concat("..."))
      : temp.push(promo.description.substr(0, maxLength));

    temp.push(
      moment(promo.startDate).format("llll"),
      moment(promo.expiryDate).format("llll"),
      moment(promo.updatedAt).format("llll"),
      moment(promo.createdAt).format("llll"),
      <ViewPromotion promo={promo} />,
      <UpdatePromotion promo={promo} />
    );

    data.push(temp);
  });

  console.log(data);

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        dispatch(deletePromo(data[item.dataIndex][0]));
      });
    },
  };

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

      {isPromoLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row mt-3 mb-4">
          <DataTable
            title="Promotions"
            columns={columns}
            data={data}
            options={options}
          />
        </div>
      )}

      <Footer userType="admin" />
    </div>
  );
};

export default ManagePromotions;
