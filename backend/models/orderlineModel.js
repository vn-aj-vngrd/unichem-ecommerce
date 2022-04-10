const mongoose = require("mongoose");

const orderlineSchema = mongoose.Schema(
  {
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
    productID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    productType: {
      type: Number,
      required: [true, "Product Type is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity Type is required."],
    },
    reviewed: {
      type: Booean,
      required: [true, "Reviewed is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderlineSchema);
