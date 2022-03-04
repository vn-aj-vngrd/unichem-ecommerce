const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: {
      type: Array,
      required: [true, "Address is required."],
    },
    defaultAddress: {
      type: Number,
      required: [true, "Default Address is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
