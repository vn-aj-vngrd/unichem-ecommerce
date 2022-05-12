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
import RowImage from "../../components/RowImage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";

const ManagePromotions = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  useEffect(() => {
    document.title = "Unichem Store | Promotions";
  });

  const { promos, isPromoLoading, isPromoError, promoMessage } = useSelector(
    (state) => state.promos
  );

  useEffect(() => {
    if (isPromoError) {
      // console.log(promoMessage);
    }

    dispatch(getPromos());

    return () => {
      dispatch(resetPromo());
    };
  }, [isPromoError, promoMessage, dispatch]);

  console.log(promos);

  const columns = [
    "Promo Image",
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

  const imagePath = "frontend/src";
  let data = [];
  const maxLength = 50;
  promos.forEach((promo) => {
    console.log(promo);
    let temp = [];

    // temp.push(<RowImage src={".." + promo.image.replaceAll("\\", "/").slice(imagePath.length)} alt={promo.promoName}/>, promo._id, promo.promoName);
    temp.push(
      <RowImage src={promo.image} alt={promo.promoName} />,
      promo._id,
      promo.promoName
    );

    promo.description.length > maxLength
      ? temp.push(promo.description.substr(0, maxLength).concat("..."))
      : temp.push(promo.description.substr(0, maxLength));

    temp.push(
      moment(promo.startDate).format("llll"),
      moment(promo.expiryDate).format("llll"),
      moment(promo.updatedAt).format("llll"),
      moment(promo.createdAt).format("llll"),
      <ViewPromotion promo={promo} />,
      <UpdatePromotion promo={promo} />,
      // <DeletePromotion id={promo._id} />
    );

    data.push(temp);
  });

  console.log(data);

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        // console.log(data[item.dataIndex][0]);
        dispatch(deletePromo(data[item.dataIndex][1]));
        toast.success("Promotion deleted successfully");
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
