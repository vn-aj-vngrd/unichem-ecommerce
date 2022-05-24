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
    dispatch(getPromos());

    if (isPromoError) {
      toast.error(promoMessage);
    }

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

  const columns = [
    "Promo ID",
    "Promo Name",
    "Start Date",
    "Expiry Date",
    "Created Date",
    "Updated Date",
    "Promo Status",
    "",
    "",
  ];

  let data = [];

  promos.forEach((promo) => {
    let temp = [];
    temp.push(
      promo._id,
      promo.promoName,
      moment(promo.startDate).format("llll"),
      moment(promo.expiryDate).format("llll"),
      moment(promo.createdAt).format("llll"),
      moment(promo.updatedAt).format("llll")
    );

    if (moment() < moment(promo.startDate)) {
      temp.push(<span class="badge bg-warning">Not Active</span>);
    } else if (moment() > moment(promo.expiryDate)) {
      temp.push(<span class="badge bg-danger">Expired</span>);
    } else {
      temp.push(<span class="badge bg-success">Active</span>);
    }

    temp.push(
      <ViewPromotion promo={promo} />,
      <UpdatePromotion promo={promo} />
    );

    data.push(temp);
  });

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
