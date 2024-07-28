import mongoose, { Schema } from "mongoose";
import { schema } from "./entrepreneur";

const businessSchema = new mongoose.Schema(
  {
    entrepreneur_id: { type: Schema.Types.ObjectId, ref: "Entrepreneur" },
    business_stage: { type: String, required: true },
    business_category: { type: String, required: true },
    brand_name: { type: String, required: true },
    company_name: { type: String, required: true },
    registration_status: { type: String, required: true },
    CIN: { type: String, unique: true },
    number_of_founders: { type: Number, required: true },
    current_status: { type: String, required: true },
    business_idea: { type: String, required: true },
    business_description: { type: String, required: true },
    business_years: { type: Number, required: true },
    business_months: { type: Number, required: true },
    website_link: { type: String },
    product_image: { type: File },
    month1: { type: date },
    month1_revenue: { type: Number },
    month2: { type: date },
    month2_revenue: { type: Number },
    month3: { type: date },
    month3_revenue: { type: Number },
    Registration_reason: { type: String },
    bankruptcy: { type: Boolean, required: true },
    pending_legal_proceedings: { type: Boolean, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Business", businessSchema);
