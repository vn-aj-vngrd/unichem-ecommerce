import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import CreateCoupon from "../../components/CreateCoupon";
import UpdateCoupon from "../../components/UpdateCoupon";
import ViewCoupon from "../../components/ViewCoupon";
import {
  getCoupons,
  resetCoupon,
  deleteCoupon,
} from "../../features/coupons/couponSlice";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

const ManageCoupons = () => {
  const dispatch = useDispatch();
  const moment = require("moment");

  const {
    coupons,
    isCouponLoading,
    isCouponError,
    couponMessage,
    isCouponDeleted,
    isCouponUpdated,
    isCouponCreated,
  } = useSelector((state) => state.coupons);

  useEffect(() => {
    document.title = "Unichem Store | Coupons";
  });

  useEffect(() => {
    dispatch(getCoupons());

    if (isCouponError) {
      toast.error(couponMessage);
    }

    if (isCouponCreated) {
      toast.success("Coupon created successfully");
    }

    if (isCouponDeleted) {
      toast.success("Coupon deleted successfully");
    }

    if (isCouponUpdated) {
      toast.success("Coupon updated successfully");
    }

    return () => {
      dispatch(resetCoupon());
    };
  }, [
    isCouponError,
    couponMessage,
    isCouponCreated,
    isCouponDeleted,
    isCouponUpdated,
    dispatch,
  ]);

  const columns = [
    "Coupon ID",
    "Coupon Code",
    "Coupon Type",
    "Status",
    "Created",
    "Updated",
    "",
    "",
  ];

  let data = [];

  coupons.forEach((coupon) => {
    let temp = [];
    temp.push(
      coupon._id,
      coupon.couponCode,
      coupon.couponType
    );

    if (moment() < moment(coupon.startDate)) {
      temp.push(<span class="badge bg-warning">Not Active</span>);
    } else if (moment() > moment(coupon.expiryDate)) {
      temp.push(<span class="badge bg-danger">Expired</span>);
    } else {
      temp.push(<span class="badge bg-success">Active</span>);
    }

    temp.push(
      moment(coupon.createdAt).format("llll").toString(),
      moment(coupon.updatedAt).format("llll").toString(),
      <ViewCoupon coupon={coupon} />,
      <UpdateCoupon coupon={coupon} />
    );
    data.push(temp);
  });

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        dispatch(deleteCoupon(data[item.dataIndex][0]));
      });
    },
  };

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

      {isCouponLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row mt-3 mb-4">
          <DataTable
            title="Coupons"
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

export default ManageCoupons;
