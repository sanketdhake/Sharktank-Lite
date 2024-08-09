const asyncHandler = require("express-async-handler");
const Business = require("../models/business");
const Entrepreneur = require("../models/entrepreneur");
const dotenv = require("dotenv");
const { register } = require("./entrepreneur_controller");
dotenv.config();

const business_controller = {
  register: asyncHandler(async (req, res) => {
    const formdata = req.body;
    if (!req.user) {
      throw new Error("Your login session is expired, Please login again");
      res.status(400);
      res.json({
        message: "Your login session is expired, Please login again",
      });
    }
    if (
      !formdata.business_stage ||
      !formdata.business_category ||
      !formdata.brand_name ||
      !formdata.company_name ||
      !formdata.registration_status ||
      !formdata.number_of_founders ||
      !formdata.current_status ||
      !formdata.business_idea ||
      !formdata.business_description ||
      !formdata.business_years ||
      !formdata.business_months ||
      !formdata.month1 ||
      !formdata.month1_revenue ||
      !formdata.month2 ||
      !formdata.month2_revenue ||
      !formdata.month3 ||
      !formdata.month3_revenue ||
      !formdata.Registration_reason ||
      !formdata.bankruptcy ||
      !formdata.pending_legal_proceedings
    ) {
      throw new Error("Please provide all required details");
      res.status(400);
      res.json({ message: "Please provide all required details" });
    }
    const {
      business_stage,
      business_category,
      brand_name,
      company_name,
      registration_status,
      cin,
      number_of_founders,
      current_status,
      business_idea,
      business_description,
      business_years,
      business_months,
      website_link,
      month1,
      month1_revenue,
      month2,
      month2_revenue,
      month3,
      month3_revenue,
      Registration_reason,
      bankruptcy,
      pending_legal_proceedings,
    } = formdata;

    const business_exists = await Business.findOne({ brand_name });
    if (business_exists) {
      throw new Error("Business already exists");
      res.status(400);
      res.json({ message: "Business already exists" });
    }
    const entrepreneur_exists = await Entrepreneur.findById(req.user);
    if (!entrepreneur_exists) {
      throw new Error("Invalid Auth Token");
      res.status(400);
      res.json({ message: "Invalid Auth token" });
    }
    const business = await Business.create({
      entrepreneur_id: req.user,
      business_stage,
      business_category,
      brand_name,
      company_name,
      registration_status,
      cin,
      entrepreneurs_equity: 100,
      number_of_founders: Number(number_of_founders),
      current_status,
      business_idea,
      business_description,
      business_years: Number(business_years),
      business_months: Number(business_months),
      website_link,
      product_image: req.file.path,
      month1: new Date(month1),
      month1_revenue: Number(month1_revenue),
      month2: new Date(month2),
      month2_revenue: Number(month2_revenue),
      month3: new Date(month3),
      month3_revenue: Number(month3_revenue),
      Registration_reason,
      bankruptcy: JSON.parse(bankruptcy),
      pending_legal_proceedings: JSON.parse(pending_legal_proceedings),
      verified: false,
    });

    res.json({
      message: "Business is added",
      Brand: business.brand_name,
      Owner: entrepreneur_exists.name,
    });
  }),
  update: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send("login session is expired , please login again");
    }
    const business_id = req.params.id;
    const business = await Business.findById(business_id);
    console.log(req.user);
    console.log(business.entrepreneur_id);
    if (req.user == business.entrepreneur_id) {
      business.entrepreneur_id = req.user || business.entrepreneur_id;
      business.business_stage =
        req.body.business_stage || business.business_stage;
      business.business_category =
        req.body.business_category || business.business_category;
      business.brand_name = req.body.brand_name || business.brand_name;
      business.company_name = req.body.company_name || business.company_name;
      business.registration_status =
        req.body.registration_status || business.registration_status;

      business.cin = req.body.cin || business.cin;
      business.entrepreneurs_equity =
        req.body.entrepreneurs_equity || business.entrepreneurs_equity;

      business.number_of_founders =
        req.body.number_of_founders || business.number_of_founders;
      business.current_status =
        req.body.current_status || business.current_status;
      business.business_idea = req.body.business_idea || business.business_idea;
      business.business_description =
        req.body.business_description || business.business_description;
      business.business_years =
        req.body.business_years || business.business_years;
      business.business_months =
        req.body.business_months || business.business_months;
      if (req.file) {
        business.product_image = req.file.path;
      }

      business.month1 = req.body.month1 || business.month1;
      business.month1_revenue =
        req.body.month1_revenue || business.month1_revenue;
      business.month2 = req.body.month2 || business.month2;
      business.month2_revenue =
        req.body.month2_revenue || business.month2_revenue;
      business.month3 = req.body.month3 || business.month3;
      business.month3_revenue =
        req.body.month3_revenue || business.month3_revenue;
      business.Registration_reason =
        req.body.Registration_reason || business.Registration_reason;
      business.bankruptcy = req.body.bankruptcy || business.bankruptcy;
      business.pending_legal_proceedings =
        req.body.pending_legal_proceedings ||
        business.pending_legal_proceedings;
      business.verified = false;
      const updated_business = await business.save();
      res.send({ message: "Business details have been updated successfully" });
    } else {
      throw new Error("Invalid Login");
      res.json({ message: "Invalid Login" });
    }
  }),
  delete: asyncHandler(async (req, res) => {
    console.log("received something");

    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }
    const business_id = req.body.id;
    const business = Business.findById(req.body.id);
    if (business.entrepreneurs_equity != 100) {
      throw new Error(
        "Sharks have investments made in your business, You Can't directly delete the account, Please consult with Admins for further details"
      );
      res.json({
        message:
          "Sharks have investments made in your business, You Can't directly delete the account, Please consult with Admins for further details",
      });
    }

    const result = await Business.findByIdAndDelete(business_id);

    res.json({ message: "Your Business account has been deleted" });
  }),
};
module.exports = business_controller;
