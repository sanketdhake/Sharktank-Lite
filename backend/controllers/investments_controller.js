const asyncHandler = require("express-async-handler");
const Shark = require("../models/shark");
const Business = require("../models/business");
const Investment = require("../models/investments");
const Entrepreneur = require("../models/entrepreneur");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/SendEmail");
const dotenv = require("dotenv");
dotenv.config();

const investments_controller = {
  //Invest
  add_investment: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }

    const { amount, equity, royalty, royalty_duration } = req.body;
    const business_id = req.params.id;
    const business_exist = await Business.findById(business_id);

    if (business_exist) {
      if (business_exist.entrepreneurs_equity < equity) {
        throw new Error(
          "Business dosent have enough equity for this investment"
        );
        res.json({
          message: "Business dosent have enough equity for this investment",
        });
      } else {
        const shark = await Shark.findById(req.user);
        const investment = Investment.create({
          shark_id: req.user,
          business_id,
          shark_name: shark.name,
          amount,
          equity,
          royalty,
          royalty_duration,
          accepted: false,
          completed: false,
        });
        res.json({
          message:
            "Your Investment request is successfully sent to the Business owner",
        });
      }
    } else {
      throw new Error("Business dosen't Exist");
      res.json({ message: "Business dosen't exist" });
    }
  }),

  accept_investment: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }
    const entrepreneur = await Entrepreneur.findById(req.user);
    const investment_id = req.params.id;
    const investment = await Investment.findById(investment_id);

    const business = await Business.findById(investment.business_id);
    const shark = await Shark.findById(investment.shark_id);

    if (business.entrepreneurs_equity < investment.equity) {
      throw new Error(
        `Business ${business.brand_name} dosen't have enough equity to accept this investment offer`
      );
      res.json({
        message: `Business ${business.brand_name} dosen't have enough equity to accept this investment offer`,
      });
    }

    if (investment) {
      investment.accepted = true;
      await investment.save();
      const message = `<p>The Entrepreneur have accepted the offer that you have proposed for their Business ${business.name}</p>
      <p>Please find below the contact details of the Business Owner</p>
      <ul>
      <li>NAME - ${entrepreneur.name}</li>
      <li>Contact No. - ${entrepreneur.mobile_no}</li>
      <li>Email ID - ${entrepreneur.email_id}</li>
      </ul>
      <p>You Can now reach out to the Entrepreneur using above mentioned contact details to proceed for your investment in Business ${business.name}</p>
      <p>Please reach out to the Admin team for further help</p>
      `;
      await sendEmail(shark.email_id, message);
      res.json({
        message:
          "Your contact details have been sent to the Investor. Investor will connect you soon to proceed with the investment deal.",
      });
    } else {
      throw new Error("Investment dosen't Exist");
      res.json({ message: "Investment dosen't exist" });
    }
  }),

  complete_investment: asyncHandler(async (req, res) => {
    if (!req.user) {
      res.send({ message: "login session is expired , please login again" });
    }
    const entrepreneur = await Entrepreneur.findById(req.user);
    const investment_id = req.params.id;
    const investment = await Investment.findById(investment_id);
    const business = await Business.findById(investment.business_id);

    investment.completed = true;
    await investment.save();
    business.entrepreneurs_equity =
      business.entrepreneurs_equity - investment.equity;
    await business.save();
    res.json({
      message: "thank you for confirming the completion of this Investment",
    });
  }),
};

module.exports = investments_controller;
