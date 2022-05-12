import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import ViewOrder from "../../components/ViewOrder";
import UpdateOrder from "../../components/UpdateOrder";
import {
  getAllOrders,
  deleteOrder,
  resetOrder,
} from "../../features/orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
const moment = require("moment");

const ManageOrders = () => {
  const columns = [
    "Order ID",
    "User ID",
    "Shipping Discount",
    "Order Discount",
    "Shipping Fee",
    "Subtotal",
    "Total Price",
    "Payment Method",
    "Order Status",
    "Order Date",
    "Completed Date",
    "Updated At",
    "",
    "",
  ];

  const dispatch = useDispatch();
  const { orders, isOrderLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    document.title = "Unichem Store | Orders";

    dispatch(getAllOrders());

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch]);

  let data = [];
  if (orders && orders.length > 0) {
    orders.forEach((order) => {
      data.push([
        order._id,
        order.userID,
        order.shippingDiscount + "%",
        order.orderDiscount + "%",
        "PHP " + order.shippingFee.toFixed(2),
        "PHP " + order.subtotal.toFixed(2),
        "PHP " + order.totalPrice.toFixed(2),
        order.paymentMethod,
        order.orderStatus,
        moment(order.createdAt).format("llll"),
        order.statusDates[6].date
          ? moment(order.statusDates[6].date).format("llll")
          : "N/A",
        moment(order.updatedAt).format("llll"),
        <ViewOrder order={order} />,
        <UpdateOrder order={order} />,
      ]);
    });
  }

  if (isOrderLoading) {
    dispatch(getAllOrders());
  }

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        // console.log(data[item.dataIndex][0]);
        dispatch(deleteOrder(data[item.dataIndex][0]));
        toast.success("Order deleted successfully");
      });
    },
  };

  return (
    <div className="content">
      <Header />

      <SectionTitle
        title="Manage Orders"
        subtitle="Below are the orders of customers."
        directory="Orders"
      />

      {isOrderLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div className="row mt-3 mb-4">
          {orders && orders.length >= 0 && (
            <DataTable
              title="Orders"
              columns={columns}
              data={data}
              options={options}
            />
          )}
        </div>
      )}

      <Footer userType="admin" />
    </div>
  );
};

export default ManageOrders;
