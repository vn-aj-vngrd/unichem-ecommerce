const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
    },
    sex: {
      type: String,
      required: [true, "Sex is required."],
    },
    birthday: {
      type: String,
      required: [true, "Please is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userType: {
      type: String,
      required: [true, "Usertype is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
