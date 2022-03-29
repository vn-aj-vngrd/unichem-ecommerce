const mongoose = require("mongoose");

const Schema = mongoose.Schema(
  {
    promoName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressSchema);
