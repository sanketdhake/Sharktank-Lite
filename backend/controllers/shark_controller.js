const asyncHandler = require("express-async-handler");
const Shark = require("../models/shark");
const Business = require("../models/business");
const Investment = require("../models/investments");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { hash_passwordfn } = require("../utils/hash_password");
const { verify_passwordfn } = require("../utils/verify_password");
const mongoose = require("mongoose");
const ObjectID = mongoose.Types.ObjectId;

const shark_controller = {
  //register API
  register: asyncHandler(async (req, res) => {
    if (!req.file) {
      console.log("there is no file in request");
      throw new Error("Please provide all required details");
      res.status(400);
      res.json({ message: "Please provide all required details" });
    }

    req.fileUrl = req.file.path;
    const formdata = req.body;
    if (
      !formdata.name ||
      !formdata.mobile_no ||
      !formdata.email_id ||
      !formdata.password ||
      !formdata.educational_qualification ||
      !formdata.networth ||
      !formdata.investment_capacity ||
      !formdata.domain
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
      networth,
      investment_capacity,
      domain,
      state,
      city,
      address,
      pincode,
    } = formdata;
    const hashed_password = await hash_passwordfn(password);
    const shark_exists = await Shark.findOne({ email_id: email_id });
    if (shark_exists) {
      throw new Error("Shark already exists ");
    }
    const shark = await Shark.create({
      name,
      dob: new Date(dob),
      age: Number(age),
      gender,
      mobile_no,
      email_id,
      password: hashed_password,
      educational_qualification,
      institution,
      networth: Number(networth),
      investment_capacity: Number(investment_capacity),
      business_documents: req.fileUrl,
      domain,
      state,
      city,
      address,
      pincode: Number(pincode),
      verified: false,
    });
    res.json({
      message: "Shark registration is complete",
      ID: shark._id,
      Entrepreneur_name: shark.name,
      Email_ID: shark.email_id,
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
    const found_shark = await Shark.findOne({ email_id });
    if (!found_shark) {
      throw new Error("Invalid Login Credentials");
      res.send({ message: "Shark with provided email id doesn't exist" });
    }
    if (!found_shark.verified) {
      res.json({
        message:
          "Your user account is still not verified by Admin. Please login to system after some time.",
      });
    }

    const isMatch = await verify_passwordfn(password, found_shark.password);
    if (isMatch) {
      const token = jwt.sign({ id: found_shark._id }, process.env.JWT, {
        expiresIn: "30d",
      });
      res.json({
        message: "login successful",
        token,
        Entrepreneur: found_shark.name,
        Email_ID: found_shark.email_id,
      });
    } else {
      throw new Error("Invalid Login Credentials");
      res.send({ message: "Invalid Login Credentials" });
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
    const shark = await Shark.findById(req.user);

    if (shark) {
      shark.name = req.body.name || shark.name;
      shark.dob = req.body.dob || shark.dob;
      shark.age = req.body.age || shark.age;
      shark.gender = req.body.gender || shark.gender;
      shark.mobile_no = req.body.mobile_no || shark.mobile_no;
      shark.email_id = req.body.email_id || shark.email_id;
      shark.password = hashed_password || shark.password;
      shark.educational_qualification =
        req.body.educational_qualification || shark.educational_qualification;
      shark.institution = req.body.institution || shark.institution;
      shark.networth = req.body.networth || shark.networth;
      shark.investment_capacity =
        req.body.investment_capacity || shark.investment_capacity;
      if (req.file) {
        shark.business_documents = req.file.path || shark.business_documents;
      }

      shark.domain = req.body.domain || shark.domain;
      shark.state = req.body.state || shark.state;
      shark.city = req.body.city || shark.city;
      shark.address = req.body.address || shark.address;
      shark.pincode = req.body.pincode || shark.pincode;
      shark.verified = false;
      const updated_shark = await shark.save();
      res.send({ message: "Shark details have been updated successfully" });
    } else {
      res.send({ message: "Shark not found" });
    }
  }),
  //Delete API
  delete: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }
    const sharks_investments = await Investment.find({
      shark_id: new ObjectID(req.user),
      completed: true,
    });
    if (sharks_investments) {
      throw new Error(
        "You have made investments in the Business. Hence you can't delete this account. please contact with Admins for further details"
      );
      res.json({
        message:
          "You have made investments in the Business. Hence you can't delete this account. please contact with Admins for further details",
      });
    }

    const result = await Shark.findByIdAndDelete(req.user);
    res.json({ message: "Your Shark account has been deleted" });
  }),
};
module.exports = shark_controller;
