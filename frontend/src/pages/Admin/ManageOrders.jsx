import { useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DataTable from "../../components/DataTable";
import SectionTitle from "../../components/SectionTitle";
import UpdateOrder from "../../components/UpdateOrder";
import {
  getAllOrders,
  deleteOrder,
  resetOrder,
} from "../../features/orders/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
const moment = require("moment");

const ManageOrders = () => {
  const columns = [
    "Order ID",
    "User ID",
    "Shipping Discount",
    "Order Discount",
    "Shipping Fee",
    "Total Price",
    "Payment Method",
    "Order Status",
    "Order Date",
    "Shipping Date",
    "Received Date",
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
  orders.forEach((order) => {
    data.push([
      order._id,
      order.userID,
      order.shippingDiscount + "%",
      order.orderDiscount + "%",
      "PHP " + order.shippingFee,
      "PHP " + order.totalPrice,
      order.paymentMethod,
      order.orderStatus,
      moment(order.createdAt).format("YYYY-MM-D"),
      moment(order.shippingDate).format("YYYY-MM-D"),
      moment(order.receivedDate).format("YYYY-MM-D"),
      <UpdateOrder order={order} />,
    ]);
  });

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        console.log(data[item.dataIndex][0]);
        // dispatch(deleteUser(data[item.dataIndex][0]));
      });
    },
  };

  if (isOrderLoading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <div className="content">
      <Header />
      <SectionTitle
        title="Manage Orders"
        subtitle="Below are the orders of customers."
        directory="Orders"
      />
      <div className="row mt-3 mb-4">
        <DataTable
          title="Orders"
          columns={columns}
          data={data}
          options={options}
        />
      </div>
      <Footer userType="admin" />
    </div>
  );
};

export default ManageOrders;
