const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const ADMIN = require("../models/admin");
const Entrepreneur = require("../models/entrepreneur");
const Shark = require("../models/shark");
const Business = require("../models/business");
const { hash_passwordfn } = require("../utils/hash_password");
const { verify_passwordfn } = require("../utils/verify_password");
const jwt = require("jsonwebtoken");
dotenv.config();

const admin_controller = {
  //admin login
  login: asyncHandler(async (req, res) => {
    const { email_id, password } = req.body;
    const found_admin = await ADMIN.findOne({ email_id });
    if (!email_id || !password) {
      throw new Error("Please provide all required details");
      res.json({ Message: "Please provide all required details" });
      res.status(400);
    }
    console.log(found_admin.email_id);
    const isMatch = await verify_passwordfn(password, found_admin.password);
    if (isMatch) {
      const token = jwt.sign({ id: found_admin._id }, process.env.Admin_JWT, {
        expiresIn: "30d",
      });
      res.json({
        message: "login successful",
        token: "1",
        Admin: found_admin.name,
        Email: found_admin.email_id,
      });
    } else {
      throw new Error("Invalid Credentials, Please provide correct password");
      res.json({
        Message: "Invalid Credentials, Please provide correct password",
      });
      res.status(400);
    }
  }),

  //register
  register: asyncHandler(async (req, res) => {
    const { name, email_id, password } = req.body;
    const hashed_password = await hash_passwordfn(password);
    const exist_admin = await ADMIN.findOne({ email_id });

    if (!exist_admin) {
      if (!name || !email_id || !password) {
        throw new Error("Please provide all required details");
        res.json({ Message: "Please provide all required details" });
        res.status(400);
      } else {
        await ADMIN.create({
          name,
          email_id,
          password: hashed_password,
        });
        res.json({
          Message: "Admin registration is successful",
          Name: name,
          Email: email_id,
        });
      }
    } else {
      res.json({
        message:
          "This email id is already been used. Please provide different email id",
      });
    }
  }),
  //delete
  delete: asyncHandler(async (req, res) => {
    const email_id = req.body.email_id;
    const found_admin = await ADMIN.findOne({ email_id });
    await ADMIN.findByIdAndDelete(found_admin._id);
    res.json({ message: "Admin account is deleated" });
  }),
  //approve-shark
  approve_shark: asyncHandler(async (req, res) => {
    const shark_id = req.params.id;
    const found_shark = await Shark.findById(shark_id);
    found_shark.verified = true;
    found_shark.save();
    res.json({ message: "Shark is verified" });
  }),

  //approve-entrepruner
  approve_entrepreneur: asyncHandler(async (req, res) => {
    const entrepreneur_id = req.params.id;
    const found_entrepreneur = await Entrepreneur.findById(entrepreneur_id);
    found_entrepreneur.verified = true;
    found_entrepreneur.save();
    res.json({ message: "Entreprenuer is verified" });
  }),
  approve_business: asyncHandler(async (req, res) => {
    const business_id = req.params.id;
    const found_business = await Business.findById(business_id);
    found_business.verified = true;
    found_business.save();
    res.json({ message: "Business is verified" });
  }),
};

module.exports = admin_controller;
