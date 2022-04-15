const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    unique: true,
  },
  token: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 1200, // 20 mins
  },
});

module.exports = mongoose.model("Token", tokenSchema);
