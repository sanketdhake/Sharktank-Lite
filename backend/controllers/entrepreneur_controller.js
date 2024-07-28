const asyncHandler = require("express-async-handler");
const Entrepreneur = require("../models/entrepreneur");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { hash_passwordfn } = require("../utils/hash_password");
const { verify_passwordfn } = require("../utils/verify_password");
//const { generateOTP } = require("../utils/otpGenerate");

dotenv.config();
//let storeOTP = {};
const entrepreneur_controller = {
  //Register API
  register: asyncHandler(async (req, res) => {
    if (
      !req.body.name ||
      !req.body.dob ||
      !req.body.mobile_no ||
      !req.body.email_id ||
      !req.body.password ||
      !req.body.educational_qualification ||
      !req.body.employed ||
      !req.body.business_designation
    ) {
      throw new Error("Please provide all required details");
      res.status(400);
      res.json({ message: "Please provide all required details" });
    }
    const {
      name,
      dob,
      age,
      gender,
      mobile_no,
      email_id,
      password,
      educational_qualification,
      institution,
      employed,
      business_designation,
      writing_language_proficiency,
      spoken_language_proficiency,
      state,
      city,
      address,
      pincode,
    } = req.body;

    const hashed_password = await hash_passwordfn(password);
    const entrepreneur_exists = await Entrepreneur.findOne({ email_id });

    if (entrepreneur_exists) {
      throw new Error("Entrepreneur already exists ");
    }

    const entrepreneur = await Entrepreneur.create({
      name,
      dob,
      age,
      gender,
      mobile_no,
      email_id,
      password: hashed_password,
      educational_qualification,
      institution,
      employed,
      business_designation,
      writing_language_proficiency,
      spoken_language_proficiency,
      state,
      city,
      address,
      pincode,
      verified: false,
    });
    //console.log(req.body);
    res.json({
      message: "Entrepreneur registration is complete",
      ID: entrepreneur._id,
      Entrepreneur_name: entrepreneur.name,
      Email_ID: entrepreneur.email_id,
    });
  }),

  //Login API
  login: asyncHandler(async (req, res) => {
    if (!req.body.email_id || !req.body.password) {
      throw new Error("Please provide all required details");
      res.status(400);
      res.json({ message: "Please provide all required details" });
    }
    const { email_id, password } = req.body;
    //console.log(email_id);
    //console.log(password);
    const found_entrepreneur = await Entrepreneur.findOne({ email_id });

    if (!found_entrepreneur) {
      throw new Error("Invalid Login Credentials");
    } else if (!found_entrepreneur.verified) {
      res.json({
        message:
          "Your user account is still not verified by Admin. Please login to system after some time.",
      });
    } else {
      const isMatch = await verify_passwordfn(
        password,
        found_entrepreneur.password
      );
      if (isMatch) {
        const token = jwt.sign(
          { id: found_entrepreneur._id },
          process.env.JWT,
          {
            expiresIn: "30d",
          }
        );
        res.json({
          message: "login successful",
          token,
          Entrepreneur: found_entrepreneur.name,
          Email_ID: found_entrepreneur.email_id,
        });
      } else {
        throw new Error("Invalid Login Credentials");
        res.send({ message: "invalid login Credentials" });
      }
    }
  }),

  //Update API
  update: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send("login session is expired , please login again");
    }

    var hashed_password = null;
    if (req.body.password) {
      hashed_password = await hash_passwordfn(req.body.password);
    }
    const entrepreneur = await Entrepreneur.findById(req.user);
    if (entrepreneur) {
      entrepreneur.name = req.body.name || entrepreneur.name;
      entrepreneur.dob = req.body.dob || entrepreneur.dob;
      entrepreneur.age = req.body.age || entrepreneur.age;
      entrepreneur.gender = req.body.gender || entrepreneur.gender;
      entrepreneur.mobile_no = req.body.mobile_no || entrepreneur.mobile_no;
      entrepreneur.email_id = req.body.email_id || entrepreneur.email_id;
      entrepreneur.password = hashed_password || entrepreneur.password;
      entrepreneur.educational_qualification =
        req.body.educational_qualification ||
        entrepreneur.educational_qualification;
      entrepreneur.institution =
        req.body.institution || entrepreneur.institution;
      entrepreneur.employed = req.body.employed || entrepreneur.employed;
      entrepreneur.business_designation =
        req.body.business_designation || entrepreneur.business_designation;
      entrepreneur.writing_language_proficiency =
        req.body.writing_language_proficiency ||
        entrepreneur.writing_language_proficiency;
      entrepreneur.spoken_language_proficiency =
        req.body.spoken_language_proficiency ||
        entrepreneur.spoken_language_proficiency;
      entrepreneur.state = req.body.state || entrepreneur.state;
      entrepreneur.city = req.body.city || entrepreneur.city;
      entrepreneur.address = req.body.address || entrepreneur.address;
      entrepreneur.pincode = req.body.pincode || entrepreneur.pincode;
      const updated_entrepreneur = await entrepreneur.save();
      res.json({ message: "Entrepreneur details have been updated" });
    } else {
      res.send("Entrepreneur not found");
    }
  }),
  //forgot_password

  //delete:
  delete: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }
    await Entrepreneur.findByIdAndDelete(req.user);
    res.json({ message: "Your Entrepreneur account has been deleted" });
  }),
};
module.exports = entrepreneur_controller;
