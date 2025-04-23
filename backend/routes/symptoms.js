const express = require("express");
const { body, validationResult } = require("express-validator");
const Symptom = require("../models/Symptom");
const router = express.Router();

// Save symptom analysis
router.post(
  "/",
  [
    body("symptoms").isLength({ min: 5 }).withMessage("Symptoms must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId, symptoms, result } = req.body;
    try {
      const symptom = new Symptom({ userId, symptoms, result });
      await symptom.save();
      res.json(symptom);
    } catch (err) {
      res.status(500).json({ msg: "Server error" });
    }
  }
);

// Get symptom history
router.get("/:userId", async (req, res) => {
  try {
    const symptoms = await Symptom.find({ userId: req.params.userId });
    res.json(symptoms);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;