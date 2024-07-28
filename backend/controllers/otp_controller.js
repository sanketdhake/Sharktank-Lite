const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();
const OTP = require("../models/otp");
const { generateOTP } = require("../utils/otpGenerate");

const otp_controller = {
  //otp_generate
  otp_generate: asyncHandler(async (req, res) => {
    const email_id = req.body.email_id;
    const otp = await generateOTP(email_id);
    await OTP.findByIdAndDelete(email_id);
    OTP.create({
      otp,
      expires: Date.now() + 5 * 60 * 1000,
      email_id,
    });
  }),

  //otp_verify
  otp_verify: asyncHandler(async (req, res) => {
    const { otp, email_id } = req.body;
    const found_otp = OTP.findById(email_id);
    if (found_otp && found_otp.otp === otp && found_otp.expires > Date.now()) {
      await OTP.findByIdAndDelete(email_id);
      res.json({ success: true, message: "OTP verified successfully" });
    } else {
      res.json({ success: false, message: "OTP is incorrect" });
    }
  }),
};

module.exports = otp_controller;
