const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Add a new doctor
router.post("/", async (req, res) => {
  const { name, specialization, availability } = req.body;
  try {
    const doctor = new Doctor({ name, specialization, availability });
    await doctor.save();
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;