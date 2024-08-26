const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema(
  {
    entrepreneur_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entrepreneur",
    },
    business_stage: { type: String, required: true },
    business_category: { type: String, required: true },
    brand_name: { type: String, required: true, unique: true },
    company_name: { type: String, required: true },
    registration_status: { type: String, required: true },
    cin: { type: String, unique: true },
    entrepreneurs_equity: { type: Number, required: true },
    number_of_founders: { type: Number, required: true },
    current_status: { type: String, required: true },
    business_idea: { type: String, required: true },
    business_description: { type: String, required: true },
    business_years: { type: Number, required: true },
    business_months: { type: Number, required: true },
    website_link: { type: String },
    product_image: { type: String, required: true },
    business_documents: { type: String, required: true },
    month1: { type: Date },
    month1_revenue: { type: Number },
    month2: { type: Date },
    month2_revenue: { type: Number },
    month3: { type: Date },
    month3_revenue: { type: Number },
    Registration_reason: { type: String, required: true },
    bankruptcy: { type: Boolean, required: true },
    pending_legal_proceedings: { type: Boolean, required: true },
    verified: { type: Boolean, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Business", businessSchema);
