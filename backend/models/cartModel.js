const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userCart: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    productID: {
      type: String,
      required: [true, "Product is required"],
    },
    productType: {
      type: Number,
      required: [true, "Product Type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
