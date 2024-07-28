const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("ADMIN", adminSchema);
