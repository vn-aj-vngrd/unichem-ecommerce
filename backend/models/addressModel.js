const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    address: {
      type: Array,
      required: [true, "Address is required."],
    },
    primaryAddress: {
      type: Number,
      required: [true, "Primary Address is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
