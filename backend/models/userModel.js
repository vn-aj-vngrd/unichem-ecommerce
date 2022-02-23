const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name."],
    },
    email: {
      type: String,
      required: [true, "Please add your email."],
      unique: true,
    },
    sex: {
      type: String,
      required: [true, "Please add your sex."],
    },
    birthday: {
      type: String,
      required: [true, "Please add your birthday."],
    },
    phoneNumber: {
      type: String,
      required: [true, "Please add your phone number."],
    },
    address: {
      type: Object,
      required: [true, "Please add your address."],
    },
    password: {
      type: String,
      required: [true, "Please add your password."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
