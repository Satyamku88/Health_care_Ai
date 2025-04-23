const mongoose = require("mongoose");

const ConsultationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
});

module.exports = mongoose.model("Consultation", ConsultationSchema);