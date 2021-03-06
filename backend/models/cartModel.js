const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
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
    productType: {
      type: Number,
      required: [true, "Product Type is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
    checked: {
      type: Boolean,
      required: [true, "Is Checked is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
