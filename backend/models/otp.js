const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
  {
    otp: { type: String },
    expires: { type: String },
    email_id: { type: String, require: true, unique: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("OTP", otpSchema);
