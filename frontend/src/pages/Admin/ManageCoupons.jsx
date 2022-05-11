import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateCoupon from "../../components/CreateCoupon";
import UpdateCoupon from "../../components/UpdateCoupon";
import DeleteCoupon from "../../components/DeleteCoupon";
import {
  getCoupons,
  resetCoupon,
} from "../../features/coupons/couponSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";

const ManageCoupons = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  const { coupons, isCouponLoading, isCouponError, couponMessage } =
    useSelector((state) => state.coupons);

  useEffect(() => {
    document.title = "Unichem Store | Coupons";
  });

  useEffect(() => {
    if (isCouponError) {
      // console.log(couponMessage);
    }

    dispatch(getCoupons());

    return () => {
      dispatch(resetCoupon());
    };
  }, [isCouponError, couponMessage, dispatch]);

  if (isCouponLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const columns = [
    "Coupon ID",
    "Coupon Code",
    "Coupon Type",
    "Description",
    "Discount",
    "Required Amount",
    "Limit",
    "Start Date",
    "Expiry Date",
    "Updated At",
    "Created At",
    "",
    "",
  ];

  let data = [];
  const maxLength = 50;
  coupons.forEach((coupon) => {
    let temp = [];
    temp.push(
      coupon._id,
      coupon.couponCode,
      coupon.couponType,
    )
    coupon.description.length > maxLength
        ? temp.push(coupon.description.substr(0, maxLength).concat("..."))
        : temp.push(coupon.description.substr(0, maxLength));
    temp.push(
      coupon.discount.toString().concat("%"),
      coupon.requiredAmount,
      coupon.limit,
      moment(coupon.startDate).format("llll").toString(),
      moment(coupon.expiryDate).format("llll").toString(),
      moment(coupon.updatedAt).format("llll").toString(),
      moment(coupon.createdAt).format("llll").toString(),
      <UpdateCoupon coupon={coupon}/>,
      <DeleteCoupon id={coupon._id} />,
    )
    data.push(temp);
  })

  console.log(data)

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        // console.log(data[item.dataIndex][0]);
      });
    },
  }

  return (
    <div className="content">
      <Header />

      <div className="d-flex">
        <div className="me-auto">
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
        <DataTable title="Coupons" columns={columns} data={data} options={options}/>
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageCoupons;
