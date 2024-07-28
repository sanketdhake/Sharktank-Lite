const mongoose = require("mongoose");
const entrepreneurSchema = new mongoose.Schema(
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
    employed: { type: Boolean, required: true },
    business_designation: { type: String, required: true },
    writing_language_proficiency: { type: String, required: true },
    spoken_language_proficiency: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    verified: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entrepreneur", entrepreneurSchema);
