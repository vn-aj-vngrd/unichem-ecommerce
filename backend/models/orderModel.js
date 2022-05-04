const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderDiscount: {
      type: Number,
      required: [true, "Order Discount is required."],
    },
    shippingDiscount: {
      type: Number,
      required: [true, "Shipping Discount is required."],
    },
    shippingFee: {
      type: Number,
      required: [true, "Shipping Fee is required."],
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal is required."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required."],
    },
    orderStatus: {
      type: String,
      required: [true, "Order Status is required."],
    },
    statusDates: {
      type: Object,
      required: [true, "Status Dates are required."],
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
