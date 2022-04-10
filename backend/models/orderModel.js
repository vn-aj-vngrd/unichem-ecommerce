const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    orderID: {
      type: String,
      required: true,
      ref: "Product",
    },
    productType: {
      types: {
        type: Number,
        required: [true, "Product Type is required"],
      },
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    reviewed: {
      type: Boolean,
    },
    shippingDate: {
      type: Date,
    },
    receivedDate: {
      type: Date,
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
