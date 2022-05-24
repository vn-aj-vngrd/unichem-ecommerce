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
import OrderBadge from "../../components/OrderBadge";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const moment = require("moment");
  const columns = [
    "Order ID",
    "User ID",
    "Total Price",
    "Payment Method",
    "Order Date",
    "Completed Date",
    "Updated",
    "Order Status",
    "",
    "",
  ];

  const dispatch = useDispatch();
  const {
    orders,
    isOrderLoading,
    isOrderDeleted,
    isOrderError,
    orderMessage,
    isOrderUpdated,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    document.title = "Unichem Store | Orders";

    dispatch(getAllOrders());

    if (isOrderUpdated) {
      toast.success("Order updated successfully!");
    }

    if (isOrderDeleted) {
      toast.success("Order deleted successfully!");
    }

    if (isOrderError) {
      toast.error(orderMessage);
    }

    return () => {
      dispatch(resetOrder());
    };
  }, [dispatch, isOrderDeleted, isOrderError, orderMessage, isOrderUpdated]);

  let data = [];
  if (orders && orders.length > 0) {
    orders.forEach((order) => {
      data.push([
        order._id,
        order.userID,
        "PHP " + order.totalPrice.toFixed(2),
        order.paymentMethod,
        moment(order.createdAt).format("llll"),
        order.statusDates[6].date
          ? moment(order.statusDates[6].date).format("llll")
          : "Not Available",
        moment(order.updatedAt).format("llll"),
        <OrderBadge status={order.orderStatus.toString()} />,
        <ViewOrder order={order} />,
        <UpdateOrder order={order} />,
      ]);
    });
  }

  const options = {
    filterType: "checkbox",
    elevation: 0,
    onRowsDelete: (rowsDeleted) => {
      rowsDeleted.data.forEach((item) => {
        dispatch(deleteOrder(data[item.dataIndex][0]));
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
