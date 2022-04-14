const mongoose = require("mongoose");

const verficationSchema = mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 3600, // 1 hour
  },
});

module.exports = mongoose.model("Verification", verficationSchema);
