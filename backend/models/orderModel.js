const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productID: {
      types: {
        type: Array,
        required: [true, "Product ID is required"],
      },
    },
    productType: {
      types: {
        type: Array,
        required: [true, "Product Type is required"],
      },
    },
    reviewed: {
      type: Array,
      required: true,
    },
    quantities: {
      type: Array,
      required: [true, "Quantity is required."],
    },
    orderDate: {
      type: Date,
      required: [true, "Order Date is required."],
    },
    shippingDate: {
      type: Date,
      required: [true, "Shipping Date is required."],
    },
    receivedDate: {
      type: Date,
      required: [true, "Received Date is required."],
    },
    totalPrice: {
      type: Number,
      required: [true, "Total Price is required."],
    },
    orderStatus: {
      type: String,
      required: [true, "Order Status is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
