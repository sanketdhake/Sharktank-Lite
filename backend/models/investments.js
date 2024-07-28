import mongoose, { Schema } from "mongoose";
import { schema } from "./entrepreneur";
import { schema } from "./business";
const investmentSchema = new mongoose.Schema(
  {
    shark_id: { type: schema.Types.ObjectId, ref: Shark },
    business_id: { type: schema.Types.ObjectId, ref: Business },
    amount: { type: String, required: true },
    equity: { type: Number, required: true },
    company_valuation: { type: Number, required: true },
    royalty: { type: Number, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Investments", investmentSchema);
