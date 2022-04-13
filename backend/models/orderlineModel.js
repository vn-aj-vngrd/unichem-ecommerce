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
    image: {
      type: String,
      required: [true, "Image is required."],
    },
    productName: {
      type: String,
      required: [true, "Product Name is required."],
    },
    productType: {
      type: String,
      required: [true, "Product Type is required."],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required."],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    reviewed: {
      type: Boolean,
      required: [true, "Reviewed is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orderline", orderlineSchema);
