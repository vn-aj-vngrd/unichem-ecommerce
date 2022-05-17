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
    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    cloudinaryID: {
      type: String,
      required: [true, "Cloudinary ID is required"],
    },
    verified: {
      type: Boolean,
      required: [true, "User Verification is required."],
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
