const express = require("express");
const EmergencySOS = require("../models/EmergencySOS");
const router = express.Router();

// Send emergency SOS
router.post("/", async (req, res) => {
  const { userId, location } = req.body;
  try {
    const emergency = new EmergencySOS({ userId, location });
    await emergency.save();
    res.json(emergency);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get emergency history
router.get("/:userId", async (req, res) => {
  try {
    const emergencies = await EmergencySOS.find({ userId: req.params.userId });
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;