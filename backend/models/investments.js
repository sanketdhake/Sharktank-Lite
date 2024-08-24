const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema(
  {
    shark_id: { type: mongoose.Schema.Types.ObjectId, ref: "Shark" },
    business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
    shark_name: { type: String, required: true },
    amount: { type: String, required: true },
    equity: { type: Number, required: true },
    royalty: { type: Number, required: true },
    royalty_duration: { type: Number, required: true },
    accepted: { type: Boolean, required: true },
    completed: { type: Boolean, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Investments", investmentSchema);
