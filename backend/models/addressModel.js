const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userAddress: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address1: {
      type: String,
      required: [true, "Please add your Region, Province, City, Barangay."],
    },
    address2: {
      type: String,
      required: [true, "Please add your Street Name, Building, House No."],
      unique: true,
    },
    postalCode: {
      type: String,
      required: [true, "Please add your Postal Code."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
