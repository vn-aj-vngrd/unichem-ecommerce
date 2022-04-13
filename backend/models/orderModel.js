const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    shippingDate: {
      type: Date,
      required: [true, "Shopping Date is required."],
    },
    receivedDate: {
      type: Date,
      required: [true, "Received Date is required."],
    },
    shippingFee: {
      type: Number,
      required: [true, "Shipping Fee is required."],
    },
    discount: {
      type: Number,
      required: [true, "Discount is required."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required."],
    },
    orderStatus: {
      type: String,
      required: [true, "Order Status is required."],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment Method is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
