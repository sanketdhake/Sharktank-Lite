const mongoose = require("mongoose");
const sharkSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    mobile_no: { type: String, required: true, unique: true },
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    educational_qualification: { type: String, required: true },
    institution: { type: String, required: true },
    networth: { type: Number, required: true },
    business_documents: { type: String },
    investment_capacity: { type: Number, required: true },
    domain: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    verified: { type: Boolean, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Shark", sharkSchema);
