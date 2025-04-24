const express = require("express");
const Consultation = require("../models/Consultation");
const router = express.Router();

// Book consultation
router.post("/", async (req, res) => {
  const { userId, doctor, date, time } = req.body;
  try {
    const consultation = new Consultation({ userId, doctor, date, time });
    await consultation.save();
    res.json(consultation);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get consultation history
router.get("/:userId", async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.params.userId });
    res.json(consultations);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;