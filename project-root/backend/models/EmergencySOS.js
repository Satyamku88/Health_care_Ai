const mongoose = require("mongoose");

const EmergencySOSSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("EmergencySOS", EmergencySOSSchema);