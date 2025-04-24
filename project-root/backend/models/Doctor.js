const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availability: [{ day: String, time: String }],
});

module.exports = mongoose.model("Doctor", DoctorSchema);