import { useEffect } from "react";
import { getPromos, resetPromo } from "../../features/promos/promoSlice";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreatePromotion from "../../components/CreatePromotion";
import UpdatePromotion from "../../components/UpdatePromotion";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";

const ManagePromotions = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  useEffect(() => {
    document.title = "Unichem Store | Promotions";
  });

  const { promos, isPromoLoading, isPromoError, promoMessage } =
    useSelector((state) => state.promos);

  useEffect(() => {
    if (isPromoError) {
      // console.log(promoMessage);
    }

    dispatch(getPromos());

    return () => {
      dispatch(resetPromo());
    };
  }, [isPromoError, promoMessage, dispatch]);

  if (isPromoLoading) {
    return (
      <>
        <div className="empty-container"></div>
        <Spinner />
      </>
    );
  }

   console.log(promos)

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
  ];
  
  let data = [];
  const maxLength = 50;
  promos.forEach((promo) => {
    let temp = [];
    temp.push(
      <img className="avatar border-gray-100" alt="img" src={promo.image} />,
      promo._id,
      promo.promoName,
      promo.description,
    );

    promo.description.length > maxLength
      ? promo.description.substr(0, maxLength).concat("...")
      : promo.description.substr(0, maxLength);
    
    temp.push(
      moment(promo.startDate).format("YYYY-MM-DD HH:mm:ss").toString(),
      moment(promo.expiryDate).format("YYYY-MM-DD HH:mm:ss").toString(),
      moment(promo.updatedAt).format("YYYY-MM-DD HH:mm:ss").toString(),
      moment(promo.createdAt).format("YYYY-MM-DD HH:mm:ss").toString(),
      <UpdatePromotion promo={promo}/>,
    )
      
    data.push(temp);
  });

  console.log(data)
  // }) data = [
  //   [
  //     <img className="avatar border-gray-100" alt="img" src="" />,
  //     "622c063496e12c68961c34ac",
  //     "Promo Sale - 4/4/2022",
  //     "2022-03-26",
  //     "2022-03-26",
  //     <UpdatePromotion />,
  //   ],
  // ];

  return (
    <div className="content">
      <Header />

      <div className="d-flex">
        <div className="me-auto">
          {/* <SectionTitle
            title="Manage Promotions"
            subtitle="Below are the list of promotions."
            directory="Promotions"
          /> */}
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
